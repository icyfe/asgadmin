<template>
  <div>
    <div id="search-wrap">
      <a-input-search
        placeholder="请输入要查询的运营商编码"
        @search="search"
        enterButton
      />
    </div>
    <a-table
      class="table"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- <template slot="name" slot-scope="name">
            {{name.first}} {{name.last}}
      </template>-->
    </a-table>
  </div>
</template>
<script>
const columns = [
  // {
  //   title: "pid",
  //   dataIndex: "pid",
  //   //sorter: true,
  //   width: "20%"
  //   //scopedSlots: { customRender: "PID" }
  // },
  {
    title: "用户名",
    dataIndex: "username",
    width: "20%"
  },
  {
    title: "手机号",
    dataIndex: "phone"
  },
  {
    title: "邀请码",
    dataIndex: "Invitecode"
  }
];
import { userSelect,userSelect1 } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  mounted() {
    this.fetch();
  },
  computed: {
    ...mapGetters(["operatorcode", "pid"])
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      keycode:'',
      columns
    };
  },
  methods: {
    search(value) {
      this.keycode = value;
      this.fetch();
    },
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
      let ret = userSelect1({ OperatorCode: this.operatorcode,pid : this.pid ,keycode : this.keycode});

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
</style>
 