const Sequelize = require('sequelize');
const { getEnv } = require('../utils/helpers');

const sequelize = new Sequelize(
  getEnv('DB_NAME'),
  getEnv('DB_USERNAME'),
  getEnv('DB_PASSWORD'),
  {
    host: getEnv('DB_HOST'),
    dialect: 'mysql'
  }
);

// Tes koneksi
sequelize.authenticate().then(() => {
  console.log('Koneksi database berhasil.');
}).catch((err) => {
  console.error('Koneksi database gagal:', err);
});

module.exports = sequelize