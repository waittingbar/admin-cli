/*
 Navicat Premium Data Transfer

 Source Server         : 本机mysql
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : eggdb

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 30/12/2019 15:46:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '外键Id',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `url` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `uid`(`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2330 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'm003', '后台', '/admin');
INSERT INTO `category` VALUES (2, 'm001', '菜单', '/category');
INSERT INTO `category` VALUES (3, 'm002', '新闻', '/list');
INSERT INTO `category` VALUES (2329, 'mi0lxu', '直播中心', '/zhibo');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `url` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `title` char(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT NULL,
  `summary` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 47 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES (1, 'http://www.baidu.com', '百度，世界第一搜索引擎', '2019-12-01 13:46:50', '搜索引擎');
INSERT INTO `news` VALUES (2, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9826978962459463664%22%7D&n_type=0&p_from=1', '继FPX外卖官宣VG选择了视频官宣，VG.Iboy正式连接', '2019-12-02 13:47:06', 'LOL');
INSERT INTO `news` VALUES (3, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9554563102507619030%22%7D&n_type=0&p_from=1', '爆料：小米MIX 4或1月10日发布 搭载屏下摄像头', '2019-12-06 09:47:19', '智能手机');
INSERT INTO `news` VALUES (4, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9918641759388266612%22%7D&n_type=0&p_from=1', '“国产货”大降价，日本又改主意了', '2019-12-04 13:47:29', '政治');
INSERT INTO `news` VALUES (6, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9758355113093892640%22%7D&n_type=0&p_from=1', 'LV英雄联盟联名系列一小时售空，包括3050美元手表\r\nLV英雄联盟联名系列一小时售空，包括3050美元手表', '2019-12-11 09:15:34', 'LOL');
INSERT INTO `news` VALUES (15, 'http://www.baidu.com', '中国百度，世界第一搜索引擎，交钱上位，天经地义。', '2019-12-01 13:46:50', '1234');
INSERT INTO `news` VALUES (16, 'https://www.w3school.com.cn/sql/func_date_format.asp', 'MySQL DATE_FORMAT() 函数', '2019-12-11 14:31:53', '时间格式化');
INSERT INTO `news` VALUES (17, 'https://www.baidu.com/s?cl=3&tn=baidutop10&fr=top1000&wd=%E5%B0%8F%E7%B1%B3%E6%AD%A3%E5%BC%8F%E8%BF%9B%E5%85%A5%E6%97%A5%E6%9C%AC&rsv_idx=2&rsv_dl=fyb_n_homepage&hisfilter=1', '小米正式进入日本', '2019-12-12 08:37:39', '小米');
INSERT INTO `news` VALUES (34, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9670618642097294468%22%7D&n_type=0&p_from=1', '竞选最后一天 约翰逊给选民送牛奶', '2019-12-13 00:00:00', '政治');
INSERT INTO `news` VALUES (35, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9824191292560755909%22%7D&n_type=0&p_from=1', '支持AI人形侦测 小米看家神器开启众筹', '2019-12-13 00:00:00', '小米');
INSERT INTO `news` VALUES (36, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9158316235778535571%22%7D&n_type=0&p_from=1', '我国首颗5G卫星出厂，本月底将发射升空，有何亮点？', '2019-12-12 00:00:00', '5G');
INSERT INTO `news` VALUES (37, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9311881885243715806%22%7D&n_type=0&p_from=1', '车载无线充时代到来，随放随充，无“线”可能', '2019-12-13 00:00:00', '充电');
INSERT INTO `news` VALUES (38, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9268236057999869657%22%7D&n_type=0&p_from=1', '灭霸作者回应特朗普变灭霸，直接开怼：觉得自己受到冒犯', '2019-12-13 00:00:00', '灭霸');
INSERT INTO `news` VALUES (39, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9775721448387589500%22%7D&n_type=0&p_from=1', '报告：今年求职者月入中位数6043元，35岁以上求职扩大', '2019-12-13 00:00:00', '报告');
INSERT INTO `news` VALUES (40, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9544187492239532999%22%7D&n_type=0&p_from=1', '和平方舟：舰行万里 守卫和平', '2019-12-12 13:42:18', '方舟');
INSERT INTO `news` VALUES (41, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9202041665780902982%22%7D&n_type=0&p_from=1', '袁隆平又上热搜！网友却有点担心……', '2019-12-12 13:44:36', NULL);
INSERT INTO `news` VALUES (42, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9677076439096921668%22%7D&n_type=0&p_from=1', '创新设计迷你高效 富士通fi-800R扫描仪评测', '2019-12-12 13:45:07', NULL);
INSERT INTO `news` VALUES (43, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9811719179852842855%22%7D&n_type=0&p_from=1', '10nm+++ 英特尔发布制造工艺路线图', '2019-12-12 13:45:27', NULL);
INSERT INTO `news` VALUES (44, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_10340405061066773369%22%7D&n_type=0&p_from=1', '花式拉选票！英首相开推土机推倒“脱欧僵局”', '2019-12-12 13:45:50', NULL);
INSERT INTO `news` VALUES (45, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9347021155983556282%22%7D&n_type=0&p_from=1', ' 2019 他们在世界各地守护祖国', '2019-12-12 13:46:20', NULL);
INSERT INTO `news` VALUES (46, 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9635305867732499265%22%7D&n_type=0&p_from=1', '创新科技点亮智慧澳门', '2019-12-12 13:47:08', NULL);

-- ----------------------------
-- Table structure for product_brand
-- ----------------------------
DROP TABLE IF EXISTS `product_brand`;
CREATE TABLE `product_brand`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '品牌code',
  `brand_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '品牌名字',
  `brand_manufacturer_Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '品牌关联厂家Id',
  `create_time` timestamp(0) NULL DEFAULT NULL COMMENT '创建时间',
  `brand_manufacturer_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_brand
-- ----------------------------
INSERT INTO `product_brand` VALUES (1, 'b2019-2aoy5o', '123', 'm7itai6', '2019-12-27 00:00:00', NULL);

-- ----------------------------
-- Table structure for product_manufactor
-- ----------------------------
DROP TABLE IF EXISTS `product_manufactor`;
CREATE TABLE `product_manufactor`  (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `manufactor_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '厂家code',
  `manufactor_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '厂家名称',
  `manufactor_addr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '厂家地址',
  `manufactor_brands` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '厂家品牌集合',
  `create_time` timestamp(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_manufactor
-- ----------------------------
INSERT INTO `product_manufactor` VALUES (1, 'm7itai6', '双汇', '重庆南岸区', NULL, NULL);
INSERT INTO `product_manufactor` VALUES (2, 'm2019-7meqn4', '双枪', '重庆市渝北区', NULL, '2019-12-27 00:00:00');

-- ----------------------------
-- Table structure for zhibo
-- ----------------------------
DROP TABLE IF EXISTS `zhibo`;
CREATE TABLE `zhibo`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `time` timestamp(0) NULL DEFAULT NULL,
  `status` int(10) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of zhibo
-- ----------------------------
INSERT INTO `zhibo` VALUES (1, '霸哥直播', 'http://al.flv.huya.com/backsrc/1443899946-1443899946-6201503046766166016-3572838-10057-A-0-1.flv', '2019-12-16 12:05:38', NULL);
INSERT INTO `zhibo` VALUES (2, 'LOL世界赛直播', 'http://al.flv.huya.com/backsrc/78941969-2559461593-10992803837303062528-2693342886-10057-A-0-1.flv?wsSecret=a717dd615e36e861b4534cbaa1c1b182&wsTime=5df99c6c&fs=bgct&&sphdcdn=al_7-tx_3-js_3-ws_7-bd_2-hw_2&sphdDC=huya&sphd=264_*', '2019-12-17 12:05:44', NULL);
INSERT INTO `zhibo` VALUES (6, '青蛙直播', 'http://aldirect.flv.huya.com/backsrc/96188431-2692759886-11565315646350688256-2607602842-10057-A-0-1.flv', '2019-12-17 16:57:27', NULL);
INSERT INTO `zhibo` VALUES (7, '小马', 'rtmp://al.flv.huya.com/backsrc/1447988558-1447988558-6219063501592199168-2862068398-10057-A-0-1', '2019-12-17 17:30:20', 1);
INSERT INTO `zhibo` VALUES (8, '胖扎', 'http://aldirect.flv.huya.com/backsrc/96188431-2692759886-11565315646350688256-2607602842-10057-A-0-1.flv', '2019-12-26 15:51:09', 1);

SET FOREIGN_KEY_CHECKS = 1;
