import Sequelize from 'sequelize'
import { sequelize } from '../db'

export const Facebook = sequelize.define('facebook', {
  userID: Sequelize.STRING,
  postID: Sequelize.STRING,
  message: Sequelize.STRING,
  postCreatedTime: Sequelize.DATE
}, {
    timestamps: true,
    freezeTableName: true 
})


