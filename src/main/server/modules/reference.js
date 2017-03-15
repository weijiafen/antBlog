 // 通过references选项可以创建外键:
 bar_id: {
   type: Sequelize.INTEGER,

   references: {
     // 引用另一个模型
     model: Bar,

     // 连接模型的列表
     key: 'id',

   }
 }