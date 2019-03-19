<template>
  <div class="app">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item class="form-item-title" label="新闻标题" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          'news_title',
          {rules: [{ required: true, message: '请输入新闻标题!' }], initialValue:news_title,}
        ]"
          placeholder="请输入新闻标题"
        />
      </a-form-item>
      <!-- <a-form-item class="form-item-title" label="新闻栏目" :wrapper-col="{ span: 12 }">
        <a-select
          v-decorator="[
          'news_type',
          {rules: [{ required: true, message: '请选择新闻栏目!' }],initialValue:news_type}
        ]"
          placeholder="选择栏目"
        >
          <a-select-option value="male">花花新闻</a-select-option>
          <a-select-option value="female">周边新闻</a-select-option>
        </a-select>
      </a-form-item>-->
      <a-form-item class="form-item-title" label="新闻栏目" v-if="residences.length>0" :wrapper-col="{ span: 12 }">
        <a-cascader
          @change="handleChange"
          expandTrigger="hover"
          v-decorator="[
          'news_type',
          {
            initialValue:news_type,
            rules: [{ type: 'array', required: true, message: '请选择新闻栏目!' }],
          }
        ]"
          placeholder="选择栏目"
          :options="residences"
        />
      </a-form-item>
      <a-form-item>
        <mceeditor v-model="news_content" @on-upload-complete="uploadcomplete"></mceeditor>
        <!-- Value:{{Value}} -->
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
    <!--<mce-editor 
    :config           = "Config"
     v-model          = "Value"
    :url              = "Url" //图片上传地址
    :max-size         = "MaxSize"//文件上传最大值
    :accept           = "Accept"//接收什么格式的图片
    :with-credentials = false
    @on-ready         = "onEditorReady"//后面什么的没研究了
    @on-destroy       = "onEditorDestroy"
    @on-upload-success= "onEditorUploadComplete"
    @on-upload-fail   = "onEditorUploadFail"
    on-upload-complete
    ></mce-editor>-->
  </div>
</template>

<script>
import { insertnews, getallnewitem } from "@/api/news";
import { mapGetters } from "vuex";
import mceeditor from "@/components/Tinymce";
window.tinymce.baseURL = "/static/tinymce";
window.tinymce.suffix = ".min";

export default {
  components: {
    mceeditor
  },
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      news_content: "",
      news_title: "",
      news_type: [],
      id: "",
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      residences: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let { params } = this.$route.query;
      if (params) {
        params = JSON.parse(params);
        console.log("提现申请", params);
        this.news_content = params.news_content;
        this.news_title = params.news_title;
        this.news_type = params.news_type.split("/");
        this.id = params.id;
      }
      getallnewitem().then(res => {
        let { data } = res;
        if (data.code == 200) {
          console.log(res);
          this.residences = data.data;
          console.log("after", this.residences);
        }
      });
    },
    uploadcomplete(params) {
      console.log("上传完成", params);
    },
    handleChange(value, list) {
      // list = list || this.residences;
      // // console.log('!@!@',list)
      // value = value[0];
      // let _index = 0;
      // let isHaveChild = false;
      // // console.log('获取新闻栏目',value)
      // list.forEach((item, index) => {
      //   if (item.value == value) {
      //     _index = index;
      //   }
      //   if (item.hasOwnProperty("children")) {
      //     isHaveChild = true;
      //   }
      // });
      // if (!_index && isHaveChild) {
      //   this.handleChange(value, list[_index].children);
      // } else {
      //   getnewitem({ type: value }).then(res => {
      //     let { data } = res;
      //     if (data.code == 200) {
      //       list[_index].children = [];
      //       for (let item of data.data) {
      //         list[_index].children.push({
      //           value: item.columnlevel,
      //           label: item.columnlevel
      //         });
      //       }
      //     }
      //   });
      // }
    },
    handleSubmit(e) {
      console.log("mc", this.name);
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let news_type = values.news_type.join("/");
          insertnews({
            news_title: values.news_title,
            news_type,
            news_content: this.news_content,
            create_user: this.name,
            id: this.id
          }).then(res => {
            this.$message.success("操作成功");
            this.$router.push("/newslist");
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.app {
  width: 1204px;
  margin: 0 auto;
  overflow: hidden;
  .form-item-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
}
</style>