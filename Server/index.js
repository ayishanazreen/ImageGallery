const express=require("express");
const cors=require("cors")
const app=express();
const fs = require("fs");
const path=require("path")
const { upload } = require("./Middlewares/multer");
const { auth } = require("./Middlewares/auth");
const { logger } = require("./Middlewares/logger");



const PORT=4000

//middlewares
app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(logger);


app.post('/',auth, upload.single("upload_file"), (req,res)=>
    {
   
      if (req.file) {
        res.status(200).send({ message: 'File uploaded successfully!', file: req.file});
      } else {
        res.status(400).send({ message: 'No file uploaded' });
      }

   });


   app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
  });


app.get("/",auth, (req, res) => {
  const imageDir=path.join(__dirname, 'public/images')
  fs.readdir(imageDir, (error, files) => {
    if(error){
      return res.status(500).json({
        error:"unable to read image dir"})
    }
    res.json(files);
    });
  });   

app.listen(PORT,()=>{
    console.log(`Server started at Port ${PORT}`)
})