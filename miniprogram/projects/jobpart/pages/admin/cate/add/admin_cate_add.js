const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
const AdminCateBiz = require('../../../../biz/admin_cate_biz.js'); 

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
 
		this.setData(await AdminCateBiz.initCateFormData()); // 初始化表单数据
		this.setData({
			isLoad: true
		}); 

	},  
 
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	model: function (e) {
		pageHelper.model(this, e);
	}, 
 

	/** 
	 * 数据提交
	 */
	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let data = this.data;
		data = validate.check(data, AdminCateBiz.CATE_CHECK_FORM, this);
		if (!data) return; 

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;
 

		try { 
 

			// 先创建，再上传 
			let result = await cloudHelper.callCloudSumbit('admin/cate_insert', data);
			let cateId = result.data.id; 
			 

			await cloudHelper.transFormsTempPics(forms, 'cate/', cateId, 'admin/cate_update_forms');

			let callback = async function () {
				PublicBiz.removeCacheList('admin-cate-list');
				PublicBiz.removeCacheList('cate-list');
				wx.navigateBack();

			}
			pageHelper.showSuccToast('添加成功', 2000, callback);

		} catch (err) {
			console.log(err);
		}

	}, 

 
	url: function (e) {
		pageHelper.url(e, this);
	}
})