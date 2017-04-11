
var Sequelize=require('sequelize')
var dbConfig=require('../../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var fans = sequelize.define('fans', {
  //粉丝条目ID
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  //粉丝Id
  userId:{
    type: Sequelize.INTEGER
  },
  //所关注博主的id
  targetId:{
    type: Sequelize.INTEGER
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
module.exports=fans
