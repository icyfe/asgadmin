<template>
  <div class="list-view" @scroll="handleScroll($event)">
    <div class="list-view-phantom" :style="{ height:listheight + 'px' }"></div>
    <div ref="content" class="list-view-content">
      <div
        class="list-view-item"
        :style="{ height: itemHeight+ 'px' }"
        v-for="item in visibleData"
        :key="item.value"
      >{{ item }}</div>
    </div>
  </div>
</template>
​
<style>
.list-view {
  height: 600px;
  width: 200px;
  overflow: auto;
  position: relative;
  border: 1px solid #666;
}
​ .list-view-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.list-view-content {
  position: absolute;
  height: 600px;
  z-index: 99;
  left: 0;
  right: 0;
  top: 0;
}
​ .list-view-item {
  padding: 5px;
  color: #000;
  height: 30px;
  width: 200px;
  line-height: 30px;
  box-sizing: border-box;
}
</style>
​
<script>
export default {
  props: {
    itemHeight: {
      type: Number,
      default: 30
    }
  },
  mounted() {
    this.visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight);
    this.start = 0;
    this.end = this.start + this.visibleCount;
    this.visibleData = this.data.slice(this.start, this.end);
  },
  created() {
    for (let i = 0; i < 100000; i++) {
      this.data.push("第" + i + "条");
    }
    this.listheight = this.data.length * 30;
  },
  data() {
    return {
      data: [],
      start: 0,
      end: null,
      visibleCount: null,
      visibleData: [],
      scrollTop: 0,
      listheight: ""
    };
  },
  methods: {
    handleScroll(event) {
      const scrollTop = this.$el.scrollTop;
      const fixedScrollTop = scrollTop - (scrollTop % 30);
      this.$refs.content.style.webkitTransform = `translate3d(0, ${fixedScrollTop}px, 0)`;
      this.start = Math.floor(scrollTop / 30);
      this.end = this.start + this.visibleCount;
      this.visibleData = this.data.slice(this.start, this.end);
      // if (this.listheight - this.$el.clientHeight - fixedScrollTop == 22) {
      //   let len = this.data.length;
      //   for (let i = len - 1; i < len + 100; i++) {
      //     // console.log(i);
      //     this.data.push("第" + i + "条");
      //     this.listheight = this.listheight + 30;
      //   }

      //   console.log("新增的高度", this.listheight, "新增数据", this.data);
      // }
    }
  }
};
</script>
 