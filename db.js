import Sequelize from 'sequelize'

export const sequelize = new Sequelize('SocialRest', 'rest', 'restapi', {
  host: '13.76.94.234',
  dialect: 'mariadb',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
})
