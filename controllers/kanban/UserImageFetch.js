const Users = require('../../models/auth/user');

module.exports = UserImageFetch = async(req,res) => {
    try{
        
        return await Users.findOne({email: req.body.options.data.email}, function (err, data){
            
            if(err){
                return res.status(404).json({
                    success: false
                });
             }
    
            if(data){
                
                res.contentType(data.avatar.contentType)
                return res.send(data.avatar)
            }
        });
    } catch(e){
        res.status(404).json({
            success: false
        });
    }
};