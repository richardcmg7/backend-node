const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/* importamos users desde mongo*/
const Users = require("../../mongo/models/users");
const expiresIn = 60*10;
const login = async (req,res) =>{
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        console.log(user);
        if (user) {
            const isOK = await bcrypt.compare(password, user.password );
            if(isOK){
                /* creamos un token que almacena el userid y el rol del usuario*/
                const token = jwt.sign({userID: user._id,
                     role: user.role},
                     process.env.JWT_SECRET,
                     {expiresIn}
                     );

                res.send({ status: 'OK', data:{token, expiresIn}});
            }else{
                res.status(403).send({ status: 'INVALID PASSWORD', message:"El password es incorrecto"});
            }
        }else{
            res.status(401).send({ status: 'USER NOT FOUND', message:"No exite el usuario"});
        }
    } catch (e) {
        res.status(500).send({ status: 'ERROR', message: e.message });
    }
}
const createUser = async (req,res) => {
   try {
       console.log('req.body', req.body);
       /* obtengo los datos que obtengo por POST */
       // Ejmplo : const username = request.body.username
       const { username, email, password, data} = req.body;       
       /*     
       /* Encriptaos password                               */
       const hash = await bcrypt.hash(req.body.password, 15);
       console.log("FIN", hash);
        /*   */    
       /* guardamos en base de datos. METHOD 1*/
    //    await Users.create ({  // Usamos 'await' para esperar que confirme el ingreso a la base de datos 
    //                            // y no se ejecuten las lineas siguientes.
    //        username, // 'username': username, Equivalencia
    //        email, // 'email' = email
    //        'password' : hash,
    //         'data' : data
    //    });
   /* guardamos en base de datos. METHOD 2*/
       const user = new Users();
       user.username = username;
       user.email = email;
       user.password = hash;
       user.data = data;
       await user.save();
       /*                           */
       res.send({ status: "OK", message: req.body });

   } catch (error) {
       if (error.code && error.code === 11000) {
           res.status(500).send({ status: "VALORES DUPLICADOS", message: error.keyValue });
           return
       }
       console.log("error created user", error);
       res.status(500).send({ status: "ERROR", message: error.message });
   }
};
const updateUser = async (req,res) => {
    try {
        const { username, email, data, userID } = req.body;       
        await Users.findOneAndUpdate(userID,{
            username, email,data
        });
        res.send({ status: "OK", message: "User updated" });
    } catch (e) {
        if (e.code && e.code === 11000) {
            res
            .status(500)
            .send(
                { status: "VALORES DUPLICADOS",
                 message: error.keyValue 
                });
            return
        }
        console.log("ERROR", e);
        res.status(500).send({ status: 'ERROR', message: 'user updated'})
        
    }
};
const deleteUser = (req,res) => {
    res.send({ status: "OK", message: "User DELETED" });
};
const getUsers = (req,res) => {
    res.send({ status: "OK", data: {} });
};

module.exports = { 
    createUser, 
    deleteUser, 
    getUsers, 
    updateUser, 
    login
};
