const express = require('express');
const fs = require('fs');
const moment = require('moment')
const pdf = require('pdf-creator-node');
const options = require('./helpers/options');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const homeRoutes = require('./routes/home-routes');
const data = require('./helpers/data');
const router = express.Router();


const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use(homeRoutes.routes);


app.use('/',router);


// RENDER REPORT FROM THE SERVER
 
router.post('/server', function (req, res) {
    let chilDetails = {
        Child_ID : req.body.childId,
        Child_name : req.body.name,
         Child_age : req.body.age,
         Child_City: req.body.city,
        Gender : req.body.gender,
        Activity_name : req.body.activity_name,
        Score : req.body.score,
        Grade : req.body.grade,
        HealthAtt : req.body.healthAtt
   }
    
   //res.json({msg : "FILE DOWNLOADED FROM THE SERVER"})  

    
   const d = new Date();
   const date = (d.getFullYear()+ '_'+d.getMonth()+'_'+d.getDate()+'_'+d.getHours()+':'+ d.getMinutes() + ':' + d.getSeconds())

    const html = fs.readFileSync(path.join(__dirname, 'views/template.html'), 'utf-8');
    const filename = req.body.name+ '_' + date +'.pdf';
       
        let activity = '';
            activity = (req.body.activity_name)
        let name = '';
            name = (req.body.name)
        let age = '';
            age = (req.body.age)
        let gender = '';
            gender = (req.body.gender)
            let city = '';
            city = (req.body.city)    
        let score = '';
            score = (req.body.score)
        let grade = '';
            grade = (req.body.grade)
        let healthatt = '';
            healthatt = (req.body.healthAtt)
        
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
            path: './docs/' + filename,
            type:""
        }
        pdf.create(document, options)
            .then(result => {
                console.log(result);
               
                // let timestamp = new Date();
                // console.log(timestamp);

                
                var file = fs.createReadStream(result.filename);
                var stat = fs.statSync(result.filename);
                res.setHeader('Content-Length', stat.size);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment;filename= ${filename}`);
                file.pipe(res);

            }).catch(error => {
                console.log(error);
            });

            

            
   } )
   
 




app.listen(3000, () => console.log('App is listening on url http://localhost:3000'));

