const fs=require('fs');
const { format } = require('date-fns');

const logger=(req,res,next)=>{

    const currentTime=new Date();
    const formattedTime=format(currentTime,'dd-MM-yyyy hh:mm a')
    const currentReq={
        url:req.url,
        method:req.method,
        time:formattedTime
    }

    fs.appendFile("log.txt",JSON.stringify(currentReq) , (err)=>{
        if(err){
            console.log(err)
        }
    });
    next();

}
module.exports={logger}