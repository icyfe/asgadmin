<template>
  <div>
    <div class="dd-cx">
      <a-button v-show="type ==0" class="sh_bt" type="primary" @click="allreview">一键审核</a-button>

      <a-input-search
        class="hy-search"
        v-if="type==1"
        placeholder="输入会员账号"
        @search="onSearch"
        enterButton
      />
      <div>
        <a-button type="primary">订单查询</a-button>
        <a-date-picker placeholder="选择查询日期" @change="handleDate">
          <template slot="dateRender" slot-scope="current, today">
            <div
              class="ant-calendar-date"
              :style="getCurrentStyle(current, today)"
            >{{current.date()}}</div>
          </template>
        </a-date-picker>
      </div>
    </div>
    <div v-if="type==0" key="0">
      <a-table
        :columns="columns"
        :dataSource="vivsibledata"
        v-if="data"
        :rowSelection="{selectedRowKeys,onChange: onSelectChange}"
      >
        <a slot="zfbname" slot-scope="zfbname" href="javascript:;">{{zfbname}}</a>
        <span slot="customTitle">
          <a-icon type="smile-o"/>会员支付宝
        </span>
        <span slot="StautsType" slot-scope="StautsType, record, index">
          <a-tag :color="tipcolor(index)" @click="handleInputChange(index)">{{StautsType}}</a-tag>
        </span>
        <a
          class="money"
          slot="money"
          slot-scope="money, record, index"
          @click="jump(record)"
        >{{money}}元</a>
      </a-table>
    </div>
    <div v-else-if="type==1" key="1">
      <a-table :columns="columns" :dataSource="vivsibledata" v-if="data">
        <a slot="zfbname" slot-scope="zfbname" href="javascript:;">{{zfbname}}</a>
        <span slot="customTitle">
          <a-icon type="smile-o"/>会员支付宝
        </span>
        <span slot="StautsType" slot-scope="StautsType, record, index">
          <a-tag :color="tipcolor(index)" @click="handleInputChange(index)">{{StautsType}}</a-tag>
        </span>
        <a
          class="money"
          slot="CommissionTrans"
          slot-scope="CommissionTrans, record, index"
          @click="jump(record)"
        >{{CommissionTrans}}元</a>
      </a-table>
    </div>
  </div>
</template>
<script>
import {
  getCashDrawlList,
  upCashDrawlList,
  searchCashDrawList,
  idsearch
} from "@/api/cashdrawal";
import { mapGetters } from "vuex";
const columns = [
  {
    dataIndex: "zfbname",
    key: "zfbname",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "zfbname" }
  },
  {
    title: "支付宝账号",
    dataIndex: "zfb",
    key: "zfb"
  },
  {
    title: "提现时间",
    dataIndex: "TransDate",
    key: "TransDate"
  },
  {
    title: "提现金额",
    dataIndex: "money",
    key: "money",
    scopedSlots: { customRender: "money" }
  },
  {
    title: "审核状态",
    key: "StautsType",
    dataIndex: "StautsType",
    scopedSlots: { customRender: "StautsType" }
  },
  {
    title: "合伙人编号",
    dataIndex: "usercode",
    key: "usercode"
  }
];

export default {
  data() {
    return {
      data: [],
      vivsibledata: [],
      columns,
      selectedRows: null,
      type: "",
      selectedRowKeys: []
    };
  },
  computed: {
    ...mapGetters(["txmessage", "phone"])
  },
  created() {
    this.type = this.$route.query.type;

    this.init(this.type);
  },
  methods: {
    init(type) {
      getCashDrawlList({ phone: this.phone }).then(res => {
        let data = res.data;
        this.data = [];
        this.vivsibledata = [];
        if (data.code != 200) return this.$message.error("请求出错！");
        this.data = data.data;
        this.data.forEach(element => {
          if (element.StautsType == "已审核" && type == "1") {
            this.vivsibledata.push(element);
          } else if (element.StautsType == "审核中" && type == "0") {
            this.vivsibledata.push(element);
          }
        });
      });
    },
    //按会员账号搜搜
    onSearch(value) {
      this.vivsibledata = [];
      console.log(this.data);
      this.data.forEach(item => {
        console.log(item,value,this.type)
        if (item.zfb == value && item.StautsType == "已审核" && this.type == "1") {
          this.vivsibledata.push(item);
        }
      });
      if (!this.vivsibledata.length > 0) {
        this.$message.error("查无数据");
      }
    },
    //一键审核
    allreview() {
      if (!this.selectedRowKeys.length > 0) {
        this.$message.error("请勾选要审核的提现申请");
        return;
      }
      for (let item of this.selectedRows) {
        item.StautsType = "已审核";
        upCashDrawlList({ id: item.id }).then(res => {
          console.log(res);
          this.deletetxmsg(item);
          this.selectedRowKeys = [];
        });
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log("selectedRowKeys changed: ", selectedRowKeys, selectedRows);
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    handleDate(montent, date) {
      let { type } = this.$route.query;
      // console.log("日期", date);
      searchCashDrawList({ date }).then(res => {
        // console.log("查询的数据", res);
        let data = res.data;
        this.data = [];
        if (data.code != 200) return this.$message.error("请求出错！");
        data = data.data;
        data.forEach(element => {
          if (element.StautsType == "已审核" && type == "1") {
            this.data.push(element);
          } else if (element.StautsType == "审核中" && type == "0") {
            this.data.push(element);
          }
        });
      });
    },
    jump(params) {
      this.$router.push({ path: "/orderlist", query: { pid: params.PID } });
      console.log(params);
    },
    getCurrentStyle(current, today) {
      const style = {};
      if (current.date() === 1) {
        style.border = "1px solid #1890ff";
        style.borderRadius = "50%";
      }
      return style;
    },
    handleInputChange(index) {
      this.vivsibledata[index].StautsType = "已审核";
      this.deletetxmsg(this.vivsibledata[index]);
      upCashDrawlList({ id: this.data[index].ID }).then(res => {
        this.deletetxmsg(this.data[index]);
      });
    },
    deletetxmsg(item) {
      let idx = 0;
      let t = Object.assign([], this.data);
      for (let index in this.data) {
        if (item.ID == this.data[index].ID) {
          t.splice(index, 1);
          break;
        }
      }
      this.data = t;
      this.vivsibledata = t;
      this.$store.commit("SET_TXMESSAGE", t);
    },
    tipcolor(index) {
      let color;
      return (color =
        this.vivsibledata[index].StautsType == "已审核" ? "green" : "blue");
    }
  },
  watch: {
    $route(to, from) {
      this.type = this.$route.query.type;
      console.log("type的值的变化", this.type);
      this.init(this.type);
    }
  }
};
</script>
<style lang="less" scoped>
.money {
  cursor: pointer;
}
.dd-cx {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.dd-cx_bt {
  margin-left: 25%;
}
.hy-search {
  width: 30%;
  margin: 0 auto;
}
</style>
