/**
 * Notes: 分类管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2023-11-20 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const CateModel = require('../model/cate_model.js');
const util = require('../../../framework/utils/util.js');

class CateService extends BaseProjectService {

	async getAllCateOptions(status = 1) {
		let cateList = await CateModel.getAll({ CATE_STATUS: status }, '*', { 'CATE_ORDER': 'asc', 'CATE_ADD_TIME': 'desc' });

		let arr = [];
		for (let k in cateList) {
			let cateId = cateList[k]._id;

			let cateNode = {
				level: 1,
				label: cateList[k].CATE_TITLE,
				val: cateId,
				order: cateList[k].CATE_ORDER,
				obj: cateList[k].CATE_OBJ,
				parentId: ''
			}

			arr.push(cateNode);
		}

		return arr;
	}


	async getCateList({
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
			'CATE_ORDER': 'asc',
			'CATE_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		where.and.CATE_STATUS = 1; // 状态  


		if (util.isDefined(search) && search) {
			where.or = [
				{ CATE_TITLE: ['like', search] },
			];
		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'sort': {
					// 排序
					orderBy = this.fmtOrderBySort(sortVal, 'CATE_ADD_TIME');
					break;
				}
				case 'trade': {
					where.and['CATE_OBJ.trade'] = sortVal;
					break;
				}
				case 'size': {
					where.and['CATE_OBJ.size'] = sortVal;
					break;
				}
				case 'type': {
					where.and['CATE_OBJ.type'] = sortVal;
					break;
				}
				case 'star': {
					where.and['CATE_OBJ.star'] = sortVal;
					break;
				}
			}
		}

		return await CateModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	async viewCate(id) {

		let fields = '*';

		let where = {
			_id: id,
			CATE_STATUS: 1
		}
		let cate = await CateModel.getOne(where, fields);
		if (!cate) return null;

		return cate;
	}
}

module.exports = CateService;