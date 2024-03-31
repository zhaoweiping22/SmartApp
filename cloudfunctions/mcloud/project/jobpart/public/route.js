/**
 * Notes: 路由配置文件
  * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * User: CC
 * Date: 2020-10-14 07:00:00
 */

module.exports = {
	'test/test': 'test/test_controller@test',

	'home/setup_get': 'home_controller@getSetup',

	'passport/login': 'passport_controller@login',
	'passport/phone': 'passport_controller@getPhone',
	'passport/my_detail': 'passport_controller@getMyDetail',
	'passport/register': 'passport_controller@register',
	'passport/edit_base': 'passport_controller@editBase',

	// 收藏
	'fav/update': 'fav_controller@updateFav',
	'fav/del': 'fav_controller@delFav',
	'fav/is_fav': 'fav_controller@isFav',
	'fav/my_list': 'fav_controller@getMyFavList',

	'admin/home': 'admin/admin_home_controller@adminHome',
	'admin/clear_vouch': 'admin/admin_home_controller@clearVouchData',

	'admin/login': 'admin/admin_mgr_controller@adminLogin',
	'admin/mgr_list': 'admin/admin_mgr_controller@getMgrList',
	'admin/mgr_insert': 'admin/admin_mgr_controller@insertMgr#demo',
	'admin/mgr_del': 'admin/admin_mgr_controller@delMgr#demo',
	'admin/mgr_detail': 'admin/admin_mgr_controller@getMgrDetail',
	'admin/mgr_edit': 'admin/admin_mgr_controller@editMgr#demo',
	'admin/mgr_status': 'admin/admin_mgr_controller@statusMgr#demo',
	'admin/mgr_pwd': 'admin/admin_mgr_controller@pwdMgr#demo',
	'admin/log_list': 'admin/admin_mgr_controller@getLogList',
	'admin/log_clear': 'admin/admin_mgr_controller@clearLog#demo',

	'admin/setup_set': 'admin/admin_setup_controller@setSetup#demo',
	'admin/setup_set_content': 'admin/admin_setup_controller@setContentSetup#demo',
	'admin/setup_qr': 'admin/admin_setup_controller@genMiniQr',

	// 用户
	'admin/user_list': 'admin/admin_user_controller@getUserList',
	'admin/user_detail': 'admin/admin_user_controller@getUserDetail',
	'admin/user_del': 'admin/admin_user_controller@delUser#demo',
	'admin/user_status': 'admin/admin_user_controller@statusUser#demo',

	'admin/user_data_get': 'admin/admin_user_controller@userDataGet',
	'admin/user_data_export': 'admin/admin_user_controller@userDataExport',
	'admin/user_data_del': 'admin/admin_user_controller@userDataDel',


	// 内容  
	'home/list': 'home_controller@getHomeList',
	'news/list': 'news_controller@getNewsList',
	'news/view': 'news_controller@viewNews',

	'admin/news_list': 'admin/admin_news_controller@getAdminNewsList',
	'admin/news_insert': 'admin/admin_news_controller@insertNews#demo',
	'admin/news_detail': 'admin/admin_news_controller@getNewsDetail',
	'admin/news_edit': 'admin/admin_news_controller@editNews#demo',
	'admin/news_update_forms': 'admin/admin_news_controller@updateNewsForms#demo',
	'admin/news_update_pic': 'admin/admin_news_controller@updateNewsPic#demo',
	'admin/news_update_content': 'admin/admin_news_controller@updateNewsContent#demo',
	'admin/news_del': 'admin/admin_news_controller@delNews#demo',
	'admin/news_sort': 'admin/admin_news_controller@sortNews#demo',
	'admin/news_status': 'admin/admin_news_controller@statusNews#demo',


	// 职位
	'activity/list': 'activity_controller@getActivityList', 
	'activity/view': 'activity_controller@viewActivity', 
	'activity/join': 'activity_controller@activityJoin', 
	'activity/my_stat': 'activity_controller@getMyStat',
	'activity/my_join_list': 'activity_controller@getMyActivityJoinList',
	'activity/my_join_cancel': 'activity_controller@cancelMyActivityJoin', 

	'admin/activity_list': 'admin/admin_activity_controller@getAdminActivityList',
	'admin/activity_insert': 'admin/admin_activity_controller@insertActivity#demo',
	'admin/activity_detail': 'admin/admin_activity_controller@getActivityDetail',
	'admin/activity_edit': 'admin/admin_activity_controller@editActivity#demo',
	'admin/activity_update_forms': 'admin/admin_activity_controller@updateActivityForms#demo',
	'admin/activity_clear': 'admin/admin_activity_controller@clearActivityAll#demo',
	'admin/activity_del': 'admin/admin_activity_controller@delActivity#demo',
	'admin/activity_sort': 'admin/admin_activity_controller@sortActivity#demo',
	'admin/activity_vouch': 'admin/admin_activity_controller@vouchActivity#demo',
	'admin/activity_status': 'admin/admin_activity_controller@statusActivity#demo',
	'admin/activity_join_list': 'admin/admin_activity_controller@getActivityJoinList',
	'admin/activity_join_status': 'admin/admin_activity_controller@statusActivityJoin#demo', 
	'admin/activity_join_del': 'admin/admin_activity_controller@delActivityJoin#demo',
	'admin/activity_join_data_get': 'admin/admin_activity_controller@activityJoinDataGet',
	'admin/activity_join_data_export': 'admin/admin_activity_controller@activityJoinDataExport',
	'admin/activity_join_data_del': 'admin/admin_activity_controller@activityJoinDataDel',


	// 分类 
	'cate/view': 'cate_controller@viewCate',
	'cate/all_options': 'cate_controller@getAllCateOptions',
	'cate/list': 'cate_controller@getCateList',

	'admin/cate_list': 'admin/admin_cate_controller@getAdminCateList',
	'admin/cate_insert': 'admin/admin_cate_controller@insertCate#demo',
	'admin/cate_del': 'admin/admin_cate_controller@delCate#demo',
	'admin/cate_detail': 'admin/admin_cate_controller@getCateDetail',
	'admin/cate_edit': 'admin/admin_cate_controller@editCate#demo',
	'admin/cate_status': 'admin/admin_cate_controller@statusCate#demo',
	'admin/cate_vouch': 'admin/admin_cate_controller@vouchCate#demo',
	'admin/cate_sort': 'admin/admin_cate_controller@sortCate#demo',
	'admin/cate_update_forms': 'admin/admin_cate_controller@updateCateForms#demo',
 
}