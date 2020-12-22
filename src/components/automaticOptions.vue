<template>
    <div class="automaticOptions">
        <el-dialog title="自动调参" :visible.sync="dialogTableVisible" :before-close="handleClose">
            <el-timeline >
                <el-timeline-item type="primary">
                    <p>算法选择</p>
                    <el-radio-group v-model="from.algorithm"  v-if="step===1">
                        <el-radio label="Grid_Search">Grid_Search</el-radio>
                        <el-radio label="Random_Search">Random_Search</el-radio>
                        <el-radio label="Evolutionary_optimizer">Evolutionary_optimizer</el-radio>
                    </el-radio-group>
                    <p v-if="step>1">{{from.algorithm}}</p>
                </el-timeline-item>
                <el-timeline-item :type="step>1?'primary':''">
                    <span>调参配置</span>
                    <el-form ref="form"  label-width="120px" v-if="step>1">
                        <el-form-item label="数据拆分比例">
                            <el-select placeholder="请选择">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="网格拆分数">
                            <el-select placeholder="请选择">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="数据拆分比例">
                            <el-input placeholder="请输入数据拆分比例" style="width: 230px;"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-table
                            border
                            v-if="step>1"
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="参数"
                                align="center"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="默认范围"
                                align="center"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                label="自定义范围"
                                align="center"
                                prop="自定义范围"
                                >
                        </el-table-column>
                    </el-table>
                </el-timeline-item>
                <el-timeline-item :type="step>2?'primary':''">
                    安装完毕
                </el-timeline-item>
            </el-timeline>
            <div slot="footer" class="dialog-footer">
                <el-button @click="prev()">上一步</el-button>
                <el-button type="primary" @click="next()">下一步</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "automaticOptions",
        props: {
            dialogTableVisible: Boolean
        },
        data() {
            return {
                step: 1, // 第一步
                radio: '',
                from: {
                    algorithm: 'Grid_Search' // 算法选择
                },
                tableData: [{}, {}, {}],
                activities: [{
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, {
                    content: '创建成功',
                    timestamp: '2018-04-11'
                }]
            }
        },
        methods: {
            handleClose() {
                this.$emit('closeOptions')
            },
            next() {
                if (this.step < 3) {
                    this.step++
                } else {
                    // 关闭弹窗
                    this.handleClose()
                }
            },
            prev() {
                if (this.step > 1) {
                    this.step--
                } else {
                    // 关闭弹窗
                    this.handleClose()
                }
            }
        }
    }
</script>

<style>
    .automaticOptions .el-dialog{
        width: 800px;
    }
</style>
