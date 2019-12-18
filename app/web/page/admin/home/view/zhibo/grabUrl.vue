<template>
  <div class="admin-controller">
    <div class="search">
      <el-input
        v-model="iframeUrl"
        :value="iframeUrl"
        placeholder="请输入直播间地址，目前仅支持虎牙！"
        size="medium"
        add
      >
        <el-button v-loading="isloading" type="primary" @click="startGetUrl" slot="append">开始解析</el-button>
      </el-input>
    </div>
    <div class="iframe-content">
      <iframe id="iframe" src frameborder="0"></iframe>
    </div>
  </div>
</template>
<style>
.admin-controller {
  /* padding: 20px; */
  /* text-align: center; */
}
.admin-controller .search {
  width: 80%;
  margin: 0 auto;
}
.iframe-content {
  border: 1px solid red;
  width: 300px;
  height: 100px;
  margin: 50px auto;
  visibility: visible;
}
</style>
<script type="babel">
export default {
  name: "graZhiboUrl",
  data() {
    return {
      isloading: false,
      iframeUrl: "https://www.huya.com/s"
      // https://www.huya.com/s
    };
  },
  methods: {
    startGetUrl() {
      this.isloading = false;
      const url = this.iframeUrl;
      if (url.trim() && url.length) {
        let iframes = document.getElementById("iframe");
        let iframeWindow = document.getElementById("iframe").contentWindow;
        iframes.src = url;
        if (!/*@cc_on!@*/ 0) {
          //if not IE
          iframes.onload = function() {
            this.isloading = true; //关闭loading
            alert("加载完成");
            setTimeout(function() {
              console.log("------------------");
              console.log(">>>>>status:", iframeWindow);
              console.log(">>>>>status:", iframeWindow.TT_ROOM_DATA);
              console.log(">>>>>status:", iframeWindow.TT_ROOM_DATA.state);
            });
          };
        } else {
          iframes.onreadystatechange = function() {
            if (iframes.readyState == "complete") {
              this.isloading = true; //关闭loading
              alert("请告诉开发者你的浏览器！");
            }
          };
        }
      } else {
        this.$message.error("请输入有效的地址");
      }
    }
  },
  created() {}
};
</script>
