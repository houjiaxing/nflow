/*
Navicat MySQL Data Transfer

Source Server         : 测试库
Source Server Version : 50556
Source Host           : t.lukex.cc:3306
Source Database       : workflow

Target Server Type    : MYSQL
Target Server Version : 50556
File Encoding         : 65001

Date: 2018-01-08 10:54:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for history_status
-- ----------------------------
DROP TABLE IF EXISTS `history_status`;
CREATE TABLE `history_status` (
  `uid` int(11) NOT NULL,
  `sub_project` int(11) DEFAULT NULL,
  `new_state` int(11) DEFAULT NULL,
  `last_state` int(11) DEFAULT NULL,
  `time` datetime NOT NULL,
  `is_block` int(11) DEFAULT NULL,
  `block_message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of history_status
-- ----------------------------

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `uid` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------

-- ----------------------------
-- Table structure for status_collections
-- ----------------------------
DROP TABLE IF EXISTS `status_collections`;
CREATE TABLE `status_collections` (
  `uid` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of status_collections
-- ----------------------------

-- ----------------------------
-- Table structure for sub_project
-- ----------------------------
DROP TABLE IF EXISTS `sub_project`;
CREATE TABLE `sub_project` (
  `uid` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `current_state` int(255) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `state_set` text NOT NULL,
  `update_time` datetime DEFAULT NULL,
  `parentProject` int(11) DEFAULT NULL,
  `is_block` int(11) DEFAULT NULL,
  `block_message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sub_project
-- ----------------------------
