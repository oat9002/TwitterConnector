import Sequelize from 'sequelize'
import { sequelize } from '../db'

export const Facebook = sequelize.define('facebook', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  userID: Sequelize.STRING,
  postID: Sequelize.STRING,
  message: Sequelize.STRING,
  postCreatedTime: Sequelize.DATE,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  timestamps: true
}, {
  freezeTableName: true 
})
