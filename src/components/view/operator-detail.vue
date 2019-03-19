<template>
  <div>
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
      <template slot="operation" slot-scope="text, record, index">
        <!-- <editable-cell :text="text" @change="onCellChange(record.key, 'operation')"/> -->
        <div class="editable-row-operations">
          <span>
            <a @click="jump('/member-information',record)">查看详情</a>
          </span>
        </div>
      </template>
      <template slot="EffectiveTime" slot-scope="EffectiveTime">
        <div>
          <a-date-picker
            @change="onChange"
            :defaultValue="moment(EffectiveTime, dateFormat)"
            :format="dateFormat"
          />
        </div>
      </template>
      <a
        class="title"
        slot="commissionmonth"
        slot-scope="commissionmonth , record"
        @click="jump('yysmyj',record)"
      >{{commissionmonth}}</a>
      <a
        class="title"
        slot="commissiontotal"
        slot-scope="commissiontotal , record"
        @click="jump('yyszyj',record)"
      >{{commissiontotal}}</a>
    </a-table>

    <!-- <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
      <a-button type="primary" htmlType="submit">更新</a-button>
    </a-form-item>-->
  </div>
</template>
<script>
import moment from "moment";
const columns = [
  {
    title: "运营商名称",
    dataIndex: "operatorname",
    scopedSlots: { customRender: "operatorname" }
  },
  {
    title: "合伙人编号",
    dataIndex: "usercode"
    //scopedSlots: { customRender: "OperatorCode" }
  },
  {
    title: "手机号码",
    dataIndex: "phone",
    scopedSlots: { customRender: "phone" }
  },
  {
    title: "本月业绩",
    dataIndex: "commissionmonth",
    scopedSlots: { customRender: "commissionmonth" }
  },
  {
    title: "总业绩",
    dataIndex: "commissiontotal",
    scopedSlots: { customRender: "commissiontotal" }
  },
  {
    title: "有效时间",
    dataIndex: "effectivetime",
    scopedSlots: { customRender: "effectivetime" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
import {
  operatordetailSelect,
  operatordetailUpdate,
  operatordetailDelete,
  pidtable
} from "@/api/operatordetail";
import {
  voucherhistorySelect,
  voucherhistoryUpdateorinsert
} from "@/api/voucherhistory";
import { mapGetters } from "vuex";
export default {
  mounted() {
    this.fetch();
  },
  computed: {
    ...mapGetters(["jurisdiction"])
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
      dateFormat: "YYYY/MM/DD"
    };
  },
  methods: {
    moment,
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
      let ret = operatordetailSelect({});

      ret.then(res => {
        console.log("请求到的数据", res);
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = res.data.results.length;

        this.loading = false;
        this.data = res.data.results;
        this.data.forEach((item, index) => {
          item.key = index.toString();
          item.effectivetime = item.effectivetime.slice(0, 10); //截取日期
        });
        this.cacheData = this.data.map(item => ({ ...item }));
        this.pagination = pagination;
        console.log("请求到的数据", this.data);
      });
    },
    handleChange(value, key, column, index) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    handleAdd() {
      const { data } = this;
      const count = data.length;
      let count1 = 0;
      let pid = "";
      let ret = pidtable({});
      let ret1 = voucherhistorySelect({ KeyCode: "operator" });

      Promise.all([
        voucherhistorySelect({ KeyCode: "operator" }),
        pidtable({})
      ]).then(res => {
        console.log("res", res[0].data.results[0].number + 1);
        count1 = res[0].data.results[0].number + 1;
        if (res[1].data.results.length > 0) {
          pid = res[1].data.results[0].pid;
          let OperatorCode1 =
            String.fromCharCode(count1) + String.fromCharCode(count1);

          const newData = {
            OperatorPID: pid,
            OperatorName: "",
            OperatorCode: OperatorCode1,
            Phone: "",
            EffectiveTime: new Date(),
            editable: true
          };
          this.data = [...data, newData];

          const newData1 = [...this.data];
          const target = newData1.filter(item => count === item.key)[count];
          if (target) {
            target.editable = true;
            this.data = newData1;
          }
        } else {
          this.$message.info("没有可用的PID");
        }
      });
    },
    onCellChange(key, dataIndex) {
      return value => {
        const dataSource = [...this.data];
        const target = dataSource.find(item => item.key === key);
        if (target) {
          target[dataIndex] = value;
          this.data = dataSource;
        }
      };
    },
    onChange(date, dateString) {
      console.log("date", dateString);
    },
    jump(type, params) {
      if (type == "yysmyj") {
        this.$router.push({
          path: "/orderlist",
          query: { code: params.usercode.slice(0, 2), type: "yysmyj" }
        });
      } else if (type == "yyszyj") {
        this.$router.push({
          path: "/orderlist",
          query: { code: params.usercode.slice(0, 2), type: "yyszyj" }
        });
      } else {
        this.$router.push({
          path: "/member-information",
          query: { phone: params.phone, pid: params.pid }
        });
      }
      // this.$router.push({
      //   path: url,
      //   query: {
      //     operatorCode: OperatorCode
      //   }
      // });
    }
  }
};
</script>
<style  scoped lang="less">
.table {
  color: red !important;
}
.title {
  cursor: pointer;
}
</style>
 