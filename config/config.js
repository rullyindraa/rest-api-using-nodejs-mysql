var config = {
  development: {
    database: {
      host: 'localhost',
      user: 'root',
      password: '',
      db: 'students'
    },
    server: {
      host: 'http://localhost:3000'
    },
    salt: {
      salt: '7fa73b47df808d36c5fe328546ddef8b9011b2c6'
    }
  }
}
  
module.exports = config;