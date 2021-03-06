const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
var app = express();


const port = process.env.PORT|| 3000;
hbs.registerPartials(__dirname+'/views/partials');


app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  })
next();
});
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
app.set('view engine','hbs');
app.get('/project',(req,res)=>{
  res.render('project.hbs',{
    pageTitle:'Portfolio Page',
    msg:'These are your current Projects' 
  })
})
app.get('/',(req, res)=>{
  // res.send('<h1>hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    msg:"hello goku whats up"
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
  });
})
app.listen(port,()=>{
  console.log(`server is up at port ${port}`)
});

app.get('/bad',(req,res)=>{
  res.send({
    result:{
      error:404
    }
  })
})
