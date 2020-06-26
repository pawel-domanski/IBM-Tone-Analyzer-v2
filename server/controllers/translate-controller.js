const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");

let languageTranslator = new LanguageTranslatorV3({
    iam_apikey: binding.apikey,
    url: binding.url,
    version: "2018-05-01"
  });

const parameters = {
    text: "dzień dobry",
    model_id: "pl-en"
  };


