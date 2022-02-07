const {getUsers, getUserById, createUser, deleteUserById, updateUser} = require('./controller/UserController')

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: getUsers
  },
  {
    endpoint: '/users',
    method: 'POST',
    handler: createUser
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: getUserById
  },
  {
    endpoint: '/users/:id',
    method: 'DELETE',
    handler: deleteUserById
  },
  {
    endpoint: '/users/:id',
    method: 'PUT',
    handler: updateUser
  }
]
