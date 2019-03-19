<template>
  <div>
    <div id="search-wrap">
      <a-input-search placeholder="请输入要查询的运营商编码" @search="search" enterButton/>
    </div>
    <meber-form :memberdata="data"/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getmemberList, userupgradelevel, getmemberAllList } from "@/api/user";
import MeberForm from "@/components/common/meberform";
export default {
  computed: {
    ...mapGetters(["operatorcode"])
  },
  components: {
    MeberForm
  },
  mounted() {
    this.fetch({ operatorcode: this.operatorcode });
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      modalVisible: false,
      memberdata: null,
      bttilte: "",
      isDisabled: false
    };
  },
  methods: {
    search(value) {
      this.fetch({ operatorcode: value });
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
      let { type } = this.$route.query;
      this.loading = true;
      if (type == "all") {
        getmemberAllList().then(res => {
          this.loading = false;
          let data = res.data;
          if (data.code != 200) {
            return this.$message.error("查无数据", 4);
          }
          for (let i in data.result) {
            data.result[i].id = i;
            data.result[i].commissionmonth =
              data.result[i].commissionmonth || 0;
            data.result[i].commissiontotal =
              data.result[i].commissiontotal || 0;
          }
          this.data = [];
          this.data = data.result;
          console.log("res", this.data);
        });
      } else {
        getmemberList(params).then(res => {
          console.log("数据", params);
          this.loading = false;
          let data = res.data;
          if (data.code != 200) {
            return this.$message.error("查无数据", 4);
          }
          for (let i in data.result) {
            data.result[i].id = i;
            data.result[i].commissionmonth =
              data.result[i].commissionmonth || 0;
            data.result[i].commissiontotal =
              data.result[i].commissiontotal || 0;
          }
          this.data = [];
          this.data = data.result;
          console.log("res", this.data);
        });
      }
    }
  },
  watch: {
    $route(to, from) {
      this.fetch({ operatorcode: this.operatorcode });
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
 