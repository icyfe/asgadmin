<template>
  <a-layout
    id="components-layout-demo-side"
    style="min-height: 100vh"
  >
    <a-layout-sider
      collapsible
      v-model="collapsed"
    >
      <div class="logo">
        <img src="../image/avatar.jpg" /> <a v-show="!collapsed">{{user.name}}</a>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
      >
        <!-- <a-menu-item key="1">
                    <a-icon type="pie-chart" />
                    <span>会员管理</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <a-icon type="desktop" />
                    <span>Option 2</span>
                </a-menu-item> -->
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="user" /><span>会员管理</span></span>
          <a-menu-item
            key="3"
            @click="jump('/myuser')"
          >我的代理</a-menu-item>
          <a-menu-item
            key="4"
            @click="jump('/hello')"
          >业绩看板</a-menu-item>
          <!-- <a-menu-item key="5">Alex</a-menu-item> -->
        </a-sub-menu>
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="user" /><span>运营商管理</span></span>
        </a-sub-menu>
        <!-- <a-sub-menu key="sub2">
                    <span slot="title">
                        <a-icon type="team" /><span>Team</span></span>
                    <a-menu-item key="6">Team 1</a-menu-item>
                    <a-menu-item key="8">Team 2</a-menu-item>
                </a-sub-menu> -->
        <a-menu-item
          key="9"
          @click="jump('/upCounpons')"
        >
          <a-icon type="file" />
          <span>管理优惠券</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #001529; padding: 0">
        <a-row>
          <a-col :span="21"></a-col>
          <a-col :span="3">
            <div class="logo">
              <img src="../image/avatar.jpg" />
              <a-dropdown :trigger="['click']">
                <a
                  class="ant-dropdown-link"
                  href="#"
                >
                  {{user.name}}
                  <a-icon type="down" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item
                    key="1"
                    @click="test()"
                  >
                    <a href="#">个人中心</a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a href="#">修改密码</a>
                  </a-menu-item>
                  <a-menu-item
                    @click="jump('/login')"
                    key="0"
                  >
                    退出登入
                    <!-- <a href="/login">退出登入</a> -->
                  </a-menu-item>

                  <!-- <a-menu-divider /> -->
                  <!-- <a-menu-item key="3">3rd menu item</a-menu-item> -->
                </a-menu>
              </a-dropdown>
            </div>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <!-- <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>User</a-breadcrumb-item>
                    <a-breadcrumb-item>Bill</a-breadcrumb-item>
                </a-breadcrumb> -->
        <div :style="{ marginTop:'24px', padding: '24px', background: '#fff', minHeight: '600px' }">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer class="footer-container">
        爱省购 ©2018 Created by HXDZ
      </a-layout-footer>
    </a-layout>
  </a-layout>

</template>
<script>
import { index } from "@/api/";
import axios from "axios";

export default {
  data() {
    return {
      collapsed: false,
      user: ""
    };
  },
  created() {
    // this.user = sessionStorage.getItem("user");
    // this.user = JSON.parse(this.user);
    // if (!this.user) {
    //   this.$router.push("/login");
    // }
    // console.log(this.user);
  },
  methods: {
    jump(url) {
      if (url == "/login") {
        sessionStorage.clear();

        this.$router.push(url);
        return;
      }
      this.$router.push(url);
    },
    test() {
      let url = `http://testapi.ky-express.com/kyeopenapi/WaybillListDetails`;
      let params = {
        uuid: "59255024",
        key: "BE11F4F2D154DEBEC2350B2548F83E11"
      };
      let str = "";
      for (let key in params) {
        str += key + params[key];
      }
      console.log("参数:", str);
      let ssort = str.split("");
      ssort = ssort.sort().join("");
      console.log("排序：", ssort);
      let md = md5.md5("5C6117646C820B675DD734E88F02411D" + ssort);
      console.log("加密后的：", md);
      axios
        .post(
          url,
          {
            uuid: "59255024",
            key: "BE11F4F2D154DEBEC2350B2548F83E11"
          },
          {
            headers: {
              "Content-Type": "application/json",
              "access-token": md,
              key: "5C6117646C820B675DD734E88F02411D"
            }
          }
        )
        .then(res => {
          console.log("SuccessMsg:", res);
        })
        .catch(e => {
          console.log("ErrorMsg:", e);
        });
    }
  }
};
</script>

<style  scoped lang="less">
#components-layout-demo-side .logo {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 32px;
  //  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
  }
  a {
    color: #fff;
  }
}
.footer-container {
  background: #fff;
  text-align: center;
}
.link a {
  color: #fff !important;
}
</style>
