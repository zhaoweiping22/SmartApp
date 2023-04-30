/**
 * Notes: 填报登记模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-24 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const pageHelper = require('../../../helper/page_helper.js');
const cloudHelper = require('../../../helper/cloud_helper.js');
const projectSetting = require('../public/project_setting.js');

class SheetBiz extends BaseBiz {

	static getCateName(cateId) {
		return BaseBiz.getCateName(cateId, projectSetting.SHEET_CATE);
	}

	static getCateList() {
		return BaseBiz.getCateList(projectSetting.SHEET_CATE);
	}

	static setCateTitle() {
		return BaseBiz.setCateTitle(projectSetting.SHEET_CATE);
	} 

}

module.exports = SheetBiz;