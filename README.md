# arithmetic-platform

## 算法中台

### 安装依赖

```bash
npm install
```

### 运行项目

```bash
npm run dev
```

### 节点模型样例

```javascript
let node = {
        label: '聚类算法',
        nodeSwitch: true,
        nodeItem: [{
            name: 'kMeans', // 节点名称
            component_id: 'kmeans', // 节点名称英文
            node_type: 'item-2', // 节点类型 或 分组
            iconClassName: 'el-icon-loading',
            in_ports: [0],
            tag_type: 'arithmetic3',
            in_ports_text: ['数据输入'],
            in_ports_name: ['csv_path'], // 节点输入的名称
            out_ports: [0],
            is_generate_model: "true",
            out_ports_text: ['输出模型'],
            out_ports_name: ['cluster_data'],// 节点输出的名称
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            "type": 'btn', // 按钮弹框
                            "label": "选择特征", // 当前参数的中文解释
                            "placeholder": "选择要标注修改的表头",
                            "value": {
                                "node_params": {
                                    "select_feature_columns": []
                                }
                            },
                            "tag": "select_feature_columns" // 当前参数名
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            "type": 'input-default', // 输入框
                            "label": "聚类个数",
                            "value": {
                                "node_params": {
                                    "n_clusters": '8'
                                }
                            },
                            "tag": "n_clusters"
                        }
                    ]
                }
            ]
        },
```

### 前端技术栈

- `vue.js` -- MVVM 框架
- `echarts` -- 图表显示库
- `element-ui` -- 样式组件库
- `vuex` -- 状态管理库
- `vue-router` -- 前端路由管理库
- `dag-diagram` -- 可视化拖拽组件库（在开源插件上面进行二次开发的）
