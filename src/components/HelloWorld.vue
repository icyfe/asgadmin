<template>
  <div class="hello">
    <h1 v-if="a">{{ msg }}</h1>
    <button @click="test">点击隐藏</button>
  </div>
</template>

<script>
import crypto from "crypto";
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      a: 1,
      msg: "Welcome to  爱省购"
    };
  },
  methods: {
    on() {
      this.a = !this.a;
    },
    test() {
      const md5 = crypto.createHash("md5");

      let url = `/api/kyeopenapi/WaybillListDetails`;
      let params = {
        uuid: "59255024",
        key: "BE11F4F2D154DEBEC2350B2548F83E11",
        starttime: "2017-04-01",
        endtime: "2017-04-02",
        waybillno: ""
      };
      let str = "";
      for (let key in params) {
        str += key + params[key];
      }
      str = str.trim();
      console.log("参数:", str);
      let ssort = str.split("");
      ssort = ssort
        .sort()
        .join("")
        .toUpperCase();
      console.log("排序：", ssort);
      let md = md5
        .update("5C6117646C820B675DD734E88F02411D" + ssort)
        .digest("hex")
        .toUpperCase();
      console.log("加密后的：", md);
      axios
        .post(
          url,
          {
            uuid: "59255024",
            key: "BE11F4F2D154DEBEC2350B2548F83E11"
          },
          {
            headers: {
              "Content-Type": " application/json;charset=UTF-8",
              "access-token": md,
              kye: "10270"
            }
          }
        )
        .then(res => {
          console.log("SuccessMsg:", res);
        })
        .catch(e => {
          console.log("ErrorMsg:", e);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
