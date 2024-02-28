const fs = require('fs')
const path = require('path')

function removeFile(filename){
   const paths = path.join(__dirname, '../public/companyLogos/', filename);
   fs.unlink(paths, function(err) {
        if(err) return console.log(err);
        console.log('Local image deleted successfully')
   })
}

module.exports = { removeFile }