const {connection} = require('../Connection/Connection')

function addJobModel(values, id){
    const {job_title, location, type, industry, skills, salary, description, knowledge, education} = values
    return new Promise((resolve, reject)=> {
        connection.query('INSERT INTO jobs (job_title, job_location, job_type, job_industry, skillsreq, salary, job_description, knowledge, education, company_id) VALUES (?,?,?,?,?,?,?,?,?,?)', [job_title, location, type, industry, skills, salary, description, knowledge, education, id],
         (error, result)=>{
            if(error){
                console.log(error)
                reject(error)
            }
            else{
                resolve(result)
            }
        })
    })
}


function getJobDetail(){
    return new Promise((resolve, reject)=> {
        connection.query(`SELECT jobs.job_id, jobs.job_title, jobs.job_location, jobs.job_type, jobs.job_industry, jobs.skillsreq,
                          jobs.salary, jobs.job_description, jobs.knowledge, jobs.education, jobs.dateposted,company_detail.company_logo, company_detail.company_name
                          FROM jobs
                          INNER JOIN company_detail ON jobs.company_id = company_detail.company_id`,
         (error, result)=>{
            if(error){
                console.log(error)
                reject(error)
            }
            else{
                resolve(result)
            }
        })
    })
}

function getJobDetailsByID(job_id){
    return new Promise((resolve, reject)=> {
        connection.query(`SELECT jobs.job_id, jobs.job_title, jobs.job_location, jobs.job_type, jobs.job_industry, jobs.skillsreq,
                          jobs.salary, jobs.job_description, jobs.knowledge, jobs.education, jobs.dateposted,company_detail.company_id, company_detail.company_name
                          FROM jobs
                          INNER JOIN company_detail ON jobs.company_id = company_detail.company_id
                          WHERE jobs.job_id =?`,[job_id],
         (error, result)=>{
            if(error){
                console.log(error)
                reject(error)
            }
            else{
                resolve(result)
            }
        })
    })
}

function updateJobDetail(values, id){
    const {job_title, location, type, industry, skills, salary, description, knowledge, education} = values;
    return new Promise((resolve, reject)=> {
        connection.query('UPDATE jobs SET job_title=?, job_location=?, job_type=?, job_industry=?, skillsreq=?, salary=?, job_description=?, knowledge=?, education=? where job_id=?', [job_title, location, type, industry, skills, salary, description, knowledge, education, id],
         (error, result)=>{
            if(error){
                console.log(error)
                reject(error)
            }
            else{
                resolve(result)
            }
        })
    })
}

function deleteJob(job_id){
    
    return new Promise((resolve, reject)=> {
        connection.query('DELETE FROM jobs where job_id= ?', [job_id], 
         (error, result)=>{
            if(error){
                console.log(error)
                reject(error)
            }
            else{
                resolve(result)
            }
        })
    })
}

module.exports = {
    addJobModel,
    getJobDetail,
    getJobDetailsByID,
    updateJobDetail,
    deleteJob
}



