// import {emailTemplate} from './js-foundation/01-template'; ESTO NO FUNCIONA EN NODEJS

// require('./js-foundation/01-template');
// const { emailTemplate } = require('./js-foundation/01-template');
// console.log(emailTemplate);

// require('./js-foundation/02-destructuring');


// 04 ARROW FUNCTIONS - CALLBACKS
// const {getUserById} = require('./js-foundation/04-arrow');
// const id = 1;
// getUserById(id, (error, user) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Usuario encontrado: ', user);
// })

// 05 FACTORY FUNCTIONS
// const {getUUID} = require('./plugins/get-id.plugin');
// const {getAge} = require('./plugins/get-age.plugin');
// const {buildMakePerson} = require ('./js-foundation/05-factory');

// const makePerson = buildMakePerson({getUUID, getAge});

// const obj = {name: 'Kevin Rodriguez', birthdate: '2005-02-20'}
// const person = makePerson(obj);
// console.log(person);


// 06 PROMISES
// const {getPokemonById} = require('./js-foundation/06-promises');

//Opcion 2 - promises
// getPokemonById(4, (pokemon) => {
//     console.log(pokemon);
// });

//Opcion 3 - promises
// getPokemonById(3)
//     .then((pokemon) => { console.log({pokemon}); })
//     .catch((err) => console.log(err))
//     .finally(() => console.log('Proceso finalizado'));


//07 Winston
const {buildLogger} = require('./plugins');
const logger = buildLogger('app');
logger.log('Hola mundo');
logger.error('Error en la aplicacion');

