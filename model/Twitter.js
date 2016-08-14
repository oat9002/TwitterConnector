import Sequelize from 'sequelize'
import { sequelize } from '../db'

export const Twitter = sequelize.define('twitter', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  text: Sequelize.STRING,
  textCreatedDate: Sequelize.DATE,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  timestamps: true
}, {
  freezeTableName: true // Model tableName will be the same as the model name
})
