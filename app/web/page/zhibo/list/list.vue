<template>
  <layout description="菜单" keywords="菜单页">
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6" style="margin-bottom: 20px" v-for="(item) in list" :key="item.id">
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://element.eleme.cn/2.0/static/hamburger.50e4091.png" class="image" />
            <div style="padding: 14px;">
              <span>{{item.title}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ item.time }}</time>
                <el-button type="text" class="button" @click="goZhiboDetail(item.id)">进入直播</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </layout>
</template>
<style scope>
@import "list.css";
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-row {
  margin-bottom: 20px;
}
.el-row::last-child {
  margin-bottom: 0;
}
</style>
<script type='babel'>
import Vue from "vue";
import { Button, Select, Table, TableColumn, Row, Col, Card, Pagination } from "element-ui";
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Pagination);
export default {
  components: {},
  data() {
    return {
      currentDate: new Date(),
      isFinish: false,
      isLoading: false,
      pageIndex: 1,
      pageSize: 10,
      params: {
        pageIndex: 1,
        pageSize: 10
      },
      list: [],
      total: 0
    };
  },
  computed: {
    // dataList(){
    //   console.log('>>>>',this.list);
    //   return this.list;
    // }
  },
  methods: {
    fetch(json) {
      this.$request
        .get(
          `/zhibo/api/list?pageIndex=${json.pageIndex}&pageSize=${json.pageSize}`
        )
        .then(res => {
          if (res.data.list && res.data.list.length) {
            this.total = res.data.total;
            this.list = this.list.concat(res.data.list);
          } else {
            this.isFinish = true;
          }
          this.isLoading = false;
        });
    },
    loadPage() {
      if (!this.isFinish && !this.isLoading) {
        this.isLoading = true;
        this.params.pageIndex++;
        setTimeout(() => {
          this.fetch(this.params);
        }, 1500);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    goZhiboDetail(id) {
      window.location.href = `/zhibo/detail/${id}`;
    }
  },
  created() {
    this.fetch(this.params);
  }
};
</script>

