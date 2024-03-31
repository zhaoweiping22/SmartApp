/**
 * Notes: 职位模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-23 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const ActivityService = require('../service/activity_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class ActivityController extends BaseProjectController {

	_getTimeShow(start, end) {
		let startDay = timeUtil.timestamp2Time(start, 'M月D日');
		let startTime = timeUtil.timestamp2Time(start, 'h:m');
		let endDay = timeUtil.timestamp2Time(end, 'M月D日');
		let endTime = timeUtil.timestamp2Time(end, 'h:m');
		let week = timeUtil.week(timeUtil.timestamp2Time(start, 'Y-M-D'));
		if (startDay != endDay)
			return `${startDay} ${startTime} ${week}～${endDay} ${endTime}`;
		else
			return `${startDay} ${startTime}～${endTime} ${week}`;
	}

	async getMyStat() {
		// 数据校验
		let rules = {
		 
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		return  await service.getMyStat(this._userId );
 
	} 

	/** 列表 */
	async getActivityList() {

		// 数据校验
		let rules = { 
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		let result = await service.getActivityList(input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].time = timeUtil.timestamp2Time(list[k].ACTIVITY_START, 'Y年M月D日 h:m');
			list[k].statusDesc = service.getJoinStatusDesc(list[k]);

			if (list[k].ACTIVITY_OBJ && list[k].ACTIVITY_OBJ.desc)
				delete list[k].ACTIVITY_OBJ.desc;
		}

		return result;

	}


	/** 浏览详细 */
	async viewActivity() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		let activity = await service.viewActivity(this._userId, input.id);

		if (activity) {

			activity.start = timeUtil.timestamp2Time(activity.ACTIVITY_START, 'M月D日 h:m');

			activity.end = timeUtil.timestamp2Time(activity.ACTIVITY_END, 'M月D日 h:m');
			activity.statusDesc = service.getJoinStatusDesc(activity);
		}

		return activity;
	} 


	/** 我的职位申请列表 */
	async getMyActivityJoinList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		let result = await service.getMyActivityJoinList(this._userId, input);

		// 数据格式化
		let list = result.list;


		for (let k = 0; k < list.length; k++) {  

			list[k].ACTIVITY_JOIN_ADD_TIME = timeUtil.timestamp2Time(list[k].ACTIVITY_JOIN_ADD_TIME, 'Y-M-D h:m');
		}

		result.list = list;

		return result;

	}
  

	/** 申请提交 */
	async activityJoin() {
		// 数据校验
		let rules = {
			activityId: 'must|id',
			forms: 'array',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		return await service.activityJoin(this._userId, input.activityId, input.forms);
	}

	/** 申请取消*/
	async cancelMyActivityJoin() {
		// 数据校验
		let rules = {
			activityJoinId: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		return await service.cancelMyActivityJoin(this._userId, input.activityJoinId);
	}
  
}

module.exports = ActivityController;