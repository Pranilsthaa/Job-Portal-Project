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

function getApplicantDetailPaginated(currentPage, pageLimit) {
    const offset = parseInt((currentPage - 1) * pageLimit);
    return new Promise ((resolve, reject) => { 
        connection.query('SELECT * FROM applicant_detail LIMIT ?, ?', [offset, pageLimit],
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

function getApplicantDetailByID(id) {
    return new Promise ((resolve, reject) => { 
        connection.query('SELECT * FROM applicant_detail where applicant_id=?', [id],
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

function getImageURL(id){
    return new Promise((resolve, reject)=>{
        connection.query('SELECT applicant_resume FROM applicant_detail where applicant_id=?', [id],
        (error, result) => {
            if(error){
                return reject(error);
            }
            else{
                return resolve(result)
            }
        })
    })
}

function updateApplicantProfile(values, id, src) {
    const {name, email, phone, address} = values;

return new Promise ((resolve, reject) => { 
    connection.query('UPDATE applicant_detail SET applicant_name=?, applicant_phone=?, applicant_address=?, applicant_email=?, applicant_resume=? where applicant_id=?', [name, phone, address, email, src, id],
 (error, result) => {
    if (error) {
        console.error('Error updating applicant profile:', error);
        return reject(error);
    }
    else{
        return resolve(result);
    }
})
});
}

function updateProfileWithoutImg(values, id) {
    const {name, email, phone, address} = values;

return new Promise ((resolve, reject) => { 
    connection.query('UPDATE applicant_detail SET applicant_name=?, applicant_phone=?, applicant_address=?, applicant_email=? where applicant_id=?', [name, phone, address, email, id],
 (error, result) => {
    if (error) {
        console.error('Error updating applicant profile (without Img):', error);
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
    getApplicantDetail,
    getApplicantDetailByID,
    getImageURL,
    updateApplicantProfile,
    updateProfileWithoutImg,
    getApplicantDetailPaginated
}





