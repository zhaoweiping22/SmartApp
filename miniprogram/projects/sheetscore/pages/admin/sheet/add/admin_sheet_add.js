const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const helper = require('../../../../../../helper/helper.js');
const AdminSheetBiz = require('../../../../biz/admin_sheet_biz.js');
const SheetBiz = require('../../../../biz/sheet_biz.js');
const validate = require('../../../../../../helper/validate.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
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


		this.setData(AdminSheetBiz.initFormData());
		this.setData({
			isLoad: true
		});

		// 复制
		if (helper.isDefined(options.idx)) {
			let parent = pageHelper.getPrevPage(2);
			if (!parent) return;

			let node = parent.data.dataList.list[options.idx];

			this.setData({
				formCateId: node.SHEET_CATE_ID,
				formTitle: node.SHEET_TITLE,
				formOrder: node.SHEET_ORDER,
				formForms: node.SHEET_FORMS
			})
		}
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
		data = validate.check(data, AdminSheetBiz.CHECK_FORM, this);
		if (!data) return;

		if (data.end < data.start) {
			return pageHelper.showModal('截止时间不能早于开始时间');
		}

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;

		data.cateName = SheetBiz.getCateName(data.cateId); 

		try {

			// 创建
			let result = await cloudHelper.callCloudSumbit('admin/sheet_insert', data);
			let sheetId = result.data.id;

			// 图片
			await cloudHelper.transFormsTempPics(forms, 'sheet/', sheetId, 'admin/sheet_update_forms');

			let callback = async function () {
				PublicBiz.removeCacheList('admin-sheet-list');
				PublicBiz.removeCacheList('sheet-list');
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
})