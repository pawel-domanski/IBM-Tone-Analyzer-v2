const express = require('express');

// Inicjalizacja ustawień systemowych
const IBMCloudEnv = require('ibm-cloud-env');

// Inicjalizacja usług IBM Watson
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');


// Inicjalizacja Cloudant
const CloudantSDK = require('@cloudant/cloudant');

// Autoryzacja do usług
const { IamAuthenticator } = require('ibm-watson/auth');

// Pobranie ustawień do IBM Cloud
const url = IBMCloudEnv.getString('cloudant_url');
const usr = IBMCloudEnv.getString('username');
const psw = IBMCloudEnv.getString('password');

IBMCloudEnv.init('/server/config/mappings.json');


// Podłączenie się do bazy
const cloudant = new CloudantSDK({ url: url,
  username: usr,
  password: psw });

const mydb = cloudant.db.use('mydb');

// Inicjalizacja metod
const toneAnalyzer = new ToneAnalyzerV3({
  version: IBMCloudEnv.getString('ta_version'),
  authenticator: new IamAuthenticator({
    apikey: IBMCloudEnv.getString('ta_apikey'),
  }),
  url: IBMCloudEnv.getString('ta_url'),
});

let languageTranslator = new LanguageTranslatorV3({
  authenticator: new IamAuthenticator({
    apikey: IBMCloudEnv.getString('lt_apikey'),
  }),
  url: IBMCloudEnv.getString('lt_url'),
  version: IBMCloudEnv.getString('lt_version'),
});

// Inicjalizacja routera
const router = express.Router();

// Wysyłanie zapytania z trekstem do TA poprzez usługę LT

router.post('/:ta_text', function(req, res) {
  // Przyjęcie parametrów z linii poleceń
  const parameters = {
    text: req.params.ta_text,
    source: 'pl',
    target: 'en',
  };
  languageTranslator.translate(parameters, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      // Przygotowanie parametrów do wysłania do ToneAnalyzera
      const toneParams = {
        toneInput: { text: response.result.translations[0].translation },
        contentType: 'application/json',
      };
      toneAnalyzer.tone(toneParams)
        .then(toneAnalysis => {
          // eslint-disable-next-line max-len
          var output_tone = JSON.parse(JSON.stringify(toneAnalysis, null, 2)).result;
          // Utworzenie odpowiedzi do wysłania do bazy
          var output_total = {
            source_text: parameters,
            translated_text: response.result.translations[0].translation,
            output_text: output_tone,
          };

          return mydb.insert(output_total)
            .then(addedName => {
              console.log('Add name successful');
              res.send(output_total);
            })
            .catch(err => {
              console.log('Błąd:', err);
            });


        });
    }
  });

});


module.exports = router;
