/**
 * Notes: 职位模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-24 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const pageHelper = require('../../../helper/page_helper.js');
const cloudHelper = require('../../../helper/cloud_helper.js');
const projectSetting = require('../public/project_setting.js');

class ActivityBiz extends BaseBiz { 
 
	static async cancelMyActivityJoin(activityJoinId, callback) {
		let cb = async () => {
			try {
				let params = {
					activityJoinId
				}
				let opts = {
					title: '取消中'
				}

				await cloudHelper.callCloudSumbit('activity/my_join_cancel', params, opts).then(res => {
					pageHelper.showSuccToast('已取消', 1500, callback);
				});
			} catch (err) {
				console.log(err);
			}
		}

		pageHelper.showConfirm('确认取消该申请?', cb);
	}


	static openMap(address, geo) {
		if (geo && geo.latitude)
			wx.openLocation({
				latitude: geo.latitude,
				longitude: geo.longitude,
				address,
				scale: 18
			})
		else {
			wx.setClipboardData({
				data: address,
				success(res) {
					wx.getClipboardData({
						success(res) {
							pageHelper.showNoneToast('已复制到剪贴板，请在地图APP里查询');
						}
					})
				}
			});
		}
	}
}

module.exports = ActivityBiz;