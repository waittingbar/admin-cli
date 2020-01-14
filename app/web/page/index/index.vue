<template lang="pug">
  layout(description="首页" keywords="首页关键字")
    div(class="container")
      div(class="row" :key="item.id" v-for="item in list")
        div(class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1")
          div(class="post-preview")
            div(:href="item.url")
              h2(class="post-title")            
                a(:href="item.url" target="_blank" style="font-size: 26px;") {{item.title}}
          <hr>
    div(style="text-align:center" v-if="isLoading")
      img(src="../../asset/images/loading.gif")
</template>
<style lang="stylus">
  @import "index.styl";
</style>
<script type="babel">
  export default {
    components: {

    },
    data(){
      return {
        isFinish: false,
        isLoading : false,
        pageIndex: 1,
        pageSize: 10,
        params: {
          pageIndex: 1,
          pageSize: 10
        },
        list: []
      }
    },
    computed: {
      // lists(){
      //   return this.list;
      // }
    },
    methods: {
      fetch(json){
        this.$request.get(`/admin/api/article/list?pageIndex=${json.pageIndex}&pageSize=${json.pageSize}`).then(res=> {
          if(res.data.list && res.data.list.length){
            this.total = res.data.total;
            this.list = this.list.concat(res.data.list);
          }else{
            this.isFinish = true;
          }
          this.isLoading = false;
        });
      },
      loadPage(){
        if (!this.isFinish && !this.isLoading) {
          this.isLoading = true;
          this.params.pageIndex++;
          setTimeout(()=>{
            this.fetch(this.params);
          }, 1500);
        }
      }
    },
    created() {
      this.fetch(this.params);
    },
    mounted() {
      window.addEventListener('scroll', ()=>{
        this.loadPage();
      }, false);
    }
  }
</script>

