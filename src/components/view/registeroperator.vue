<template>
  <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
    <a-form-item
      label="运营商名称"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="OperatorName"
      :fieldDecoratorOptions="{rules: [{type:'string', required: true }]}"
    >
      <a-input id="OperatorName"/>
    </a-form-item>
    <a-form-item
      label="运营商代号"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="OperatorCode"
    >
      <a-input :placeholder="OperatorCodeA" disabled/>
    </a-form-item>
    <a-form-item
      label="姓名"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="username"
      :fieldDecoratorOptions="{rules: [{type:'string', required: true,message: '请输入姓名'  }]}"
    >
      <a-input/>
    </a-form-item>
    <a-form-item
      label="手机号码"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="phone"
      :fieldDecoratorOptions="{rules: [{type:'string', required: true }]}"
    >
      <a-input id="phone"/>
    </a-form-item>
    <a-form-item
      label="用户密码"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="password"
      :fieldDecoratorOptions="{rules: [{type:'string', required: true,message: '请输入密码'  }]}"
    >
      <a-input type="password" id="password"/>
    </a-form-item>
    <a-form-item
      label="淘宝账号"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="zfb"
      :fieldDecoratorOptions="{rules: [{type:'string', required: true,message: '请输入淘宝账号'  }]}"
    >
      <a-input/>
    </a-form-item>
    <a-form-item
      label="有效时间"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="EffectiveTime"
    >
      <a-date-picker
        @change="onChange"
        :defaultValue="moment(date, dateFormat)"
        :format="dateFormat"
      />
    </a-form-item>
    <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
      <a-button type="primary" htmlType="submit">新增</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import moment from "moment";
import { voucherhistorySelect } from "@/api/voucherhistory";
import { mapGetters } from "vuex";
import { operatordetailInsert, pidtable } from "@/api/operatordetail";
import { BASE_URL } from "@/config/config";
export default {
  computed: {
    ...mapGetters(["operatorcode"])
  },

  data() {
    return {
      dateFormat: "YYYY/MM/DD",
      OperatorCodeA: "",
      date: new Date(),
      pid: ""
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    moment,
    fetch() {
      let count1 = 0;
      let count2 = 0;
      let ret = voucherhistorySelect({ KeyCode: "operator" });
      ret.then(res => {
        if (res.data.results[0].number1 == 90) {
          count1 = res.data.results[0].number + 1;
          count2 = 65;
        } else {
          count1 = res.data.results[0].number;
          count2 = res.data.results[0].number1 + 1;
        }
        this.OperatorCodeA =
          String.fromCharCode(count1) + String.fromCharCode(count2);
        console.log("OperatorCodeA", this.OperatorCodeA);
      });
      let ret1 = pidtable({});

      ret1.then(res => {
        if (res.data.results.length > 0) {
          this.pid = res.data.results[0].pid;
        } else {
          this.$message.info("没有可用的PID");
          return;
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          //console.log("Received values of form: ", values);
          values.OperatorCode = this.OperatorCodeA;
          values.EffectiveTime = this.date;

          values.OperatorPID = this.pid;
          if (this.pid == "") {
            this.$message.info("没有可用的PID");
            return;
          }
          operatordetailInsert(values).then(res => {
            let data = res.data;
            console.log(data.code);
            if (data.code == 200) {
              this.$message.success("新增成功！", 4);
              this.$router.push("./operator-detail");
            }
          });

          console.log("values", values);
        }
      });
    },
    onChange(date, dateString) {
      console.log("date", dateString);
    }
  }
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
