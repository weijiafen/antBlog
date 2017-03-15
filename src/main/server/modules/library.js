
var Sequelize=require('sequelize')
var dbConfig=require('../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var library = sequelize.define('library', {
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
    type: Sequelize.INTEGER
  },
  //标题
  title: {
    type: Sequelize.STRING
  },
  //图片
  img:{
    type: Sequelize.STRING
  },
  //背景图
  background_img:{
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
module.exports=library
