const ProjectBiz = require('../../../biz/project_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const projectSetting = require('../../../public/project_setting.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		isTotalMenu: true,
		_params: null,

		sortMenus: [],
		sortItems: [],
	},

	/**
		 * 生命周期函数--监听页面加载
		 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);


		if (options && options.search) {
			this.setData({ search: options.search });
		}

		this._getSearchMenu();

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {

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

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},


	onShareAppMessage: function () {

	},

	_getSearchMenu: function () {

		let sortMenus = [
			{ label: '全部', type: 'cateId', value: '' },
			{ label: '临时兼职', type: 'type', value: '临时兼职' },
			{ label: '固定兼职', type: 'type', value: '固定兼职' },
		];

		let sortItems1 = pageHelper.makeListMenu(projectSetting.ACTIVITY_BIZ, '岗位', 'biz');
		let sortItems2 = pageHelper.makeListMenu(projectSetting.ACTIVITY_PAY, '结算方式', 'pay');

		this.setData({
			isLoad: true,
			sortItems: [sortItems1, sortItems2],
			sortMenus
		})

	},

})