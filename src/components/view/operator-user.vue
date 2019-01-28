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
    title: "PID",
    dataIndex: "PID",
    //sorter: true,
    width: "20%",
    //scopedSlots: { customRender: "PID" }
  },
  {
    title: "用户名",
    dataIndex: "Username",
    width: "20%"
  },
  {
    title: "手机号",
    dataIndex: "Phone"
  },
  {
    title: "邀请码",
    dataIndex: "InviteCode"
  }
];
import {userSelect} from "@/api/user"
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
      let ret = userSelect({OperatorCode:'mm'});

      ret.then(res => {
        console.log("请求到的数据", res);
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
 