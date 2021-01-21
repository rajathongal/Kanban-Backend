const jwt = require('jsonwebtoken')

exports.generateToken = (name, email, _id) => {

    const jwtsecret = process.env.JWT_SECRET;
    const rfsrtsecret = process.env.JWT_RFSRT_SECRET;

    const Token = jwt.sign({
        _id: _id,
        email: email,
        name: name
    },jwtsecret, 
    { expiresIn: '25mins' },
    { algorithm: 'HS256'} 
    );  

    const rfsrt = jwt.sign({
        email: email,
        name: name
    },rfsrtsecret, 
    { expiresIn: '1d' },
    { algorithm: 'HS256'} 
    );

    return {Token, rfsrt}
}