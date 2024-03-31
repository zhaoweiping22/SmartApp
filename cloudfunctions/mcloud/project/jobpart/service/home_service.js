/**
 * Notes: 全局/首页模块业务逻辑
 * Date: 2021-03-15 04:00:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */

const BaseProjectService = require('./base_project_service.js');
const setupUtil = require('../../../framework/utils/setup/setup_util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const ActivityModel = require('../model/activity_model.js');
const CateModel = require('../model/cate_model.js');
const NewsModel = require('../model/news_model.js');

class HomeService extends BaseProjectService {

	async getSetup(key) {
		return await setupUtil.get(key);
	}

	/**首页列表 */
	async getHomeList() {

		let fields = 'CATE_TITLE,CATE_OBJ.cover';
		let where = {
			CATE_STATUS: 1
		}
		let cateList = await CateModel.getAll(where, fields, { 'CATE_VOUCH': 'desc', 'CATE_ORDER': 'asc', 'CATE_ADD_TIME': 'desc' }, 10);

		where = {
			NEWS_STATUS: 1,
		};
		let orderBy = {
			'NEWS_VOUCH': 'desc',
			'NEWS_ORDER': 'asc',
			'NEWS_ADD_TIME': 'desc'
		}
		fields = 'NEWS_TITLE,NEWS_CATE_NAME,NEWS_PIC,NEWS_DESC,NEWS_ADD_TIME';
		let newsList = await NewsModel.getAll(where, fields, orderBy, 10);


		where = {
			ACTIVITY_STATUS: 1,
		};
		orderBy = {
			'ACTIVITY_VOUCH': 'desc',
			'ACTIVITY_ORDER': 'asc',
			'ACTIVITY_END': 'desc',
			'ACTIVITY_ADD_TIME': 'desc'
		}
		fields = 'ACTIVITY_TITLE,ACTIVITY_OBJ.money,ACTIVITY_OBJ.type,ACTIVITY_OBJ.biz,ACTIVITY_MAX_CNT';
		let activityList = await ActivityModel.getAll(where, fields, orderBy, 8);

		return { newsList, cateList, activityList }

	}
}

module.exports = HomeService;