// const { countries, languages } = require('countries-list');

// const routes = app => {

//     app.get('/', (request, response) => {
//       response.status(200).send('HELLO');
//     });
//     app.get('/info', (request, response) => {
//       response.send('info 2');
//     });
//     // Utilizando query get
//     app.get('/country', (request, response) => {
//       console.log('request.query', request.query);
//       response.json(countries[request.query.code]);
//     });
//     // Utilizando parametros en la ruta
//     app.get('/language/:lang', (request, response) => {
//       console.log('request.params', request.params);
//       const lang = languages[request.params.lang];
//       if (lang) {
//         response.json({ status: 'OK', data: lang });
//       } else {
//         response.status(404).json({
//           status: 'NOT_FOUND',
//           message: `language ${request.params.lang} doesn\'t exit`
//         });
//       }
//     });
//     // Respuesta cuando no encuentra una ruta
//     app.get('*', (request, response) => {
//       response.status(404).send('NOT FOUND');
//     });
// }
// module.exports = routes;