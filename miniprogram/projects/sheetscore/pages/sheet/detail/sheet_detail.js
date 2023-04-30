const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const dataHelper = require('../../../../../helper/data_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js'); 

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false, 

		isQuery: false,
		list: [],

		queryIdx: 0,
		queryArr: [], //查询条件和赋值 
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		ProjectBiz.initPage(this);

		if (!pageHelper.getOptions(this, options)) return;

		this._loadDetail();
	}, 

	_loadDetail: async function () {
		let id = this.data.id;
		if (!id) return;

		let params = {
			id,
		};
		let opt = {
			title: 'bar'
		};
		let sheet = await cloudHelper.callCloudData('sheet/view', params, opt);
		if (!sheet) {
			this.setData({
				isLoad: null
			})
			return;
		}

		let queryArr =[];
		let arr = sheet.SHEET_OBJ.query.split('+');
		for (let k = 0; k <arr.length;k++) {
			queryArr.push({
				title: arr[k],
				val:''
			})
		}
		 
		this.setData({
			isLoad: true,
			sheet,
			queryArr
		}); 
	},

	bindSubmitTap: async function (e) {
		this.setData({
			isQuery: false
		});
		let queryArr = this.data.queryArr;

		for (let k = 0; k < queryArr.length; k++) {
			if (!queryArr[k].val) return pageHelper.showModal('请填写' + queryArr[k].title);
		}
		let params = {
			sheetId: this.data.id,
			queryArr
		};
		let opt = {
			title: '查询中'
		};
		await cloudHelper.callCloudSumbit('sheet/query', params, opt).then(res => {
			this.setData({
				queryTitle: dataHelper.getArrByKey(this.data.queryArr, 'title'),
				list: res.data,
				isQuery: true
			})
		});

	},

	bindBlur: function (e) {
		let queryIdx = pageHelper.dataset(e, 'idx');
		console.log(e)
		let val = e.detail.value.trim();
		this.data.queryArr[queryIdx].val = val;
	}, 

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	async onPullDownRefresh() {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	},

	bindShowSheetDataTap: function (e) {
		let idx = pageHelper.dataset(e, 'idx');
		let show = this.data.list[idx].show;
		if (show !== false)
			show = false;
		else
			show = true;
		this.setData({
			['list[' + idx + '].show']: show
		});
	}
})