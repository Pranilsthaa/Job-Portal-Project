let {connection} = require('../Connection/Connection')


function registerApplicant(data, pass){
    const {name, phone, address, email} = data;
   return new Promise ((resolve, reject) => {
        connection.query('INSERT INTO applicant_detail (applicant_name, applicant_phone, applicant_address, applicant_email, applicant_password) VALUES (?, ?, ?, ?, ?) ',[name, phone, address, email, pass],
        (error, result)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(result);
            }
        })
    })
}


function getApplicantDetail() {
    return new Promise ((resolve, reject) => { 
        connection.query('SELECT * FROM applicant_detail',
     (error, result) => {
        if (error) {
            return reject(error);
        }
        else{
            return resolve(result);
     
        }
    })
    });
}




module.exports = {
    registerApplicant,
    getApplicantDetail
}





