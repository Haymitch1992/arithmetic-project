<template>
  <div>
   <!-- 数据集数据展示 -->
        <el-dialog
            title="查看日志"
             class="dataView"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <div style="max-height:60vh;overflow-y:auto;">
                <pre style="color:#fff;">
                    2020-12-02 10:02:39 INFO Current task status:RUNNING
                    2020-12-02 10:02:39 INFO Start execute shell on node sh-base-biz-gateway16.cloud.em14.
                    2020-12-02 10:02:39 INFO Current working dir /home/admin/alisatasknode/taskinfo/20201202/phoenix/10/02/38/rkmd7hqybrij4v6vm39xhti7
                    2020-12-02 10:02:39 INFO Full Command ..
                    2020-12-02 10:02:39 INFO -------------------------
                    2020-12-02 10:02:39 INFO -------------------------
                    2020-12-02 10:02:39 INFO List of passing environment ..
                    2020-12-02 10:02:39 INFO -------------------------
                    2020-12-02 10:02:39 INFO SKYNET_ENDPOINT=http://service.odps.aliyun.com/api:
                    2020-12-02 10:02:39 INFO SKYNET_PTYPE=1002:
                    2020-12-02 10:02:39 INFO SKYNET_ACTIONID=1:
                    2020-12-02 10:02:39 INFO SKYNET_RERUN_MODE=1:
                    2020-12-02 10:02:39 INFO SKYNET_FLOW_PARAVALUE=group:adidas:
                    2020-12-02 10:02:39 INFO SKYNET_ONDUTY=1067193273167722:
                    2020-12-02 10:02:39 INFO SKYNET_SYSTEMID=:
                    2020-12-02 10:02:39 INFO CALC_ENGINE_IDENTIFIER=onnknjkn:
                    2020-12-02 10:02:39 INFO SKYNET_SOURCEID=346688:
                    2020-12-02 10:02:39 INFO SKYNET_PARAVALUE=1067193273167722 PROD 1871361 http://100.67.93.146/ fromPaiweb:
                    2020-12-02 10:02:39 INFO SKYNET_TASKID=706984864928:
                    2020-12-02 10:02:39 INFO SKYNET_TENANT_ID=207837732049473:
                    2020-12-02 10:02:39 INFO SKYNET_ID=-1:
                    2020-12-02 10:02:39 INFO SKYNET_JOBID=700164099029:
                    2020-12-02 10:02:39 INFO SKYNET_NODENAME=类型转换-1:
                    2020-12-02 10:02:39 INFO SKYNET_CYCTYPE=0:
                    2020-12-02 10:02:39 INFO SKYNET_TASK_INPUT={}:
                    2020-12-02 10:02:39 INFO SKYNET_TIMEZONE=GMT+8:
                    2020-12-02 10:02:39 INFO SKYNET_EXENAME=:
                    2020-12-02 10:02:39 INFO IS_NEW_SCHEDULE=true:
                    2020-12-02 10:02:39 INFO SKYNET_DAGTYPE=4:
                    2020-12-02 10:02:39 INFO SKYNET_SOURCENAME=group_207837732049473_dev:
                    2020-12-02 10:02:39 INFO SKYNET_SYSTEM_ENV=prod:
                    2020-12-02 10:02:39 INFO SKYNET_GMTDATE=20201202:
                    2020-12-02 10:02:39 INFO SKYNET_ENVTYPE=1:
                    2020-12-02 10:02:39 INFO SKYNET_BIZDATE=20201201:
                    2020-12-02 10:02:39 INFO SKYNET_CYCTIME=20201202000000:
                    2020-12-02 10:02:39 INFO SKYNET_FAILOVER_HANDLER=1:
                    2020-12-02 10:02:39 INFO SKYNET_CONNECTION=***************:
                    2020-12-02 10:02:39 INFO SKYNET_DAG_INPUT={}:
                    2020-12-02 10:02:39 INFO SKYNET_ONDUTY_WORKNO=1067193273167722:
                    2020-12-02 10:02:39 INFO SKYNET_APP_ID=138764:
                    2020-12-02 10:02:39 INFO SKYNET_APPNAME=onnknjkn:
                    2020-12-02 10:02:39 INFO SKYNET_PRIORITY=1:
                    2020-12-02 10:02:39 INFO KILL_SIGNAL=SIGKILL:
                    2020-12-02 10:02:39 INFO SKYNET_RERUN_TIME=0:
                    2020-12-02 10:02:39 INFO SKYNET_REGION=cn-shanghai:
                    2020-12-02 10:02:39 INFO TASK_PLUGIN_NAME=pai_ml:
                    2020-12-02 10:02:39 INFO ALISA_TASK_ID=T3_1727038426:
                    2020-12-02 10:02:39 INFO ALISA_TASK_EXEC_TARGET=group_207837732049473_dev:
                    2020-12-02 10:02:39 INFO ALISA_TASK_PRIORITY=1:
                    2020-12-02 10:02:39 INFO --- Invoking Shell command line now ---
                    2020-12-02 10:02:39 INFO =================================================================
                    LOGBACK: No context given for ch.qos.logback.classic.encoder.PatternLayoutEncoder@d8355a8
                    JobId: 1871361-706984864928, Worker: null, JCS version: basein, max parallelism: 30
                    Execution Plan:
                    ____Nodes:
                    ________ #1[sql]([onnknjkn] drop table if exists pai_temp_180461_1871361_1)
                    ________ #2[odpscmd]
                    ____Dependencies:
                    ________[1] -> [2]
                    [1] start subJob: #1[sql]([onnknjkn] drop table if exists pai_temp_180461_1871361_1)
                    [1] user accessId :TMP.3KhJtNMFz1pgyAbD6qeAcdAJDN5AhKArhUi81GqXmcnEjC8qwFNrz8fVEh9mQQVZb5H2AghNbDEce2YCyM2tCPQPk86Gnu
                    [1] execute SQL after replacement : drop table if exists pai_temp_180461_1871361_1
                    [1] execute endpoint : http://service.odps.aliyun.com/api
                    [1] OdpsInstanceId: 20201202020242824g2ghlssa callback success
                    [1] Your job priority is 0
                    [1] current class is OdpsStartHandler
                    [1] OdpsInstanceId: 20201202020242824g2ghlssa
                    [1] http://logview.odps.aliyun.com/logview/?h=http://service.odps.aliyun.com/api&p=onnknjkn&i=20201202020242824g2ghlssa&token=T3RGdUVZV0lvNkNScTg0c3lsY0JEYW84WEdnPSxPRFBTX09CTzoxMDY3MTkzMjczMTY3NzIyLDE2MDY5NjA5NjMseyJTdGF0ZW1lbnQiOlt7IkFjdGlvbiI6WyJvZHBzOlJlYWQiXSwiRWZmZWN0IjoiQWxsb3ciLCJSZXNvdXJjZSI6WyJhY3M6b2RwczoqOnByb2plY3RzL29ubmtuamtuL2luc3RhbmNlcy8yMDIwMTIwMjAyMDI0MjgyNGcyZ2hsc3NhIl19XSwiVmVyc2lvbiI6IjEifQ==
                    [1] OK
                    [1] run subJob: #1[sql]([onnknjkn] drop table if exists pai_temp_180461_1871361_1) successfully!
                    [2] start subJob: #2[odpscmd]
                    [2] Start OdpsCmdHandler:jobId=1871361-706984864928
                    [2] local log file = /home/admin/alisatasknode/taskinfo//20201202/phoenix/10/02/38/rkmd7hqybrij4v6vm39xhti7//T3_1727038426_jcs.log
                    [2] user accessId :TMP.3KhJtNMFz1pgyAbD6qeAcdAJDN5AhKArhUi81GqXmcnEjC8qwFNrz8fVEh9mQQVZb5H2AghNbDEce2YCyM2tCPQPk86Gnu
                    [2] execute command : set biz_id=1067193273167722^paistudio^TMP.3KhJtNMFz1pgyAbD6qeAcdAJDN5AhKArhUi81GqXmcnEjC8qwFNrz8fVEh9mQQVZb5H2AghNbDEce2YCyM2tCPQPk86Gnu^2020-12-02; PAI -name type_transform_v1 -project algo_public -Dlifecycle="28" -DreserveOldFeat="false" -Ddefault_int_value="0" -DoutputTable="pai_temp_180461_1871361_1" -DinputTable="pai_online_project.wumai_data" -Ddefault_double_value="0.0" -Dcols_to_double="time,hour,pm2,pm10,so2,co,no2";
                    [2] execute endpoint : http://service.odps.aliyun.com/api
                    [2] instance priority : 8
                    [2] OK
                    [2] ID = 20201202020244720g5c4vwy9
                    [2] Odps Instance Id = 20201202020244720g5c4vwy9
                    [2] OdpsInstanceId: 20201202020244720g5c4vwy9 callback success
                    [2] Sub Instance ID = 20201202020248294g0306rsa_cdcda73c_10e8_47fe_8168_c0a625b65afe
                    [2] SubOdpsInstanceId: 20201202020248294g0306rsa_cdcda73c_10e8_47fe_8168_c0a625b65afe callback success
                    [2] http://logview.odps.aliyun.com/logview/?h=http://service.odps.aliyun.com/api&p=onnknjkn&i=20201202020248294g0306rsa_cdcda73c_10e8_47fe_8168_c0a625b65afe&token=aURPaVdoWGJoSkYvd0Jqd3dEb0Y2V21jamY4PSxPRFBTX09CTzoxMDY3MTkzMjczMTY3NzIyLDE2MDk0NjY1NjkseyJTdGF0ZW1lbnQiOlt7IkFjdGlvbiI6WyJvZHBzOlJlYWQiXSwiRWZmZWN0IjoiQWxsb3ciLCJSZXNvdXJjZSI6WyJhY3M6b2RwczoqOnByb2plY3RzL29ubmtuamtuL2luc3RhbmNlcy8yMDIwMTIwMjAyMDI0ODI5NGcwMzA2cnNhX2NkY2RhNzNjXzEwZThfNDdmZV84MTY4X2MwYTYyNWI2NWFmZSJdfV0sIlZlcnNpb24iOiIxIn0=
                    [2] type_transform: 2020-12-02 10:02:50 MapTask_job:0/0/0[0%]
                    [2] Sub Instance ID = 20201202020246290gj206rsa_bfbe7dd7_90e0_47e9_8be9_fe65a8301042
                    [2] SubOdpsInstanceId: 20201202020246290gj206rsa_bfbe7dd7_90e0_47e9_8be9_fe65a8301042 callback success
                    [2] http://logview.odps.aliyun.com/logview/?h=http://service.odps.aliyun.com/api&p=onnknjkn&i=20201202020246290gj206rsa_bfbe7dd7_90e0_47e9_8be9_fe65a8301042&token=MUR4bFoyNGZYU3ZEeC9sTWR3L1RtWkN5QUNrPSxPRFBTX09CTzoxMDY3MTkzMjczMTY3NzIyLDE2MDk0NjY1NzAseyJTdGF0ZW1lbnQiOlt7IkFjdGlvbiI6WyJvZHBzOlJlYWQiXSwiRWZmZWN0IjoiQWxsb3ciLCJSZXNvdXJjZSI6WyJhY3M6b2RwczoqOnByb2plY3RzL29ubmtuamtuL2luc3RhbmNlcy8yMDIwMTIwMjAyMDI0NjI5MGdqMjA2cnNhX2JmYmU3ZGQ3XzkwZTBfNDdlOV84YmU5X2ZlNjVhODMwMTA0MiJdfV0sIlZlcnNpb24iOiIxIn0=
                    [2] OK
                    [2] Execute Odpscmd Success!
                    [2] run subJob: #2[odpscmd] successfully!
                    Run job successfully, time taken: 20s
                    2020-12-02 10:03:02 INFO =================================================================
                    2020-12-02 10:03:02 INFO Exit code of the Shell command 0
                    2020-12-02 10:03:02 INFO --- Invocation of Shell command completed ---
                    2020-12-02 10:03:02 INFO Shell run successfully!
                    2020-12-02 10:03:02 INFO Current task status: FINISH
                    2020-12-02 10:03:02 INFO Cost time is: 22.01s
                    /home/admin/alisatasknode/taskinfo//20201202/phoenix/10/02/38/rkmd7hqybrij4v6vm39xhti7/T3_1727038426.log-END-EOF
                    </pre>
            </div>
        </el-dialog>
  </div>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible: true
        };
    },
    methods: {
        handleClose() {
            this.$store.commit('handleNode', {
                nodeTpye: 'logDialog',
                status: false
            });
        }
    }
};
</script>
<style lang="scss">
.dataView {
    .el-dialog,
    .el-pager li {
        background: #2a2d36 !important;
    }
    .el-dialog__title {
        color: #fff;
    }
    .el-dialog__header {
        border-bottom: 1px solid #3a404c;
    }
}
</style>
