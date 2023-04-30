module.exports = { //sheetscore成绩查询
	PROJECT_COLOR: '#000000',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#000000',

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_MUST_FIELDS: [ 
	],
	USER_CHECK_FORM: {
		name: 'formName|must|string|min:1|max:30|name=昵称',
		forms: 'formForms|array'
	},
	USER_FIELDS: [ 
		{ mark: 'mobile', title: '手机', type: 'mobile', must: true },
	],


	NEWS_NAME: '通知公告',
	NEWS_CATE: [
		{ id: 1, title: '通知公告', style: 'leftbig1' },
	],
	NEWS_FIELDS: [],


	SHEET_NAME: '成绩数据',
	SHEET_CATE: [
		{ id: 1, title: '学科测评' },
		{ id: 2, title: '期中考试' },
		{ id: 3, title: '期末考试' },
		{ id: 4, title: '学科竞赛' },
		{ id: 5, title: '体育测评' },
		{ id: 6, title: '模拟考试' },
		{ id: 7, title: '2022年度' },
		{ id: 8, title: '2023年度' }
	],
	SHEET_FIELDS: [
		{ mark: 'cover', title: '分享海报图', type: 'image', must: false, max: 1 },
		{ mark: 'desc', title: '简介', type: 'textarea', must: false, max: 500 },
		{
			mark: 'fields', title: '数据列', type: 'rows',
			ext: {
				titleName: '数据列',
				hasDetail: false,
				hasVal: false,
				maxCnt: 10,
				minCnt: 2,
				checkDetail: true,
				hasPic: false,
				checkPic: true
			},
			def: [{ title: '学号' }, { title: '姓名' }, { title: '语文' }, { title: '数学' }],
			must: true
		},
		{ mark: 'line', title: '', type: 'line' },
		{ mark: 'query', title: '数据查询条件', type: 'text', def: '姓名+学号', ext: { hint: '请填写上述数据列作为查询条件，多个条件组合请用加号连接，例如：姓名+手机' }, must: true },

	],
}