<template>
  <div>
    <div id="search-wrap">
      <a-input-search placeholder="请输入要查询的订单号" @search="search" enterButton/>
    </div>
    <a-table :columns="columns" :dataSource="data" v-if="data">
      <a slot="zfbname" slot-scope="zfbname" href="javascript:;">{{zfbname}}</a>
      
      <span slot="StautsType" slot-scope="StautsType">
        <a-tag color="blue">{{StautsType}}</a-tag>
      </span>
      <span slot="TransDate" slot-scope="TransDate">{{TransDate}}</span>
    </a-table>
  </div>
</template>
<script>
import {
  getOrderList,
  searchOrder,
  searchmonthOrder,
  searchtotalOrder,
  getyysmonthorder,
  getyysallorder
} from "@/api/order";
import { mapGetters } from "vuex";
const columns = [
  {
    dataIndex: "trade_parent_id",
    key: "trade_parent_id",
    title: "父订单号",
    scopedSlots: { customRender: "trade_parent_id" }
  },
  {
    title: "子订单号",
    dataIndex: "trade_id",
    key: "trade_id"
  },
  {
    title: "实际支付金额",
    dataIndex: "pay_price",
    key: "pay_price"
  },
  {
    title: "预估收入",
    key: "commission",
    dataIndex: "commission",
    scopedSlots: { customRender: "commission" }
  },
  {
    title: "订单状态",
    dataIndex: "tk_status",
    key: "tk_status",
    scopedSlots: { customRender: "tk_status" }
  },
  {
    title: "订单类型",
    dataIndex: "order_type",
    key: "order_type",
    scopedSlots: { customRender: "order_type" }
  },
  {
    title: "佣金金额",
    dataIndex: "total_commission_fee",
    key: "total_commission_fee",
    scopedSlots: { customRender: "total_commission_fee" }
  },
  {
    title: "付款金额",
    dataIndex: "alipay_total_price",
    key: "alipay_total_price",
    scopedSlots: { customRender: "alipay_total_price" }
  },
  {
    title: "订单创建时间",
    dataIndex: "create_time",
    key: "create_time",
    scopedSlots: { customRender: "create_time" }
  }
];
export default {
  data() {
    return {
      data: [],
      columns,
      keys: ""
    };
  },
  computed: {
    ...mapGetters(["pid"])
  },
  created() {
    this.init();
  },
  methods: {
    handelchange(e) {
      // this.keys = e.data
      console.log(e);
    },
    init() {
      let pid = this.$route.query.pid || this.pid;
      let { code } = this.$route.query || "";
      let { type } = this.$route.query;
      if (type == "month") {
        searchmonthOrder({ pid }).then(res => {
          this.data = res.data.results;
        });
      } else if (type == "total") {
        searchtotalOrder({ pid }).then(res => {
          this.data = res.data.results;
        });
      } else if (type == "yysmyj") {
        getyysmonthorder({ code }).then(res => {
          let data = res.data;
          if (data && data.code != 200) return this.$message.error(data.msg);
          this.data = data.data;
        });
      } else if (type == "yyszyj") {
        getyysallorder({ code }).then(res => {
          let data = res.data;
          if (data && data.code != 200) return this.$message.error(data.msg);
          this.data = data.data;
        });
      } else {
        getOrderList({ pid }).then(res => {
          let data = res.data;
          if (data && data.code != 200) return this.$message.error(data.msg);
          this.data = data.data;
        });
      }
    },
    search(value) {
      searchOrder({ ordernum: value }).then(res => {
        let data = res.data;
        if (data.code != 200) return this.$message.error(data.msg);
        this.data = [];
        this.data.push(data.data);
        console.log("查询的数据", this.data);
      });
    }
  }
};
</script>
<style lang="less" scoped>
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
</style>
