//un factory functione es una funcion que crea otra funcion

//Ejemplo de un factory function
const buildMakePerson = ({ getUUID, getAge }) => {
    return ({ name, birthdate }) => {
        return {
            id: getUUID(),
            name,
            birthdate,
            age: getAge(birthdate)
        }
    }
}


//Ejemplo de una funcion normal, sin factory function
// const buildPerson = ({name, birthdate}) => {

//     return {
//         id: getUUID(),
//         name,
//         birthdate,
//         age: getAge(birthdate)
//     }
// }

// const obj = {name: 'John', birthdate: '2005-02-20'}
// const person = buildPerson(obj);

// console.log(person);

module.exports = {
    buildMakePerson,
}