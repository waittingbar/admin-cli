<template>
<div>
    <nav class="navbar navbar-default" style="background: #1e3690;">
        <div class="container-fluid">
            <div class="navbar-header page-scroll">
                <button type="button" @click="menuBtn" class="navbar-toggle" :class="{ 'collapsed': collapsed }" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/">Egg Vue</a>
            </div>
            <div class="collapse navbar-collapse" :class="{ 'collapse in': collapsed }" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right" :key="item.id" v-for="item in list">
                    <li>
                        <a :href="item.url">{{item.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- <header class="intro-header" style="background-color:#3c763d;">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1">
                    <div class="site-heading">
                        <h1>新闻资讯</h1>
                        <hr class="large">
                    </div>
                </div>
            </div>
        </div>
    </header> -->
</div>
</template>
<script type="babel">
import "./header.css";
export default {
  components: {},
  data() {
    return {
      collapsed: false,
      list: []
    };
  },
  computed: {},
  created() {
      this.fetch();
  },
  methods: {
    fetch(){
    this.$request.get('/menuslist').then(res=> {
        if(res.data && res.data.length){
            this.list = res.data;
        }else{
            this.list = [];
        // this.isFinish = true;
        }
        // this.isLoading = false;
    });
    },
    menuBtn() {
      this.collapsed = !this.collapsed;
    }
  },
  mounted() {}
};
</script>
