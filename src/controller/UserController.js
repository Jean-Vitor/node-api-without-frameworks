let { users } = require('../mock/users');
const sortUsers  = require('../utils/sort');

const getUsers = (req, res) => {
  const { order } = req.query;
  const sortedUsers = users.sort(sortUsers(order))
  res.send(200, sortedUsers )
}

const getUserById = (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id)
  
  if(!user) {
    return res.send(400, {error: 'User not found'})
  } 
  
  res.send(200, user)
}

const createUser = (req, res) => {
  const { body } = req;

  const lastId = users[users.length - 1].id;
  const newUser = {
    id: lastId + 1,
    ...body
  }

  users.push(newUser);
  res.send(200, newUser);
}

const updateUser = (req, res) => {
  const id = Number(req.params.id)
  const {name, username, email} = req.body

  const userExists = users.find((user) => user.id === id);

  if(!userExists) {
    return res.send(400, {error: 'User not found'})
  }

  users = users.map((user) => {
    if(user.id === id) {
      return {
        ...user,
        name, 
        username,
        email
      };
    }

    return user;
  })

  res.send(200, {id, name, username, email})
}


const deleteUserById = (req, res) => {
  const id = Number(req.params.id)
  const userExists = users.find((user) => user.id === id);
  if(!userExists) {
    return res.send(400, {error: 'User not found'})
  }

  users = users.filter((user) => (user.id !== id))

  res.send(200, {id})
}

module.exports = { 
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserById
}