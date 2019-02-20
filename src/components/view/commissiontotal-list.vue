<template>
<div>
    <a-table class="table" :columns="columns" :dataSource="data" :pagination="pagination" :loading="loading" @change="handleTableChange">
        <!-- <template slot="name" slot-scope="name">
            {{name.first}} {{name.last}}
        </template> -->
        
    </a-table>
</div>
 
</template>
<script>
const columns = [
  {
    title: "商品标题",
    dataIndex: " item_title",
    //sorter: true,
    width: "20%",
    //scopedSlots: { customRender: "PID" }
  },
  {
    title: "卖家店铺名称",
    dataIndex: "seller_shop_title",
    width: "20%"
  },
  {
    title: "商品数量",
    dataIndex: "item_num"
  },
  {
    title: "实际支付金额",
    dataIndex: "pay_price"
  },
  {
    title: "订单状态",
    dataIndex: "tk_status"
  },
  {
    title: "创建时间",
    dataIndex: "create_time"
  }
];
import {searchtotalOrder} from "@/api/order"
export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns
    };
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    fetch(params = {}) {
     console.log("params:", params);
      this.loading = true;
      let ret = searchtotalOrder({adzone_id:this.$route.query.adzone_id});
      //console.log(ret,ret)
      ret.then(res => {
        console.log("请求到的数据", res.data.results);
        console.log("65是字母什么",String.fromCharCode(65));
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = res.data.results.length;

        this.loading = false;
        this.data = res.data.results;
        this.pagination = pagination;
        console.log("请求到的数据", this.data);
      });
    }
  }
};
</script>
<style  scoped lang="less">
.table  {
    color:red!important;
}
</style>
 