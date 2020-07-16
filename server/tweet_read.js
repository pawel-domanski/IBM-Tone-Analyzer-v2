// Inicjalizacja ustawień systemowych
const IBMCloudEnv = require('ibm-cloud-env');

// Inicjalizacja Cloudant
const CloudantSDK = require('@cloudant/cloudant');

// Pobranie ustawień do IBM Cloud
// eslint-disable-next-line max-len
const url = 'https://ad0dba76-c26c-425f-8212-a3b40cf1868c-bluemix.cloudantnosqldb.appdomain.cloud/';
const usr = 'ad0dba76-c26c-425f-8212-a3b40cf1868c-bluemix';
const psw = 'cbdce1e810020fdc22e224b47b358de5e54e5dab268d3127383af4c9326abe01';

IBMCloudEnv.init('/server/config/mappings.json');
// Podłączenie się do bazy
const cloudant = new CloudantSDK({ url: url,
  username: usr,
  password: psw });

const mydb = cloudant.db.use('mydb');

mydb.list({include_docs: true})
  .then(fetchedNames => {
    console.log(fetchedNames.rows[15]);
  }).catch(() => {
    console.log('Get names failed');
  });
