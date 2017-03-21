
var Sequelize=require('sequelize')
var dbConfig=require('../../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var skills_level = sequelize.define('skills_level', {
  //技能自评id
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  userId:{
    type:Sequelize.INTEGER
  },
  isShow: {
    //是否显示
    type: Sequelize.INTEGER,
  },
  //标题
  title: {
    type: Sequelize.STRING
  },
  //技能自评块图片
  img:{
    type: Sequelize.STRING
  },
  //个人信息块背景图
  background_img:{
    type: Sequelize.STRING
  },
  //数据 键值对字符串
  data:{
    type: Sequelize.STRING(1234) 
  },
  color:{
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
module.exports=skills_level
