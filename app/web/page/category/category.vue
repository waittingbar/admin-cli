<template>
  <layout description='菜单' keywords='菜单页'>
     <div class='container'>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名字">
        </el-table-column>
        <el-table-column
          prop="url"
          label="url">
        </el-table-column>
      </el-table>
     </div>
  </layout>
</template>
<style>
  @import 'category.css';
</style>
<script type='babel'>
  import Vue from 'vue';
  import { Button, Select, Table, TableColumn } from 'element-ui';
  Vue.use(Button);
  Vue.use(Table);
  Vue.use(TableColumn);
  export default {
    components: {

    },
    data(){
      return {
      }
    },
   computed: {
      tableData(){
        return this.list;
      }
    },
    methods: {
      
    },
    mounted() {
      // if('serviceWorker' in navigator) {
      //   navigator.serviceWorker.register('/public/sw-category.js');
      // }
    }
  }
</script>

