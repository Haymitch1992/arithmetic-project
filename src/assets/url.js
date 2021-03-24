// 数据集-注册数据集上传
export const UPLOAD_FILE = '/api/putfile/';
// 数据集-列表
export const ALL_DATA_LIST = '/api/alldataset/';
// 数据集-删除列表指定项
export const DELETE_DATA_LIST = '/api/deleteSet/';
// 数据集-获取表头
export const SET_HEADER = '/api/setHeader/';
// 数据集-提交参数配置
export const SET_OPTIONS = '/api/submit/';
// 数据集-获取参数配置 // 数据集-提交参数配置
export const GET_OPTIONS = '/api/alterSet/';
// 使用数据中台数据创建
export const POST_SAVE_SFZTORM = '/api/saveSfztOrm/';
// 修改数据集名称
export const POST_RESET_NAME = '/api/renameSet/';
// 导出数据集 通过数据中台的数据导出
export const POST_DER_IVE_CSV_DATA = "/api/derIveCsvData/";
// 查询数据集的 数据总数
export const GET_DATA_LENGTH = "/api/derIveCsvData/";
// 数据中台 主题查询
export const GET_SEARCH_DATA_NAME = '/api/searchDataName/';
// 数据集任务列表
export const GET_TASK = '/api/taskList/';

// 数据标注-标注数据id
export const SET_LABLE = '/api/lableSetid/';
// 标注的下一条或者下一条切换
export const CHANGE_LABEL_NUM = '/api/cutDataId/';
// 数据标注-标注数据详细信息
export const GAIN_SET_DATA = '/api/gainSetData/';
// 数据标注-折线图数据
export const SET_CHART_DATA = '/api/setChartData/';
// 数据标注- 提交标注信息
export const SET_LABLE_TITLE = '/api/setLableTitle/';
// 数据标注- 获取标注分类 添加标注分类
export const GET_CLASSIFY = '/api/classify/';
// 数据标注- 提交标注分类
export const POST_ADD_CLASSIFY = '/api/addClassify/';
// 数据标注- 获取分类下的数据
export const ALL_CLASSIFY = '/api/allClassifyData/';
// 数据标注- 数据特征及预测分数获取
export const TRAIT_GRADE_DATA = '/api/traitGradeData/';
// 数据标注- 获取直方图
export const TRAIT_HISTOGRAM = '/api/traitHistogram/';
// 数据标注- 获取历史序列图
export const HISTORY_MEAN_DATA = '/api/historyMeanData/';

// 获取数据标注进度
export const GET_TASK_PROGRESS = '/api/getTaskProgress/';

// 模型开发和训练
// 创建新项目
export const CREATE_PROJECT = '/api/new_project/';
// 获取项目列表
export const GET_ALL_PROJECT = '/api/all_project/';
// 删除项目
export const DELETE_PROJECT = '/api/delProject/';

// 创建实验
export const CREATE_TEST = '/api/createTest/';
// 获取实验列表
export const ALL_TEST = '/api/allTest/';
// 保存节点
export const SAVE_NODES = '/api/nodeMes/';
// 获取节点
export const GET_NODE_INFORMATION = '/api/nodeMes/';
// 修改实验
export const POST_TEST_EDIT = '/api/alterNode/';
// 删除实验
export const GET_TEST_DELETE = '/api/delTest/';
// 搜索列表
export const POST_SEARCH_TEST = '/api/searchTest/';
// 搜索个人数据集
export const POST_SEARCH_SET = '/api/searchSet/';
// 分析报告接口
export const GET_RESULT_REPORT = '/api/analysisReport/';

