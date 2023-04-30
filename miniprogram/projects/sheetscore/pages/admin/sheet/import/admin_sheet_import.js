const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const fileHelper = require('../../../../../../helper/file_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
const AdminSheetBiz = require('../../../../biz/admin_sheet_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tempUrl: '',
		formClear: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		if (!pageHelper.getOptions(this, options)) return;
		AdminSheetBiz.loadSheetDetail(this);
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

	switchModel: function (e) {
		pageHelper.switchModel(this, e, 'bool');
	},

	/** 
	 * 数据提交
	 */
	bindFormSubmit: async function () {

		if (!AdminBiz.isAdmin(this)) return;
		let that = this;

		wx.chooseMessageFile({
			count: 1,
			type: 'file',
			extension: ['xlsx'],
			success: async (res) => {
				console.log(res)
				let path = res.tempFiles[0].path;

				wx.showLoading({
					title: '上传中',
					mask: true
				});



				// 上传到云空间 
				let cloudId = await cloudHelper.transTempPicOne(path, 'sheet/', '', false);
				if (!cloudId) return;

				let params = {
					sheetId: this.data.id,
					cloudId,
					clear: this.data.formClear
				};

				try {
					let options = {
						title: '导入中'
					}
					await cloudHelper.callCloudSumbit('admin/sheet_excel_import', params, options).then(res => {
						let data = res.data;

						let node = {
							'SHEET_DATA_CNT': data.cnt,
						}
						pageHelper.modifyPrevPageListNodeObject(that.data.id, node);

						PublicBiz.removeCacheList('admin-sheet-data');


						pageHelper.showModal('本数据文件共有数据' + data.total + '条，导入成功' + data.succ + '条，格式错误' + data.err + '条，数据库现有数据' + data.cnt + '条');

					});
				} catch (err) {
					console.log(err);
					pageHelper.showModal('导入失败，请重新导入');
				}

			}
		});
	},


	bindTempTap: async function (e) {
		this.setData({ tempUrl: '' });

		try {
			let options = {
				title: '数据模板生成中'
			}

			let params = {
				sheetId: this.data.id,
				type: 'temp'
			}

			await cloudHelper.callCloudData('admin/sheet_excel_export', params, options).then(res => {
				this.setData({ tempUrl: res.url });
				pageHelper.showModal('模板文件生成成功, 请点击【直接打开】按钮或者复制【模板下载链接】在浏览器你打开并下载');

			});
		} catch (err) {
			console.log(err);
			pageHelper.showNoneToast('生成失败，请重试');
		}
	},

	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindOpenTap: function (e) {
		fileHelper.openDoc('数据模板', this.data.tempUrl);
	},
})