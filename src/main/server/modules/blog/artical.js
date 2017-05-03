
var Sequelize=require('sequelize')
var dbConfig=require('../../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var artical = sequelize.define('artical', {
  //文章ID
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  //文章标题
  articalName:{
    type: Sequelize.STRING
  },
  //文章正文
  articalContent:{
    type: Sequelize.STRING
  },
  //文章阅读数
  reading: {
    type: Sequelize.INTEGER
  },
  //外键，文章分类
  categoryId:{
    type:Sequelize.INTEGER
  },
  //作者Id
  userId:{
    type: Sequelize.INTEGER
  },
  //文档类型，1为markdown；2为html
  type:{
    type:Sequelize.INTEGER
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
module.exports=artical
