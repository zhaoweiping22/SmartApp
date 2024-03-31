/**
 * Notes: 业务基类 
 * Date: 2021-03-15 04:00:00 
 */

const dbUtil = require('../../../framework/database/db_util.js');
const util = require('../../../framework/utils/util.js');
const AdminModel = require('../../../framework/platform/model/admin_model.js');
const NewsModel = require('../model/news_model.js');
const CateModel = require('../model/cate_model.js');
const ActivityModel = require('../model/activity_model.js');
const BaseService = require('../../../framework/platform/service/base_service.js');

class BaseProjectService extends BaseService {
	getProjectId() {
		return util.getProjectId();
	}

	async initSetup() {
		let F = (c) => 'bx_' + c;
		const INSTALL_CL = 'setup_jobpart';
		const COLLECTIONS = ['setup', 'admin', 'log', 'news', 'activity', 'activity_join', 'cate', 'fav', 'user'];
		const CONST_PIC = '/images/cover.gif';


		const NEWS_CATE = '1=通知公告';
		const ACTIVITY_CATE = '1=职位';
		const CATE_CATE = '1=企业';


		if (await dbUtil.isExistCollection(F(INSTALL_CL))) {
			return;
		}

		console.log('### initSetup...');

		let arr = COLLECTIONS;
		for (let k = 0; k < arr.length; k++) {
			if (!await dbUtil.isExistCollection(F(arr[k]))) {
				await dbUtil.createCollection(F(arr[k]));
			}
		}

		if (await dbUtil.isExistCollection(F('admin'))) {
			let adminCnt = await AdminModel.count({});
			if (adminCnt == 0) {
				let data = {};
				data.ADMIN_NAME = 'admin';
				data.ADMIN_PASSWORD = 'e10adc3949ba59abbe56e057f20f883e';
				data.ADMIN_DESC = '超管';
				data.ADMIN_TYPE = 1;
				await AdminModel.insert(data);
			}
		}


		if (await dbUtil.isExistCollection(F('news'))) {
			let newsCnt = await NewsModel.count({});
			if (newsCnt == 0) {
				let newsArr = NEWS_CATE.split(',');
				for (let j in newsArr) {
					let title = newsArr[j].split('=')[1];
					let cateId = newsArr[j].split('=')[0];

					let data = {};
					data.NEWS_TITLE = title + '标题1';
					data.NEWS_DESC = title + '简介1';
					data.NEWS_CATE_ID = cateId;
					data.NEWS_CATE_NAME = title;
					data.NEWS_CONTENT = [{ type: 'text', val: title + '内容1' }];
					data.NEWS_PIC = [CONST_PIC];

					await NewsModel.insert(data);
				}
			}
		}

		if (await dbUtil.isExistCollection(F('activity'))) {
			let activityCnt = await ActivityModel.count({});
			if (activityCnt == 0) {
				let activityArr = ACTIVITY_CATE.split(',');
				for (let j in activityArr) {
					let title = activityArr[j].split('=')[1];
					let cateId = activityArr[j].split('=')[0];

					let data = {};
					data.ACTIVITY_TITLE = title + '1';
					data.ACTIVITY_CATE_ID = cateId;
					data.ACTIVITY_CATE_NAME = '企业1'; 
					data.ACTIVITY_START = this._timestamp;
					data.ACTIVITY_END = this._timestamp + 86400 * 1000 * 30;
					data.ACTIVITY_JOIN_FORMS = [

					];
					data.ACTIVITY_OBJ = {
						cover: [CONST_PIC],
						type: '临时兼职',
						pay: '日结',
						biz: '主播',
						money: '100/天'
					};

					await ActivityModel.insert(data);
				}
			}
		}

		if (await dbUtil.isExistCollection(F('cate'))) {
			let cateCnt = await CateModel.count({});
			if (cateCnt == 0) {
				let cateArr = CATE_CATE.split(',');
				for (let j in cateArr) {
					let title = cateArr[j].split('=')[1];
					let cateId = cateArr[j].split('=')[0];

					let data = {};
					data.CATE_TITLE = title + '1'; 
					data.CATE_OBJ = {
						cover: [CONST_PIC],
						type: '国企',
						size: '大型',
						trade: '娱乐',
						money: '五星推荐'
					};

					await CateModel.insert(data);
				}
			}
		}


		if (!await dbUtil.isExistCollection(F(INSTALL_CL))) {
			await dbUtil.createCollection(F(INSTALL_CL));
		}
	}

}

module.exports = BaseProjectService;