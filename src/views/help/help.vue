<template>
    <div class="bg">
        <div class="help-box" ref="tree">
            <div class="content">
                <h2 id="model-1">数据智能说明文档</h2>
                <h3>1 产品介绍</h3>
                <h3>1.1 数据智能是做什么的？</h3>
                <p>
                    是交控科技旗下的人工智能平台，提供一站式的机器学习解决方案。面向智慧城轨业务体系，提供通用化、高指标AI算法，对大量历史数据进行学习，进而利用生成的经验模型指导业务，使得各类业务系统专注于业务的同时具备智慧化能力。
                </p>
                <p>目前数据智能主要应用在以下场景：</p>
                <ul>
                    <li>
                        <b>设备健康管理：</b>
                        道岔故障诊断、设备剩余寿命分析、车载日志分析（停车精度分析）。
                    </li>
                    <li>
                        <b>计算机视觉：</b>
                        无人化机房巡检、施工场地巡检（安全帽检测、吸烟行为检测等）。
                    </li>
                    <li>
                        <b>文本/自然语言处理场景：</b>
                        地铁运营舆情分析、基于历史案例的故障解决方案匹配。
                    </li>
                    <li>
                        <b>其它各类预测场景：</b>
                        轨道交通客流量预测。
                    </li>
                </ul>
                <h3>1.2 产品架构</h3>
                <h3>1.2.1产品功能架构</h3>
                <p>
                    提供算法集成平台，提供场景化新建或扩展的能力，避免过多的公共模块重复建设，降低软件应用投入成本；支持第三方合作伙伴的模型集成，加速AI应用落地。
                </p>
                <img
                    class="help-img"
                    src="../../assets/img/help-item-1.png"
                    alt="产品功能架构"
                />
                <h3>1.2.2产品工作流程</h3>
                <img
                    class="help-img"
                    src="../../assets/img/help-item-2.png"
                    alt="产品工作流程"
                />
                <h3>1.3 产品优势</h3>
                <p>
                    支持丰富的机器学习算法、一站式的机器学习体验、主流的机器学习框架及可视化的建模方式。面向城市轨道交通业务场景，构建专用业务场景模型。
                </p>
                <h3>1.3.1 丰富的机器学习算法</h3>
                <img
                    src="../../assets/img/help-item-01.jpg"
                    alt="丰富的机器学习算法"
                />
                <h3>1.3.2 一站式的机器学习体验</h3>
                <p>
                    支持从数据上传、数据预处理、特征工程、模型训练、模型评估到模型发布的机器学习全流程。
                </p>
                <h3>1.3.3 可视化的建模方式</h3>
                <ul>
                    <li>支持使用拖拽的方式搭建机器学习实验。</li>
                    <li>
                        支持使用内置的AI引擎进行调参，实现模型参数自动探索、模型效果自动评估、模型自动向下传导及模型自动优化。
                    </li>
                </ul>
                <br />
                <h3 id="model-2">2 数据准备</h3>

                <h3>2.1 通过使用数据中台数据集的方式注册数据集</h3>
                <p>
                    查看数据中台的数据列表，数据结构、查看数据内容，操作使用数据。支持模糊匹配查询。
                </p>
                <img
                    class="help-img"
                    src="../../assets/img/help-item-02.jpg"
                    alt="产品工作流程"
                />
                <h3>2.2 通过导入数据集文件的方式注册数据集</h3>
                <p>
                    如果本地有csv文件，可以通过“注册数据集”的方式注册数据集。
                </p>
                <p>（1）上传数据集页面：</p>
                <img
                    class="help-img"
                    src="../../assets/img/help-item-03.jpg"
                    alt="产品工作流程"
                />
                <p>（2）数据集创建成功后如下所示：</p>
                <img
                    class="help-img"
                    src="../../assets/img/help-item-04.jpg"
                    alt="产品工作流程"
                />
                <p>（3）后台参数说明（用户无需操作）</p>
                <table>
                    <tr>
                        <th>参数</th>
                        <th>描述</th>
                    </tr>
                    <tr>
                        <td>数据集名称</td>
                        <td>
                            长度为1~30个字符，以小写字母、大写字母、数字或中文开头，可以包含下划线（_）或短划线（-）。
                        </td>
                    </tr>
                    <tr>
                        <td>数据类型</td>
                        <td>仅仅支持scv格式。</td>
                    </tr>
                    <tr>
                        <td>数据上传</td>
                        <td>将本地CSV文件拖拽至数据上传下的上传区域。</td>
                    </tr>
                    <tr>
                        <td>存储路径</td>
                        <td>存储到服务器的指定目录下。</td>
                    </tr>
                </table>

                <h3>2.3 智能标注</h3>
                <p>
                    此部分主要实现了为原始数据增加数据标签的功能，基于主动学习算法原理，解决了轨道交通智能应用开发过程中在数据标签制作过程中浪费大量人力的情况，将既有的人工标注转变为自动化标注，大大提升了轨道交通智能应用开发效率。
                </p>
                <p>数据标注，主要包含以下几个功能：</p>
                <p>（1）数据可视化，辅助用户标注文本数据。</p>
                <p>（2）进度条，用来指示数据标注的进度。</p>
                <p>（3）数据集导入导出功能。</p>
                <p>
                    （4）异常分类，用户可以自己添加异常名称和异常说明，便于管理。
                </p>
                <p>标注过程如下图所示：</p>
                <img
                    class="help-img"
                    src="http://47.95.214.123:8080/media/gif/operation-item-5.gif"
                    alt=""
                />
                <p>操作及实现流程：</p>
                <p>
                    （1）创建标注任务：在数据集管理页面，可进入标注平台，展示数据集得参数信息，展示数据集列名列表，配置唯一标识符id、配置要可视化数据得列名、配置标注修改列名（可为空，系统将自动添加标注列）。
                </p>
                <p>
                    （2）数据可视化：通过用户所选配置参数，提取时序数据得特征，如平均值、标准差、中位数等，形成直方图及展示，当前待标注时序数据折线图展示，来辅助人工决策标注。
                </p>
                <p>
                    （3）数据标注：人工标注数据集（用户在页面通过点击、正例、反例来标识每条数据是否正常），可以将异常数据，添加到异常分类当中。
                </p>
                <p>
                    （4）智能标注：通过提取时序数据的特征值，结合机器学习特征提取和异常检测实现智能标注，利用CBOW和Skip-Gram对时序数据得值语义进行建模，捕获时序特征。提高标注工作的效率。
                </p>
                <p>
                    （5）导出与使用：标注完成后，便可以进入机器学习平台使用标注过后的数据集作为基础数据，训练模型，也可以将标注完得数据导出数据集，下载到本地。
                </p>
                <br />
                <h3 id="model-3">3 模型开发和训练</h3>
                <p>
                    支持使用模板或手动创建实验。通过模板可以快速创建实验，运行成功后，直接进行模型部署。手动创建实验时，系统提供多种算法组件，并支持接入多种数据源。
                </p>
                <p>
                    进行模型训练时，系统支持自动调参、自动化部署、在线调试和模型管理功能，辅助您获得最佳模型。
                </p>
                <p>提供的算法组件包括：</p>
                <ul>
                    <li>
                        传统机器学习组件-包括数据预处理、特征工程、统计分析、时间序列、文本分析及网络分析等算法组件。
                    </li>
                    <li>
                        深度学习框架组件-包括TensorFlow、Yolo及PyTorch等深度学习框架。
                    </li>
                </ul>
                <h3>3.1 入门介绍</h3>
                <ul>
                    <li>一个完整的实验包括以下步骤：</li>
                    <li>1.创建项目</li>
                    <li>
                        通过项目管理资源、权限及实验。您可以在每个项目中创建多个实验。
                    </li>
                    <li>2.输入数据集</li>
                    <li>
                        将第2章所创建的数据集，拖拽到画布中。
                    </li>
                    <li>3.数据预处理</li>
                    <li>
                        对生数据进行转化，使其更加适应算法的输入要求。
                    </li>
                    <li>4.可视化算法建模</li>
                    <li>
                        在画布中，通过拖拽式操作进行算法建模，生成训练模型。同时，实验中涉及的源数据和过程数据均可以可视化，便于用户掌握实验进度和效果。
                    </li>
                    <li>5.评估模型与查看分析报告</li>
                    <li>
                        对模型预测集使用训练模型进行预测，评估模型准确性。
                    </li>
                </ul>
                <h3>3.2 创建项目</h3>
                <p>
                    在开始一次数据分析过程之前，用户应当在“模型开发和训练”页面创建一个新的项目，具体方式如下：
                </p>
                <h3>3.2.1创建新项目</h3>
                <h3>3.2.2填写项目信息</h3>
                <h3>3.2.3进入机器学习页面（页面主要功能介绍）</h3>
                <h3>3.3 配置参数</h3>
                <img
                    class="help-img"
                    src="http://47.95.214.123:8080/media/gif/operation-item-3.gif"
                    alt=""
                />
                <h3>3.4 运行实验</h3>
                <p>
                    当模型拖拽完成后，点击运行开始运行试验，运行通过的节点会有记录运行状态，运行异常的节点会有弹框提示，运行全部完成后，生成模型。
                </p>
                <img
                    class="help-img"
                    src="http://47.95.214.123:8080/media/gif/operation-item-4.gif"
                    alt=""
                />
                <h3>3.5 数据可视化</h3>
                <img
                    class="help-img"
                    src="http://47.95.214.123:8080/media/gif/operation-item-1.gif"
                    alt=""
                />
                <br />
                <img
                    class="help-img"
                    src="http://47.95.214.123:8080/media/gif/operation-item-2.gif"
                    alt=""
                />
                <h3>3.6 常规学习组件</h3>
                <h3>3.6.1 数据预处理</h3>
                <ul>
                    <li>随机采样</li>
                    <li>分层采样</li>
                    <li>特征离散</li>
                    <li>拆分</li>
                    <li>类型转换</li>
                    <li>哑变量处理</li>
                    <li>标准化</li>
                    <li>归一化</li>
                    <li>因子化处理</li>
                    <li>缺失值填充</li>
                    <li>不平衡处理</li>
                </ul>
                <h3>3.6.2 特征工程</h3>
                <ul>
                    <li>特征尺度变换</li>
                    <li>特征异常平滑</li>
                    <li>特征离散</li>
                    <li>生成统计类特征</li>
                    <li>奇异值分解(SVD)</li>
                    <li>主成分分析(PCA)</li>
                    <li>特征重要性评估</li>
                    <li>随机森林特征重要性</li>
                    <li>过滤式特征选择</li>
                    <li>特征编码</li>
                    <li>异常检测模块</li>
                </ul>
                <h3>3.6.3 选择算法</h3>
                <ul>
                    <li>分类-KNN</li>
                    <li>逻辑回归</li>
                    <li>分类-支持向量机</li>
                    <li>分类-随机森林</li>
                    <li>回归算法</li>
                    <li>回归-支持向量机</li>
                    <li>回归-随机森林</li>
                    <li>kMeans</li>
                    <li>DBSCAN</li>
                </ul>
                <h3>3.6.4 算法评估</h3>
                <ul>
                    <li>二分类评估</li>
                    <li>多分类评估</li>
                    <li>回归评估</li>
                    <li>聚类评估</li>
                </ul>
                <h3 id="model-4">4 模型管理</h3>
                <p>通过机器学习生成的模型且未部署到服务器的模型列表。</p>
                <br />
                <h3 id="model-5">5 模型部署</h3>
                <p>已部署的模型列表</p>
                <h3>5.1服务详情</h3>
                <p>查看模型的基本信息、服务器的配置信息。</p>
                <p>在线调用模型接口 输入数据返回输出结果。</p>
                <h3>5.2事件查看</h3>
                <table>
                    <tr>
                        <th>事件名称</th>
                        <th>记录内容</th>
                    </tr>
                    <tr>
                        <td>启动</td>
                        <td>时间、事件描述</td>
                    </tr>
                    <tr>
                        <td>停止</td>
                        <td>时间、事件描述</td>
                    </tr>
                    <tr>
                        <td>部署</td>
                        <td>时间、事件描述</td>
                    </tr>
                    <tr>
                        <td>导入</td>
                        <td>时间、事件描述</td>
                    </tr>
                    <tr>
                        <td>导出</td>
                        <td>时间、事件描述</td>
                    </tr>
                </table>

                <h3>5.3日志查看</h3>
                <p>模型被调用时进行记录，具备时间检索功能。</p>
                <h3>5.4监控信息</h3>
                <p>通过可视化图表的形式，展示CPU 、内存、GPU的资源使用情况。</p>
                <h3>5.5部署配置</h3>
                <p>通过调整服务的开闭状态实现模型部署占用资源的调整。</p>
                <table>
                    <tr>
                        <th>服务名称</th>
                        <th>服务状态</th>
                    </tr>
                    <tr>
                        <td>模型部署</td>
                        <td>开启/关闭</td>
                    </tr>
                    <tr>
                        <td>服务日志</td>
                        <td>开启/关闭</td>
                    </tr>
                    <tr>
                        <td>服务监控</td>
                        <td>开启/关闭</td>
                    </tr>
                    <tr>
                        <td>在线调试</td>
                        <td>开启/关闭</td>
                    </tr>
                </table>

                <br />
                <h3 id="model-6">6 常见问题</h3>
                <p>
                    浏览器兼容性问题-机器学习模块的拖拽组件，目前支持chrome浏览器运行，其它内核浏览器暂不支持。
                </p>
                <br />
            </div>
            <div class="list-container">
                <h2>文章目录</h2>
                <ul>
                    <li :class="{ active: currentItem === 1 }">
                        <a href="#model-1">1 产品介绍</a>
                    </li>
                    <li :class="{ active: currentItem === 2 }">
                        <a href="#model-2">2 数据准备</a>
                    </li>
                    <li :class="{ active: currentItem === 3 }">
                        <a href="#model-3">3 模型开发和训练</a>
                    </li>
                    <li :class="{ active: currentItem === 4 }">
                        <a href="#model-4">4 模型管理</a>
                    </li>
                    <li :class="{ active: currentItem === 5 }">
                        <a href="#model-5">5 模型部署</a>
                    </li>
                    <li :class="{ active: currentItem === 6 }">
                        <a href="#model-6">6 常见问题</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'help',
    data() {
        return {
            currentItem: 1
        };
    },
    mounted() {
        // 监听屏幕滚动事件
        this.$refs.tree.addEventListener(
            'scroll',
            e => {
                console.log('相对距离', this.$refs.tree.scrollTop);
                if (this.$refs.tree.scrollTop < 1700) {
                    this.currentItem = 1;
                } else if (this.$refs.tree.scrollTop < 2900) {
                    this.currentItem = 2;
                } else if (this.$refs.tree.scrollTop < 7600) {
                    this.currentItem = 3;
                } else if (this.$refs.tree.scrollTop < 7700) {
                    this.currentItem = 4;
                } else if (this.$refs.tree.scrollTop < 8000) {
                    this.currentItem = 5;
                } else {
                    this.currentItem = 6;
                }
            },
            false
        );
        this.$store.commit('changeMenuIndex', '');
    }
};
</script>

