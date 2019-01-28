<template>
  <div
    class="content"
    v-if="data"
  >
    <a-avatar
      :size=100
      :src="data.avatar"
      alt="点击更换头像"
    />
    <div>
      <p class="txt">昵称: {{data.username}}</p>
      <p class="txt">电话: {{data.phone}}</p>
      <p class="txt">支付宝账号: {{data.zfb}}</p>
      <p class="txt">性别: {{data.sex}}</p>
      <p class="txt">支付宝名称: {{data.zfbname}}</p>
      <p class="txt">推广位ID: {{data.pid}}</p>
      <p class="txt">所属运营商代号: {{data.operatorcode}}</p>
      <p class="txt">等级: {{data.jurisdiction}}</p>
      <p class="txt">邀请码: {{data.invitecode}}</p>
    </div>
    <a-button
      v-if="data.type >1"
      type="primary"
      @click="showConfirm"
    >{{bttilte}}</a-button>
  </div>
</template>
<script>
import { getusermessage, userupgradelevel } from "@/api/user";

export default {
  data() {
    return {
      data: null,
      bttilte: "升级为团长"
    };
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    showConfirm() {
      let that = this;
      this.$confirm({
        title: "提示",
        content:
          that.data.type == 3 ? "是否将该用户升级为团长" : "是否撤销该用户团长",
        onOk() {
          that.upgradelevel(that.data.phone, that.data.type);
        },
        onCancel() {}
      });
    },
    init() {
      let { phone } = this.$route.query;
      console.log("用户", phone);
      getusermessage({ phone }).then(res => {
        this.data = res.data.data;
        this.bttilte = this.data.type == 2 ? "撤销团长" : "升级团长";
        console.log("shuju", this.data);
      });
    },
    upgradelevel(phone, type) {
      type = type == 2 ? 3 : 2;

      userupgradelevel({ phone, type }).then(res => {
        this.data = res.data.data;
        this.bttilte = this.data.type == 2 ? "撤销团长" : "升级团长";
        this.$message.success(this.data.type == 2 ? "升级成功" : "撤销成功");
        console.log("更新后的", this.data);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  margin: 0 auto;
  width: 500px !important;
  //   text-align: center;
}
.txt {
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  // text-align: left;
}
</style>
