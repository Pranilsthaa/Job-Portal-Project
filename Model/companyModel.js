const {connection} = require('../Connection/Connection')

function registerCompany(data, pass){
    const {name, phone, address, email} = data;
   return new Promise ((resolve, reject) => {
        connection.query('INSERT INTO company_detail (company_name, company_phone, company_address, company_email, company_password) VALUES (?, ?, ?, ?, ?) ',[name, phone, address, email, pass],
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

function getCompanyDetail() {
    return new Promise ((resolve, reject) => { 
        connection.query('SELECT * FROM company_detail',
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

function getCompanyDetailByID(id) {
    return new Promise ((resolve, reject) => { 
        connection.query('SELECT * FROM company_detail where company_id=?', [id],
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


function updateCompanyDetails(values, id, src) {
        const {email, phone, address} = values;
    
    return new Promise ((resolve, reject) => { 
        connection.query('UPDATE company_detail SET company_phone=?, company_address=?, company_email=?, company_logo=? where company_id=?', [phone, address, email, src, id],
     (error, result) => {
        if (error) {
            console.error('Error updating company details:', error);
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
        connection.query('SELECT company_logo FROM company_detail where company_id=?', [id],
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

function updateProfileWithoutImg(values, id) {
    const {email, phone, address} = values;

return new Promise ((resolve, reject) => { 
    connection.query('UPDATE company_detail SET company_phone=?, company_address=?, company_email=? where company_id=?', [phone, address, email, id],
 (error, result) => {
    if (error) {
        console.error('Error updating company details:', error);
        return reject(error);
    }
    else{
        return resolve(result);
    }
})
});
}


function getJobListedByCompany(id, offset, limit){
    console.log(offset, limit)
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT jobs.job_id, jobs.job_title, jobs.job_location, jobs.job_type, jobs.job_industry, jobs.skillsreq,
                          jobs.salary, jobs.job_description, jobs.knowledge, jobs.education, jobs.dateposted, company_detail.company_name
                          FROM jobs
                          INNER JOIN company_detail ON jobs.company_id = company_detail.company_id
                          WHERE company_detail.company_id =? LIMIT ?, ?;`, [id, offset, limit],
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

function getApplicantCount(com_id){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT 
                        J.Job_id,
                        J.job_title,
                        COUNT(A.applicant_id) AS applicantCount
                    FROM 
                        jobs AS J
                    LEFT JOIN 
                        application AS A ON J.Job_id = A.job_id
                    WHERE 
                        J.company_id = ?
                    GROUP BY 
                        J.Job_id,
                        J.job_title;`, [com_id],
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

function getApplicationInfo(id){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT 
                        A.*,   
                        J.job_title,
                        AD.*  
                        FROM 
                        application AS A
                        JOIN 
                        jobs AS J ON A.job_id = J.Job_id
                        JOIN
                        applicant_detail AS AD ON A.applicant_id = AD.applicant_id
                        WHERE 
                        J.company_id = ?;`, [id],
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


function getUnverifiedCompany(){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM company_detail where isVerified=?`, ['false'],
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

function verifycompany(id){
    return new Promise((resolve, reject)=>{
        connection.query(`UPDATE company_detail
        SET isVerified = true
        WHERE company_id =?;`, [id],
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

function getTotalJobListingByCompany(id){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT COUNT(*) AS job_count
                          FROM jobs
                          WHERE company_id = ?;`, [id],
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

module.exports = {
    registerCompany,
    getCompanyDetail,
    updateCompanyDetails,
    getCompanyDetailByID,
    getImageURL,
    updateProfileWithoutImg,
    getJobListedByCompany,
    getApplicationInfo,
    getApplicantCount,
    getUnverifiedCompany,
    verifycompany,
    getTotalJobListingByCompany
}