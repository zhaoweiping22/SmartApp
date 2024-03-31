const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const AdminActivityBiz = require('../../../../biz/admin_activity_biz.js'); 
const validate = require('../../../../../../helper/validate.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
const projectSetting = require('../../../../public/project_setting.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		wx.setNavigationBarTitle({
			title: projectSetting.ACTIVITY_NAME + '-添加',
		});

		this.setData(AdminActivityBiz.initFormData());
		this.setData({
			isLoad: true
		});
	},


	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () { },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () { },

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () { },

	url: function (e) {
		pageHelper.url(e, this);
	},
	switchModel: function (e) {
		pageHelper.switchModel(this, e);
	},

	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let data = this.data;
		data = validate.check(data, AdminActivityBiz.CHECK_FORM, this);
		if (!data) return; 
	 

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;
 
		try {

			// 创建
			let result = await cloudHelper.callCloudSumbit('admin/activity_insert', data);
			let activityId = result.data.id;

			// 图片
			await cloudHelper.transFormsTempPics(forms, 'activity/', activityId, 'admin/activity_update_forms');

			let callback = async function () {
				PublicBiz.removeCacheList('admin-activity-list');
				PublicBiz.removeCacheList('activity-list');
				wx.navigateBack();

			}
			pageHelper.showSuccToast('添加成功', 2000, callback);

		} catch (err) {
			console.log(err);
		}
	},

	bindJoinFormsCmpt: function (e) {
		this.setData({
			formJoinForms: e.detail,
		});
	},

	bindMapTap: function (e) {
		AdminActivityBiz.selectLocation(this);
	},

	bindSelectCompanyTap: function (e) {
		let itemList = ['选择企业', '无需指定企业'];
		wx.showActionSheet({
			itemList,
			success: async res => {
				switch (res.tapIndex) {
					case 0: {
						wx.navigateTo({
							url: '../../cate/list/admin_cate_list?company=company',
						});
						break;
					}
					case 1: {
						this.setData({formCateId:'',formCateName:''});
						break;
					} 
				}
			},
			fail: function (err) { }
		})
	},
})