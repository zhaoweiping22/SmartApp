/**
 * Notes:企业
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2023-11-04 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class CateModel extends BaseProjectModel {

}

// 集合名
CateModel.CL = BaseProjectModel.C('cate');

CateModel.DB_STRUCTURE = {
	_pid: 'string|true',
	CATE_ID: 'string|true',


	CATE_TITLE: 'string|false|comment=标题',
	CATE_STATUS: 'int|true|default=1|comment=状态 0/1',

	CATE_CNT: 'int|true|default=0',

	CATE_FORMS: 'array|true|default=[]',
	CATE_OBJ: 'object|true|default={}',


	CATE_ORDER: 'int|true|default=9999',
	CATE_VOUCH: 'int|true|default=0',

	CATE_QR: 'string|false',

	CATE_ADD_TIME: 'int|true',
	CATE_EDIT_TIME: 'int|true',
	CATE_ADD_IP: 'string|false',
	CATE_EDIT_IP: 'string|false',
};

// 字段前缀
CateModel.FIELD_PREFIX = "CATE_";


module.exports = CateModel;