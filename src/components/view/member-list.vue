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
    <div id="components-modal-demo-position">
      <a-modal
        title="会员信息"
        centered
        v-model="modalVisible"
      >
        <div
          class="content"
          v-if="memberdata"
        >
          <a-avatar
            :size=100
            :src="memberdata.avatar"
            alt="点击更换头像"
          />
          <div>
            <p class="txt">昵称: {{memberdata.username}}</p>
            <p class="txt">电话: {{memberdata.phone}}</p>
            <p class="txt">支付宝账号: {{memberdata.zfb}}</p>
            <p class="txt">性别: {{memberdata.sex}}</p>
            <p class="txt">支付宝名称: {{memberdata.zfbname}}</p>
            <p class="txt">推广位ID: {{memberdata.pid}}</p>
            <p class="txt">所属运营商代号: {{memberdata.operatorcode}}</p>
            <p class="txt">等级: {{memberdata.jurisdiction}}</p>
            <p class="txt">邀请码: {{memberdata.invitecode}}</p>
          </div>
          <a-button
            v-if="memberdata.type >1"
            type="primary"
            @click="showConfirm"
          >{{bttilte}}</a-button>
        </div>
        <template slot="footer">
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="() => modalVisible = false"
          >
            关闭
          </a-button>
        </template>
      </a-modal>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getmemberList, getusermessage, userupgradelevel } from "@/api/user";
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
      columns,
      modalVisible: false,
      memberdata: null,
      bttilte: ""
    };
  },
  methods: {
    search(value) {
      this.fetch({ operatorcode: value });
    },
    onSelect(index) {
      this.modalVisible = true;
      getusermessage({ phone: this.data[index].phone }).then(res => {
        this.memberdata = res.data.data;
        this.bttilte = this.memberdata.type == 2 ? "撤销团长" : "升级团长";
        console.log("shuju", this.memberdata);
      });
      // console.log(this.data[index].phone);
      // this.$router.push({
      //   path: "/member-information",
      //   query: { phone: this.data[index].phone }
      // });
    },
    showConfirm() {
      let that = this;
      this.$confirm({
        title: "提示",
        content:
          that.memberdata.type == 3
            ? "是否将该用户升级为团长"
            : "是否撤销该用户团长",
        onOk() {
          that.upgradelevel(that.memberdata.phone, that.memberdata.type);
        },
        onCancel() {}
      });
    },
    upgradelevel(phone, type) {
      type = type == 2 ? 3 : 2;

      userupgradelevel({ phone, type }).then(res => {
        this.memberdata = res.data.data;
        this.bttilte = this.memberdata.type == 2 ? "撤销团长" : "升级团长";
        this.$message.success(
          this.memberdata.type == 2 ? "升级成功" : "撤销成功"
        );
        console.log("更新后的", this.memberdata);
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
.content {
  width: 50%!important;
  margin: 0 auto;
}
</style>
 