<template>
  <div>
    <a-table
      class="table"
      :columns="columns"
      :dataSource="data"
      :scroll="{ x: 1300 }"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template
        slot="operation"
        slot-scope="text, record,index"
      >
        <a-popconfirm
          v-if="data.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.num_iid,index)"
        >
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </template>
      <template
        slot="pict_url"
        slot-scope="text, record,index"
      >
        <div
          class="small_img"
          v-if="record.pict_url.length >0"
        >
          <img
            v-for="(item,index) in record.pict_url"
            :key="index"
            class="pic-url"
            :src="item"
          >
        </div>
      </template>
     
    </a-table>
    <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
      <a-button
        type="primary"
        htmlType="submit"
        @click="jump('/additemidnews')"
      >新增</a-button>
    </a-form-item>
  </div>
</template>
<script>
const columns = [
  
  {
    title: "商品ID",
    width: "7%",
    dataIndex: "num_iid"
  },
  {
    title: "新闻内容",
    width: "8%",
    dataIndex: "itemid_content"
  },
  {
    title: "商品主图",
    width: "20%",
    dataIndex: "pict_url",
    scopedSlots: { customRender: "pict_url" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "7%",
    scopedSlots: { customRender: "operation" }
  }
];
import {
  itemidnewsselect,
  itemidnewsdelete
} from "@/api/itemidnews";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["operatorcode"])
  },
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
      let small_image = [];
      let ret = itemidnewsselect({ OperatorCode: this.operatorcode });

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
      let ret = itemidnewsdelete(newData[index]);
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
.pic-url {
  width: 80px;
  height: 80px;
}
.small_img {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>
 