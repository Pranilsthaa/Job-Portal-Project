const {connection} = require('../Connection/Connection')

class jobModel{
    static addJobModel(values, id){
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
        })  }
    
    static getJobsbyCompanyID(id){
        return new Promise((resolve, reject)=> {
            connection.query(`SELECT * FROM jobs where company_id= ?`, [id],
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

static getJobDetail(searchQuery){
    return new Promise((resolve, reject)=> {
        connection.query(`SELECT jobs.job_id, jobs.job_title, jobs.job_location, jobs.job_type, jobs.job_industry, jobs.skillsreq,
                          jobs.salary, jobs.job_description, jobs.knowledge, jobs.education, jobs.dateposted,
                          company_detail.company_logo, company_detail.company_name
                          FROM jobs
                          INNER JOIN company_detail ON jobs.company_id = company_detail.company_id
                          WHERE jobs.job_title LIKE '%${searchQuery}%' OR jobs.job_location LIKE '%${searchQuery}%' OR company_detail.company_name LIKE '%${searchQuery}%';`,
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

static getJobDetailsByID(job_id){
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

static updateJobDetail(values, id){
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



static deleteJob(job_id, company_id){
    return new Promise((resolve, reject)=> {
        connection.beginTransaction((err) => {
            if (err) {
                reject(err);
                return;
            }
            // Delete all related applications
            connection.query('DELETE FROM application WHERE job_id = ?', [job_id], (error, result) => {
                if (error) {
                    connection.rollback(() => {
                        console.log(error);
                        reject(error);
                    });
                } else {
                    // Once applications are deleted, delete the job
                    connection.query('DELETE FROM jobs WHERE job_id = ? AND company_id = ?', [job_id, company_id], (err, result) => {
                        if (err) {
                            connection.rollback(() => {
                                console.log(err);
                                reject(err);
                            });
                        } else {
                            connection.commit((err) => {
                                if (err) {
                                    connection.rollback(() => {
                                        console.log(err);
                                        reject(err);
                                    });
                                } else {
                                    resolve(result);
                                }
                            });
                        }
                    });
                }
            });
        });
    });
}


static applyJob(app_id, job_id, resume){
    
    return new Promise((resolve, reject)=> {
        connection.query('INSERT INTO application (applicant_id, job_id, resume, active) VALUES (?, ?, ?, ?)', [app_id, job_id, resume, true], 
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

static getApplicationDetailByID(id){
    
    return new Promise((resolve, reject)=> {
        connection.query('SELECT * FROM application where application_id=?', [id], 
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

static hasUserAppliedForJob(userId, jobId){
    
    return new Promise((resolve, reject)=> {
        connection.query(`SELECT COUNT(*) AS applications_count
                            FROM application
                            WHERE applicant_id = ? AND job_id = ? AND active = true;`, [userId, jobId], 
         (error, result)=>{
            if(error){
                console.log(error)
                reject(error)
            }
            else{
                resolve(result[0].applications_count > 0)
            }
        })
    })
}

static getApplicantDetailByID(id) {
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

static sendMessage(values){
    const{name, email, subject, message} = values;  
    return new Promise((resolve, reject )=>{
        connection.query('INSERT INTO feedback (name, email, subject, message) VALUES (?,?,?,?)', [name, email, subject, message],
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

    
static getMessage(){
    return new Promise((resolve, reject )=>{
        connection.query('SELECT * FROM feedback',
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

}



module.exports = {
    jobModel
}



