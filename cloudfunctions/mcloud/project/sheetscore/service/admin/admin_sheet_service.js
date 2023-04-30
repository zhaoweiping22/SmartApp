/**
 * Notes: 数据表格后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2023-02-23 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const SheetService = require('../sheet_service.js');
const AdminHomeService = require('../admin/admin_home_service.js');
const util = require('../../../../framework/utils/util.js');
const SheetModel = require('../../model/sheet_model.js');
const SheetDataModel = require('../../model/sheet_data_model.js');
const cloudBase = require('../../../../framework/cloud/cloud_base.js');
const cloudUtil = require('../../../../framework/cloud/cloud_util.js');
const timeUtil = require('../../../../framework/utils/time_util.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const exportUtil = require('../../../../framework/utils/export_util.js');

// 导出数据KEY
const EXPORT_SHEET_DATA_KEY = 'EXPORT_SHEET_DATA';

class AdminSheetService extends BaseProjectAdminService {



	// 查询条件格式化 去空格
	fmtQuery(query) {
		if (!query || query.constructor != String) return '';
		query = query.trim();

		let arr = query.split('+');
		let newArr = [];
		for (let k = 0; k < arr.length; k++) {
			arr[k] = arr[k].trim();
			if (arr[k].length > 0) newArr.push(arr[k]);
		}
		return newArr.join('+');
	}

	// 查询条件校验
	checkQuery(fields, queries) {
		let titles = dataUtil.getArrByKey(fields, 'title');

		let queryArr = this.fmtQuery(queries).split('+');

		for (let n = 0; n < queryArr.length; n++) {
			if (!titles.includes(queryArr[n])) {
				this.AppError('查询条件中的 【' + queryArr[n] + '】 必须填写数据列中的条目');
			}
		}

	}

	/**取得分页列表 */
	async getAdminSheetList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'SHEET_ORDER': 'asc',
			'SHEET_ADD_TIME': 'desc'
		};
		let fields = 'SHEET_TITLE,SHEET_CATE_ID,SHEET_CATE_NAME,SHEET_EDIT_TIME,SHEET_ADD_TIME,SHEET_ORDER,SHEET_STATUS,SHEET_VOUCH,SHEET_DATA_CNT,SHEET_QR,SHEET_OBJ,SHEET_FORMS';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [{
				SHEET_TITLE: ['like', search]
			},];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.SHEET_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.SHEET_STATUS = Number(sortVal);
					break;
				}
				case 'vouch': {
					where.and.SHEET_VOUCH = 1;
					break;
				}
				case 'top': {
					where.and.SHEET_ORDER = 0;
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'SHEET_ADD_TIME');
					break;
				}
			}
		}

		return await SheetModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	/**置顶与排序设定 */
	async sortSheet(id, sort) {
		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**首页设定 */
	async vouchSheet(id, vouch) {
		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**添加 */
	async insertSheet({
		title,
		cateId,
		cateName,

		order,
		forms,
		userMustFields
	}) {

		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**删除数据 */
	async delSheet(id) {
		let where = {
			_id: id
		}

		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**获取信息 */
	async getSheetDetail(id) {
		let fields = '*';

		let where = {
			_id: id
		}

		let sheet = await SheetModel.getOne(where, fields);
		if (!sheet) return null;

		return sheet;
	}

	// 更新forms信息
	async updateSheetForms({
		id,
		hasImageForms
	}) {
		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**更新数据 */
	async editSheet({
		id,
		title,
		cateId, // 二级分类 
		cateName,

		order,
		forms
	}) {

		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');


	}

	/**修改状态 */
	async statusSheet(id, status) {
		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	//#############################
	async statSheetData(sheetId) {
		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**表格数据分页列表 */
	async getSheetDataList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		sheetId,
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'SHEET_DATA_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {
			SHEET_DATA_SHEET_ID: sheetId
		};
		if (util.isDefined(search) && search) {
			where['SHEET_DATA_FORMS.val'] = {
				$regex: '.*' + search,
				$options: 'i'
			};
		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'status':
					where.SHEET_DATA_STATUS = Number(sortVal);
					break;
			}
		}

		return await SheetDataModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}


	/** 清空数据 */
	async clearSheetAll(sheetId) {
		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}


	/** 删除单个记录 */
	async delSheetData(sheetId, sheetDataId) {

		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	// 添加单个记录
	async insertSheetData(sheetId, {
		forms
	}) {

		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	// 更新单个数据
	async editSheetData(sheetDataId, {
		forms,
	}) {
		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}


	// #####################导出
	/**获取表格数据 */
	async getSheetExcel() {
		return await exportUtil.getExportDataURL(EXPORT_SHEET_DATA_KEY);
	}

	/**删除表格数据 */
	async delSheetExcel() {
		return await exportUtil.deleteDataExcel(EXPORT_SHEET_DATA_KEY);
	}



	/**导出表格数据 type=data/temp */
	async exportSheetExcel({ sheetId, type = 'data' }) {
		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	//################### import
	// 导入数据
	async importSheetExcel(sheetId, cloudId, isClearOld = false) {

		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	//##################表单数据处理


}

module.exports = AdminSheetService;