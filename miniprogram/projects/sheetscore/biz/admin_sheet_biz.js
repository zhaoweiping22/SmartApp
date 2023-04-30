/**
 * Notes: 登记模块后台管理模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-24 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const SheetBiz = require('./sheet_biz.js');
const projectSetting = require('../public/project_setting.js');
const pageHelper = require('../../../helper/page_helper.js');
const cloudHelper = require('../../../helper/cloud_helper.js');

class AdminSheetBiz extends BaseBiz {
	static initFormData(id = '') {
		let cateIdOptions = SheetBiz.getCateList();

		return {
			id,

			cateIdOptions,
			fields: projectSetting.SHEET_FIELDS,

			formTitle: '',
			formCateId: (cateIdOptions.length == 1) ? cateIdOptions[0].val : '',
			formOrder: 9999,

			formForms: []
		}

	}


	static bindSheetDataBlur(e, that) {
		let idx = pageHelper.dataset(e, 'idx');
		let val = e.detail.value.trim();
		that.data.forms[idx].val = val;
	}

	static async loadSheetDetail(that) {

		let id = that.data.id;
		if (!id) return;

		let params = {
			id
		};
		let opt = {
			title: 'bar'
		};
		let sheet = await cloudHelper.callCloudData('admin/sheet_detail', params, opt);
		if (!sheet) {
			that.setData({ isLoad: null });
			return;
		};

		that.setData({
			isLoad: true,
			sheet
		});
	}
}

AdminSheetBiz.CHECK_FORM = {
	title: 'formTitle|must|string|min:2|max:50|name=标题',
	cateId: 'formCateId|must|id|name=分类',
	order: 'formOrder|must|int|min:0|max:9999|name=排序号',
	forms: 'formForms|array',
};

module.exports = AdminSheetBiz;