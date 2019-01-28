<template>
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
  </a-table>
</template>
<script>
import {mapGetters} from 'vuex';
import {getmemberList} from '@/api/user'
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
  }
];

export default {
  computed:{
    ...mapGetters([
      'operatorcode'
    ])
  },
  mounted() {
    this.fetch({operatorcode:this.operatorcode});
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
      getmemberList(params).then(res =>{
        console.log('数据',params)
        let data = res.data
        if(data.code!=200){
         return this.$message.error('查无数据', 4)
        }
        this.data.push(data.result);
        console.log('res', res);
      })
    }
  }
};
</script>
<style  scoped lang="less">
.table {
  color: red !important;
}
</style>
 