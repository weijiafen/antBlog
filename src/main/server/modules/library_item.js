
var Sequelize=require('sequelize')
var dbConfig=require('../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var library_item = sequelize.define('library_item', {
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  itemImg:{
    type:Sequelize.STRING
  },
  itemTitle: {
    type: Sequelize.STRING
  },
  itemSum: {
    type: Sequelize.INTEGER
  },
  itemCurrent: {
    type: Sequelize.INTEGER
  },
  libraryId:{
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
module.exports=library_item
