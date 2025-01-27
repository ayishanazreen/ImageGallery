const auth=(req,res,next)=>{

    console.log("grant access");
    next();

}
module.exports={auth}