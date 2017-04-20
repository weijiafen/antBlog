/*
Navicat MySQL Data Transfer

Source Server         : localDB
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-04-20 09:45:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `agree`
-- ----------------------------
DROP TABLE IF EXISTS `agree`;
CREATE TABLE `agree` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `articalId` int(11) DEFAULT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `targetId` int(11) DEFAULT NULL,
  `read` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `articalId` (`articalId`),
  CONSTRAINT `agree_ibfk_1` FOREIGN KEY (`articalId`) REFERENCES `artical` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of agree
-- ----------------------------

-- ----------------------------
-- Table structure for `artical`
-- ----------------------------
DROP TABLE IF EXISTS `artical`;
CREATE TABLE `artical` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articalName` varchar(255) DEFAULT NULL,
  `articalContent` text,
  `reading` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `typeId` (`categoryId`),
  KEY `userId` (`userId`),
  CONSTRAINT `artical_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `artical_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of artical
-- ----------------------------
INSERT INTO `artical` VALUES ('1', '2016你的技术提升了多少？', '<p><span style=\"font-size: 16px;\">&nbsp; &nbsp; 一直想写点什么，记录点什么，但是一直不知道在哪里写，从哪开始写好。我们总是这样，想要做一件什么事情，但是又经常不知道从何开始。就像我想养只猫，那么我得等手头上松一些了去买一只，然后会考虑要买什么价位什么品种好呢？去哪里买放心呢？买完需要准备些什么东西给小猫呢？又需要怎么照顾好它呢？我想这个时候就需要一个契机去推动我开始第一步，这样后续就会自然而然发展吧。（然鹅老妈说我要是敢养猫就不来深圳找我玩耍。。。好吧他们觉得照顾猫会消耗我部分的精力吧）。卧槽跑题了好像，好吧，记录点什么，那我就自己搭一个博客系统吧。这对于一个web开发者来说似乎是装B必备的。但是我觉得只是自己在写也不爽吧，所以就立下了一个小目标：搭一个简历+博客平台吧。这样每个人都能上来注册一个账号，给自己配置一个网页简历和一个博客。</span></p><p><span style=\"font-size: 16px;\">&nbsp; &nbsp; 先介绍一下这个站点吧。虽然是想要搭建一个简历+博客平台，但是目前还只是静态的，并没有后台功能，所以注册登录配置发布这些功能都还没有，数据都是Json文件。技术上用了Webpack + ES6 + React + grunt + ant-design，异步用了Axios的fetch库，后台的话准备学一下Node + express + mySQL。</span></p><p><span style=\"font-size: 16px;\">&nbsp; &nbsp; 好吧现在切入主题吧。2016我的技术提升了多少呢？我也想回顾一下给自己总结总结，毕竟一直觉得自己的进步很慢，心态有点躁。</span></p><p><span style=\"font-size: 16px;\">&nbsp; &nbsp; 2016年是自己从普通本科大学到社会重点大学过度的一个节点，6月份的时候我还能称呼自己为学生，6月份之后就变成了一个IT从业者。从学校里html+css+js+jq就是自己井口的蓝天，到跨出来后发现这些仅仅是前端的基本功。在学校图书馆里无意看到一本Node的书介绍着“将javascript进行到底”还置之一笑，出来工作后才发现node已经四处揭竿而起了。感觉大学就是一个闭塞的摇篮，摇着摇着就睡着了。当然也怪自己折腾鼓捣得不够多。</span></p><p><span style=\"font-size: 16px;\">&nbsp; &nbsp; 2016年的上半年是在一家做招聘中介的公司实习，同时晚上下班回家后还一边做毕业设计。毕业设计用的是Bootstrap+jQuery。项目是五个人做，前端布局是负责&quot;产品经理&quot;一职的队友通过bootstrap拖拽界面生成的，有两个后台负责接口，一个后台独立负责一个贴吧模块，而我一人负责前后端分离的那块前端接口访问。那时候的插件只用了datatimePicker和highcharts。剩下的工作就是大量的$.ajax和数据展示了吧。因为自己视野比较窄，开发效率是很低下的。例如自身插件库的库存量小，table展示只是用了字符串拼接而没有用插件；整个开发使用了大量的字符串拼接DOM节点，特别繁琐（后面学到了underscore的template模板引擎，react的jsx语法，ES6的``模板引擎才领悟了如何解决这一问题）；页面间的传参比较繁琐，居然自己封装了几个正则去获取url上的参数（后来前端路由的解决方案都致力于解决这类问题）。不过就算如此，以这样的水平在前端方面感觉还是能把毕业答辩的老师给忽悠瘸了。</span></p><p><span style=\"font-size: 16px;\">&nbsp; &nbsp; 工作上吧，确实做得很不开心。工作流就是前端按照设计图把静态页面切好，扔给Php后台去嵌数据。嗯，就是一个，偶尔套套插件的切图仔，况且，2016年了为什么我还要每天都考虑切的页面得兼容IE6/7/8？也试过自己学一些react，require.js，但是没有实际的应用场景，写出了一个小demo，过个几天就忘记了，工作上用的还是那些。所以心中早就想好了毕业就跳槽吧，忍耐着把毕业设计做完，毕业答辩那些都搞定。最后在签转正合同的时候工资还被玩了文字游戏，为啥我的“绩效奖”是从我基本工资里面扣出来再半年后才开始发回来给我？无fuck说。交接三天就辞出来了。</span></p><p><span style=\"font-size: 16px;\">&nbsp; &nbsp; 辞职之后一边找工作，一边用bootstrap的栅格布局，animate.css和wow.js做了一个网页简历（就是跟这个站里面我的简历一样的东西。不过现在这个简历是用react做的了），花了一个多星期学习了Angular1.x,搭了个基本路由，用上了依赖注入、双向绑定之类的（现在也忘得差不多了）。断断续续找了一个多月吧，那段时间真的是不断地在自我怀疑，直到遇到了目前任职的这个公司。这个公司是我面试过的最有互联网范的公司了吧，上级都会努力尝试使用新技术解决一些瓶颈问题，也鼓励我们多学习新技术。</span></p><p><span style=\"font-size: 16px;\">&nbsp; &nbsp; 进公司后负责的是部分管理系统的扩展需求，老的管理系统用的是backbone + jQuery + require.js + grunt + bootstrap + 各类插件。花了一个星期时间看了一遍underscore + backbone，再拉取了代码后研究了一下项目结构后，就开始抄起键盘撸起袖子干了。熟悉了backbone的基本套路之后，接下来就是学习使用各类插件了，例如展示数据用的dataTable，弹各种窗用的bootbox，日期时间选择器datetimePicker，多选框multiple-select，拖拽排序表格的sortable，发布订阅库pubsub，时间格式库moment，文件上传插件plupload。插件的代码文件里都附上了使用文档地址，可是大部分都是英文的啊！让我这个背了几百个单词就混过英语四级的渣渣看得十脸茫然。幸好，硬着头皮看了几回之后，也就麻木了。羡慕那些英文网站翻得那么溜的同事。</span></p><p><span style=\"font-size: 16px;\">&nbsp; &nbsp; 大概这么过去了四个月吧。开始感觉自己吸收新知识的效率慢慢低了下来，做的事情都是自己会的，产品业务也开始熟了，敲起代码来就是一把梭，ctrl + c,ctrl + v 就完成了。安逸了一段时间又开始急躁，想要寻求新突破了，于是又啃了一遍阮一峰的react入门教程，开始计划用react写一个具体的项目出来。想要蹭着热度学一下webpack，于是翻了几篇webpack的入门教程，拉取了公司的一个react + webpack + ant-design 的项目下来做参考，花了几个晚上的时间配置出了一个按自己设想的项目结构。下一步就是去翻看ant-design框架文档了，到了这里发现前面被ES6卡得太难受了，很多教程都使用了ES6，antd也是用ES6的，于是又停下转向了ES6，粗略地啃了一两遍阮一峰的《ECMAScript6入门》，配置上了bable和profill，写了一遍小demo，最后总算是能看懂ES6语法了。好了，可以愉快地翻antdesign文档了，安装完了文件依赖，开始把项目里的hello world页面改成一个导航栏，做好页面布局，又陷入了另一个难题：前端路由。《React 引领未来的用户界面开发框架》一书中介绍的是使用backbone的路由，请教了一个同事后得知，使用backbone的路由是因为当初react的路由不够成熟，现在react router已经成熟了，可以直接用。《React》一书是15年5月份出版的，一年多后我去翻已经大部分脱节了，感觉我用的挺多都是旧语法，嗯没毛病。搭好了前端路由，我再借鉴了一下公司项目里使用的一个axios库（嗯，是借鉴，读书人的事，怎么能算抄袭呢。借鉴。）。axios库是一个支持Promiss特性的fetch库，老实说我还没经历过所谓的回调地狱，不过promiss的语法确实挺优雅。页面样式上我使用了Less，并且不打算使用webpack打包，而是放在首页面引入，配置了grunt来编译Less和prefixer来做css兼容压缩。</span></p><p><span style=\"font-size: 16px;\">&nbsp; &nbsp; 嗯。。。前期的准备工作大概就这些吧，剩下的就是针对自己的需求具体编码了，使用了github存放代码，在公司电脑和家里电脑可以切换着开发，服务器上也拉取了代码，更新代码也特别方便。使用react后并不那么依赖Jquery了，基本都是使用原生js开发，所以感觉需要提升一下自己的js水平，在年底放假前翻出了之前只看了几章的《javascript设计模式》来重新啃，可惜到放假时才啃了一半，越近放假心越浪。</span></p><p><span style=\"font-size: 16px;\">&nbsp; &nbsp; 感觉写了挺多，也不知道怎么结尾，只好祭出一句忘了从哪看来的挺鸡血的一句话了：first an engineer, then an front-end specialist。希望自己终有一天修炼满万小时法则，成为一个领域上的专家吧。</span></p><p><br/></p>', '133', '1', '1491032949450', '1491032949450', '1');
INSERT INTO `artical` VALUES ('2', '你有多久没有写过一段超过140字的文字了？', '<p style=\"white-space: normal; widows: 1;\">&nbsp; &nbsp;&nbsp;<strong>你有多久没有写过一段超过140字的文字了？</strong></p><p style=\"white-space: normal; widows: 1;\">&nbsp; &nbsp; 我以这么一句话来开头，是因为很多时候我心里都有这么一种感慨：自从高考后我告别了“不低于800字”以后，就几乎没再认真写过一段超过140字的文字了。身边的微博、说说、朋友圈，都是一种快速发表心情、感慨、经历的渠道，三言两语就把事情给概括完了，但是，似乎我的文字和语言组织能力一点都没有长进，一直停留在了高中为了800字想破脑袋的水平。所以我想，快餐式的文字固然方便快捷，偶尔还是要给自己的灵魂做一顿丰盛些的大餐啊。</p><p style=\"white-space: normal; widows: 1;\">&nbsp; &nbsp; 我想去写些什么，记录些什么。有时候对生活的一些感慨，有时候对书籍的一些领悟，有时候在技术上踩过的一些坑和一些个人见解，有时候对技术上一些零碎知识点的收集。我觉得这些都值得我去记录和分享。而我也相信还有许多和我有同样想法的人，看到了快餐文字的不足，但是又不知道要写些什么，在什么地方写。所以我打造了这么一个网站，去寻找一些和我有一样想法的人。</p><p style=\"white-space: normal; widows: 1;\">&nbsp; &nbsp; 首先介绍一下这个网站，这是我自己打造的一个博客平台，每个人都可以上来注册一个账号，拥有一个个人主页和一个博客。个人主页提供了很大程度上的个性配置功能，具体可以参照我的个人主页啦（点击右上角博主列表可以查看所有注册的博主）。博客包含了管理分类、发布文章、评论回复、粉丝关注等功能，发布文章时可选是否向粉丝发送邮件通知有更新。</p><p style=\"white-space: normal; widows: 1;\">&nbsp; &nbsp; 功能大概就这么多，从决定开发到现在初步成型用了三个多月时间，开发这么个东西并没有什么利益相关，纯粹是因为个人的兴趣，一方面当作一个练手的项目，一方面提供一个写东西的平台。对于开发而言，现在还有许多需要优化的地方，下一阶段应该是进行一些加载优化；对于运营而言，我想针对自己的职业特性，在上面发布一些技术相关的文章，以兴趣作为驱动，拓展一些用户先。</p><p style=\"white-space: normal; widows: 1;\">&nbsp; &nbsp; 然后后面的这段话呢，你看了就看了吧，纯粹是为了凑足800字。看到这里的时候，说明我已经写满800字了，哈哈哈<img src=\"http://img.baidu.com/hi/tsj/t_0023.gif\"/></p><p><br/></p>', '1', '1', '1491899674490', '1491900640284', '1');

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menuId` int(11) NOT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `categoryName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menuId` (`menuId`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`menuId`) REFERENCES `menus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '10', null, null, '杂谈');
INSERT INTO `category` VALUES ('16', '10', null, null, 'css1');

-- ----------------------------
-- Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `targetId` int(11) DEFAULT NULL,
  `targetRead` int(11) DEFAULT '0',
  `content` text,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `articalId` int(11) DEFAULT NULL,
  `authorRead` int(11) DEFAULT NULL,
  `authorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `articalId` (`articalId`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`articalId`) REFERENCES `artical` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for `competitions`
-- ----------------------------
DROP TABLE IF EXISTS `competitions`;
CREATE TABLE `competitions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `isShow` int(11) NOT NULL DEFAULT '0',
  `title` varchar(255) DEFAULT '',
  `img` varchar(255) DEFAULT '',
  `background_img` varchar(255) DEFAULT '',
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`userId`) USING BTREE,
  CONSTRAINT `competitions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf32 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of competitions
-- ----------------------------
INSERT INTO `competitions` VALUES ('1', '1', '1', '获奖经历', '', '/file/bg3.jpg', '1489743190304', '1489743190304', '#ffffff');
INSERT INTO `competitions` VALUES ('9', '24', '0', '获奖经历', '', '', '1490275571069', '1490275571069', '');
INSERT INTO `competitions` VALUES ('10', '25', '0', '获奖经历', '', '', '1490280740966', '1490280740966', '');
INSERT INTO `competitions` VALUES ('11', '26', '0', '获奖经历', '', '', '1490281002335', '1490281002335', '');
INSERT INTO `competitions` VALUES ('12', '27', '0', '获奖经历', '', '', '1490282249012', '1490282249012', '');
INSERT INTO `competitions` VALUES ('13', '28', '0', '获奖经历', '', '', '1490282418156', '1490282418156', '');
INSERT INTO `competitions` VALUES ('14', '29', '0', '获奖经历', '', '', '1490282610855', '1490282610855', '');
INSERT INTO `competitions` VALUES ('15', '30', '1', '获奖经历无', '', '', '1490282673622', '1490282673622', '#0079ff');
INSERT INTO `competitions` VALUES ('16', '31', '0', '获奖经历', '', '', '1490283475514', '1490283475514', '');
INSERT INTO `competitions` VALUES ('17', '33', '0', '获奖经历', '', '', '1490287397042', '1490287397042', '');
INSERT INTO `competitions` VALUES ('18', '34', '0', '获奖经历', '', '', '1491040036376', '1491040036376', '');
INSERT INTO `competitions` VALUES ('19', '35', '0', '获奖经历', '', '', '1491040266241', '1491040266241', '');
INSERT INTO `competitions` VALUES ('20', '36', '0', '获奖经历', '', '', '1491040361078', '1491040361078', '');
INSERT INTO `competitions` VALUES ('21', '37', '0', '获奖经历', '', '', '1491381107537', '1491381107537', '');

-- ----------------------------
-- Table structure for `competitions_item`
-- ----------------------------
DROP TABLE IF EXISTS `competitions_item`;
CREATE TABLE `competitions_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemImg` varchar(255) DEFAULT NULL,
  `itemDate` varchar(255) DEFAULT NULL,
  `itemTxt` varchar(255) DEFAULT NULL,
  `competitionId` int(11) NOT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `competitionId` (`competitionId`),
  CONSTRAINT `competitions_item_ibfk_1` FOREIGN KEY (`competitionId`) REFERENCES `competitions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf32;

-- ----------------------------
-- Records of competitions_item
-- ----------------------------
INSERT INTO `competitions_item` VALUES ('5', '/file/competition1.jpg', '2015年4月', 'IBM高级软件开发工程师', '1', null, null);
INSERT INTO `competitions_item` VALUES ('6', '/file/competition2.jpg', '2015年4月', '《全国软件开发（JAVA）专业人才》高级考试', '1', null, null);
INSERT INTO `competitions_item` VALUES ('7', '/file/competition3.jpg', '2015年7月', '中级软件设计师', '1', null, null);
INSERT INTO `competitions_item` VALUES ('8', '/file/competition4.jpg', '2015年12月', '广东药科大学一等奖学金', '1', null, null);
INSERT INTO `competitions_item` VALUES ('9', '/file/competition5.jpg', '2014年12月', '广东药科大学二等奖学金', '1', null, null);
INSERT INTO `competitions_item` VALUES ('10', '/file/competition6.jpg', '2015年12月', '国家励志奖学金', '1', null, null);
INSERT INTO `competitions_item` VALUES ('11', '/file/competition6.jpg', '2015年2月', '国家励志奖学金', '1', null, null);
INSERT INTO `competitions_item` VALUES ('12', '/file/competition8.jpg', '2015年12月', '广药校团委网络中心创始人', '1', null, null);
INSERT INTO `competitions_item` VALUES ('13', '/file/competition9.jpg', '2015年7月', '2015年甲骨文杯全国JAVA程序设计大赛A组全国决赛二等奖', '1', null, null);
INSERT INTO `competitions_item` VALUES ('14', '/file/competition10.jpg', '2015年4月', '第六届蓝桥杯算法大赛广东省赛二等奖', '1', null, null);

-- ----------------------------
-- Table structure for `fans`
-- ----------------------------
DROP TABLE IF EXISTS `fans`;
CREATE TABLE `fans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `targetId` int(11) DEFAULT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fans
-- ----------------------------
INSERT INTO `fans` VALUES ('1', '1', '1', '1', '1');

-- ----------------------------
-- Table structure for `library`
-- ----------------------------
DROP TABLE IF EXISTS `library`;
CREATE TABLE `library` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `isShow` int(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT '',
  `img` varchar(255) DEFAULT '',
  `background_img` varchar(255) DEFAULT '',
  `createAt` varchar(255) DEFAULT NULL,
  `updateAt` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `library_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf32;

-- ----------------------------
-- Records of library
-- ----------------------------
INSERT INTO `library` VALUES ('1', '1', '1', '个人书库', '', '', '1489743190304', '1489743190304', null);
INSERT INTO `library` VALUES ('9', '24', '0', '个人书库', '', '', '1490275571069', '1490275571069', '');
INSERT INTO `library` VALUES ('10', '25', '0', '个人书库', '', '', '1490280740966', '1490280740966', '');
INSERT INTO `library` VALUES ('11', '26', '0', '个人书库', '', '', '1490281002335', '1490281002335', '');
INSERT INTO `library` VALUES ('12', '27', '0', '个人书库', '', '', '1490282249012', '1490282249012', '');
INSERT INTO `library` VALUES ('13', '28', '0', '个人书库', '', '', '1490282418156', '1490282418156', '');
INSERT INTO `library` VALUES ('14', '29', '0', '个人书库', '', '', '1490282610855', '1490282610855', '');
INSERT INTO `library` VALUES ('15', '30', '0', '个人书库', '', '', '1490282673622', '1490282673622', '');
INSERT INTO `library` VALUES ('16', '31', '0', '个人书库', '', '', '1490283475514', '1490283475514', '');
INSERT INTO `library` VALUES ('17', '33', '0', '个人书库', '', '', '1490287397042', '1490287397042', '');
INSERT INTO `library` VALUES ('18', '34', '0', '个人书库', '', '', '1491040036376', '1491040036376', '');
INSERT INTO `library` VALUES ('19', '35', '0', '个人书库', '', '', '1491040266241', '1491040266241', '');
INSERT INTO `library` VALUES ('20', '36', '0', '个人书库', '', '', '1491040361078', '1491040361078', '');
INSERT INTO `library` VALUES ('21', '37', '0', '个人书库', '', '', '1491381107537', '1491381107537', '');

-- ----------------------------
-- Table structure for `library_item`
-- ----------------------------
DROP TABLE IF EXISTS `library_item`;
CREATE TABLE `library_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemImg` varchar(255) DEFAULT NULL,
  `itemTitle` varchar(255) DEFAULT NULL,
  `itemSum` int(11) DEFAULT NULL,
  `itemCurrent` int(11) DEFAULT NULL,
  `libraryId` int(11) DEFAULT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `libraryId` (`libraryId`),
  CONSTRAINT `library_item_ibfk_1` FOREIGN KEY (`libraryId`) REFERENCES `library` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf32;

-- ----------------------------
-- Records of library_item
-- ----------------------------
INSERT INTO `library_item` VALUES ('8', '/file/book1.jpg', 'CSS权威指南', '508', '508', '1', null, null);
INSERT INTO `library_item` VALUES ('9', '/file/book2.jpg', 'JavaScript高级程序设计', '727', '727', '1', null, null);
INSERT INTO `library_item` VALUES ('10', '/file/book3.jpg', 'JavaScriptDOM编程艺术', '298', '298', '1', null, null);
INSERT INTO `library_item` VALUES ('11', '/file/book4.jpg', 'JavaScript从入门到精通', '532', '532', '1', null, null);
INSERT INTO `library_item` VALUES ('12', '/file/book5.jpg', 'Jquery开发从入门到精通', '619', '290', '1', null, null);
INSERT INTO `library_item` VALUES ('13', '/file/book6.jpg', '锋利的JQuery', '380', '380', '1', null, null);
INSERT INTO `library_item` VALUES ('14', '/file/book7.jpg', 'JavaScript设计模式', '316', '153', '1', null, null);
INSERT INTO `library_item` VALUES ('15', '/file/book8.jpg', 'JavaScript语言精粹', '147', '147', '1', null, null);
INSERT INTO `library_item` VALUES ('16', '/file/book9.jpg', '高性能JavaScript', '202', '0', '1', null, null);
INSERT INTO `library_item` VALUES ('17', '/file/book10.png', 'ECMAScript 6 入门', '27', '18', '1', null, null);

-- ----------------------------
-- Table structure for `menus`
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `menuName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `menus_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES ('10', '1', null, null, '技术文章');

-- ----------------------------
-- Table structure for `personal_info`
-- ----------------------------
DROP TABLE IF EXISTS `personal_info`;
CREATE TABLE `personal_info` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `isShow` int(11) NOT NULL DEFAULT '0',
  `title` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT '',
  `background_img` varchar(255) DEFAULT '',
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `version` bigint(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `data` varchar(1234) DEFAULT '',
  `color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`userId`),
  CONSTRAINT `personal_info_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf32;

-- ----------------------------
-- Records of personal_info
-- ----------------------------
INSERT INTO `personal_info` VALUES ('1', '1', '个人信息', '/file/info_img.png', '', '1489743190304', '1489743190304', null, '1', '姓名||魏佳奋@@毕业院校||广东药科大学@@性别||男@@专业||计算机科学与技术@@出生日期||1993年2月14日@@联系电话||13631315632@@籍贯||广东-陆丰@@邮箱||364886455@qq.com@@政治面貌||党员@@意向职位||不仅仅是切页面的前端攻城狮@@毕业时间||2016年7月', null);
INSERT INTO `personal_info` VALUES ('10', '0', '个人信息', 'images/default.jpg', '', '1490275571069', '1490275571069', null, '24', '', null);
INSERT INTO `personal_info` VALUES ('11', '0', '个人信息', 'images/default.jpg', '', '1490280740966', '1490280740966', null, '25', '', null);
INSERT INTO `personal_info` VALUES ('12', '0', '个人信息', 'images/default.jpg', '', '1490281002335', '1490281002335', null, '26', '', null);
INSERT INTO `personal_info` VALUES ('13', '0', '个人信息', 'images/default.jpg', '', '1490282249012', '1490282249012', null, '27', '', null);
INSERT INTO `personal_info` VALUES ('14', '0', '个人信息', 'images/default.jpg', '', '1490282418156', '1490282418156', null, '28', '', null);
INSERT INTO `personal_info` VALUES ('15', '0', '个人信息', 'images/default.jpg', '', '1490282610855', '1490282610855', null, '29', '', null);
INSERT INTO `personal_info` VALUES ('16', '0', '个人信息', 'images/default.jpg', '', '1490282673622', '1490282673622', null, '30', '', null);
INSERT INTO `personal_info` VALUES ('17', '0', '个人信息', 'images/default.jpg', '', '1490283475514', '1490283475514', null, '31', '', null);
INSERT INTO `personal_info` VALUES ('18', '0', '个人信息', 'images/default.jpg', '', '1490287397042', '1490287397042', null, '33', '', null);
INSERT INTO `personal_info` VALUES ('19', '0', '个人信息', 'images/default.jpg', '', '1491040036376', '1491040036376', null, '34', '', null);
INSERT INTO `personal_info` VALUES ('20', '0', '个人信息', 'images/default.jpg', '', '1491040266241', '1491040266241', null, '35', '', null);
INSERT INTO `personal_info` VALUES ('21', '0', '个人信息', 'images/default.jpg', '', '1491040361078', '1491040361078', null, '36', '', null);
INSERT INTO `personal_info` VALUES ('22', '0', '个人信息', 'images/default.jpg', '', '1491381107537', '1491381107537', null, '37', '', null);

-- ----------------------------
-- Table structure for `project_exp`
-- ----------------------------
DROP TABLE IF EXISTS `project_exp`;
CREATE TABLE `project_exp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isShow` int(11) NOT NULL DEFAULT '0',
  `title` varchar(255) DEFAULT '',
  `img` varchar(255) DEFAULT '',
  `background_img` varchar(255) DEFAULT '',
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `version` bigint(20) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`userId`),
  CONSTRAINT `project_exp_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf32;

-- ----------------------------
-- Records of project_exp
-- ----------------------------
INSERT INTO `project_exp` VALUES ('1', '1', '项目经历', '', '', '1489743190304', '1489743190304', null, '1', null);
INSERT INTO `project_exp` VALUES ('10', '0', '项目经历', '', '', '1490275571069', '1490275571069', null, '24', '');
INSERT INTO `project_exp` VALUES ('11', '0', '项目经历', '', '', '1490280740966', '1490280740966', null, '25', '');
INSERT INTO `project_exp` VALUES ('12', '0', '项目经历', '', '', '1490281002335', '1490281002335', null, '26', '');
INSERT INTO `project_exp` VALUES ('13', '0', '项目经历', '', '', '1490282249012', '1490282249012', null, '27', '');
INSERT INTO `project_exp` VALUES ('14', '0', '项目经历', '', '', '1490282418156', '1490282418156', null, '28', '');
INSERT INTO `project_exp` VALUES ('15', '0', '项目经历', '', '', '1490282610855', '1490282610855', null, '29', '');
INSERT INTO `project_exp` VALUES ('16', '0', '项目经历', '', '', '1490282673622', '1490282673622', null, '30', '');
INSERT INTO `project_exp` VALUES ('17', '0', '项目经历', '', '', '1490283475514', '1490283475514', null, '31', '');
INSERT INTO `project_exp` VALUES ('18', '0', '项目经历', '', '', '1490287397042', '1490287397042', null, '33', '');
INSERT INTO `project_exp` VALUES ('19', '0', '项目经历', '', '', '1491040036376', '1491040036376', null, '34', '');
INSERT INTO `project_exp` VALUES ('20', '0', '项目经历', '', '', '1491040266241', '1491040266241', null, '35', '');
INSERT INTO `project_exp` VALUES ('21', '0', '项目经历', '', '', '1491040361078', '1491040361078', null, '36', '');
INSERT INTO `project_exp` VALUES ('22', '0', '项目经历', '', '', '1491381107537', '1491381107537', null, '37', '');

-- ----------------------------
-- Table structure for `project_item`
-- ----------------------------
DROP TABLE IF EXISTS `project_item`;
CREATE TABLE `project_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemTitle` varchar(255) DEFAULT NULL,
  `projectId` int(11) DEFAULT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `version` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projectId` (`projectId`),
  CONSTRAINT `project_item_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `project_exp` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf32;

-- ----------------------------
-- Records of project_item
-- ----------------------------
INSERT INTO `project_item` VALUES ('5', '项目：广药校团委官网', '1', null, null, null);
INSERT INTO `project_item` VALUES ('6', '项目：高校辅助云平台(毕业设计)', '1', null, null, null);
INSERT INTO `project_item` VALUES ('7', '项目：IT易学网', '1', null, null, null);
INSERT INTO `project_item` VALUES ('8', '项目：卖座网后台管理系统', '1', null, null, null);

-- ----------------------------
-- Table structure for `project_item_des`
-- ----------------------------
DROP TABLE IF EXISTS `project_item_des`;
CREATE TABLE `project_item_des` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `itemId` int(11) DEFAULT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `project_item_des_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `project_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf32;

-- ----------------------------
-- Records of project_item_des
-- ----------------------------
INSERT INTO `project_item_des` VALUES ('9', '项目描述：', '广东药科大学校团委官网，主要用于下发文件通知，发布学校新闻动态', '5', null, null);
INSERT INTO `project_item_des` VALUES ('10', '主要职责：', '使用HTML+CSS+Jquery高度还原设计稿', '5', null, null);
INSERT INTO `project_item_des` VALUES ('11', '项目描述：', '项目采用前后端分离开发，后台只提供数据获取接口，所有数据和交互通过AJAX异步获取。功能包括划分院系和专业，在线发布、提交作业，上传下载附件、视频上传和在线播放，在线聊天、师生贴吧。', '6', null, null);
INSERT INTO `project_item_des` VALUES ('12', '主要职责：', '在静态页面基础上引用插件，使用JQuery完成所有交互效果和AJAX数据读取与展示', '6', null, null);
INSERT INTO `project_item_des` VALUES ('13', '项目描述：', '一个IT领域的教学视频和考证资料的交易平台，功能包括商品发布和买卖，评价系统，咨询系统和贴吧问答系统', '7', null, null);
INSERT INTO `project_item_des` VALUES ('14', '主要职责：', '完成改版的页面结构调整，优化页面样式，使用EL表达式获取后台数据，使用JQuery制作交互效果和异步请求', '7', null, null);
INSERT INTO `project_item_des` VALUES ('15', '项目描述：', '深圳市卖座网公司内部各管理系统，包括财务系统，影院管理系统，运营管理系统，客服系统等。使用Backbone', '8', null, null);
INSERT INTO `project_item_des` VALUES ('16', '主要职责：', '对旧模块的优化和需求变动修改，开发新模块。', '8', null, null);

-- ----------------------------
-- Table structure for `skills_level`
-- ----------------------------
DROP TABLE IF EXISTS `skills_level`;
CREATE TABLE `skills_level` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `isShow` int(11) DEFAULT '0',
  `title` varchar(255) DEFAULT '',
  `img` varchar(255) DEFAULT '',
  `background_img` varchar(255) DEFAULT '',
  `data` varchar(1234) DEFAULT '',
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `version` bigint(11) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`userId`),
  CONSTRAINT `skills_level_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf32;

-- ----------------------------
-- Records of skills_level
-- ----------------------------
INSERT INTO `skills_level` VALUES ('1', '1', '1', '技能自评', '/file/skills_img.png', '/file/bg2.jpg', 'HTML||4@@CSS||4@@JavaScript||4@@Jquery||4@@AJAX||4@@Bootstrap||4@@HTML5||3@@CSS3||3@@Backbone||3@@Grunt||3@@webpack||3@@React||4@@ant-design||3@@LESS||3', '1489743190304', '1489743190304', null, '#ffffff');
INSERT INTO `skills_level` VALUES ('10', '24', '0', '技能自评', '', '', '', '1490275571069', '1490275571069', null, '');
INSERT INTO `skills_level` VALUES ('11', '25', '0', '技能自评', '', '', '', '1490280740966', '1490280740966', null, '');
INSERT INTO `skills_level` VALUES ('12', '26', '0', '技能自评', '', '', '', '1490281002335', '1490281002335', null, '');
INSERT INTO `skills_level` VALUES ('13', '27', '0', '技能自评', '', '', '', '1490282249012', '1490282249012', null, '');
INSERT INTO `skills_level` VALUES ('14', '28', '0', '技能自评', '', '', '', '1490282418156', '1490282418156', null, '');
INSERT INTO `skills_level` VALUES ('15', '29', '0', '技能自评', '', '', '', '1490282610855', '1490282610855', null, '');
INSERT INTO `skills_level` VALUES ('16', '30', '0', '技能自评', '', '', '', '1490282673622', '1490282673622', null, '');
INSERT INTO `skills_level` VALUES ('17', '31', '0', '技能自评', '', '', '', '1490283475514', '1490283475514', null, '');
INSERT INTO `skills_level` VALUES ('18', '33', '0', '技能自评', '', '', '', '1490287397042', '1490287397042', null, '');
INSERT INTO `skills_level` VALUES ('19', '34', '0', '技能自评', '', '', '', '1491040036376', '1491040036376', null, '');
INSERT INTO `skills_level` VALUES ('20', '35', '0', '技能自评', '', '', '', '1491040266241', '1491040266241', null, '');
INSERT INTO `skills_level` VALUES ('21', '36', '0', '技能自评', '', '', '', '1491040361078', '1491040361078', null, '');
INSERT INTO `skills_level` VALUES ('22', '37', '0', '技能自评', '', '', '', '1491381107537', '1491381107537', null, '');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `userName` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `account` varchar(100) NOT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `version` bigint(20) DEFAULT NULL,
  `img` varchar(100) DEFAULT '',
  `introduce` varchar(100) DEFAULT '',
  `background_img` varchar(100) DEFAULT '',
  `weight` bigint(20) NOT NULL DEFAULT '0',
  `color` varchar(255) DEFAULT NULL,
  `lastLoginAt` bigint(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf32;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '魏佳奋', '055d0ea123c9748b52804baef625e8e2', 'weijiafen', '1489743190304', '1491894122254', null, '/file/E8AB32FCAE9C898.jpg', '不想写脚本的切图仔不是好前端', '/file/bg1.jpg', '17', '', '1491903065155', '364886455@qq.com');
INSERT INTO `user` VALUES ('24', '测试号', '055d0ea123c9748b52804baef625e8e2', 'weijiafen2', '1490275571069', '1491031894752', null, 'images/default.jpg', '', '', '2', '', '1491031894752', null);
INSERT INTO `user` VALUES ('25', 'test', '055d0ea123c9748b52804baef625e8e2', 'weijiafen3', '1490280740966', '1491032022863', null, 'images/default.jpg', '', '', '1', '', '1491032022863', null);
INSERT INTO `user` VALUES ('26', 'test', '055d0ea123c9748b52804baef625e8e2', 'weijiafen33', '1490281002335', '1490281002335', null, 'images/default.jpg', '', '', '0', '', '1490940013552', null);
INSERT INTO `user` VALUES ('27', 'Kenken', 'a37ae390aa95cf72b422b2a9bbbcbd6d', '623225956', '1490282249012', '1490282249012', null, 'images/default.jpg', '', '', '0', '', '1490940013552', null);
INSERT INTO `user` VALUES ('28', 'hhhhhh', 'b7e6923f6de66497d51789db0ef3571d', 'hhhhhhhh', '1490282418156', '1490282418156', null, 'images/default.jpg', '', '', '0', '', '1490940013552', null);
INSERT INTO `user` VALUES ('29', 'test', 'e10adc3949ba59abbe56e057f20f883e', '123456', '1490282610855', '1490282610855', null, 'images/default.jpg', '', '', '0', '', '1490940013552', null);
INSERT INTO `user` VALUES ('30', 'xinruzhishui', 'b76bb02b15934ab6f19889bcfec168cc', 'xinruzhishui', '1490282673622', '1490282946221', null, 'images/default.jpg', '', '', '0', '', '1490940013552', null);
INSERT INTO `user` VALUES ('31', 'Ivan', 'e10adc3949ba59abbe56e057f20f883e', 'IvanVatica', '1490283475514', '1490283475514', null, 'images/default.jpg', '', '', '0', '', '1490940013552', null);
INSERT INTO `user` VALUES ('32', 'Ericwyn', '8eeaa80f81e76916249cf941cc1540f4', 'ericwyn', '1490285025447', '1490285025447', null, 'images/default.jpg', '', '', '0', '', '1490940013552', null);
INSERT INTO `user` VALUES ('33', '8888', '34aa560478ec951c43923733012547fa', '88885203', '1490287397042', '1490287397042', null, 'images/default.jpg', '', '', '0', '', '1490940013552', null);
INSERT INTO `user` VALUES ('34', 'weijiafen', '055d0ea123c9748b52804baef625e8e2', 'weijiafen3333', '1491040036376', '1491040036376', null, 'images/default.jpg', '', '', '0', '', '1491040036376', null);
INSERT INTO `user` VALUES ('35', 'w', '055d0ea123c9748b52804baef625e8e2', 'weijiafen222', '1491040266241', '1491545831116', null, 'images/default.jpg', '', '', '1', '', '1491546345457', null);
INSERT INTO `user` VALUES ('36', 'wei', '055d0ea123c9748b52804baef625e8e2', 'weijiafen233', '1491040361078', '1491040361078', null, 'images/default.jpg', '', '', '0', '', '1491040361078', null);
INSERT INTO `user` VALUES ('37', 'weijiafen', '055d0ea123c9748b52804baef625e8e2', 'weijiafen55', '1491381107537', '1491381107537', null, 'images/default.jpg', '', '', '0', '', '1491381107537', '364886455@qq.com');

-- ----------------------------
-- Table structure for `work_exp`
-- ----------------------------
DROP TABLE IF EXISTS `work_exp`;
CREATE TABLE `work_exp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `isShow` int(11) NOT NULL DEFAULT '0',
  `title` varchar(255) DEFAULT '',
  `img` varchar(255) DEFAULT '',
  `background_img` varchar(255) DEFAULT '',
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `work_exp_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf32;

-- ----------------------------
-- Records of work_exp
-- ----------------------------
INSERT INTO `work_exp` VALUES ('1', '1', '1', '工作经历', '', '', '1489743190304', '1489743190304', null);
INSERT INTO `work_exp` VALUES ('8', '24', '0', '工作经历', '', '', '1490275571069', '1490275571069', '');
INSERT INTO `work_exp` VALUES ('9', '25', '0', '工作经历', '', '', '1490280740966', '1490280740966', '');
INSERT INTO `work_exp` VALUES ('10', '26', '0', '工作经历', '', '', '1490281002335', '1490281002335', '');
INSERT INTO `work_exp` VALUES ('11', '27', '0', '工作经历', '', '', '1490282249012', '1490282249012', '');
INSERT INTO `work_exp` VALUES ('12', '28', '0', '工作经历', '', '', '1490282418156', '1490282418156', '');
INSERT INTO `work_exp` VALUES ('13', '29', '0', '工作经历', '', '', '1490282610855', '1490282610855', '');
INSERT INTO `work_exp` VALUES ('14', '30', '0', '工作经历', '', '', '1490282673622', '1490282673622', '');
INSERT INTO `work_exp` VALUES ('15', '31', '0', '工作经历', '', '', '1490283475514', '1490283475514', '');
INSERT INTO `work_exp` VALUES ('16', '33', '0', '工作经历', '', '', '1490287397042', '1490287397042', '');
INSERT INTO `work_exp` VALUES ('17', '34', '0', '工作经历', '', '', '1491040036376', '1491040036376', '');
INSERT INTO `work_exp` VALUES ('18', '35', '0', '工作经历', '', '', '1491040266241', '1491040266241', '');
INSERT INTO `work_exp` VALUES ('19', '36', '0', '工作经历', '', '', '1491040361078', '1491040361078', '');
INSERT INTO `work_exp` VALUES ('20', '37', '0', '工作经历', '', '', '1491381107537', '1491381107537', '');

-- ----------------------------
-- Table structure for `work_item`
-- ----------------------------
DROP TABLE IF EXISTS `work_item`;
CREATE TABLE `work_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemTitle` varchar(255) DEFAULT NULL,
  `itemDate` varchar(255) DEFAULT NULL,
  `itemTxt` varchar(255) DEFAULT NULL,
  `workId` int(11) NOT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `version` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `workId` (`workId`),
  CONSTRAINT `work_item_ibfk_1` FOREIGN KEY (`workId`) REFERENCES `work_exp` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf32;

-- ----------------------------
-- Records of work_item
-- ----------------------------
INSERT INTO `work_item` VALUES ('4', '公司：广州腾科网络股份有限公司', '2015年7月-2015年9月', '工作职责：参与IT易学网的开发，使用EL表达式做页面逻辑判断和数据获取，使用JQuery制作交互和动画效果，发送异步请求并处理异步结果', '1', null, null, null);
INSERT INTO `work_item` VALUES ('5', '公司：深圳一览网络股份有限公司', '2015年12月-2016年7月', '工作职责：参与内部项目“职业经纪人”的开发，企业外包官网模板开发，公司手机端活动页面开发，PC端能够兼容到IE6', '1', null, null, null);
