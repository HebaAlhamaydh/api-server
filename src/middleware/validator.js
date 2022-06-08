'use strict';
function validator(req, res, next) {
    req.name=req.query.name
    let regx=/^[a-zA-Z]+$/
         if(req.name==null)
        errorHandler();
        if(req.name=="")
        req.name="user"
        if(!regx.test( req.name))
        req.name="wrong Name"
         next();
        
         
    
 }
 
 module.exports = validator;