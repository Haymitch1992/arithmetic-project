### 算法中台 拖拽组件


[VUE DAG diagram ]( https://murongqimiao.github.io/DAG-diagram/#/example)

===========
[for English guide , click there](https://github.com/murongqimiao/DAG-diagram/blob/master/README_EN.md)


[具体展示页,可以改右侧json看效果](https://murongqimiao.github.io/DAG-diagram/#/example)


在此基础上进行的二次开发

## 使用方法
- 基础安装
```
npm install --save dag-board
```
vue项目的main.js中
```
import DAGBoard from 'dag-board'
Vue.use(DAGBoard)
```
具体文件里中
```
    <DAGBoard :DataAll="DataAll" @updateDAG="updateDAG" @editNodeDetails="editNodeDetails"></DAGBoard>
```
```
DataAll: 数据源
updateDAG:每次动作行为会抛出最新的数据, 和对应事件名称.
editNodeDetails: 可选内容,右键点击节点会带出节点数据,用此方法接受, 进行二次开发.比如更改节点携带的数据等.
```

- 高级安装 (动态添加节点的时候模拟用)
```
    <node-bus v-if="nodeBusDragging" //  是否正在添加节点
    :value="nodeName"                       //   模拟的节点名称
    :pos_x="nodeBusPositionX"          //   动态赋值 鼠标位置的x坐标 
    :pos_y="nodeBusPositionY" />      //   动态赋值 鼠标位置的y坐标
```
`以上内容均可前往github 下载项目查看使用过程, 熟练使用vue即可无障碍阅读代码.`

### 数据源的扩展性 / 样式自定义
为了更多同学能友好体验,在github右侧有JSON模拟器.使用如下图.
- 节点自定义
![节点自定义.gif](https://user-gold-cdn.xitu.io/2019/9/3/16cf62377ad04cab?w=480&h=272&f=gif&s=1433004)
```
一份完整的节点包括以下几个内容
{
			"id": 1,                             // 节点id
			"in_ports": [ 0 ],                   // 入口下标
			"name": "NODE_PARENT",               // 节点名称
			"out_ports": [ 0, 1 ],               // 出口下标
			"pos_x": 157,                        // 节点坐标 距离左侧
			"pos_y": 120,                        // 节点坐标 距离顶部
			"nodeStyle": {                       /* 非必要 节点样式 */ 
				"border": "2px solid red"
			},
			"iconStyle": {                       /* 非必要 节点icon样式 */
				"background": "red"
			},
			"iconClassName": "el-icon-link",     /* 非必要  节点icon的类名 */
			"nameDescribe": "气泡内容",           /* 非必要 气泡内容 */               
		},
```

- 节点关系自定义
![节点关系自定义gif.gif](https://user-gold-cdn.xitu.io/2019/9/3/16cf62376ae8ea72?w=480&h=272&f=gif&s=1817977)
```
// 一份完整的节点关系包括以下几个内容
"edges": [
		{
			"dst_input_idx": 0,  // 来源节点出口的下标
			"dst_node_id": 2,    // 来源节点的id
			"id": 1,             // 节点的id
			"src_node_id": 1,    // 目标节点的id
			"src_output_idx": 0  // 目标节点的入口下标
            "style": { }      /* 非必要 自定义节点样式 */
		}
	],
```






