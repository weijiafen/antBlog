
var Sequelize=require('sequelize')
var dbConfig=require('../../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var agree = sequelize.define('agree', {
  //点赞ID
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  //点赞的用户Id
  userId:{
    type: Sequelize.INTEGER
  },
  //点赞对应文章ID
  articalId:{
    type: Sequelize.INTEGER
  },
  //接收到点赞的用户id
  targetId:{
    type: Sequelize.INTEGER
  },
  //目标是否已读
  read:{
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
module.exports=agree
