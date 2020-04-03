const jwt = require('jsonwebtoken');


const isValidHostName = (req,res,next) =>{
    const validHost = ['167.86.110.96','localhost'];
    if (validHost.includes(req.hostname)) {
        next();
    } else {
        res.status(403).send({ status: 'ACCESS DENIED'});
    }
    // console.log('req.hostname', req.hostname);
};
const isAuth = (req,res,next) => {
    try {
        const { token } = req.headers;
        console.log(req.body);
        
        if (token) {
          const data =   jwt.verify(token, process.env.JWT_SECRET);
          console.log('jwt data', data);
          if (data.userID !== req.body.userID && data.role !== 'admin'){
              throw {
                  code:403,
                  status: 'ACCESS_DENIED',
                  message: 'Missing permision or invalid role' 
              };

          }
          next()
          
            
        } else {
            throw {
                code:403,
                status: 'ACCESS_DENIED',
                message: 'Missing header token' 
            };

        }
    } catch (error) {
        res.status(error.code || 500).send({ status: error.status || 'ERROR', message: error.message });
 
    }
};

module.exports = {isValidHostName, isAuth}  ;