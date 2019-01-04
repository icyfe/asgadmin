<template>
  <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
    <a-form-item label='adzone_id' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId=" " :fieldDecoratorOptions="{rules: [{type:'string',pattern: /^[1-9]+$/, required: true, message: '请输入合法的adzone_id!' }]}">
      <a-input />
    </a-form-item>
    <a-form-item label='类别' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="gender" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please select your gender!' }]}">
      <a-select placeholder='请选择类别'>
        <a-select-option value='male'>男装</a-select-option>
        <a-select-option value='female'>女装</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label='提示' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
      <a>*每次每种类别最多更新100条</a>
    </a-form-item>
    <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
      <a-button type='primary' htmlType='submit'>
        更新
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      formLayout: "horizontal"
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    }
  }
};
</script>