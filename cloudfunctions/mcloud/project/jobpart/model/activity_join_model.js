/**
 * Notes: 职位申请实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-07-01 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class ActivityJoinModel extends BaseProjectModel {

}

// 集合名
ActivityJoinModel.CL = BaseProjectModel.C('activity_join');

ActivityJoinModel.DB_STRUCTURE = {
	_pid: 'string|true',
	ACTIVITY_JOIN_ID: 'string|true',
	ACTIVITY_JOIN_ACTIVITY_ID: 'string|true|comment=申请PK',

	ACTIVITY_JOIN_ACTIVITY_TITLE: 'string|false|comment=职位标题冗余',
	ACTIVITY_JOIN_ACTIVITY_CATE_NAME: 'string|false|comment=企业冗余', 


	ACTIVITY_JOIN_USER_ID: 'string|true|comment=用户ID',


	ACTIVITY_JOIN_FORMS: 'array|true|default=[]|comment=表单',
	ACTIVITY_JOIN_OBJ: 'object|true|default={}',

	ACTIVITY_JOIN_STATUS: 'int|true|default=1|comment=状态  0=待审核 1=已录用, 99=未录用',
	ACTIVITY_JOIN_REASON: 'string|false|comment=审核拒绝或者取消理由',

	ACTIVITY_JOIN_ADD_TIME: 'int|true',
	ACTIVITY_JOIN_EDIT_TIME: 'int|true',
	ACTIVITY_JOIN_ADD_IP: 'string|false',
	ACTIVITY_JOIN_EDIT_IP: 'string|false',
};

// 字段前缀
ActivityJoinModel.FIELD_PREFIX = "ACTIVITY_JOIN_";

/**
 * 状态 0=待审核 1=已录用, 99=未录用
 */
ActivityJoinModel.STATUS = {
	WAIT: 0,
	SUCC: 1,
	ADMIN_CANCEL: 99
};

ActivityJoinModel.STATUS_DESC = {
	WAIT: '待审核',
	SUCC: '已录用',
	ADMIN_CANCEL: '未录用'
};


module.exports = ActivityJoinModel;