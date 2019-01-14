<template>
  <div>
    <a-table
      class="table"
      :columns="columns"
      :dataSource="data"
      :scroll="{ x: 2300 }"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- <template slot="name" slot-scope="name">
            {{name.first}} {{name.last}}
      </template>-->
      <template slot="operation" slot-scope="text, record,index">
        <a-popconfirm
          v-if="data.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.num_iid,index)"
        >
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </template>
      <template slot="pict_url" slot-scope="text, record,index">
        <img
          style="width: 100%"
           src="http://localhost:3302/uploads/avatar/微信图片_20181114082828.png"
        >
      </template>
    </a-table>
    <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
      <a-button type="primary" htmlType="submit" @click="jump('/additemid')">新增</a-button>
    </a-form-item>
  </div>
</template>
<script>
const columns = [
  {
    title: "运营商ID",
    width: "8%",
    dataIndex: "seller_id"
    //sorter: true,
    //width: "20%",
    //scopedSlots: { customRender: "PID" }
  },
  {
    title: "运营商名称",
    width: "9%",
    dataIndex: "shop_title"
  },
  {
    title: "商品ID",
    width: "7%",
    dataIndex: "num_iid"
  },
  {
    title: "商品名称",
    width: "8%",
    dataIndex: "title"
  },
  {
    title: "价格",
    width: "6%",
    dataIndex: "zk_final_price"
    //width: "20%"
  },
  {
    title: "库存数",
    width: "7%",
    dataIndex: "volume"
  },
  {
    title: "商品主图",
    width: "20%",
    dataIndex: "pict_url",
    scopedSlots: { customRender: "pict_url" }
  },
  {
    title: "商品小图",
    dataIndex: "small_images"
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "7%",
    scopedSlots: { customRender: "operation" }
  }
];
import {
  operatoritemdetail,
  operatoritemdetaildelete
} from "@/api/operatoritemdetail";
export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      previewImage: "",
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
      this.loading = true;
      let ret = operatoritemdetail({ OperatorCode: "mm" });

      ret.then(res => {
        const pagination = { ...this.pagination };

        pagination.total = res.data.results.length;

        this.loading = false;
        this.data = res.data.results;
        
        this.pagination = pagination;
      });
    },
    jump(url) {
      if (url == "/login") {
        sessionStorage.clear();

        this.$router.push(url);
        return;
      }
      this.$router.push(url);
    },
    onDelete(key, index) {
      const newData = [...this.data];
      console.log("key", key);
      let ret = operatoritemdetaildelete(newData[index]);
      ret.then(res => {
        //console.log("请求到的数据save", res);
      });
      const newData1 = newData.filter(item => item.num_iid !== key);
      console.log("newData1", newData1);
      this.data = newData.filter(item => item.num_iid !== key);
    }
  }
};
</script>
<style  scoped lang="less">
.table {
  color: red !important;
}
</style>
 