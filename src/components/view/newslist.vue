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
      <template slot="id" slot-scope="text,record,index">
        <a @click="jump('/additemidnews',index)">详情</a>
      </template>
      <template slot="index" slot-scope="text,record,index">
        <a-popconfirm title="确定删除此条新闻?" @confirm="confirm(index)" okText="确定" cancelText="取消">
          <a href="#">删除</a>
        </a-popconfirm>
      </template>
      <template slot="news_content" slot-scope="news_content">
        <div class="news-content" v-html="news_content"></div>
      </template>
    </a-table>
    <!-- <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
      <a-button type="primary" htmlType="submit" @click="jump('/additemidnews')">新增</a-button>
    </a-form-item>-->
  </div>
</template>
<script>
const columns = [
  {
    title: "新闻标题",
    width: "7%",
    dataIndex: "news_title"
  },
  {
    title: "新闻内容",
    width: "20%",
    dataIndex: "news_content",
    scopedSlots: { customRender: "news_content" }
  },
  {
    title: "发布时间",
    width: "20%",
    dataIndex: "news_create_time",
    scopedSlots: { customRender: "news_create_time" }
  },
  {
    title: "所属类别",
    width: "20%",
    dataIndex: "news_type",
    scopedSlots: { customRender: "news_type" }
  },
  {
    title: "创建人",
    width: "20%",
    dataIndex: "create_user"
  },
  {
    title: "查看",
    dataIndex: "id",
    width: "7%",
    scopedSlots: { customRender: "id" }
  },
  {
    title: "删除",
    dataIndex: "index",
    width: "7%",
    scopedSlots: { customRender: "index" }
  }
];
import { itemidnewsselect, itemidnewsdelete } from "@/api/itemidnews";
import { getnewslist, deletenews } from "@/api/news";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["operatorcode", "name"])
  },
  mounted() {
    this.init();
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
    init() {
      this.loading = true;
      getnewslist({ create_user: this.name }).then(res => {
        let { data } = res;
        if (data.code == 200) {
          this.data = data.data;
          for (let key in this.data) {
            this.data[key].index = key;
          }
          this.loading = false;
        }
      });
    },
    confirm(index) {
      deletenews({ id: this.data[index].id }).then(res => {
        let { data } = res;
        this.data.splice(index, 1);
        this.$message.info(data.msg);
      });
    },
    jump(url, id) {
      let params = JSON.stringify(this.data[id]);
      this.$router.push({ path: url, query: { params } });
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
.news-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
 