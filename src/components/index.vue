<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider collapsible v-model="collapsed">
      <div class="logo">
        <img :src="avatar">
        <a v-show="!collapsed">{{name}}</a>
      </div>
      <a-menu theme="dark" mode="inline">
        <!-- <a-menu-item key="1">
                    <a-icon type="pie-chart" />
                    <span>会员管理</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <a-icon type="desktop" />
                    <span>Option 2</span>
        </a-menu-item>-->
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="user"/>
            <span>合伙人管理</span>
          </span>
          <a-menu-item key="1" @click="jump('/member-list')">我的合伙人</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2" v-if="jurisdiction=='超级管理员'">
          <span slot="title">
            <a-icon type="team"/>
            <span>运营商管理</span>
          </span>
          <a-menu-item key="Operator1" @click="jump('/operator-detail')">运营商信息</a-menu-item>
          <a-menu-item key="Operator2" @click="jump('/member-list?type=all')">合伙人管理</a-menu-item>
          <!-- <a-menu-item
            key="Operator3"
            @click="jump('/operator-itemdetail')"
          >商品信息</a-menu-item>-->
          <a-menu-item key="Operator5" @click="jump('/registeroperator')">运营商注册</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title">
            <a-icon type="file-text"/>
            <span>订单管理</span>
          </span>
          <a-menu-item key="6" @click="jump('/orderlist')">订单列表</a-menu-item>
          <!-- <a-menu-item key="8">订单查询</a-menu-item> -->
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title">
            <a-icon type="pay-circle"/>
            <span>提现管理</span>
          </span>
          <a-menu-item key="9" @click="jump('/cash-drawal','0')">提现审核</a-menu-item>
          <a-menu-item key="10" @click="jump('/cash-drawal','1')">历史提现</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub5">
          <span slot="title">
            <a-icon type="contacts"/>
            <span>新闻管理</span>
          </span>
          <a-menu-item key="newslist" @click="jump('/newslist')">新闻列表</a-menu-item>
          <a-menu-item key="addnewsitem" v-if="jurisdiction=='超级管理员'" @click="jump('/newsection')">新增栏目</a-menu-item>
          <a-menu-item key="addnews" @click="jump('/additemidnews')">新增新闻</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="11" @click="jump('/commission')">
          <a-icon type="file"/>
          <span>佣金比例调整</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #001529; padding: 0">
        <a-row>
          <a-col :span="21" v-if="txmessage" @click="jump('/cash-drawal?type=0')">
            <a-carousel class="tx-tip" autoplay :dots="false">
              <div class="tx-title" v-for="(item, index) in txmessage" :key="index">
                <a-icon type="notification" style="color:black;margin:0 10px"/>
                <h3>提现提醒:合伙人{{item.zfbname}}申请提现,提现金额{{item.CommissionTrans}}元</h3>
              </div>
            </a-carousel>
          </a-col>
          <a-col :span="3">
            <div class="logo">
              <img :src="avatar">
              <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link" href="#">
                  {{name}}
                  <a-icon type="down"/>
                </a>
                <a-menu slot="overlay">
                  <router-link to="/user">
                    <a-menu-item key="2" class="ant-dropdown-menu-item">个人中心</a-menu-item>
                  </router-link>
                  <router-link to="/changepsw">
                    <a-menu-item key="1" class="ant-dropdown-menu-item">修改密码</a-menu-item>
                  </router-link>
                  <a-menu-item @click="jump('/login')" key="0">退出登入
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
        </a-breadcrumb>-->
        <div :style="{ marginTop:'24px', padding: '24px', background: '#fff', minHeight: '600px' }">
          <router-view/>
        </div>
      </a-layout-content>
      <a-layout-footer class="footer-container">爱省购 ©2018 Created by HXDZ</a-layout-footer>
    </a-layout>
    <audio
      id="audio"
      src="http://fjdx.sc.chinaz.com/Files/DownLoad/sound1/201811/10880.wav"
      type="audio/mpeg"
    />
    <a-modal title="提现提醒" v-model="visible" @ok="handleOk" cancelText="关闭" okText="前往处理">
      <div class="tx-title" v-for="(item, index) in txmessage" :key="index">
        <p
          class="tx-tc"
          @click="jump('/cash-drawal',0)"
        >合伙人{{item.zfbname}}申请提现,提现金额{{item.CommissionTrans}}元</p>
      </div>
    </a-modal>
  </a-layout>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "name",
      "phone",
      "avatar",
      "jurisdiction",
      "txmessage",
      "play"
    ])
  },
  data() {
    return {
      collapsed: false,
      news: null,
      visible: false
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
        } else {
          this.openmusic();
          this.showModal();
        }
      });
      // this.user = sessionStorage.getItem("user");
      // this.user = JSON.parse(this.user);
      // if (!this.user) {
      //   this.$router.push("/login");
      // }
      // console.log("realace", this.user);
    },
    openmusic() {
      const audio = document.getElementById("audio");
      if (audio != null && this.play) {
        audio.play();
        this.$store.commit("SET_PLAY", false);
      }
    },
    showModal() {
      console.log("提现消息!!!", this.txmessage);
      if (this.txmessage) {
        this.visible = true;
        return;
      }
    },
    handleOk(e) {
      this.visible = false;
      this.jump("/cash-drawal", 0);
    },
    jump(url, type) {
      if (url == "/login") {
        sessionStorage.clear();
        this.$router.push(url);
        return;
      } else if (url == "/cash-drawal") {
        this.visible = false;
        console.log(type);
        this.$router.push({ path: url, query: { type: type } });
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
.tx-tip {
  width: 50%;
  margin: 10px auto 0 auto;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  .tx-title {
    display: flex !important;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    h3 {
      color: black !important;
    }
  }
}
.tx-tc {
  cursor: pointer;
}
</style>
