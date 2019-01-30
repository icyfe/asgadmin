<template>
  <a-form
    @submit="handleSubmit"
    :autoFormCreate="(form)=>{this.form = form}"
  >
    <a-form-item
      label="商品ID"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="num_iid"
      :fieldDecoratorOptions="{rules: [{type:'string',pattern: /^[1-9]+$/, required: true, message: '请输入合法的seller_id!' }]}"
    >
      <a-input id="num_iid" />
    </a-form-item>
    <a-form-item
      label="商品类别"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="gender"
      :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please select your gender!' }]}"
    >
      <a-select
        placeholder="请选择类别"
        id="gender"
      >
        <a-select-option value="male">男装</a-select-option>
        <a-select-option value="female">女装</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="价格"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="zk_final_price"
      :fieldDecoratorOptions="{rules: [{type:'string',pattern: /^[1-9]+$/, required: true, message: '请输入数字!' }]}"
    >
      <a-input id="zk_final_price" />
    </a-form-item>
    <a-form-item
      label="库存数"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="volume"
      :fieldDecoratorOptions="{rules: [{type:'string',pattern: /^[1-9]+$/, required: true, message: '请输入数字!' }]}"
    >
      <a-input id="volume" />
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
        :action="uploadpic"
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
    <a-form-item
      label="商品小图"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="small_images"
      :fieldDecoratorOptions="{rules: []}"
    >
      <a-upload
        label="商品小图"
        :action='uploadsmall'
        listType="picture-card"
        @preview="handlePreview1"
        @change="handleChange1"
      >
        <div v-if="fileList1.length < 5">
          <a-icon type="plus" />
          <div class="ant-upload-text">上传图片</div>
        </div>
      </a-upload>
      <a-modal
        :visible="previewVisible1"
        :footer="null"
        @cancel="handleCancel"
      >
        <img
          alt="example"
          style="width: 100%"
          :src="previewImage1"
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
import { operatoritemdetailinsert } from "@/api/operatoritemdetail";
import { mapGetters } from "vuex";
import {BASE_URL} from '@/config/config'
export default {
  computed: {
    ...mapGetters(["operatorcode"])
  },
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [{}],
      previewVisible1: false,
      previewImage1: "",
      fileList1: [{}],
      pic_url: [],
      small_img: [],
      uploadpic:`${BASE_URL}api/post/upload/pic_url`,
      uploadsmall:`${BASE_URL}api/post/upload/small_img`
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
    handlePreview1(file) {
      this.previewImage1 = file.url || file.thumbUrl;
      this.previewVisible1 = true;
      //onsole.log("file", file);
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
      if (fileList[0] && fileList[0].response) {
        this.pic_url.push(fileList[0].response.result);
        console.log("pic", this.pic_url);
      }
    },
    handleChange1({ fileList }) {
      this.fileList1 = fileList;

      if (fileList[0] && fileList[0].response) {
        this.small_img.push(fileList[0].response.result);
        console.log("small", fileList[0].response, this.small_img);
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          //console.log("Received values of form: ", values);
          values.seller_id = this.operatorcode;
          values.shop_title = "chl店";
          values.pic_url = this.pic_url;
          values.small_img = this.small_img;
          delete values.pict_url;
          delete values.small_images;

          operatoritemdetailinsert(values).then(res => {
            let data = res.data;
            if (data.code == 200) {
              this.$message.success("新增成功！", 4);
              this.$router.push("./operator-itemdetail");
            }
          });

          console.log("values", values);
        }
      });
    }
    // handleSelectChange(value) {
    //   console.log(value);
    //   this.form.setFieldsValue({
    //     note: `Hi, ${value === "male" ? "man" : "lady"}!`
    //   });
    // }
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
