const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const AdminSheetBiz = require('../../../../biz/admin_sheet_biz.js');
const SheetBiz = require('../../../../biz/sheet_biz.js');
const validate = require('../../../../../../helper/validate.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const formSetHelper = require('../../../../../../cmpts/public/form/form_set_helper.js');
const projectSetting = require('../../../../public/project_setting.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		if (!pageHelper.getOptions(this, options)) return; 
	 

		this._loadDetail();
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

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		this.selectComponent("#cmpt-form").reload();
		wx.stopPullDownRefresh();
	},

	model: function (e) {
		pageHelper.model(this, e);
	},

	_loadDetail: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let id = this.data.id;
		if (!id) return;

		if (!this.data.isLoad) this.setData(AdminSheetBiz.initFormData(id)); // 初始化表单数据

		let params = {
			id
		};
		let opt = {
			title: 'bar'
		};
		let sheet = await cloudHelper.callCloudData('admin/sheet_detail', params, opt);
		if (!sheet) {
			this.setData({ isLoad: null });
			return;
		}; 

		this.setData({
			isLoad: true,

			formTitle: sheet.SHEET_TITLE,
			formCateId: sheet.SHEET_CATE_ID,
			formOrder: sheet.SHEET_ORDER, 
			formForms: sheet.SHEET_FORMS 

		});
	},

	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		// 数据校验
		let data = this.data;
		data = validate.check(data, AdminSheetBiz.CHECK_FORM, this);
		if (!data) return;

		 

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;

		data.cateName = SheetBiz.getCateName(data.cateId); 

		try {
			let sheetId = this.data.id;
			data.id = sheetId;

			// 先修改，再上传 
			await cloudHelper.callCloudSumbit('admin/sheet_edit', data).then(res => {
				// 更新列表页面数据
				let node = {
					'SHEET_TITLE': data.title,
					'SHEET_CATE_NAME': data.cateName,
					'SHEET_ORDER': data.order, 
					statusDesc: res.data.statusDesc
				}
				pageHelper.modifyPrevPageListNodeObject(sheetId, node);
			});

			await cloudHelper.transFormsTempPics(forms, 'sheet/', sheetId, 'admin/sheet_update_forms');

			let callback = () => {
				wx.navigateBack();
			}
			pageHelper.showSuccToast('修改成功', 2000, callback);

		} catch (err) {
			console.log(err);
		}

	},


	url: function (e) {
		pageHelper.url(e, this);
	},

	switchModel: function (e) {
		pageHelper.switchModel(this, e);
	},

	 

})