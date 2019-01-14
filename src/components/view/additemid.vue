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
        action="//localhost:3302/api/post/upload"
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
        action="//localhost:3302/api/post/upload"
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
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [{}],
      previewVisible1: false,
      previewImage1: "",
      fileList1: [{}]
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
      console.log("fileList", fileList);
    },
    handleChange1({ fileList }) {
      this.fileList1 = fileList;
      //console.log("fileList", fileList);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          //console.log("Received values of form: ", values);
          values.seller_id = "mm";
          values.shop_title = "chl店";

          let ret = operatoritemdetailinsert(values);
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
