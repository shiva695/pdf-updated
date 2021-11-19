const fs = require('fs');
const pdf = require('pdf-creator-node');
const http = require('http')
const path = require('path');
const options = require('../helpers/options');
const data = require('../helpers/data');
const axios = require('axios')
const express =  require('express')



const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json())


const homeview = (req, res, next) => {
    res.render('home');
}

const generatePdf = async (req, response, next) => {
    
    const html = fs.readFileSync(path.join(__dirname, '../views/template.html'), 'utf-8');
    const filename = Math.random() + '_doc' + '.pdf';
    



        // data fetching

   let dataUser =  axios.post('http://localhost:1337/userfetches')
    .then(res => {
        
        
    
        let activity = '';
        data.forEach(i => {
            activity = res.data[0].activityName
        });
        let name = '';
        data.forEach(i => {
            name = res.data[0].name
        });
        let age = '';
        data.forEach(i => {
            age = res.data[0].age
        });
        let city = '';
        data.forEach(i => {
            city = res.data[0].city
        });
        let gender = '';
        data.forEach(i => {
            gender = res.data[0].gender
        });
        let score = '';
        data.forEach(i => {
            score = res.data[0].score
        });
        let grade = '';
        data.forEach(i => {
            grade = res.data[0].grade
        });
        let healthatt = '';
        data.forEach(i => {
            healthatt = res.data[0].healthAttributes
        });
        
        const obj = {
            
            activity: activity,
            score: score,
            grade:grade,
            name:name,
            age:age,
            city:city,
            healthatt: healthatt,
            gender:gender,
            
        }
        const document = {
            html: html,
            data: {
                products: obj
            },
            path: './docs/' + filename
        }
        pdf.create(document, options)
            .then(res => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
            const filepath = 'http://localhost:3000/docs/' + filename;
    
            response.render('download', {
                
                path: filepath,
                
      

                
            });       
    })
    .catch(err => console.log(err))


    



  
        
}




 

module.exports = {
    homeview,
    generatePdf,
    
}