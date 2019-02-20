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
      <template
        v-for="(col, index) in ['OperatorPID', 'OperatorName', 'OperatorCode','Phone','EffectiveTime']"
        :slot="col"
        slot-scope="text, record, index"
      >
        <div :key="index">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col,index)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <!-- <editable-cell :text="text" @change="onCellChange(record.key, 'operation')"/> -->
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key,index)">保存</a>
            <a-popconfirm title="确定要取消?" @confirm="() => cancel(record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <span v-if="jurisdiction == 'superadmin'">
              <a @click="() => edit(record.key)">修改</a>
              <!-- <a @click="() => onDelete(record.key)">刪除</a> -->
              <a-popconfirm title="确定要删除?" @confirm="() => onDelete(record.OperatorPID,index)">
                <a>删除</a>
              </a-popconfirm>
            </span>
            <a @click="jump('/operator-itemdetail',record.OperatorCode)">店铺详情</a>
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
    </a-table>

    <!-- <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
      <a-button type="primary" htmlType="submit">更新</a-button>
    </a-form-item>-->
  </div>
</template>
<script>
import moment from "moment";
const columns = [
  // {
  //   title: "运营商PID",
  //   dataIndex: "OperatorPID",
  //   sorter: true,
  //   width: "20%"
  //   // scopedSlots: { customRender: "OperatorPID" }
  // },
  {
    title: "运营商名称",
    dataIndex: "OperatorName",
    width: "20%",
    scopedSlots: { customRender: "OperatorName" }
  },
  {
    title: "运营商代号",
    dataIndex: "OperatorCode"
    //scopedSlots: { customRender: "OperatorCode" }
  },
  {
    title: "手机号码",
    dataIndex: "Phone",
    width: "20%",
    scopedSlots: { customRender: "Phone" }
  },
  {
    title: "有效时间",
    dataIndex: "EffectiveTime",
    scopedSlots: { customRender: "EffectiveTime" }
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
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key, index) {
      const newData = [...this.data];
      console.log("newData", newData[index]);
      let ret = operatordetailUpdate(newData[index]);
      ret.then(res => {
        console.log("请求到的数据save", res);
      });
      const target = newData.filter(item => key === item.key)[index];
      if (target) {
        delete target.editable;
        this.data = newData;
        console.log("newData", newData[index].OperatorPID);
        this.cacheData = newData.map(item => ({ ...item }));
      }
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
    onDelete(key, index) {
      const newData = [...this.data];
      console.log("key", key);
      let ret = operatordetailDelete(newData[index]);
      ret.then(res => {
        //console.log("请求到的数据save", res);
      });
      const newData1 = newData.filter(item => item.OperatorPID !== key);
      console.log("newData1", newData1);
      this.data = newData.filter(item => item.OperatorPID !== key);
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
      // ret1.then(res => {
      //   return (count1 = res.data.results[0].number + 1);
      // });
      // ret.then(res => {
      //   // console.log("请求到的数据", res.data.results[0].pid);
      //   if (res.data.results.length > 0) {
      //     pid = res.data.results[0].pid;
      //     let OperatorCode1 =
      //       String.fromCharCode(count1) + String.fromCharCode(count1);

      //     const newData = {
      //       OperatorPID: pid,
      //       OperatorName: "",
      //       OperatorCode: OperatorCode1,
      //       editable: true
      //     };
      //     this.data = [...data, newData];

      //     const newData1 = [...this.data];
      //     const target = newData1.filter(item => count === item.key)[count];
      //     if (target) {
      //       target.editable = true;
      //       this.data = newData1;
      //     }
      //   } else {
      //     this.$message.info("没有可用的PID");
      //   }
      // });
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
    jump(url, OperatorCode) {
      this.$router.push({
        path: url,
        query: {
          OperatorCode: OperatorCode
        }
      });
    }
  }
};
</script>
<style  scoped lang="less">
.table {
  color: red !important;
}
</style>
 