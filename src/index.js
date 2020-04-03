const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
/* configuracion para variables de entorno */
const dotenv = require('dotenv');

dotenv.config();
//**************************************** */

const routesV1 = require('./routes/v1/');

const app = express();



// parse application/x-www-form-urlencoded - Me permite tomar los datos que vienen del post
app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json // Permite recibir mi data que viene desde post como json
app.use(bodyParser.json())


app.get('/', (request, response) => {
    response.status(200).send('HELLO');
});

// app.post('*',(request,response) => {
//     response.json({ status: 'OK', data: "RESPUESTA JSON " });
//     response.status(200).send('me pueden hackear aceptando todas las entradas en la ruta., :)')
// })

// Se puede colocar las variables deseadas ..//


app.post('/:data', (request, response) => {
    const variable = request.query; // Es un Json
    var cont = 0;
    var register = "{";
    for (var key in variable) {
        if (cont <= 1) {
            register += key +':"'+ variable[key]+'",';  
        }
        cont ++;
    }
    register += "data:{"
    cont2 = 0
    for (var key in variable) {
        if (cont2 > 1 && cont2 < cont - 1 ) {
            register += key + ':"' + variable[key] + '",';  
        }
        else if(cont2 == cont-1){
            register += key + ':"' + variable[key] + '"';  
        }

        cont2++;
    }
    register += '}}';
    register_replace = register.replace(/\"/g,"'")
    console.log(register_replace + "\n");
    registerjson = JSON.stringify(register_replace);
    console.log(registerjson + "\n");
    response.json(register_replace);
});


routesV1(app);

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to mongo db");
    app.listen(PORT,() => {	
        console.log(`running in port ${PORT}`);
    });
}).catch(error => {
    console.log('mongo_db_error', error);
    
});
    


