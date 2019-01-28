<template>
  <div class="content">
    <a-form
      :form="form"
      id='components-form-demo-normal-login'
      @submit="handleSubmit"
      class='login-form'
    >
      <a-form-item>
        <a-input
          placeholder='请输入旧密码'
          v-decorator="[
          'oldpsw',
          { rules: [{ required: true, message: '该项不能为空!' }] }
        ]"
          type="password"
        >
          <a-icon
            slot="prefix"
            type='lock'
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'newpsw',
          { rules: [{ required: true, message: '请输入新的密码!' }] }
        ]"
          type='password'
          placeholder='请输入新的密码'
          :value="newpsw"
        >
          <a-icon
            slot="prefix"
            type='lock'
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          @change="check"
          :value="againnewpsw"
          v-decorator="[
          'againnewpsw',
          { rules: [{ required: true, message: '请再次输入新的密码!' }] }
        ]"
          type='password'
          placeholder='请再次输入新的密码'
        >
          <a-icon
            slot="prefix"
            type='lock'
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type='primary'
          htmlType='submit'
          class='login-form-button'
        >
          确认修改
        </a-button>

      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import md5 from "@/util/md5";
import { upuserpsw } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["phone"])
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      oldpsw: "",
      newpsw: "",
      againnewpsw: ""
    };
  },
  methods: {
    check(e) {},
    //检查两次密码是否一致
    checkpsw(onepsw, twopsw) {
      if (onepsw != twopsw) return false;
      return true;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (!this.checkpsw(values.newpsw, values.againnewpsw)) {
            this.$message.error("两次密码输入不一致");
            return;
          }
          values.phone = this.phone;
          values.againnewpsw = md5.hexMD5(
            values.againnewpsw + "aishenggou!@#$%%!@#"
          );
          values.oldpsw = md5.hexMD5(values.oldpsw + "aishenggou!@#$%%!@#");
          values.newpsw = md5.hexMD5(values.newpsw + "aishenggou!@#$%%!@#");
          upuserpsw(values).then(res => {
            let { data } = res;
            if (data.code != 200) {
              return this.$message.error(data.msg);
            }
            this.$message.success(data.msg);
            this.$router.push('/')
          });
          // console.log("Received values of form: ", values);
        } else {
          console.log(err);
        }
      });
    }
  }
};
</script>
<style>
.content {
  margin: 0 auto;
  width: 500px !important;
}
#components-form-demo-normal-login .login-form {
  width: 20% !important;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>