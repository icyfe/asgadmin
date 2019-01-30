<template>
  <a-form
    @submit="handleSubmit"
    :autoFormCreate="(form)=>{this.form = form}"
  >
    <a-form-item
      label='商品ID'
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="num_iid"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择商品ID' }]}"
    >
      <a-select
        showSearch
        placeholder="选择商品ID"
        style="width: 200px"
        :defaultActiveFirstOption="false"
        :showArrow="false"
        :filterOption="false"
        @search="handleSearch"
        @change="handleChange1"
        :notFoundContent="null"
      >
        <a-select-option
          v-for="d in data"
          :key="d.num_iid"
        >{{d.num_iid}}</a-select-option>
      </a-select>
    </a-form-item>
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
        :action="uploadurl"
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
import { operatoritemdetail } from "@/api/operatoritemdetail";
import { BASE_URL } from "@/config/config";
export default {
  computed: {
    ...mapGetters(["operatorcode"])
  },
  mounted() {
    this.fetch();
  },
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [{}],

      data: [],
      num_iid: "",
      //previewVisible1: false,
      //   previewImage1: "",
      //   fileList1: [{}],
      pic_url: [],
      //   small_img: []
      uploadurl: `${BASE_URL}api/post/upload/pic_url`
      //previewVisible1: false,
      //   previewImage1: "",
      //   fileList1: [{}],
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
    fetch(params = {}) {
      this.loading = true;
      let small_image = [];
      let ret = operatoritemdetail({ OperatorCode: this.operatorcode });

      ret.then(res => {
        const pagination = { ...this.pagination };

        pagination.total = res.data.results.length;

        this.loading = false;
        this.data = res.data.results;

        console.log("data", this.data);
        this.pagination = pagination;
      });
    },
    handleSearch(num_iid) {
      fetch(num_iid, data => (this.data = data));
    },
    handleChange1(num_iid) {
      console.log("num_iid", num_iid);
      this.num_iid = num_iid;
      fetch(num_iid, data => (this.data = data));
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
