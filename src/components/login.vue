<template>
  <a-layout
    id="components-layout-demo-top"
    class="layout"
  >
    <a-layout class="layout-bg">
      <a-layout-header>
        <div class="logo">
          <span slot="title">
            <a-icon type="user" />
            <span>爱省购后台管理系统</span>
          </span>
        </div>
      </a-layout-header>
      <a-layout-content style="padding: 0 50px">
        <a-alert
          :message="error"
          type="error"
          showIcon
          v-show="show"
        />
        <a-breadcrumb style="margin: 16px 0">
          <!-- <a-breadcrumb-item>登入</a-breadcrumb-item> -->
        </a-breadcrumb>
        <div class="login-container">
          <h3>欢迎登入</h3>
          <!-- <a-input placeholder="请输入用户名" />
          <a-input type="password" placeholder="请输入密码" />-->
          <a-form
            layout="vertical"
            @submit="handleSubmit"
            :autoFormCreate="(form)=>{this.form = form}"
          >
            <template v-if="form">
              <a-form-item
                :validateStatus="userNameError() ? 'error' : ''"
                :help="userNameError() || ''"
                fieldDecoratorId="user"
                :fieldDecoratorOptions="{rules: [{ type:'string',required: true, message: '请输入正确的用户名!' }]}"
              >
                <a-input placeholder="Username">
                  <a-icon
                    slot="prefix"
                    type="user"
                    style="color:rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item
                :validateStatus="passwordError() ? 'error' : ''"
                :help="passwordError() || ''"
                fieldDecoratorId="password"
                :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your Password!' }]}"
              >
                <a-input
                  type="password"
                  placeholder="Password"
                >
                  <a-icon
                    slot="prefix"
                    type="lock"
                    style="color:rgba(0,0,0,.25)"
                  />
                </a-input>
                <p
                  class="errtxt"
                  v-show="isError"
                >账号或密码错误</p>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  htmlType="submit"
                  :disabled="hasErrors(form.getFieldsError())"
                >登入</a-button>
              </a-form-item>
            </template>
          </a-form>
        </div>
      </a-layout-content>
      <a-layout-footer class="footer-container">爱省购 ©2018 Created by HXDZ</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import { postLogin } from "@/api/login";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  data() {
    return {
      hasErrors,
      form: null,
      isError: false,
      show: false,
      error: ""
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
    // login();
  },
  methods: {
    //页面初始化
    init() {
      this.$store.dispatch("CheckLogin").then(res => {
        console.log("isLogin", res);
        if (!res) {
          this.$router.push("/login");
        } else {
          this.$router.push("/");
        }
      });
    },
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      //   console.log('user',isFieldTouched("userName"))
      return isFieldTouched("user") && getFieldError("user");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      //    console.log('pwd',isFieldTouched("password"))
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      let that = this;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log("Received values of form: ", values);
          if (values) {
            this.$store.dispatch("LoginByUsername", values).then(() => {
              this.$router.push({ path: "/" });
            });
          } else {
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less" >
.logo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 32px;
  //  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  color: #fff;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
  }
  span {
    color: #fff;
    font-size: 20px;
  }
}
.layout {
  height: 100%;
  width: 100%;
  background: url("./images/login.jpg") no-repeat center center;
  background-size: cover;
  .layout-bg {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    // opacity: 0.6;
  }
}
.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 50px;
  border-radius: 8px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 25px #cac6c6;
  text-align: center;
  h3 {
    font-weight: 600;
    font-size: 20px;
  }
}
.footer-container {
  background: #fff;
  text-align: center;
}
.errtxt {
  color: red;
  font-size: 14px;
  text-align: left;
  margin-top: 10px;
}
</style>