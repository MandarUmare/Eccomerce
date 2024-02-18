exports.authorizeRole=(...role)=>{

    return(req,res,next)=>{
    if(!role.includes(req.user.role)){
        const error = new Error('you are not allowed to do this operation');
        error.status = 400; 
        next(error);
    }
    next();
}
}