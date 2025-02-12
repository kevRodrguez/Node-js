//OPCION 1, CUESTA LEER

// const getPokemonById = (id, callback) => {
//     const url = 'https://pokeapi.co/api/v2/pokemon/' + id;

//     fetch(url).then((response) => {
//         response.json().then((pokemon) => {
//             // console.log(pokemon.name);

//             callback( pokemon.name);
//         })
//     })
// }

//OPCION 2, MAS FACIL DE LEER

// const getPokemonById = (id, callback) => {
//     const url = 'https://pokeapi.co/api/v2/pokemon/' + id;

//     fetch(url)
//     .then((response) => {
//        return response.json();
//     })
//     .then((pokemon) => {
//         callback( pokemon.name);
//     })
//     .catch((error) => {
//         callback(error);
//     })
// }

//OPCION 3, PROMESAS
// const getPokemonById = (id) => {
//     const url = 'https://pokeapi.co/api/v2/pokemon/' + id;

//     return fetch(url)
//         .then((response) => response.json())
//         //.then (() => {throw new Error('Error al obtener el pokemon')})
//         .then((pokemon) => pokemon.name)

// }

//Opcion 4 - Async Await usando patron adaptador
const {http} = require('../plugins')

const getPokemonById = async (id) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    try {
        const pokemon = await http.get(url);

        if (!pokemon) {
            throw new Error('Error al obtener el pokemon');
        }

        return pokemon.name;
    } catch (error) {
        console.log('Por favor ingrese un id valido!');
    }
}

module.exports = {
    getPokemonById,
}