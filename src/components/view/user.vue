<template>
  <div class="content">

    <a-upload
      listType="picture-card"
      class="avatar-uploader"
      :showUploadList="false"
      action="//127.0.0.1:3302/api/post/upload/avatar"
      :beforeUpload="beforeUpload"
      @change="handleChange"
      :data="{phone}"
    >
      <a-avatar
        v-if="avatar"
        :size=100
        :src="avatar"
        alt="点击更换头像"
      />

      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">Upload</div>
      </div>
      <a>点击更换头像</a>
    </a-upload>

    <div>
      <p class="txt">昵称: {{name}}</p>
      <p class="txt">电话: {{phone}}</p>
      <p class="txt">推广位ID: {{pid}}</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapGetters(["avatar", "phone", "name", "pid"])
  },
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.$store.commit("SET_AVATAR", imageUrl);
          //   this.avatar = imageUrl;
          this.$message.success('更换成功！')
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJPG && isLt2M;
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
