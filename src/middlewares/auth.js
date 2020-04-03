const isValidHostName = (req,res,next) =>{
    const validHost = ['167.86.110.96','localhost'];
    if (validHost.includes(req.hostname)) {
        next();
    } else {
        res.status(403).send({ status: 'ACCES DENIED'});
    }
    // console.log('req.hostname', req.hostname);
};
const isAuth = (req,res,next) =>{
//     const validHost = ['167.86.110.96','localhost'];
//     if (validHost.includes(req.hostname)) {
//         next();
//     } else {
//         res.status(403).send({ status: 'ACCES DENIED'});
//     }
//     // console.log('req.hostname', req.hostname);
};

module.exports = {isValidHostName, isAuth}  ;