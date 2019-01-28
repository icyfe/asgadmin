<template>
  <a-table
    :columns="columns"
    :dataSource="data"
    v-if='data'
  >
    <a
      slot="zfbname"
      slot-scope="zfbname"
      href="javascript:;"
    >{{zfbname}}</a>
    <span slot="customTitle">
      <a-icon type="smile-o" /> 会员支付宝</span>
    <span
      slot="StautsType"
      slot-scope="StautsType"
    >
      <a-tag color="blue">{{StautsType}}</a-tag>
    </span>
    <span
      slot="TransDate"
      slot-scope="TransDate"
    >
      {{TransDate}}
    </span>
  </a-table>
</template>
<script>
import { getCashDrawlList } from "@/api/cashdrawal";
const columns = [
  {
    dataIndex: "zfbname",
    key: "zfbname",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "zfbname" }
  },
  {
    title: "提现时间",
    dataIndex: "TransDate",
    key: "TransDate"
  },
  {
    title: "提现金额",
    dataIndex: "CommissionTrans",
    key: "CommissionTrans"
  },
  {
    title: "审核状态",
    key: "StautsType",
    dataIndex: "StautsType",
    scopedSlots: { customRender: "StautsType" }
  },
  {
    title: "推广位ID",
    dataIndex: "PID",
    key: "PID",
    scopedSlots: { customRender: "PID" }
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
    }
  }
};
</script>