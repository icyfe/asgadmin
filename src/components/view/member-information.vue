<template>
  <div>
    <a-form :form="form" class="myform" @submit="handleSubmit" v-if="user">
      <a-form-item v-bind="formItemLayout" label="昵称">
        <a-input
          v-decorator="[
          'name',
          {
            rules: [{
              required: true, message: '请输入昵称'
            }],
            initialValue:user.username
          },
          
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="手机(用户名)">
        <a-input
          v-decorator="[
          'phone',
          {
            rules: [ {
              required: true, message: '请输入手机号码',
            }],
            initialValue:user.phone
          }
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="密码">
        <a-input
          v-decorator="[
          'pwd',
          {
            rules: [ {
              required: true, message: '请输入手机号码',
            }],
            initialValue:user.pwd
          }
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="支付宝账号">
        <a-input
          v-decorator="[
          'zfb',
          {
            rules: [ {
              required: true, message: '请输入支付宝账号!',
            }],
            initialValue:user.zfb
          }
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="性别" has-feedback>
        <a-select
          v-decorator="[
          'sex',
          {rules: [{ required: true, message: '请选择性别' }],
          initialValue:user.sex
          },
           
        ]"
          placeholder="选择性别"
        >
          <a-select-option value="china">男</a-select-option>
          <a-select-option value="usa">女</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="等级" has-feedback>
        <a-select
          disabled
          v-decorator="[
          'level',
          {rules: [{ required: true, message: '请选择等级' }],
          initialValue:user.jurisdiction
          }
        ]"
          placeholder="选择等级"
        >
          <a-select-option value="china">合伙人</a-select-option>
          <a-select-option value="usa">团长</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="支付宝名称">
        <a-input
          v-decorator="[
          'zfbname',
          {
            rules: [ {
              required: true, message: '请输入支付宝名称',
            }],
            initialValue:user.zfbname
          }
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="推广位ID">
        <a-input
          v-decorator="[
          'pid',
          {
            rules: [ {
              required: true, message: '请输入推广位ID',
            }],
            initialValue:user.pid
          }
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="合伙人编号">
        <a-input
          disabled
          v-decorator="[
          'usercode',
          {
            rules: [ {
              required: true, message: '请输入合伙人编号',
            }],
             initialValue:user.usercode
          }
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
    <div class="title">
      <a>我的上级</a>
    </div>
    <meber-form :memberdata="parentdata" :levelIsShow="false"/>
    <div class="title">
      <a>我的下级</a>
    </div>
    <meber-form :memberdata="childdata" :levelIsShow="true"/>
  </div>
</template>
<script>
import { getusermessage, upuser, getparent, getchildren } from "@/api/user";
import { mapGetters } from "vuex";
import MeberForm from "@/components/common/meberform";
export default {
  data() {
    return {
      parentdata: [],
      childdata: [],
      confirmDirty: false,
      autoCompleteResult: [],
      user: null,
      leveldisable: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  components: {
    MeberForm
  },
  computed: {
    ...mapGetters(["jurisdiction"])
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    console.log("用户信息详细查询");
    let { phone, pid } = this.$route.query;
    if (!phone) {
      this.$message.error("没有查到相关用户信息");
      return;
    }
    this.init(phone, pid);
  },
  methods: {
    init(phone, pid) {
      Promise.all([
        getusermessage({ phone }),
        getparent({ pid }),
        getchildren({ pid })
      ]).then(res => {
        this.user = res[0].data.data;
        this.parentdata = res[1].data.data;
        this.childdata = res[2].data.data;
        console.log(this.parentdata, this.childdata);
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          upuser({ data: values }).then(res => {
            let { data } = res;
            console.log(data);
            if (data.code == 200) {
              this.$message.success(data.msg);
            }
          });
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (this.$route.query.phone) {
        //判断id是否有值
        //调数据
        let { phone, pid } = this.$route.query;
        this.init(phone, pid);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.myform {
  width: 60% !important;
  margin: 0 auto;
}
.title {
  height: 40px;
  width: 100% !important;
  margin: 0 auto;
  border-bottom: 1px solid #f8f8f8;
  a {
    position: relative;
    color: #000;
    font-size: 20px;
    font-weight: 600;
    &::after {
      content: "";
      position: absolute;
      top: 5px;
      right: -10px;
      width: 6px;
      height: 80%;
      background: #1890ff;
    }
  }
}
</style>
