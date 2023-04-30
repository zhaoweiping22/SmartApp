/**
 * Notes:表格模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2023-03-12 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const SheetService = require('../service/sheet_service.js');
const contentCheck = require('../../../framework/validate/content_check.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class SheetController extends BaseProjectController {

	async querySheetData() {
		// 数据校验
		let rules = {
			sheetId: 'must|id',
			queryArr: 'must|array',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new SheetService();
		return await service.querySheetData(input.sheetId, input.queryArr);
	}


	/** 浏览详细 */
	async viewSheet() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new SheetService();
		return await service.viewSheet(input.id);
	}

	async getSheetDetail() {

		// 数据校验 
		let rules = {
			id: 'id|must',
		};

		// 取得数据
		let input = this.validateData(rules);


		let service = new SheetService();
		let result = await service.getSheetDetail(this._userId, input.id);

		if (result) {
			result.SHEET_ADD_TIME = timeUtil.timestamp2Time(result.SHEET_ADD_TIME, 'Y-M-D h:m');
		}

		return result;

	} 


	async getSheetList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new SheetService();
		let result = await service.getSheetList(input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].SHEET_ADD_TIME = timeUtil.timestamp2Time(list[k].SHEET_ADD_TIME, 'Y-M-D h:m');
		}

		result.list = list;

		return result;

	}

}

module.exports = SheetController;