'use strict';

const fs = require('fs')

var envName = ''

var nameEnv = null

// Get the file name of the environment if the param --env or -e was informed
process.argv.forEach((v, k) => {
  if (v.indexOf('--env') === 0 || v.indexOf('-e') === 0) {
    nameEnv = process.argv[k + 1]
  }
})

// If the file name was informed, i will use that, otherwise i use from ctx.dev (default of this plugin)
if (nameEnv) {
  envName = nameEnv
} else {
  // get .env name based on dev or production
  if (process.env.NODE_ENV === 'production') {
    envName = '.env.prod'
  }
  else {
    envName = '.env'
  }
}

// see if there is anything to do
if (envName === void 0 || envName === '') {
  return
}

// check file exists
if (!fs.existsSync(envName)) {
  console.error(`Load dotenv: '${envName}' file missing`)
  process.exit(1)
}

// dotenv options
const envOptions = {
  encoding: 'utf8',
  path: envName
}

const { config } = require('dotenv')

const result = config(envOptions)

 // check for dotenv error
if (result.error) {
  console.error(`Load dotenv: Error '${result.error}'`)
  process.exit(1)
}

for (let key in result.parsed) {
  process.env[key] = result.parsed[key]
}

module.exports = result.parsed
