<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
      <div class='card-panel' @click="goArticle">
        <!-- <div class="card-panel-icon-wrapper icon-people">
          <div icon-class="peoples" class-name="card-panel-icon"></div>
        </div> -->
        <div class="card-panel-description">
          <div class="card-panel-text">新闻总数</div>
          <span class="card-panel-num">{{articleTotal}}</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
      <div class="card-panel" @click="goMenus">
        <!-- <div class="card-panel-icon-wrapper icon-message">
          <div icon-class="message" class-name="card-panel-icon" ></div>
        </div> -->
        <div class="card-panel-description">
          <div class="card-panel-text">菜单总数</div>
          <span class="card-panel-num">{{munusTotal}}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      articleTotal: 0,
      munusTotal: 0
    }
  },
  components: {},
  methods: {
    handleFetchData() {
      this.$request.get(`/admin/api/articleAndMenuTotal`).then(res=> {
          if(res.data){
            this.articleTotal = res.data.aTotal;
            this.munusTotal = res.data.mTotal;
          }else{
            this.articleTotal = 0;
            this.munusTotal = 0;
          }
      });
    },
    goArticle() {
      this.$router.push({path:'/article/list'})
    },
    goMenus() {
      this.$router.push({path:'/menus/list'})
    }
  },
  created() {
    this.handleFetchData();
  }
};
</script>

<style scoped>
.panel-group {
  margin-top: 18px;
}

.panel-group .card-panel-col {
  margin-bottom: 32px;
}

.panel-group .card-panel {
  height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
}

.panel-group .card-panel:hover .card-panel-icon-wrapper {
  color: #fff;
}

.panel-group .card-panel:hover .icon-people {
  background: #40c9c6;
}

.panel-group .card-panel:hover .icon-message {
  background: #36a3f7;
}

.panel-group .card-panel:hover .icon-money {
  background: #f4516c;
}

.panel-group .card-panel:hover .icon-shoppingCard {
  background: #34bfa3;
}

.panel-group .card-panel .icon-people {
  color: #40c9c6;
}

.panel-group .card-panel .icon-message {
  color: #36a3f7;
}

.panel-group .card-panel .icon-money {
  color: #f4516c;
}

.panel-group .card-panel .icon-shoppingCard {
  color: #34bfa3;
}

.panel-group .card-panel .card-panel-icon-wrapper {
  float: left;
  margin: 14px 0 0 14px;
  padding: 16px;
  transition: all 0.38s ease-out;
  border-radius: 6px;
}

.panel-group .card-panel .card-panel-icon {
  float: left;
  font-size: 48px;
}

.panel-group .card-panel .card-panel-description {
  /* float: right; */
  font-weight: bold;
  margin: 26px;
}

.panel-group .card-panel .card-panel-description .card-panel-text {
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  margin-bottom: 12px;
}

.panel-group .card-panel .card-panel-description .card-panel-num {
  font-size: 20px;
}
</style>
