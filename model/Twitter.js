import Sequelize from 'sequelize'
import { sequelize } from '../db'

export const Twitter = sequelize.define('twitter', {
  text: Sequelize.STRING,
  textCreatedDate: Sequelize.DATE,
  latitude: Sequelize.DOUBLE,
  longitude: Sequelize.DOUBLE,
}, {
  freezeTableName: true,
  timestamps: true
})
