<template>
    <a-table class="table" :columns="columns" :dataSource="data" :pagination="pagination" :loading="loading" @change="handleTableChange">
        <template slot="name" slot-scope="name">
            {{name.first}} {{name.last}}
        </template>
    </a-table>
</template>
<script>
const columns = [
  {
    title: "代理等级",
    dataIndex: "level",
    sorter: true,
    width: "20%",
    scopedSlots: { customRender: "level" }
  },
  {
    title: "用户名",
    dataIndex: "name",
    filters: [
      { text: "用户名", value: "小白" },
      { text: "Female", value: "female" }
    ],
    width: "20%"
  },
  {
    title: "账号",
    dataIndex: "user"
  },
  {
    title: "本月业绩",
    dataIndex: "mscore"
  },
  {
    title: "总业绩",
    dataIndex: "allscore"
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
          "https://www.easy-mock.com/mock/5b5a9383e51b9b054104fb07/example/myuser",
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
 