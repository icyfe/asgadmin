<template>
<div>
    <a-table class="table" :columns="columns" :dataSource="data" :pagination="pagination" :loading="loading" @change="handleTableChange">
        
        <!-- <template slot="name" slot-scope="name">
            {{name.first}} {{name.last}}
        </template> -->
    </a-table>
    <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
      <a-button type='primary' htmlType='submit'>
        更新
      </a-button>
    </a-form-item>
</div>
</template>
<script>
const columns = [
  {
    title: "运营商ID",
    dataIndex: "seller_id",
    //sorter: true,
    //width: "20%",
    //scopedSlots: { customRender: "PID" }
  },
  {
    title: "运营商名称",
    dataIndex: "shop_title",
  },
  {
    title: "商品ID",
    dataIndex: "num_iid"
  },
  {
    title: "商品名称",
    dataIndex: "title"
  }
  ,
  {
    title: "价格",
    dataIndex: "zk_final_price",
    //width: "20%"
  },
  {
    title: "库存数",
    dataIndex: "volume"
  },
  {
    title: "商品主图",
    dataIndex: "pict_url"
  },
  {
    title: "商品小图",
    dataIndex: "small_images"
  }
];

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
      this.$http
        .get(
          "https://www.easy-mock.com/mock/5c32b507b2bf494db1c0de5f/example/OperatorItemDetail",
          {
            params: {
              results: 10,
              ...params
            }
          }
        )
        .then(res => {
          // console.log('请求到的数据',res)
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
 