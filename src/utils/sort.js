function sortUsers (order) {
  return (a, b) => {
    if (order === 'desc') {
      return a.id < b.id ? 1 : -1;
    }

    return a.id > b.id ? 1 : -1;
  }
}

module.exports = sortUsers;