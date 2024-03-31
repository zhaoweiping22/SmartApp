/**
 * Notes: 职位后台管理模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-24 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const ActivityBiz = require('./activity_biz.js');
const projectSetting = require('../public/project_setting.js');
const formSetHelper = require('../../../cmpts/public/form/form_set_helper.js');
const timeHelper = require('../../../helper/time_helper.js');

class AdminActivityBiz extends BaseBiz {
	static initFormData(id = '') {

		return {
			id,

			fields: projectSetting.ACTIVITY_FIELDS,

			formTitle: '',
			formCateId: '',
			formCateName: '',
			formOrder: 9999,

			formMaxCnt: 50,
			formStart: timeHelper.time('Y-M-D h:m:s'),
			formEnd: '',

			formAddress: '',
			formAddressGeo: {
				address: '',
				latitude: 0,
				longitude: 0,
				name: ''
			},

			formCheckSet: 0,
			formCancelSet: 1,

			formForms: [],

			formJoinForms: formSetHelper.initFields(projectSetting.ACTIVITY_JOIN_FIELDS),
		}

	}

	static selectLocation(that) {
		let callback = function (res) {
			if (!res || !res.name || !res.address || !res.latitude || !res.longitude)
				return;

			let formAddress = res.address + '  ' + res.name;

			let formAddressGeo = {};
			formAddressGeo.name = res.name;
			formAddressGeo.address = res.address;
			formAddressGeo.latitude = res.latitude;
			formAddressGeo.longitude = res.longitude;
			that.setData({
				formAddressGeo,
				formAddress
			});
		}
		if (that.data.formAddressGeo && that.data.formAddressGeo.latitude > 0) {
			wx.chooseLocation({
				latitude: that.data.formAddressGeo.latitude,
				longitude: that.data.formAddressGeo.longitude,
				success: function (res) {
					callback(res);
				}
			})
		} else {
			wx.chooseLocation({
				success: function (res) {
					callback(res);
				},
				fail: function (err) {
					console.log(err);
				}
			})
		}
	}
}

AdminActivityBiz.CHECK_FORM = {
	title: 'formTitle|must|string|min:2|max:50|name=职位名称',
	cateId: 'formCateId|id|name=企业',
	cateName: 'formCateName|string|name=企业',
	order: 'formOrder|must|int|min:0|max:9999|name=排序号',

	maxCnt: 'formMaxCnt|must|int|name=人数上限',
	start: 'formStart|must|string|name=申请开始时间',
	end: 'formEnd|must|string|name=申请截止时间',

	address: 'formAddress|must|string|name=工作地点',
	addressGeo: 'formAddressGeo|must|object|name=工作地点GEO',

	checkSet: 'formCheckSet|must|int|name=审核设置',
	cancelSet: 'formCancelSet|must|int|name=取消设置',
	forms: 'formForms|array',
	joinForms: 'formJoinForms|array|name=用户申请资料设置',
};

module.exports = AdminActivityBiz;