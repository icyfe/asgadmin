<template>
  <div class="container">
    <div class="item">
      <a>一级栏目:</a>
      <div class="item-select">
        <a-select style="width:70%" v-model="levelone">
          <a-select-option
            v-for="(item, index) in leveldata1"
            :key="index"
            :value="item.columnlevel"
          >{{item.columnlevel}}</a-select-option>
        </a-select>
      </div>
      <div class="item-bt">
        <a-button type="primary" @click="showModal(1)">新增</a-button>
      </div>
    </div>

    <div class="item">
      <a>二级栏目:</a>
      <div class="item-select">
        <a-select style="width:70%" placeholder="请选择栏目" v-model="leveltwo">
          <a-select-option
            v-for="(item, index) in leveldata2"
            :key="index"
            :value="item.columnlevel"
          >{{item.columnlevel}}</a-select-option>
        </a-select>
      </div>
      <div class="item-bt">
        <a-button type="primary" @click="showModal(2)">新增</a-button>
      </div>
    </div>
    <div class="item">
      <a>三级栏目:</a>
      <div class="item-select">
        <a-select style="width:70%" v-model="levelthree">
          <a-select-option
            v-for="(item, index) in leveldata3"
            :key="index"
            :value="item.columnlevel"
          >{{item.columnlevel}}</a-select-option>
        </a-select>
      </div>
      <div class="item-bt">
        <a-button type="primary" @click="showModal(3)">新增</a-button>
      </div>
    </div>
    <!-- <a-button class="bt-submit" type="primary">保存</a-button> -->
    <a-modal
      title="新增栏目"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      cancelText="取消"
      okText="确定"
    >
      <a-input style="width:50%;margin-top:10px" placeholder="请输入栏目名称" @change="addhandelChange"/>
    </a-modal>
    <a-button type="primary" class="bt-submit" @click="submit">保存</a-button>
  </div>
</template>

<script>
import { getnewitem, insertnewscolumn } from "@/api/news";
import { setTimeout, clearTimeout } from "timers";
import { _debounce } from "@/util";
import { message } from "ant-design-vue";
export default {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      inputidsable: false,
      levelone: "请选择栏目",
      leveltwo: "请选择栏目",
      levelthree: "请选择栏目",
      leveldata1: [], //一级栏目获取
      leveldata2: [],
      leveldata3: [],
      newdata: [],
      columnindex: 1,
      addcolumn: "",
      upperlevel: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getnewitem().then(res => {
        let { data } = res;
        if (data.code == 200) {
          this.leveldata1 = data.data;
        }
      });
    },
    addhandelChange: _debounce(function(e) {
      const { value } = e.target;
      const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
      this.addcolumn = value;
      if (regEn.test(this.addcolumn) || regCn.test(this.addcolumn)) {
        message.error("栏目不能包含特殊字符");
        this.addcolumn = "";
        e.target.value = "";
        return;
      }
    }, 500),
    submit() {
      insertnewscolumn({
        column1: this.levelone == "请选择栏目" ? "" : this.levelone,
        column2: this.leveltwo == "请选择栏目" ? "" : this.leveltwo,
        column3: this.levelthree == "请选择栏目" ? "" : this.levelthree
      }).then(res => {
        let { data } = res;
        message.info(data.msg.msg);
        this.visible = false;
        this.confirmLoading = false;
      });
    },
    showModal(type) {
      this.columnindex = type;
      if (type == 2 && this.levelone == "请选择栏目") {
        message.error("请选择上一级栏目");
        return;
      } else if (type == 3 && this.leveltwo == "请选择栏目") {
        message.error("请选择上一级栏目");
        return;
      }
      this.visible = true;
      this.addcolumn = "";
    },
    handleSelect(value) {
      console.log(value);
      this.upperlevel = value;
    },
    handleOk(e) {
      if (this.columnindex == 1) {
        this.addItem(this.leveldata1, this.addcolumn, "levelone");
      } else if (this.columnindex == 2) {
        this.addItem(this.leveldata2, this.addcolumn, "leveltwo");
      } else if (this.columnindex == 3) {
        this.addItem(this.leveldata3, this.addcolumn, "levelthree");
      }
    },
    addItem(list, newVal, type) {
      let isExisted = list.some(item => {
        return item.columnlevel == newVal;
      });
      if (isExisted) {
        message.error("已存在相同栏目名称");
        return;
      }
      list.unshift({ columnlevel: newVal });
      this[type] = newVal;
      this.visible = false;
    },
    handleCancel(e) {
      this.visible = false;
    },
    handleOneChange(value) {
      this.leveone = value;
    }
  },
  watch: {
    levelone(newVal, oldVal) {
      getnewitem({ type: newVal }).then(res => {
        let { data } = res;
        if (data.code == 200) {
          this.leveldata2 = data.data;
          this.leveltwo = this.leveldata2[0] && this.leveldata2[0].columnlevel;
        }
      });
    },
    leveltwo(newVal, oldVal) {
      getnewitem({ type: newVal }).then(res => {
        let { data } = res;
        if (data.code == 200) {
          this.leveldata3 = data.data;
          this.levelthree =
            this.leveldata3[0] && this.leveldata3[0].columnlevel;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  height: 100%;
  margin: auto 0;
  text-align: center;
  .item {
    display: flex;
    width: 50%;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    .item-select {
      flex: 1;
    }
  }
  .bt-submit {
    margin-top: 30px;
  }
}
</style>