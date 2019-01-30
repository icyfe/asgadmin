<template>
  <div
    class="content"
    v-if='tzratio'
  >
    <a-form
      :form="form"
      @submit="submit"
    >
      <div class="wrap">
        <h2 class="title">各等级佣金比列</h2>
        <a-form-item>
          <a-input
            addonBefore="团长"
            addonAfter="%"
            v-decorator="[
          'tzratio',
          {rules: [{ required: true,  pattern:/\d/g,message: '请输入合法的比列值！' }],initialValue:tzratio *100,transform:transform}
        ]"
          />
        </a-form-item>
        <a-form-item>

          <a-input
            addonBefore="一级代理"
            addonAfter="%"
            v-decorator="[
          'oneratio',
          {rules: [{ required: true,pattern:/\d/g, message: '请输入合法的比列值！' }],initialValue:oneratio *100}
        ]"
          />

        </a-form-item>
        <a-form-item>

          <a-input
            addonBefore="二级代理"
            addonAfter="%"
            v-decorator="[
          'tworatio',
          {rules: [{ required: true,pattern:/\d/g, message: '请输入合法的比列值！' }],initialValue:tworatio *100}
        ]"
          />

        </a-form-item>
        <a-form-item>

          <a-input
            addonBefore="三级代理"
            addonAfter="%"
            v-decorator="[
          'threeratio',
          {rules: [{ required: true,pattern:/\d/g, message: '请输入合法的比列值！' }],initialValue:threeratio *100}
        ]"
          />

        </a-form-item>
      </div>
      <a-form-item>
        <a-button
          type="primary"
          class="bt"
          size="large"
          @click="submit"
        >保存修改</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { getCommission, upCommission } from "@/api/commission";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["jurisdiction"])
  },
  data() {
    return {
      tzratio: null,
      oneratio: null,
      tworatio: null,
      threeratio: null
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.jurisdiction != "superadmin") {
        this.$router.push("/401");
        return;
      }
      getCommission().then(res => {
        let data = res.data.result;
        this.tzratio = data.tz.ratio;
        this.oneratio = data.one.ratio;
        this.tworatio = data.two.ratio;
        this.threeratio = data.three.ratio;
      });
    },
    submit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        let total =
          parseInt(values.oneratio) +
          parseInt(values.tworatio) +
          parseInt(values.threeratio) +
          parseInt(values.tzratio);
        if (total > 100) {
          console.log(total);
          return this.$message.error("总佣金分配比列值超过100,不合法");
        }
        upCommission(values).then(res => {
          let { data } = res;
          if (data.code != 200) return this.$message.error("更新失败");
          this.$message.success(data.msg);
        });
      });
    },
    transform(value) {
      console.log(value);
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 30%;
  margin: 50px auto 0 auto;
}
.wrap {
  width: 100%;
}
.title {
  text-align: center;
}
.bt {
  width: 100%;
  text-align: center;
  //   padding: 10px 0;
}
.txt {
  //   padding: 10px 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

