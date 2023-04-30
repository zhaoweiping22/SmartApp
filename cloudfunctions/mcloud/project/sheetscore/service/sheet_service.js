/**
 * Notes: 表格模块业务逻辑
 * Ver : CCMiniCloud Framework 3.2.11 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-07-04 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');
const dataUtil = require('../../../framework/utils/data_util.js');
const cloudBase = require('../../../framework/cloud/cloud_base.js');
const SheetModel = require('../model/sheet_model.js');
const UserModel = require('../model/user_model.js');
const SheetDataModel = require('../model/sheet_data_model.js');

class SheetService extends BaseProjectService {


	/** 浏览信息 */
	async viewSheet(id) {

		let fields = '*';

		let where = {
			_id: id,
			SHEET_STATUS: SheetModel.STATUS.COMM
		}
		let sheet = await SheetModel.getOne(where, fields);
		if (!sheet) return null;

		SheetModel.inc(id, 'SHEET_VIEW_CNT', 1);



		return sheet;
	}


	/** 取得分页列表 */
	async getSheetList({
		cateId, //分类查询条件
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'SHEET_ORDER': 'asc',
			'SHEET_ADD_TIME': 'desc'
		};
		let fields = 'SHEET_QR,SHEET_ADD_TIME,SHEET_OBJ,SHEET_VIEW_CNT,SHEET_TITLE,SHEET_ORDER,SHEET_STATUS,SHEET_CATE_NAME';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};
		if (cateId && cateId !== '0') where.and.SHEET_CATE_ID = cateId;

		where.and.SHEET_STATUS = SheetModel.STATUS.COMM; // 状态   

		if (util.isDefined(search) && search) {
			where.or = [{
				SHEET_TITLE: ['like', search]
			},];
		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					if (sortVal) where.and.SHEET_CATE_ID = String(sortVal);
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

	// 查询
	async querySheetData(sheetId, queryArr) {
		this.AppError('[成绩]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}


}

module.exports = SheetService;