/**
 * Notes: 内容检测控制器
 * Date: 2021-03-15 19:20:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */
const CateService = require('../service/cate_service.js');
const BaseProjectController = require('./base_project_controller.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class CateController extends BaseProjectController {
	async getAllCateOptions() {
		let service = new CateService();
		return await service.getAllCateOptions();

	}

	async getCateList() {

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

		let service = new CateService();
		let result = await service.getCateList(input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			if (list[k].CATE_OBJ && list[k].CATE_OBJ.content)
				delete list[k].CATE_OBJ.content;
		}

		return result;

	}

	/** 浏览信息 */
	async viewCate() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new CateService();
		let cate = await service.viewCate(input.id);

		if (cate) {
			// 显示转换 
			cate.CATE_ADD_TIME = timeUtil.timestamp2Time(cate.CATE_ADD_TIME, 'Y-M-D');
		}

		return cate;
	}

}

module.exports = CateController;