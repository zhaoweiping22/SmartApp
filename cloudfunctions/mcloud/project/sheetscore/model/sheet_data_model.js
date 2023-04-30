/**
 * Notes: 数据表格记录实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2023-02-04 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class SheetDataModel extends BaseProjectModel {

}

// 集合名
SheetDataModel.CL = BaseProjectModel.C('sheet_data');

SheetDataModel.DB_STRUCTURE = {
	_pid: 'string|true',
	SHEET_DATA_ID: 'string|true',
	SHEET_DATA_SHEET_ID: 'string|true|comment=FK',
	SHEET_DATA_SHEET_TITLE: 'string|false',

	SHEET_DATA_FORMS: 'array|true|default=[]', 

	SHEET_DATA_ADD_TIME: 'int|true',
	SHEET_DATA_EDIT_TIME: 'int|true',
	SHEET_DATA_ADD_IP: 'string|false',
	SHEET_DATA_EDIT_IP: 'string|false',
};

// 字段前缀
SheetDataModel.FIELD_PREFIX = "SHEET_DATA_";


module.exports = SheetDataModel;