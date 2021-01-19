<template>
    <div class="bg">
        <div class="online-box">
            <h2>算法中台说明文档</h2>
            <h3>1 产品介绍</h3>
            <h3>1.1 算法中台是做什么的？</h3>
            <p>是交控科技旗下的人工智能平台，提供一站式的机器学习解决方案。面向智慧城轨业务体系，提供通用化、高指标AI算法，对大量历史数据进行学习，进而利用生成的经验模型指导业务，使得各类业务系统专注于业务的同时具备智慧化能力。</p>
            <p>目前算法中台主要应用在以下场景：</p>
            <ul>
                <li>设备健康管理：道岔故障诊断、设备剩余寿命分析、车载日志分析（停车精度分析）。</li>
                <li>计算机视觉：无人化机房巡检、施工场地巡检（安全帽检测、吸烟行为检测等）。</li>
                <li>文本/自然语言处理场景：地铁运营舆情分析、基于历史案例的故障解决方案匹配。</li>
                <li>其它各类预测场景：轨道交通客流量预测。</li>
            </ul>
            <h3>1.2 产品架构</h3>
            <h3>1.2.1产品功能架构</h3>
            <p>提供算法集成平台，提供场景化新建或扩展的能力，避免过多的公共模块重复建设，降低软件应用投入成本；支持第三方合作伙伴的模型集成，加速AI应用落地。</p>
            <img class="help-img" src="../../assets/img/help-item-1.png" alt="产品功能架构">
            <h3>1.2.2产品工作流程</h3>
            <img class="help-img" src="../../assets/img/help-item-2.png" alt="产品工作流程">
            <h3>1.3 产品优势</h3>
            <p>支持丰富的机器学习算法、一站式的机器学习体验、主流的机器学习框架及可视化的建模方式。</p>
            <p>提供算法集成平台，提供场景化新建或扩展的能力，避免过多的公共模块重复建设，降低软件应用投入成本；支持第三方合作伙伴的模型集成，加速AI应用落地。</p>
            <h3>1.3.1 丰富的机器学习算法</h3>
            <h3>1.3.2 一站式的机器学习体验</h3>
            <p>支持从数据上传、数据预处理、特征工程、模型训练、模型评估到模型发布的机器学习全流程。</p>
            <h3>1.3.3 可视化的建模方式</h3>
            <ul>
                <li>支持使用拖拽的方式搭建机器学习实验。</li>
                <li>支持使用内置的PAI-AutoML进行调参，实现模型参数自动探索、模型效果自动评估、模型自动向下传导及模型自动优化。</li>
            </ul>
            <h3>2 数据准备</h3>
            <h3>2.1 通过使用数据中台数据集的方式注册数据集</h3>
            <h3>3 模型开发和训练</h3>
            <h3>3.1 入门介绍</h3>
            <ul>
                <li>一个完整的实验包括以下步骤：</li>
                <li>创建项目</li>
                <li>通过项目管理资源、权限及实验。您可以在每个项目中创建多个实验。</li>
                <li>准备数据</li>
                <li>将原始数据上传至MaxCompute或OSS中，并配置实验数据源。</li>
                <li>数据预处理</li>
                <li>对原始数据进行预处理，生成模型训练集和模型预测集。</li>
                <li>数据可视化</li>
                <li>对实验数据进行可视化处理，获取数据信息。</li>
                <li>算法建模</li>
                <li>对模型训练集进行算法建模，生成训练模型。</li>
                <li>评估模型</li>
                <li>对模型预测集使用训练模型进行预测，评估模型准确性。</li>
            </ul>
            <p>ato精度模型示例</p>
            <img class="help-img" src="http://47.95.214.123:8080/media/gif/operation.gif" alt="">
            <h3>3.2 数据预处理（拖拽生成节点树）</h3>
            <h3>3.3 配置参数</h3>
            <h3>3.4 运行实验</h3>
            <h3>3.5 数据可视化</h3>
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
            <h3>4 模型管理</h3>
            <h3>5 模型部署</h3>
            <h3>6 常见问题</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'help'
};
</script>

<style scoped lang="scss">
.bg {
    padding: 20px;
}
.online-box {
    height: calc(100vh - 100px);
    background-color: #fff;
    border-top-left-radius: 50px;
    padding: 30px 30px 20px;
    box-sizing: border-box;
    box-shadow: 1px 2px 3px #e5e5e5;
    overflow: auto;
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
}
</style>
