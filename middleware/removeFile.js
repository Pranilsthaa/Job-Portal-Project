const fs = require('fs')
const path = require('path')

function removeFile(filename){
   const paths = path.join(__dirname, '../public/companyLogos/', filename);
   fs.unlink(paths, function(err) {
        if(err) return console.log(err);
        console.log('Local image deleted successfully')
   })
}

function removeApplicantFile(filename){
   const paths = path.join(__dirname, '../public/applicantResume/', filename);
   fs.unlink(paths, function(err) {
        if(err) return console.log(err);
        console.log('Local resume deleted successfully')
   })
}

function removeApplicantProfilePic(filename){
   const paths = path.join(__dirname, '../public/profilePictures/', filename);
   fs.unlink(paths, function(err) {
        if(err) return console.log(err);
        console.log('Local Profile Pic deleted successfully')
   })
}

module.exports = { removeFile, removeApplicantFile, removeApplicantProfilePic }