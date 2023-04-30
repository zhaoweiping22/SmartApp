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
	'admin/news_vouch': 'admin/admin_news_controller@vouchNews#demo',

	// 数据表格 
	'sheet/list': 'sheet_controller@getSheetList',
	'sheet/view': 'sheet_controller@viewSheet', 
	'sheet/query': 'sheet_controller@querySheetData',  

	'admin/sheet_list': 'admin/admin_sheet_controller@getAdminSheetList',
	'admin/sheet_insert': 'admin/admin_sheet_controller@insertSheet#demo',
	'admin/sheet_detail': 'admin/admin_sheet_controller@getSheetDetail',
	'admin/sheet_edit': 'admin/admin_sheet_controller@editSheet#demo',
	'admin/sheet_update_forms': 'admin/admin_sheet_controller@updateSheetForms#demo',
	'admin/sheet_clear': 'admin/admin_sheet_controller@clearSheetAll#demo',
	'admin/sheet_del': 'admin/admin_sheet_controller@delSheet#demo',
	'admin/sheet_sort': 'admin/admin_sheet_controller@sortSheet#demo',
	'admin/sheet_vouch': 'admin/admin_sheet_controller@vouchSheet#demo',
	'admin/sheet_status': 'admin/admin_sheet_controller@statusSheet#demo',
	'admin/sheet_data_add': 'admin/admin_sheet_controller@insertSheetData#demo',
	'admin/sheet_data_del': 'admin/admin_sheet_controller@delSheetData#demo',
	'admin/sheet_data_edit': 'admin/admin_sheet_controller@editSheetData#demo',
	'admin/sheet_data_list': 'admin/admin_sheet_controller@getSheetDataList',
	'admin/sheet_data_status': 'admin/admin_sheet_controller@statusSheetData#demo',  
	'admin/sheet_excel_get': 'admin/admin_sheet_controller@getSheetExcel',
	'admin/sheet_excel_export': 'admin/admin_sheet_controller@exportSheetExcel',
	'admin/sheet_excel_del': 'admin/admin_sheet_controller@delSheetExcel',
	'admin/sheet_excel_import': 'admin/admin_sheet_controller@importSheetExcel#demo',

  
}