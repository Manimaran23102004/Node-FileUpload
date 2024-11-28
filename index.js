const express = require('express')
const multer = require('multer')
const app = express()
const path = require('path')

app.set('views',path.join(__dirname,'view'))
app.set('view engine','ejs')


let storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads')
    },
    filename : function(req,file,cb){
        cb(null,file.originalname.replace(/\s+/g, '_') + Date.now() + path.extname(file.originalname))
    }
})

const fileLimits = 2*1000*1000

const upload = multer({
    storage : storage,
    limits : {
        fileSize : fileLimits
    },
    fileFilter : function(req,file,cb){
        let fileType = /jpeg|jpg|png/;
        let mimeType = fileType.test(file.mimetype)
        let extname = fileType.test(path.extname(file.originalname).toLowerCase())

        if(mimeType && extname){
            return cb(null,true)
        }else{
            cb('error the file not uploaded'+fileType)
        }
    }
}).single('mypic')



app.get('/',(req,res,next)=>{
    res.render('app')
   
})
app.post('/upload',(req,res)=>{
   upload(req,res,function(err){
    if(err){
        res.send(err)
    }else{
        res.send('Uploaded')
    }
   })
    
})

app.listen(1000,()=>{
    console.log('surver running port 1000')
})