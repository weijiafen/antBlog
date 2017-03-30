
var Sequelize=require('sequelize')
var dbConfig=require('../../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var comment = sequelize.define('comment', {
  //评论ID
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  //评论的文章ID
  articalId:{
    type:Sequelize.INTEGER
  },
  //评论者Id
  userId:{
    type: Sequelize.INTEGER
  },
  //接收到此消息通知的用户ID，可用于评论与回复
  targetId:{
    type: Sequelize.INTEGER
  },
  //作者ID，用于作者查询评论
  authorId:{
    type: Sequelize.INTEGER
  },
  //是否已读
  targetRead:{
    type: Sequelize.INTEGER
  },
  //作者是否已读
  authorRead:{
    type: Sequelize.INTEGER
  },
  //评论正文
  content:{
    type: Sequelize.STRING
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
module.exports=comment
