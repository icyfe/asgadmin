<template>
  <div>
    <div class="loading-wrap" v-show="isDisabled">
      <a-spin class="loading"/>
    </div>
    <a-table
      class="table"
      :columns="columns"
      :dataSource="memberdata"
      :pagination="pagination"
      :loading="loading"
    >
      <template slot="usercode" slot-scope="usercode">{{usercode}}</template>
      <template slot="commissionmonth" slot-scope="commissionmonth, record">
        <div class="editable-row-operations">
          <span>
            <a @click="jump('/orderlist',record.pid,'month')">{{commissionmonth}}</a>
          </span>
        </div>
      </template>
      <template slot="commissiontotal" slot-scope="commissiontotal, record">
        <div class="editable-row-operations">
          <span>
            <a @click="jump('/orderlist',record.pid,'total')">{{commissiontotal}}</a>
          </span>
        </div>
      </template>
      <template slot="registerdata" slot-scope="registerdata">
        <div class="editable-row-operations">
          <span>
            <a>{{registerdata|slicedate}}</a>
          </span>
        </div>
      </template>
      <span slot="jurisdiction" slot-scope="jurisdiction, record, index">
        <a-tag :color="tipcolor(index)" disabled @click="handleInputChange(index)">{{jurisdiction}}</a-tag>
      </span>
      <template slot="operation" slot-scope="username,record">
        <div class="editable-row-operations">
          <span>
            <a @click="onSelect(record)">查看详情</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import { userupgradelevel } from "@/api/user";
const columns = [
  {
    title: "合伙人编号",
    dataIndex: "usercode",
    width: "20%",
    scopedSlots: { customRender: "usercode" }
  },
  {
    title: "用户名",
    dataIndex: "username"
  },
  {
    title: "注册时间",
    dataIndex: "registerdata",
    scopedSlots: { customRender: "registerdata" }
  },
  {
    title: "账号",
    dataIndex: "phone"
  },
  {
    title: "本月业绩",
    dataIndex: "commissionmonth",
    scopedSlots: { customRender: "commissionmonth" }
  },
  {
    title: "总业绩",
    dataIndex: "commissiontotal",
    scopedSlots: { customRender: "commissiontotal" }
  },
  {
    title: "合伙人等级",
    dataIndex: "jurisdiction",
    scopedSlots: { customRender: "jurisdiction" }
  },
  {
    title: "操作",
    dataIndex: "id",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  filters: {
    slicedate(value) {
      if (value) {
        return value.slice(0, 10);
      }
    }
  },
  props: {
    levelIsShow: {
      type: Boolean,
      default: true
    },
    memberdata: {
      type: [Array],
      default: []
    }
  },
  created() {
    // console.log("created", this.memberdata);
  },
  mounted() {
    console.log("mounted", this.memberdata);
  },
  data() {
    return {
      pagination: {},
      loading: false,
      columns,
      modalVisible: false,
      bttilte: "",
      isDisabled: false
    };
  },
  methods: {
    onSelect(item) {
      this.$router.push({
        path: "/member-information",
        query: { phone: item.phone, pid: item.pid }
      });
    },
    tipcolor(index) {
      let color;
      console.log("等级", this.memberdata[index].jurisdiction);
      return (color =
        this.memberdata[index].jurisdiction == "合伙人" ? "blue" : "red");
    },
    handleInputChange(index) {
      if (
        this.levelIsShow &&
        (this.memberdata[index].jurisdiction === "合伙人" ||
          this.memberdata[index].jurisdiction === "团长")
      ) {
        console.log(
          "进入了",
          this.levelIsShow,
          this.memberdata[index].jurisdiction
        );
        this.memberdata[index].jurisdiction =
          this.memberdata[index].jurisdiction == "合伙人" ? "团长" : "合伙人";
        this.isDisabled = true;
        userupgradelevel({
          phone: this.memberdata[index].phone,
          jurisdiction: this.memberdata[index].jurisdiction
        }).then(res => {
          this.isDisabled = false;
          console.log("sdaf", res);
        });
      } else {
        this.$message.error("无权限修改");
      }
    },
    jump(url, pid, type) {
      this.$router.push({
        path: url,
        query: {
          pid,
          type
        }
      });
    }
  }
};
</script>
<style  scoped lang="less">
.table {
  color: red !important;
}
#search-wrap {
  width: 500px !important;
  margin: 0 auto;
  .ant-input-suffix {
    right: 0px;
  }
}
.search-bt {
  right: -22px;
}
#search-wrap .ant-input-affix-wrapper .ant-input-suffix button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.content {
  width: 50% !important;
  margin: 0 auto;
}
.loading-wrap {
  width: 100vw;
  height: 50vh;
  position: absolute;
  z-index: 999;
  background: rgba(0, 0, 0, 0);
  .loading {
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate(-50%, -50%);
  }
}
</style>
 