<style scoped lang="scss">
.bg {
    padding: 20px;
}
.help-box {
    height: calc(100vh - 100px);
    background-color: #fff;
    border-top-left-radius: 50px;
    padding: 30px 30px 20px;
    box-sizing: border-box;
    box-shadow: 1px 2px 3px #e5e5e5;
    text-align: left;
    width: calc(100vw - 200px);
    overflow: auto;
    .content {
        width: 800px;
        float: left;
    }
    .list-container {
        position: fixed;
        left: 1140px;
        width: 250px;
        border: 1px solid #efefef;
        border-radius: 3px;
        box-shadow: 0 12px 30px 0 rgba(237, 240, 241, 0.5);
        background: #fff;
        padding: 20px;
        h2 {
            margin: 0;
            padding: 0;
            font-size: 16px;
            color: #666;
        }
        ul {
            list-style: none;
            margin: 10px 0 0 0;
            padding: 0;
            li {
                font-size: 15px;

                line-height: 30px;
                padding-bottom: 4px;
                cursor: pointer;
                a {
                    text-decoration: none;
                    color: #666;
                }
                a:hover {
                    color: #ff5c00;
                    transform: all 0.2s;
                }
            }
            li.active {
                a {
                    color: #ff5c00;
                }
            }
        }
    }
    .pagination-line {
        background-color: #fff;
        padding: 20px 20px 10px;
        text-align: right;
    }
    .model-status {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
        background-color: #666666;
        vertical-align: middle;
        margin-right: 6px;
    }
    h3 {
        font-size: 15px;
        color: #333;
    }
    p {
        color: #666;
        font-size: 15px;
        line-height: 30px;
    }
    .help-img {
        width: 800px;
        display: block;
    }
    ul {
        list-style: disc;
        padding: 0 0 0 16px;
        margin: 0;
        li {
            line-height: 30px;
            font-size: 15px;
            color: #666;
        }
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 800px;
        tr {
            td {
                border: 1px solid #ddd;
                padding: 8px 10px;
                font-size: 15px;
                line-height: 30px;
            }
            th {
                border: 1px solid #ddd;
                padding: 8px 10px;
                background: #eee;
                font-size: 15px;
                text-align: left;
            }
        }
    }
}
</style>
