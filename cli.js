var inquirer = require('inquirer')
  , color    = require('cli-color')
  , setThrob = require('cli-color/throbber')
  , fs       = require('fs')
  , dotenv   = require('dotenv')
  ;

// Configs
var CONFIG = process.env.HOME + '/.phaxio';

var throbber = setThrob(function (str) {
  process.stdout.write(str);
}, 200);

if (fs.exists( CONFIG )) {
  dotenv._getKeyAndValueFromLine( CONFIG );
  dotenv._setEnvs();
  dotenv.load();
}

// Get Phaxio keys from config file or prompt
var key    = process.env.PHAXIO_API_KEY;
var secret = process.env.PHAXIO_SECRET_KEY;
if ( ! (key && secret) ) {
  inquirer.prompt(
    [
      {
        type: "input",
        name: "key",
        message: "Phaxio API key"
      },
      {
        type: "input",
        name: "secret",
        message: "Phaxio secret key"
      }
    ],
    function (answers) {
      key = answers.key;
      secret = answers.secret;
    }
  );
}

console.log("key: %s secret: %s", key, secret);
