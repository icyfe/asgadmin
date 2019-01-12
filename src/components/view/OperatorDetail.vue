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
        v-for="(col, index) in ['OperatorPID', 'OperatorName', 'OperatorCode']"
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
      <template
        slot="operation"
        slot-scope="text, record, index"
      >
        <!-- <editable-cell :text="text" @change="onCellChange(record.key, 'operation')"/> -->
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key,index)">保存</a>
            <a-popconfirm
              title="确定要取消?"
              @confirm="() => cancel(record.key)"
            >
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">修改</a>
            <!-- <a @click="() => onDelete(record.key)">刪除</a> -->
            <a-popconfirm
              title="确定要删除?"
              @confirm="() => onDelete(record.OperatorPID,index)"
            >
              <a>删除</a>
            </a-popconfirm>
            <a @click="() => handleAdd(record.key,index)">新增</a>
          </span>
        </div>
      </template>
    </a-table>

    <!-- <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
      <a-button type="primary" htmlType="submit">更新</a-button>
    </a-form-item>-->
  </div>
</template>
<script>
const columns = [
  {
    title: "运营商PID",
    dataIndex: "OperatorPID",
    sorter: true,
    width: "20%"
    // scopedSlots: { customRender: "OperatorPID" }
  },
  {
    title: "运营商名称",
    dataIndex: "OperatorName",
    width: "20%",
    scopedSlots: { customRender: "OperatorName" }
  },
  {
    title: "运营商代号",
    dataIndex: "OperatorCode",
    scopedSlots: { customRender: "OperatorCode" }
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
export default {
  mounted() {
    this.fetch();
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
      let pid = "";
      let ret = pidtable({});
      ret.then(res => {
        // console.log("请求到的数据", res.data.results[0].pid);
        if (res.data.results.length > 0) {
          pid = res.data.results[0].pid;
          console.log("pid", pid);
          const newData = {
            OperatorPID: pid,
            OperatorName: "",
            OperatorCode: "",
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
    }
  }
};
</script>
<style  scoped lang="less">
.table {
  color: red !important;
}
</style>
 