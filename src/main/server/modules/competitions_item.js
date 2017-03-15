
var Sequelize=require('sequelize')
var dbConfig=require('../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var competitions_item = sequelize.define('competitions_item', {
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  itemImg:{
    type:Sequelize.STRING
  },
  itemDate: {
    type: Sequelize.STRING
  },
  itemTxt: {
    type: Sequelize.STRING
  },
  competitionId:{
    type:Sequelize.INTEGER,
  },
  createAt:{
    type:Sequelize.BIGINT
  },
  updateAt:{
    type:Sequelize.BIGINT
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});
module.exports=competitions_item
