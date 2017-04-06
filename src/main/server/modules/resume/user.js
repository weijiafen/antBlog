
var Sequelize=require('sequelize')
var dbConfig=require('../../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var User = sequelize.define('user', {
  //用户id
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  account: {
    //账号
    type: Sequelize.STRING,
    'unique': true   
  },
  //密码
  password: {
    type: Sequelize.STRING
  },
  //用户名
  userName:{
    type: Sequelize.STRING
  },
  //邮箱地址
  email:{
    type: Sequelize.STRING
  },
  //头像地址
  img:{
    type: Sequelize.STRING
  },
  //个性签名
  introduce:{
    type: Sequelize.STRING
  },
  //简历头部背景图片
  background_img:{
    type: Sequelize.STRING
  },
  // 排序权重,用于简历列表页的排序。活跃度高的用户会得到权重加成
  weight:{
    type:Sequelize.BIGINT
  },
  //字体颜色
  color:{
    type: Sequelize.STRING
  },
  //最近一次登录时间
  lastLoginAt:{
    type:Sequelize.BIGINT
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
module.exports=User
