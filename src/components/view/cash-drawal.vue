<template>
  <a-table :columns="columns" :dataSource="data" v-if="data">
    <a slot="zfbname" slot-scope="zfbname" href="javascript:;">{{zfbname}}</a>
    <span slot="customTitle">
      <a-icon type="smile-o"/>会员支付宝
    </span>
    <span slot="StautsType" slot-scope="StautsType, record, index">
      <a-tag :color="tipcolor(index)" @click="handleInputChange(index)">{{StautsType}}</a-tag>
    </span>
    <span
      class="money"
      slot="CommissionTrans"
      slot-scope="CommissionTrans, record, index"
      @click="jump(index)"
    >{{CommissionTrans}}元</span>
  </a-table>
</template>
<script>
import { getCashDrawlList, upCashDrawlList } from "@/api/cashdrawal";
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
    dataIndex: "CommissionTrans",
    key: "CommissionTrans",
    scopedSlots: { customRender: "CommissionTrans" }
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

// const data = [
//   {
//     key: "1",
//     zfbname: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["审核中"]
//   },
//   {
//     key: "2",
//     zfbname: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["审核中"]
//   },
//   {
//     key: "3",
//     zfbname: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//     tags: ["审核中"]
//   }
// ];

export default {
  data() {
    return {
      data: null,
      columns
    };
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      getCashDrawlList().then(res => {
        let data = res.data;
        if (data.code != 200) return this.$message.error("请求出错！");
        this.data = data.data;
        console.log(this.data);
      });
    },
    jump(index) {
      console.log(index);
    },
    handleInputChange(index) {
      // this.data[index].StautsType = "已审核";
      this.data[index].StautsType = "已审核";
      upCashDrawlList({ id: this.data[index].ID }).then(res => {
        console.log(res);
      });
    },
    tipcolor(index) {
      let color;
      return (color =
        this.data[index].StautsType == "已审核" ? "green" : "blue");
    }
  }
};
</script>
<style lang="less" scoped>
  .money{
    cursor: pointer;
  }
</style>
