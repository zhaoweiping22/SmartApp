/**
 * Notes: 数据表格模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2023-02-23 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const AdminSheetService = require('../../service/admin/admin_sheet_service.js');
const SheetService = require('../../service/sheet_service.js');
const timeUtil = require('../../../../framework/utils/time_util.js');
const contentCheck = require('../../../../framework/validate/content_check.js');
const SheetModel = require('../../model/sheet_model.js');

class AdminSheetController extends BaseProjectAdminController {

	/** 置顶与排序设定 */
	async sortSheet() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			sort: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminSheetService();
		await service.sortSheet(input.id, input.sort);
	}

	/** 首页设定 */
	async vouchSheet() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			vouch: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminSheetService();
		await service.vouchSheet(input.id, input.vouch);
	}

	/** 状态修改 */
	async statusSheet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminSheetService();
		return await service.statusSheet(input.id, input.status);
	}

	/** 列表 */
	async getAdminSheetList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let adminService = new AdminSheetService();
		let result = await adminService.getAdminSheetList(input);

		let service = new SheetService();

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {

			list[k].SHEET_ADD_TIME = timeUtil.timestamp2Time(list[k].SHEET_ADD_TIME, 'Y-M-D h:m:s');


		}
		result.list = list;

		return result;

	}

	/** 发布 */
	async insertSheet() {
		await this.isAdmin();

		// 数据校验 
		let rules = {
			title: 'must|string|min:2|max:50|name=标题',
			cateId: 'must|string|name=分类',
			cateName: 'must|string|name=分类名称',
			order: 'must|int|min:0|max:9999|name=排序号',
			forms: 'array|name=表单',
			userMustFields: 'array|name=必须注册项'
		};


		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminSheetService();
		let result = await service.insertSheet(input);

		this.logOther('添加了《' + input.title + '》');

		return result;

	}

	/** 获取信息用于编辑修改 */
	async getSheetDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminSheetService();
		let sheet = await service.getSheetDetail(input.id);
		if (sheet) {

		}

		return sheet;

	}

	/** 编辑 */
	async editSheet() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			title: 'must|string|min:2|max:50|name=标题',
			cateId: 'must|string|name=分类',
			cateName: 'must|string|name=分类名称',

			order: 'must|int|min:0|max:9999|name=排序号',
			forms: 'array|name=表单',
			userMustFields: 'array|name=必须数据列'
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminSheetService();
		let result = service.editSheet(input);

		this.logOther('修改了《' + input.title + '》');

		return result;
	}

	async clearSheetAll() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminSheetService();
		return await service.clearSheetAll(input.id);
	}

	/** 删除 */
	async delSheet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let title = await SheetModel.getOneField(input.id, 'SHEET_TITLE');

		let service = new AdminSheetService();
		await service.delSheet(input.id);

		if (title)
			this.logOther('删除了《' + title + '》');

	}

	/** 更新图片信息 */
	async updateSheetForms() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			hasImageForms: 'array'
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminSheetService();
		return await service.updateSheetForms(input);
	}

	//########################## 数据
	/** 数据列表 */
	async getSheetDataList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			sheetId: 'must|id',
			page: 'must|int|default=1',
			size: 'int|default=10',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminSheetService();
		let result = await service.getSheetDataList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].SHEET_DATA_ADD_TIME = timeUtil.timestamp2Time(list[k].SHEET_DATA_ADD_TIME);

		}
		result.list = list;

		return result;

	}


	/** 删除单个 */
	async delSheetData() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			sheetId: 'must|id',
			sheetDataId: 'must|id'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminSheetService();
		return await service.delSheetData(input.sheetId, input.sheetDataId);
	}


	async editSheetData() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			sheetDataId: 'must|id',
			forms: 'must|array'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminSheetService();
		return await service.editSheetData(input.sheetDataId, input);
	}

	async insertSheetData() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			sheetId: 'must|id',
			forms: 'must|array'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminSheetService();
		return await service.insertSheetData(input.sheetId, input);
	}


	// 导入
	async importSheetExcel() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			sheetId: 'id|must',
			cloudId: 'must|string|min:5|max:500|name=cloudId',
			clear: 'bool|must',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminSheetService();
		return await service.importSheetExcel(input.sheetId, input.cloudId, input.clear);

	}


	/**************表格数据导出 BEGIN ********************* */
	/** 当前是否有导出文件生成 */
	async getSheetExcel() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			isDel: 'int|must', //是否删除已有记录
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminSheetService();

		if (input.isDel === 1)
			await service.delSheetExcel(); //先删除

		return await service.getSheetExcel();
	}

	/** 导出数据 */
	async exportSheetExcel() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			sheetId: 'id|must',
			type: 'string'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminSheetService();
		return await service.exportSheetExcel(input);
	}

	/** 删除导出的数据文件 */
	async delSheetExcel() {
		await this.isAdmin();

		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminSheetService();
		return await service.delSheetExcel();
	}

}

module.exports = AdminSheetController;