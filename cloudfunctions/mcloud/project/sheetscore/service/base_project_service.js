/**
 * Notes: 业务基类 
 * Date: 2021-03-15 04:00:00 
 */

const dbUtil = require('../../../framework/database/db_util.js');
const util = require('../../../framework/utils/util.js');
const AdminModel = require('../../../framework/platform/model/admin_model.js');
const NewsModel = require('../model/news_model.js');
const SheetModel = require('../model/sheet_model.js');
const BaseService = require('../../../framework/platform/service/base_service.js');

class BaseProjectService extends BaseService {
	getProjectId() {
		return util.getProjectId();
	}

	async initSetup() {
		let F = (c) => 'bx_' + c;
		const INSTALL_CL = 'setup_sheetscore';
		const COLLECTIONS = ['setup', 'admin', 'log', 'news', 'fav', 'user', 'sheet', 'sheet_data'];
		const CONST_PIC = '/images/cover.gif';
		const CONST_PIC1 = '/projects/sheetscore/images/q.jpg';

		const NEWS_CATE = '1=通知公告';
		const SHEET_CATE = '1=学科测评,2=期中考试,3=期末考试,4=学科竞赛,5=体育测评,6=模拟考试,7=2022年度,8=2022年度'


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


		if (await dbUtil.isExistCollection(F('sheet'))) {
			let sheetCnt = await SheetModel.count({});
			if (sheetCnt == 0) {
				let sheetArr = SHEET_CATE.split(',');
				for (let j in sheetArr) {
					let title = sheetArr[j].split('=')[1];
					let cateId = sheetArr[j].split('=')[0];

					let data = {};
					data.SHEET_TITLE = title + '成绩1';
					data.SHEET_CATE_ID = cateId;
					data.SHEET_CATE_NAME = title;
					data.SHEET_OBJ = {
						cover: [CONST_PIC1],
						query: '学号',
						fields: [{ title: '姓名' }, { title: '学号' }, { title: '语文' }, { title: '数学' }],
						desc: title + '1成绩简介',
					};

					await SheetModel.insert(data);
				}
			}
		}


		if (!await dbUtil.isExistCollection(F(INSTALL_CL))) {
			await dbUtil.createCollection(F(INSTALL_CL));
		}
	}

}

module.exports = BaseProjectService;