const CATE_STAR = ['5星推荐', '4星推荐', '3星推荐', '2星推荐', '1星推荐'];
const CATE_SIZE = ['大型', '中型', '小型', '微型'];
const CATE_TYPE = ['央企', '国企', '民企', '个体户', '政府机关', '事业单位', '外资', '合资', '其他'];
const CATE_TRADE = ['互联网/计算机', '电子/电气/通信', '产品', '客服/运营', '销售/商业', '人力/行政/法务', '财务/审计/税务', '生产制造', '零售/生活服务', '餐饮', '酒店/旅游', '教育培训', '设计', '物业/房地产/建筑', '直播/影视/传媒/娱乐', '市场/公关/广告', '物流/仓储/司机', '采购/贸易', '汽车', '医疗健康', '金融', '咨询/翻译/法律', '能源/环保/农业', '高级管理', '其他'];
const ACTIVITY_PAY = ['日结', '周结', '月结', '一次性结清'];
const ACTIVITY_BIZ = ['群演', '地推', '厨工', '服务生', '杂工', '老师', '直播', '主持', '业务拓展', '普工', '保洁', '保安', '销售', '骑手', '模特', '客服', '店员', '其他'];

module.exports = { //jobpart
	PROJECT_COLOR: '#FFDD52',
	NAV_COLOR: '#000000',
	NAV_BG: '#FFDD52',

	CATE_STAR: CATE_STAR,
	CATE_SIZE: CATE_SIZE,
	CATE_TYPE: CATE_TYPE,
	CATE_TRADE: CATE_TRADE,

	ACTIVITY_PAY: ACTIVITY_PAY,
	ACTIVITY_BIZ: ACTIVITY_BIZ,

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
		{ mark: 'sex', title: '性别', type: 'select', selectOptions: ['男', '女'], must: true },
		{ mark: 'birth', title: '生日', type: 'date', must: true },
		{ mark: 'high', title: '身高(cm)', type: 'int', must: true },
		{ mark: 'weight', title: '体重(kg)', type: 'int', must: true },
		{ mark: 'from', title: '籍贯', type: 'text', must: true },
		{ mark: 'marrie', title: '婚姻状况', type: 'select', selectOptions: ['未婚', '已婚'], must: true },
		{ mark: 'edu', title: '学历', type: 'select', selectOptions: ['初中及以下', '高中', '中专', '大专', '本科', '硕士', '博士', '其他'], must: true },
		{ mark: 'work', title: '所属群体', type: 'select', selectOptions: ['自由自由者', '学生', '宝妈', '待业者', '退休人员', '上班族', '其他'], must: true },
		{ mark: 'worktime', title: '参加工作时间', type: 'month', must: true },
		{ mark: 'skill', title: '自我介绍', type: 'textarea', must: false },
		{
			mark: 'jinli', title: '工作经历', type: 'rows',
			ext: {
				titleName: '工作经历',
				hasDetail: false,
				hasVal: false,
				maxCnt: 10,
				minCnt: 0,
				checkDetail: true,
				hasPic: false,
				checkPic: false,
				titleMode: 'textarea'
			},
			def: [],
			desc: '描述以往的工作经验，相关行业录取加分哦~',
			must: false
		},
	],
	USER_CHECK_FORM: {
		name: 'formName|must|string|min:1|max:30|name=姓名',
		mobile: 'formMobile|must|mobile|name=手机',
		pic: 'formPic|must|string|name=头像',
		forms: 'formForms|array'
	},


	NEWS_NAME: '通知公告',
	NEWS_CATE: [
		{ id: 1, title: '通知公告', style: 'leftbig1' },

	],
	NEWS_FIELDS: [
	],

	ACTIVITY_NAME: '职位',
	ACTIVITY_CATE: [
		{ id: 1, title: '职位' },
	],
	ACTIVITY_FIELDS: [
		{ mark: 'type', title: '类型', type: 'select', selectOptions: ['临时兼职', '固定兼职'], must: true },
		{ mark: 'pay', title: '结算方式', type: 'select', selectOptions: ACTIVITY_PAY, must: true },
		{ mark: 'biz', title: '岗位分类', type: 'select', selectOptions: ACTIVITY_BIZ, must: true },
		{ mark: 'date', title: '工作日期', type: 'text', must: true },
		{ mark: 'time', title: '工作时间', type: 'text', must: true },
		{ mark: 'person', title: '人员要求', type: 'textarea', must: true },
		{ mark: 'money', title: '工资待遇', type: 'text', def: '¥', must: true },
		{ mark: 'desc', title: '详细说明', type: 'textarea', must: true },
		{
			mark: 'tag', title: '特征标签', type: 'rows',
			ext: {
				titleName: '标签',
				hasDetail: false,
				hasVal: false,
				maxCnt: 30,
				minCnt: 0,
				checkDetail: true,
				hasPic: false,
				checkPic: false,
				titleMode: 'input'
			},
			def: [],
			must: false
		},

	],
	ACTIVITY_JOIN_FIELDS: [

	],

	CATE_NAME: '企业',
	CATE_FIELDS: [
		{ mark: 'cover', title: '封面图', type: 'image', min: 1, max: 1, must: true },
		{ mark: 'type', title: '性质', type: 'select', selectOptions: CATE_TYPE, must: true },
		{ mark: 'size', title: '规模', type: 'select', selectOptions: CATE_SIZE, must: true },
		{ mark: 'trade', title: '行业', type: 'select', selectOptions: CATE_TRADE, must: true },
		{ mark: 'star', title: '推荐指数', type: 'select', selectOptions: CATE_STAR, must: true },
		{ mark: 'content', title: '企业详情', type: 'content', must: true },
	],



}