// 登录
export const POST_LOGIN_DATA = '/api/login/';
// 发送验证码
export const POST_EMAIL_VERIFY = '/api/sendEmail/';
// 注册
export const POST_REGISTER_DATA = '/api/register/';
// 忘记密码发送验证码
export const GET_EMAIL_VERIFY = '/api/sendEmail/';
// 重置密码
export const POST_RESET_PASSWORD = '/api/resetPaswd/';
// 查看邮箱是否使用
export const GET_CHECK_EMAIL = '/api/queryEmail/';
// 查看用户名是否使用
export const GET_CHECK_USERNAME = '/api/queryUserName/';
// 个人信息的获取
export const GET_PERSONAL_INFO = '/api/userInfo/';
// 个人信息的修改
export const POST_PERSONAL_INFO = '/api/userInfo/';

// 模型信息获取
export const POST_MODEL_DATA = '/api/modelData/';
// 模型版本获取
export const GET_MODEL_VERSION = '/api/versionsData/';
// 模型删除
export const POST_DELETE_MODEL = '/api/delModelData/';
// 模型信息修改
export const POST_CHANGE_MODEL = '/api/alterModelData/';
// 已部署模型展示
export const POST_ALL_DEPLOY_MODEL = '/api/allDeployModel/';

// 模型导出
export const POST_EXPORT_MODEL = '/api/deriveDeployModel/';
// 模型信息详情
export const POST_MODEL_INFO = '/api/deployModelInfo/';
// 模型删除
export const POST_ONLINE_DELETE_MODEL = '/api/delModelDeploy/';
// 模型事件信息展示
export const POST_MODEL_SHOW = '/api/incidentShow/';
// 模型日志展示
export const POST_MODEL_LOG = '/api/logRecord/';
// 修改模型部署状态
export const POST_MODEL_STATUS = '/api/alterTheState/';
// 调用日志查询
export const POST_LOG_QUERY = '/api/logQuery/';
// 机器学习模板 列表
export const GET_ALL_MODEL_TEMPLATE = '/api/allModelTemplate/';
// 模型在线调试
export const POST_MODE_ONLINE = '/api/onLineModel/';
// 选择模型
export const POST_CREATE_MODEL = '/api/createModelTemplate/';
// 模型搜索
export const POST_SEARCH_MODEL = '/api/searchModelTemplate/';

// 运行模型
export const POST_RUN_MODEL = '/model/run';
// 部署模型
export const POST_DEPLOY_MODEL = '/model/deploy';
// 部署调试
export const POST_DEPLOY_TEST = '/debug/invocations';

// 数据中台开放主题
export const GET_DATA_THEME = '/api/getDataTheme/';
// 数据中台数据获取
export const GET_LIMIT_THEME = '/api/limitData/';
// 数据中台查看数据
export const GET_COUNT_THEME = '/api/countData/';

// 参看数据集前 100条数据
export const POST_TOP_100_DATA = "/api/previewSet/";
// 将运行成功的节点 发送至后台保存
export const POST_NODE_PARAMETER = '/api/nodeParameter/';

// 模型部署保存
export const POST_DEPLOY_MODEL_SAVE = '/api/deployModel/';
// 模型信息添加
export const POST_ADD_MODEL_DATA = '/api/addModelData/';
// 节点参数获取接口
export const GET_GAIN_NODE_PARAM = '/api/gainNodeParam/';
// 机器学习一级列表
export const GET_ALL_MODULE = '/api/allModule/';
// 获取二级列表
export const POST_ALL_MODULE = '/api/allModule/';

// 文件分片上传
export const POST_UPLOAD_FILE = '/api/upload/';

// 文件分片上传合并指令
export const POST_JOIN_FILE = '/api/joinFile/';

// 演示文件列表
export const GET_FILE_LIST = '/api/AllVideoData/';

// 数据集历史存储
// 数据集历史获取
export const DATA_HISTORY = '/api/historyLog/';

// 删除媒体资源
export const DELETE_VIDEO_DATA = '/api/delVideoData/';

// 使用媒体资源
export const USE_VIDEO_DATA = '/model/display';

// 查看视频分析结果
export const GET_VIDEO_RESULT = '/api/AnalysisResult/';
