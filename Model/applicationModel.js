let {connection} = require('../Connection/Connection')


function changeApplicationStatus(data, id){
    
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

function getApplicationByID(id){
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

module.exports = {
    changeApplicationStatus,
    getApplicationByID
}