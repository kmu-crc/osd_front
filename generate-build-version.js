/* generate-build-version.js */

const fs = require('fs')
const packageJson = require('./package.json')

const appVersion = packageJson.version;

const jsonData = {
    version: appVersion
}

var jsonContent = JSON.stringify(jsonData)

fs.writeFile('./public/meta.json', jsonContent, 'utf8', (err) => {
    if (err) {
        console.log("An error occured whild writing JSON object to meta.")
        return console.log(err)
    }
    console.log('meta.json file has been saved with lastest version number')
})