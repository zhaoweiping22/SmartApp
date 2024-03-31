/**
 * Notes: 职位模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-23 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');

const dataUtil = require('../../../framework/utils/data_util.js');
const ActivityModel = require('../model/activity_model.js');
const UserModel = require('../model/user_model.js');
const CateModel = require('../model/cate_model.js');
const ActivityJoinModel = require('../model/activity_join_model.js');

class ActivityService extends BaseProjectService {

	async getMyStat(userId) {
		let status0Cnt = await ActivityJoinModel.count({ ACTIVITY_JOIN_STATUS: 0, ACTIVITY_JOIN_USER_ID: userId });
		let status1Cnt = await ActivityJoinModel.count({ ACTIVITY_JOIN_STATUS: 1, ACTIVITY_JOIN_USER_ID: userId });
		let status99Cnt = await ActivityJoinModel.count({ ACTIVITY_JOIN_STATUS: 99, ACTIVITY_JOIN_USER_ID: userId });
		let stat = {
			status0Cnt,
			status1Cnt,
			status99Cnt,
		}
		return stat;
	}

	// 获取当前职位状态
	getJoinStatusDesc(activity) {
		let timestamp = this._timestamp;

		if (activity.ACTIVITY_STATUS == 0)
			return '职位已停止招聘';
		else if (activity.ACTIVITY_END <= timestamp)
			return '申请已结束';
		else if (activity.ACTIVITY_MAX_CNT > 0
			&& activity.ACTIVITY_JOIN_CNT >= activity.ACTIVITY_MAX_CNT)
			return '申请已满';
		else
			return '招聘中';
	}

	/** 浏览信息 */
	async viewActivity(userId, id) {

		let fields = '*';

		let where = {
			_id: id,
			ACTIVITY_STATUS: ActivityModel.STATUS.COMM
		}
		let activity = await ActivityModel.getOne(where, fields);
		if (!activity) return null;

		ActivityModel.inc(id, 'ACTIVITY_VIEW_CNT', 1);

		// 判断是否有申请
		let whereJoin = {
			ACTIVITY_JOIN_USER_ID: userId,
			ACTIVITY_JOIN_ACTIVITY_ID: id,
		}
		let activityJoin = await ActivityJoinModel.getOne(whereJoin);
		if (activityJoin && activityJoin.ACTIVITY_JOIN_STATUS == ActivityJoinModel.STATUS.WAIT) {
			activity.myActivityJoinId = activityJoin._id;
			activity.myActivityJoinTag = '待审核';
		}
		else if (activityJoin && activityJoin.ACTIVITY_JOIN_STATUS == ActivityJoinModel.STATUS.SUCC) {
			activity.myActivityJoinId = activityJoin._id;
			activity.myActivityJoinTag = '已录用';
		}
		else if (activityJoin && activityJoin.ACTIVITY_JOIN_STATUS == ActivityJoinModel.STATUS.ADMIN_CANCEL) {
			activity.myActivityJoinId = '';
			activity.myActivityJoinTag = '未被录用';
		}

		else {
			activity.myActivityJoinId = '';
			activity.myActivityJoinTag = '';
		}

		// 企业信息
		if (activity.ACTIVITY_CATE_ID) {
			let cate = await CateModel.getOne(activity.ACTIVITY_CATE_ID);
			if (cate) activity.cate = cate;
		}


		return activity;
	}

	/** 取得分页列表 */
	async getActivityList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'ACTIVITY_ORDER': 'asc',
			'ACTIVITY_END': 'desc',
			'ACTIVITY_ADD_TIME': 'desc'
		};
		let fields = 'ACTIVITY_JOIN_CNT,ACTIVITY_OBJ,ACTIVITY_VIEW_CNT,ACTIVITY_TITLE,ACTIVITY_MAX_CNT,ACTIVITY_START,ACTIVITY_END,ACTIVITY_ORDER,ACTIVITY_STATUS,ACTIVITY_CATE_NAME,ACTIVITY_OBJ,cate.CATE_TITLE,cate.CATE_OBJ.cover';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		where.and.ACTIVITY_STATUS = ActivityModel.STATUS.COMM; // 状态  


		if (util.isDefined(search) && search) {
			where.or = [
				{ ACTIVITY_TITLE: ['like', search] },
				{ 'cate.CATE_TITLE': ['like', search] },
			];
		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'type': {
					if (sortVal) where.and['ACTIVITY_OBJ.type'] = String(sortVal);
					break;
				}
				case 'pay': {
					if (sortVal) where.and['ACTIVITY_OBJ.pay'] = String(sortVal);
					break;
				}
				case 'biz': {
					if (sortVal) where.and['ACTIVITY_OBJ.biz'] = String(sortVal);
					break;
				}
				case 'sort': {
					// 排序
					orderBy = this.fmtOrderBySort(sortVal, 'ACTIVITY_ADD_TIME');
					break;
				}
			}
		}

		let joinParams = {
			from: CateModel.CL,
			localField: 'ACTIVITY_CATE_ID',
			foreignField: '_id',
			as: 'cate',
		};

		return await ActivityModel.getListJoin(joinParams, where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	/** 取得我的申请分页列表 */
	async getMyActivityJoinList(userId, {
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {
		orderBy = orderBy || {
			'ACTIVITY_JOIN_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {
			ACTIVITY_JOIN_USER_ID: userId
		};

		if (util.isDefined(search) && search) {
			where['ACTIVITY_JOIN_ACTIVITY_TITLE'] = {
				$regex: '.*' + search,
				$options: 'i'
			};
		} else if (sortType) {
			// 搜索菜单
			switch (sortType) {
				case 'timedesc': { //按时间倒序
					orderBy = {
						'activity.ACTIVITY_START': 'desc',
						'ACTIVITY_JOIN_ADD_TIME': 'desc'
					};
					break;
				}
				case 'timeasc': { //按时间正序
					orderBy = {
						'activity.ACTIVITY_START': 'asc',
						'ACTIVITY_JOIN_ADD_TIME': 'asc'
					};
					break;
				}
				case 'status': {
					where.ACTIVITY_JOIN_STATUS = Number(sortVal);
					break;
				}

			}
		}

		let result = await ActivityJoinModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);

		return result;
	}

	/** 取得我的申请详情 */
	async getMyActivityJoinDetail(userId, activityJoinId) {

		let fields = '*';

		let where = {
			_id: activityJoinId,
			ACTIVITY_JOIN_USER_ID: userId
		};
		let activityJoin = await ActivityJoinModel.getOne(where, fields);
		if (activityJoin) {
			activityJoin.activity = await ActivityModel.getOne(activityJoin.ACTIVITY_JOIN_ACTIVITY_ID, 'ACTIVITY_TITLE,ACTIVITY_START,ACTIVITY_END');
		}
		return activityJoin;
	}

	//################## 申请
	// 申请
	async activityJoin(userId, activityId, forms) {
		this.AppError('[兼职]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	async statActivityJoin(id) {
		// 申请数
		let where = {
			ACTIVITY_JOIN_ACTIVITY_ID: id,
			ACTIVITY_JOIN_STATUS: ['in', [ActivityJoinModel.STATUS.WAIT, ActivityJoinModel.STATUS.SUCC]]
		}
		let cnt = await ActivityJoinModel.count(where);


		// 用户列表
		where = {
			ACTIVITY_JOIN_ACTIVITY_ID: id,
			ACTIVITY_JOIN_STATUS: ActivityJoinModel.STATUS.SUCC
		}
		let joinParams = {
			from: UserModel.CL,
			localField: 'ACTIVITY_JOIN_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};
		let orderBy = {
			ACTIVITY_JOIN_ADD_TIME: 'desc'
		}
		let list = await ActivityJoinModel.getListJoin(joinParams, where, 'ACTIVITY_JOIN_ADD_TIME,user.USER_MINI_OPENID,user.USER_NAME,user.USER_PIC', orderBy, 1, 6, false, 0);
		list = list.list;

		for (let k = 0; k < list.length; k++) {
			list[k] = list[k].user;
		}

		await ActivityModel.edit(id, { ACTIVITY_JOIN_CNT: cnt });
	}

	/** 取消我的申请 只有成功和待审核可以取消 取消即为删除记录 */
	async cancelMyActivityJoin(userId, activityJoinId) {
		let where = {
			ACTIVITY_JOIN_USER_ID: userId,
			_id: activityJoinId,
			ACTIVITY_JOIN_STATUS: ['in', [ActivityJoinModel.STATUS.WAIT, ActivityJoinModel.STATUS.SUCC]]
		};
		let activityJoin = await ActivityJoinModel.getOne(where);

		if (!activityJoin) {
			this.AppError('未找到可取消的申请记录');
		}


		let activity = await ActivityModel.getOne(activityJoin.ACTIVITY_JOIN_ACTIVITY_ID);
		if (!activity)
			this.AppError('该职位不存在');

		if (activity.ACTIVITY_CANCEL_SET == 2 && activity.ACTIVITY_END <= this._timestamp)
			this.AppError('该职位已经结束申请，无法取消');

		if (activity.ACTIVITY_CANCEL_SET == 0)
			this.AppError('该申请不能取消');


		await ActivityJoinModel.del(where);

		// 统计
		await this.statActivityJoin(activityJoin.ACTIVITY_JOIN_ACTIVITY_ID);
	}


}

module.exports = ActivityService;