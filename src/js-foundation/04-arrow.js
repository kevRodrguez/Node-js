
const users = [
    {
        id: 1,
        name: 'John'
    },
    {
        id: 2,
        name: 'Jane'
    },
    {
        id: 3,
        name: 'Jack'
    }
]

const getUserById = (id, callback) => {
    // Method using arrow function
    const user = users.find(user => {
        return user.id === id
    })



    if (!user) {
        return callback(`Usuario no encontrado con id: ${id}`)
    }

    return callback(null, user)
}

// getUserById(2); // { user: { id: 2, name: 'Jane' } }

module.exports ={
    getUserById,
}