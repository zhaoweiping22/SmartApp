/**
 * Notes: 数据表格实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2023-02-26 19:20:00 
 */

const BaseProjectModel = require('./base_project_model.js');

class SheetModel extends BaseProjectModel {

}

// 集合名
SheetModel.CL = BaseProjectModel.C('sheet');

SheetModel.DB_STRUCTURE = {
	_pid: 'string|true',
	SHEET_ID: 'string|true',

	SHEET_TITLE: 'string|true|comment=标题',
	SHEET_STATUS: 'int|true|default=1|comment=状态 0=未启用,1=使用中',

	SHEET_CATE_ID: 'string|true|default=0|comment=分类',
	SHEET_CATE_NAME: 'string|false|comment=分类冗余',

	SHEET_ORDER: 'int|true|default=9999',
	SHEET_VOUCH: 'int|true|default=0',

	SHEET_FORMS: 'array|true|default=[]',
	SHEET_OBJ: 'object|true|default={}',
 
	SHEET_QR: 'string|false',
	SHEET_VIEW_CNT: 'int|true|default=0',
	SHEET_DATA_CNT: 'int|true|default=0',

	SHEET_ADD_TIME: 'int|true',
	SHEET_EDIT_TIME: 'int|true',
	SHEET_ADD_IP: 'string|false',
	SHEET_EDIT_IP: 'string|false',
};

// 字段前缀
SheetModel.FIELD_PREFIX = "SHEET_";

/**
 * 状态 0=未启用,1=使用中 
 */
SheetModel.STATUS = {
	UNUSE: 0,
	COMM: 1
};



module.exports = SheetModel;