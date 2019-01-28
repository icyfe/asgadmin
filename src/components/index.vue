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
        <img :src="avatar" /> <a v-show="!collapsed">{{name}}</a>
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
            key="1"
            @click="jump('/member-list')"
          >我的代理</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="team" /><span>运营商管理</span></span>
          <a-menu-item
            key="Operator1"
            @click="jump('/operator-detail')"
          >运营商信息</a-menu-item>
          <a-menu-item
            key="Operator2"
            @click="jump('/operator-user')"
          >我的会员</a-menu-item>
          <a-menu-item
            key="Operator3"
            @click="jump('/operator-itemdetail')"
          >商品信息</a-menu-item>
          <!-- <a-menu-item
            key="Operator5"
            @click="jump('/operator-itemdetail')"
          >新闻发布</a-menu-item> -->
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title">
            <a-icon type="file-text" />
            <span>订单管理</span>
          </span>
          <a-menu-item
            key="6"
            @click="jump('/orderlist')"
          >订单列表</a-menu-item>
          <!-- <a-menu-item key="8">订单查询</a-menu-item> -->
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title">
            <a-icon type="pay-circle" /><span>提现管理</span></span>
          <a-menu-item
            key="9"
            @click="jump('/cash-drawal')"
          >提现审核</a-menu-item>

        </a-sub-menu>
        <a-sub-menu key="sub5">
          <span slot="title">
            <a-icon type="contacts" /><span>新闻管理</span></span>
          <a-menu-item
            key="itemidnews"
            @click="jump('/itemidnews')"
          >新闻信息</a-menu-item>
          
        </a-sub-menu>
        <a-menu-item
          key="11"
          @click="jump('/commission')"
          v-if="jurisdiction=='superadmin'"
        >
          <a-icon type="file" />
          <span>佣金比例调整</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #001529; padding: 0">
        <a-row>
          <a-col :span="21"></a-col>
          <a-col :span="3">
            <div class="logo">
              <img :src="avatar" />
              <a-dropdown :trigger="['click']">
                <a
                  class="ant-dropdown-link"
                  href="#"
                >
                  {{name}}
                  <a-icon type="down" />
                </a>
                <a-menu slot="overlay">
                  <router-link to='/user'>
                    <a-menu-item
                      key="2"
                      class="ant-dropdown-menu-item"
                    >
                      个人中心
                    </a-menu-item>
                  </router-link>
                  <router-link to='/changepsw'>
                    <a-menu-item
                      key="1"
                      class="ant-dropdown-menu-item"
                    >
                      修改密码
                    </a-menu-item>
                  </router-link>
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
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["name", "phone", "avatar", "jurisdiction"])
  },
  data() {
    return {
      collapsed: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("CheckLogin").then(res => {
        console.log("isLogin", res);
        if (!res) {
          this.$router.push("/login");
        }
      });
      // this.user = sessionStorage.getItem("user");
      // this.user = JSON.parse(this.user);
      // if (!this.user) {
      //   this.$router.push("/login");
      // }
      // console.log("realace", this.user);
    },
    jump(url) {
      if (url == "/login") {
        sessionStorage.clear();

        this.$router.push(url);
        return;
      }
      this.$router.push(url);
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
.paddingL {
  padding-left: 45px;
}
</style>
