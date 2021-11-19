const express = require('express');
const fs = require('fs');
const pdf = require('pdf-creator-node');
const options = require('./helpers/options');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const homeRoutes = require('./routes/home-routes');
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

    
   
    const html = fs.readFileSync(path.join(__dirname, 'views/template.html'), 'utf-8');
    const filename = req.body.name + '.pdf';
       
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
                //res.setHeader('Content-type', 'application/pdf');
                // stream.pipe(res);
                // const filepath = './docs/' + filename;
                // console.log("FILEPATH" + result.filename);
                // var data = fs.createReadStream(result.filename);
                // res.setHeader('Content-Type', 'application/pdf');
                
                // res.send(data);
                var file = fs.createReadStream(result.filename);
                var stat = fs.statSync(result.filename);
                res.setHeader('Content-Length', stat.size);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment;', filename);
                file.pipe(res);

            }).catch(error => {
                console.log(error);
            });

            // res.send(req.body);
    
            // res.render({
                
            //     path: filepath,
            // });
            
            // var file = fs.createReadStream(filepath);
            // var stat = fs.statSync(filepath);
            // res.setHeader('Content-Length', stat.size);
            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
            // file.pipe(res);

            
   } )
   
 




app.listen(3000, () => console.log('App is listening on url http://localhost:3000'));

