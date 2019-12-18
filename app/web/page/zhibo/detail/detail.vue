<template>
  <layout description="直播详情" keywords="直播，详情">
    <div class="container">
      <h1 class="zhibo-detail-title">{{detail.title}}</h1>
      <!-- <video controls autoplay  class="video">
        <source :src="detail.url">
      </video> -->
      <video class="video" id="videoId" controls autoplay></video>
    </div>
  </layout>
</template>
<style scope>
@import "detail.css";

</style>
<script type='babel'>
import Vue from "vue";
import { Button, Select, Row, Col, Card, Pagination } from "element-ui";
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Pagination);
let player;
export default {
  components: {},
  data() {
    return {
      detail: {}
    };
  },
  computed: {
    getId(){
      console.log('>>>>',this.id);
      // this.id = this.id;
      return this.id;
    }
  },
  methods: {
    fetch(json) {
      this.$request
        .get(
          `/zhibo/api/detail/${this.id}`
        )
        .then(res => {
          const resData = res.data;
          if(resData.status) {
            this.detail = resData.detail;
            this.flvInit(resData.detail.url)
          }
        });
    },
    flvInit(url){
      console.log('>>>>>>',url)
      player = document.getElementById('videoId')
      if (flvjs.isSupported()) {
        var flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: url
  //         url: 'http://aldirect.flv.huya.com/backsrc/96188431-2692759886-11565315646350688256-2607602842-10057-A-0-1.flv'
        });
        flvPlayer.attachMediaElement(videoId);
        flvPlayer.load(); //加载
      }
    }
  },
  mounted() {
    
  },
  created() {
    this.fetch()
  }
};
</script>

