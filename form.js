// // const express=require('express');
// // const bodyparse=require('body-parser');
// // const { response } = require('express');
// // var app=express();
// // app.use(bodyparse.urlencoded({extended:true}))
// // app.get('/',function(request,response){
// // response.sendFile(__dirname+'/form.html')
// // })
// // // // app.get('/form-submit',function(request,response){
// // // // // var name= request.body.name;
// // // // // response.send("your name is ="+name)
// // // // // var id= request.body.id;
// // // // // response.send("your name is ="+id)

// // // // response.send(req.query.name);

// // // })
// // app.post('/',function(request,response,next){
// //     response.send(req.body);
// // })
// // app.listen(3700);
// var f = require('fs')
// f.writeFileSync("group.txt")
// console.log("file create succesfully")

// const express = require('express');
// var bodyParser = require('body-parser')
// const app = express();
  
// var urlencodedParser = bodyParser.urlencoded({ extended: true })
    
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/form.html');
// });
    
// app.post('/', urlencodedParser, (req, res) => {
//     console.log('Got body:', req.body);
//     res.sendStatus(200);
// });
    
// app.listen(3300);



const express=require('express');
var app=express();
const fs=require('fs');
const bodyParser=require('body-parser');
app.use(express.static('public'));

//urlencoded data:form ke data ko fill krne ke baad submit pe click krete hain toh top pe signs ko urlencoded data kehte hain
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/score',function(request,response){
response.sendFile(__dirname+'/score.html');

})

app.post('/form-submit',function(request,response){
    var ids=request.body.id;
    var fnamee=request.body.fname;
    var addr =request.body.add;
    var English=Number(request.body.eng);
    var Hindi=Number(request.body.hindi);
    var Maths=Number(request.body.maths);
    var Physics=Number(request.body.phy);
    var Chemistry=Number(request.body.che);

    var total=Number(English+Hindi+Maths+Physics+Chemistry);
    var average=total/5;
    
    var grade = 'A';
    if(average>=90){
        grade='A';
    }else if(average>=80 && average<90){
        grade='B';
    }else if(average>=70 && average<80){
        grade='C';
    }else if(average>=55 && average<70){
        grade='D';
    }else if(average>=40 && average<55){
        grade='E';
    }else{
        grade='F';
    }

    

    let scoreCard = {
        'Student Id' : ids,
        'Student Name' : fnamee,
        'Address':addr,
        'English' : English,
        'Hindi' : Hindi,
        'Maths' : Maths,
        'Physics':Physics,
        'Chemistry':Chemistry,
        'Total Marks' : total,
        'Average Marks' : average,
        'Grade':grade
    }

    
    
    fs.appendFileSync("data.txt",JSON.stringify(scoreCard));
    const data = fs.readFileSync("data.txt","utf-8")
   
    console.log(data);
    response.send(data);
})

app.listen(7000,()=>{
    console.log("Server started at 7000.")
})