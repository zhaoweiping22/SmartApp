const ProjectBiz = require('../../../biz/project_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const projectSetting = require('../../../public/project_setting.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		_params: null,

		sortMenus: [],
		sortItems: [],
	},

	/**
		 * 生命周期函数--监听页面加载
		 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

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
			{ label: '最新', type: 'new', value: 'new' },
			{ label: '职位数ˇ', type: 'sort', value: 'CATE_CNT|desc' },
		];

		let sortItems0 = pageHelper.makeListMenu(projectSetting.CATE_TRADE, '行业', 'trade');

		let sortItems1 = pageHelper.makeListMenu(projectSetting.CATE_SIZE, '规模', 'size');

		let sortItems2 = pageHelper.makeListMenu(projectSetting.CATE_TYPE, '性质', 'type');

		let sortItems3 = pageHelper.makeListMenu(projectSetting.CATE_STAR, '推荐', 'star');

		this.setData({
			isLoad: true,
			sortItems: [sortItems0, sortItems1, sortItems2, sortItems3],
			sortMenus
		})

	},

})