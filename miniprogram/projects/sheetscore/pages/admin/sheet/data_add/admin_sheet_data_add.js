const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const AdminSheetBiz = require('../../../../biz/admin_sheet_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');

Page({

	/** 
	 * 页面的初始数据
	 */
	data: {
		forms: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		if (!pageHelper.getOptions(this, options)) return;
		await AdminSheetBiz.loadSheetDetail(this);

		this.setData({
			forms: this.data.sheet.SHEET_OBJ.fields
		})


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



	/** 
	 * 数据提交
	 */
	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let data = {
			sheetId: this.data.id,
			forms: this.data.forms
		}


		try {
			// 先创建，再上传 
			await cloudHelper.callCloudSumbit('admin/sheet_data_add', data).then(res => {

				let callback = async function () {
					PublicBiz.removeCacheList('admin-sheet-data-list');
					wx.navigateBack();

				}
				pageHelper.showSuccToast('添加成功', 2000, callback);
			});


		} catch (err) {
			console.log(err);
		}

	},

	bindBlur: function (e) {
		AdminSheetBiz.bindSheetDataBlur(e, this);
	}

})