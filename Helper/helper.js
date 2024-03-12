function inc(value){
    return value + 1;
}


function formatDate(date) {
    // Assuming you receive the date as 'Wed Feb 28 2024 00:00:00 GMT+0545 (Nepal Time)'
// const dateString = 'Wed Feb 28 2024 00:00:00 GMT+0545 (Nepal Time)';
let formattedDateString;
// Extract only the year, month, and day components
let dateString = date.toString();
const year = dateString.slice(11, 15);
const month = dateString.slice(4, 7).toLowerCase(); // Handle month name case
const day = dateString.slice(8, 10);

// Create a new Date object with desired format
const formattedDate = new Date(year, month === 'jan' ? 0 : month === 'feb' ? 1 : 2, day); 

// Format the date object using your preferred method (e.g., toLocaleDateString)
return formattedDateString = formattedDate.toLocaleDateString('en-US'); // '2024-02-28'

}

function checkProgress(value){
    if (value == 'pending'){
        return true
    }
    else{
        return false
    }
}

function checkAdmin(value){
    if(value=='admin'){
        return true;
    }
    return false;
}

function pagination(totalPage){
    let arr=[];
    for (i=1 ; i<=totalPage; i++){
         arr.push(i);
    }
    return arr;
}

function prev(value){
    let intValue = parseInt(value)
    if(value == 1){
        return 1;
    }
    return intValue - 1;
}

function next(value, totalPage){
    let currentPage = parseInt(value)
    if(currentPage == totalPage){
        return totalPage;
    }
    return currentPage + 1;
}

function indexInc(value, cPage, limit){
    let indexValue = parseInt(value);
    let currentPage = parseInt(cPage);
    let limitValue = parseInt(limit);
    return (indexValue + 1) + (currentPage - 1) * limitValue;
}

function checkAuth (applicant, company){
    if(applicant == true || company == true){
        return true;
    }
    return false;
}


module.exports = {
    inc,
    formatDate,
    checkProgress,
    checkAdmin,
    pagination,
    prev,
    next,
    indexInc,
    checkAuth
}