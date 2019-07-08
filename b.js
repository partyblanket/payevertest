const axios = require('axios');
const fs = require('fs');

const baseURL = 'https://reqres.in/api/users?page=';

let currentPage = 1

const fileName = __dirname + '/users.json'

async function getData () {
    let userData
    const {data: {data}} = await axios.get(baseURL + currentPage++);
    if(data.length === 0) return clearInterval(interval)
    const fileIsHere = fs.existsSync(fileName);
    
    if(fileIsHere){
        userData = JSON.parse(fs.readFileSync(fileName))
        userData.push(data)
    }else{
        userData = data
    }
    fs.writeFileSync(fileName, JSON.stringify(userData))
    
}
getData()
const interval = setInterval(getData, 6 * 1000);


// ## Part two - implement a CRON job to scrap the users
// Use this: https://reqres.in/api/users?page={page} to get the list of users and store them into a 
//file in JSON Format. Each 1 minute a cron job should scrap the next page and append users into existing file 
//in JSON format.
