<template>
  <a-form
    @submit="handleSubmit"
    :autoFormCreate="(form)=>{this.form = form}"
  >
    <a-form-item
      label="新闻内容"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="itemid_content"
      :fieldDecoratorOptions="{rules: [{type:'string', required: true }]}"
    >
      <a-input id="itemid_content" />
    </a-form-item>
    
    <a-form-item
      label="商品主图"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="pict_url"
      :fieldDecoratorOptions="{rules: []}"
    >
      <a-upload
        label="商品主图"
        action="//127.0.0.1:3302/api/post/upload/pic_url"
        listType="picture-card"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < 2">
          <a-icon type="plus" />
          <div class="ant-upload-text">上传图片</div>
        </div>
      </a-upload>
      <a-modal
        :visible="previewVisible"
        :footer="null"
        @cancel="handleCancel"
      >
        <img
          alt="example"
          style="width: 100%"
          :src="previewImage"
        >
      </a-modal>
    </a-form-item>
    
    <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
      <a-button
        type="primary"
        htmlType="submit"
      >新增</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { itemidnewsinsert } from "@/api/itemidnews";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["operatorcode"])
  },
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [{}],
      //previewVisible1: false,
    //   previewImage1: "",
    //   fileList1: [{}],
       pic_url: [],
    //   small_img: []
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
      //onsole.log("file", file);
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
      if (fileList[0] && fileList[0].response) {
        this.pic_url.push(fileList[0].response.result);
        console.log("pic", this.pic_url);
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          //console.log("Received values of form: ", values);
          values.OperatorCode = this.operatorcode;
          values.pic_url = this.pic_url;
          delete values.pict_url;
          delete values.small_images;

          itemidnewsinsert(values).then(res => {
            let data = res.data;
            if (data.code == 200) {
              this.$message.success("新增成功！", 4);
              this.$router.push("./itemidnews");
            }
          });

          console.log("values", values);
        }
      });
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
