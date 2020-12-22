<template>
  <div class="demonStation">
    <!--模板菜单-->
    <div class="model-menu">
      <!--创建实验-->
      <div class="step-1" v-if="this.$store.state.step===1">
        <div class="popover-contaienr">
          <h3>操作提示</h3>
          <p>(1/5)首先创建一个实验</p>
          <el-button type="primary" size="mini" @click="closeTips()" class="popover-button">知道了</el-button>
        </div>
        <span  class="click-box"></span>
      </div>
      <div class="step-2" v-if="this.$store.state.step===2">
        <div class="popover-contaienr">
          <h3>操作提示</h3>
          <p>(2/5)选择组件模块，挑选实验所需的组件</p>
          <el-button type="primary" size="mini" @click="closeTips()" class="popover-button">知道了</el-button>
        </div>
          <span class="click-box"></span>
      </div>
      <div class="step-3" v-if="this.$store.state.step===3">
        <div class="popover-contaienr">
          <h3>操作提示</h3>
          <p>(3/5)选择数据集并拖入右侧幕布</p>
          <el-button type="primary" size="mini" @click="closeTips()" class="popover-button">知道了</el-button>
        </div>
          <span class="click-box"></span>
      </div>
    </div>
    <div class="right-box">
      <div class="step-4" v-if="this.$store.state.step===4">
         <div class="popover-contaienr">
          <h3>操作提示</h3>
          <p>(4/5)设置参数</p>
          <el-button type="primary" size="mini" @click="closeTips()" class="popover-button">知道了</el-button>
        </div>
          <span class="click-box"></span>
      </div>
      <div class="step-5" v-if="this.$store.state.step===5">
         <div class="popover-contaienr">
          <h3>操作提示</h3>
          <p>(5/5)运行当前节点</p>
          <el-button type="primary" size="mini" @click="closeTips()" class="popover-button">知道了</el-button>
        </div>
          <span class="click-box"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            step: this.$store.state.step
        };
    },
    mounted() {
        if (this.step === 2) {
            this.$store.commit("changeCount", 1);
        } else {
            this.$store.commit("changeCount", 0);
        }
    },
    methods: {
        // 关闭当前提示
        closeTips() {
            this.step++;
            this.$store.commit("changeStep", this.step);
            switch (this.step) {
                case 2:
                    break;
                case 3:
                    this.$store.commit("changeCount", 0);
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    this.$store.commit("changeDemoStaion", false);
                    break;
            }
        }
    }
};
</script>
<style scoped lang="scss">
.demonStation {
    position: absolute;
    width: calc(100%);
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    z-index: 100;
    .popover-contaienr {
        width: 240px;
        background: #1777ff;
        color: #fff;
        padding: 16px 20px;
        border-radius: 6px;
        position: absolute;
        .popover-button {
            background: #fff;
            color: #666;
            float: right;
        }
        h3 {
            font-size: 15px;
            margin-bottom: 0;
            margin-top: 0px;
        }
        p {
            font-size: 14px;
            line-height: 24px;
            margin-top: 8px;
            margin-bottom: 8px;
        }
    }
    .right-box {
        width: calc(100% - 310px);
        height: 100vh;
        float: right;
        position: relative;
        .step-4 {
            position: absolute;
            top: 70px;
            right: 250px;
            width: 60px;
            height: 80px;
            padding-bottom: 10px;
            .click-box {
                width: 300px;
                height: 500px;
                display: block;
                border: 2px solid #1677ff;
                border-radius: 6px;
            }
            .popover-contaienr {
                bottom: -48px;
                left: -300px;
            }
        }
        .step-5 {
            position: absolute;
            top: 104px;
            left: 4px;
            width: 60px;
            height: 80px;
            padding-bottom: 10px;
            .click-box {
                width: 60px;
                height: 40px;
                display: block;
                border: 2px solid #1677ff;
                border-radius: 6px;
            }
            .popover-contaienr {
                bottom: -48px;
                left: 80px;
            }
        }
    }
    .model-menu {
        width: 310px;
        height: 100vh;
        float: left;
        position: relative;
        .step-1 {
            position: absolute;
            bottom: 10px;
            left: 60px;
            width: 100%;
            height: 40px;
            padding-bottom: 10px;
            .popover-contaienr {
                bottom: 70px;
                left: -14px;
            }
            .click-box {
                width: 240px;
                height: 54px;
                display: block;
                border: 2px solid #1777ff;
                border-radius: 6px;
            }
        }
        .click-box {
            width: 64px;
            height: 54px;
            display: block;
            border: 2px solid #1677ff;
            border-radius: 6px;
        }
        .step-btn {
            width: 100%;
            height: 100%;
            opacity: 0;
        }
        .step-2 {
            position: absolute;
            top: 240px;
            width: 60px;
            height: 40px;
            padding-bottom: 10px;
            .popover-contaienr {
                bottom: -54px;
                left: 70px;
            }
            .click-box {
                width: 54px;
                height: 54px;
                display: block;
                border: 2px solid #1677ff;
                border-radius: 6px;
            }
        }
        .step-3 {
            position: absolute;
            top: 70px;
            left: 74px;
            width: 60px;
            height: 40px;
            padding-bottom: 10px;
            z-index: 100;
            .popover-contaienr {
                bottom: -86px;
                left: 240px;
            }
            .click-box {
                width: 220px;
                height: 400px;
                display: block;
                border: 2px solid #1677ff;
                border-radius: 6px;
            }
        }
    }
}
</style>
