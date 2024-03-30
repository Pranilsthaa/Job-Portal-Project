let {connection} = require('../Connection/Connection')

class applicationModel {
    static changeApplicationStatus(data, id){
        
    return new Promise ((resolve, reject) => {
            connection.query(`UPDATE application
                                SET Progress = ?
                                WHERE application_id = ?
                                AND Progress = 'pending';`,[data, id],
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

    static getApplicationByID(id){
        return new Promise((resolve, reject)=>{
            connection.query(  `SELECT 
                                A.*,
                                J.job_title,
                                J.job_description,
                                C.company_name
                            FROM 
                                application AS A
                            JOIN 
                                jobs AS J ON A.job_id = J.job_id
                            JOIN 
                                company_detail AS C ON J.company_id = C.company_id
                            WHERE 
                                A.applicant_id = ?;`, [id], 
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

    static getApplicantEmailByApplicationID (id){
        return new Promise((resolve, reject)=>{
            connection.query(` SELECT 
                                AD.applicant_email
                                FROM 
                                application AS A
                                JOIN 
                                applicant_detail AS AD ON A.applicant_id = AD.applicant_id
                                WHERE 
                                A.application_id = ?;`, [id],
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

    static getUserData(){
        return new Promise((resolve, reject)=>{
            connection.query(`
            SELECT COUNT(*) AS total_applicants FROM applicant_detail;
            SELECT COUNT(*) AS total_applications FROM application;
            SELECT COUNT(*) AS total_companies FROM company_detail;
            SELECT COUNT(*) AS total_jobs_posted FROM jobs;
            `,
        (error, results) => {
        if (error) {
            console.error(error);
            return;
        }
        resolve(results);
    });

        })
    }
}
module.exports = {
    // changeApplicationStatus,
    // getApplicationByID,
    // getApplicantEmailByApplicationID,
    // getUserData,
    applicationModel   
}