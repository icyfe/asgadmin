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
      <template
        slot="name"
        slot-scope="name"
      >
        {{name.first}} {{name.last}}
      </template>
      <template
        slot="operation"
        slot-scope="username"
      >
        <div class='editable-row-operations'>
          <span>
            <a @click="onSelect(username)">查看详情</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getmemberList } from "@/api/user";
const columns = [
  {
    title: "用户名",
    dataIndex: "username",
    width: "20%"
  },
  {
    title: "账号",
    dataIndex: "phone"
  },
  {
    title: "本月业绩",
    dataIndex: "commissionmonth"
  },
  {
    title: "总业绩",
    dataIndex: "commissiontotal"
  },
  {
    title: "操作",
    dataIndex: "id",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  computed: {
    ...mapGetters(["operatorcode"])
  },
  mounted() {
    this.fetch({ operatorcode: this.operatorcode });
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
    search(value) {
      this.fetch({ operatorcode: value });
    },
    onSelect(index) {
      console.log(this.data[index].phone);
      this.$router.push({
        path: "/member-information",
        query: { phone: this.data[index].phone }
      });
    },
    handleTableChange(pagination, filters, sorter) {
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
      this.loading = true;
      getmemberList(params).then(res => {
        console.log("数据", params);
        this.loading = false;
        let data = res.data;
        if (data.code != 200) {
          return this.$message.error("查无数据", 4);
        }
        for (let i in data.result) {
          data.result[i].id = i;
        }
        this.data = [];
        this.data = data.result;
        console.log("res", this.data);
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
</style>
 