// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
/* importamos users desde mongo*/
// const Users = require("../../mongo/models/users");

const createData = async (req, res) => {
    try {
        console.log('req.body', req.body);
        /* obtengo los datos que obtengo por POST */
        // Ejmplo : const username = request.body.username
        const { username, email, password, data } = req.body;
        /*     
        /* Encriptaos password                               */
        /*   */
        /* guardamos en base de datos. METHOD 1*/
        //    await Users.create ({  // Usamos 'await' para esperar que confirme el ingreso a la base de datos 
        //                            // y no se ejecuten las lineas siguientes.
        //        username, // 'username': username, Equivalencia
        //        email, // 'email' = email
        //        'password' : hash,
        //         'data' : data
        //    });

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
// 

module.exports = {
    createData
};
