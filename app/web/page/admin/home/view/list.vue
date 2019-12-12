<template>
  <div>
      <div class="search">
        <el-row class="clear">
              <label> 标题:</label><el-input size="small" class="search-input" clearable v-model="params.title" placeholder="关键字"></el-input>
              <el-button size="small" class="search-button" type="primary" @click="query()">查询</el-button>
              <el-button size="small" class="add-button" type="success" @click="openDialog()">新增</el-button>
        </el-row>
      </div>
      <el-table
        :data="articleList"
        v-loading="loading"
        element-loading-text="拼命加载中"
        border
        @selection-change="batchSelect"
        style="width: 100%;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="index"
          align="center"
          label="序号">
          <template slot-scope="props">
            <span>{{props.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          align="center"
          label="新闻id">
        </el-table-column>
        <el-table-column
          prop="title"
          align="center"
          label="标题">
          <template slot-scope="props">
            <router-link :to="'/article/detail/'+ props.row.id">{{props.row.title}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="summary"
          align="center"
          label="副标题">
        </el-table-column>
        <el-table-column
          prop="url"
          align="center"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="time"
          label="发布日期"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="180">
          <template slot-scope="props">
            <router-link :to="{params: {id: props.row.id}}" tag="span">
              <el-button type="info" size="small" icon="edit" @click="openDialog('edit', props.row)">修改</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="handleDelete(props.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 16px">
        <div style="float:left">
           <el-button
            type="danger"
            icon="delete"
            size="small"
            :disabled="batchSelectArray.length === 0"
            @click="batchDel"
            slot="handler">
            <span>批量删除</span>
        </el-button>
        </div>
        <div style="float:right">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="params.pageIndex"
              :page-sizes="[10, 15, 20, 50]"
              :page-size="params.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
      </div>
      <el-dialog title="新增文章" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" :rules="rules" >
        <el-form-item label="文章标题" prop="title" :label-width="formLabelWidth">
          <el-input class="form-context-length" v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章副标题" prop="summary" :label-width="formLabelWidth">
          <el-input class="form-context-length" v-model="form.summary" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章地址" prop="url" :label-width="formLabelWidth">
          <el-input class="form-context-length" v-model="form.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="time" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.time"
            class="form-context-length"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择发布时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitArticle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scope>
  .form-context-length {
    width: 85% !important;
  }
</style>
<script type="babel">
// import { SET_ARTICLE_LIST, DELETE_ARTICLE } from '../store/app/mutation-type';
import $request from 'framework/network/request';
// import { constants } from 'crypto';
// import { Dialog } from 'element-ui';
  // Vue.use(Dialog);
export default {
  data() {
    return {
      articleList: [],
      total: 0,
      dialogType: 'add',
      params: {
        title: '',
        pageIndex: 1,
        pageSize: 10
      },
      //请求时的loading效果
      loading: false,
      //批量选择数组
      batchSelectArray: [],
      dialogFormVisible: false,
      form: {
        title: undefined,
        summary: undefined,
        url: undefined,
        time: undefined,
      },
      formLabelWidth: '120px',
      rules: {
        title: [
            { required: true, message: '请输入文章名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入文章地址', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    fetchApi(json) {
      console.log('>>>查询', json);
      this.loading = true;
      $request.get(`/admin/api/article/list?pageIndex=${json.pageIndex}&pageSize=${json.pageSize}&title=${json.title}`).then(res=> {
        console.log(res.data);
        if(res.data.list && res.data.list.length){
          this.total = res.data.total;
          this.articleList = res.data.list;
        }else{
          this.articleList = [];
          this.total = 0;
        }
        this.loading = false;
      });
    },
    query() {
      const params = this.params;
      params.pageIndex = 1;
      this.fetchApi(params);
    },
    openDialog(type, row) {
      this.form = {
        title: type === 'edit' ? row.title : undefined,
        summary: type === 'edit' ? row.summary : undefined,
        url: type === 'edit' ? row.url : undefined,
        time: type === 'edit' ? row.time : undefined,
        id:  type === 'edit' ? row.id : undefined,
      };
      // this.$refs.form.resetFields();
      this.dialogFormVisible = true;
    },
    submitArticle() {
      // 提交操作
       this.$refs['form'].validate((valid) => {
          if (valid) {
             $request.post('/admin/api/article/add', this.form).then(res=> {
                const insertSuccess = res.data.affectedRows === 1;
                if (insertSuccess) {
                  this.dialogFormVisible = false;
                  this.fetchApi(this.params);
                } else {
                  this.$message.error(res.data.message);
                }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    handleSelectionChange(val) {
      console.log("handleSelectionChange", val);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.params.pageSize = val;
      this.fetchApi(this.params);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.params.pageIndex = val;
      this.fetchApi(this.params);
    },
    handleEdit(index, row) {
      this.$message(`你点击了编辑操作 index:${index}, id:${row.id}`);
    },
    handleDelete(id) {
      // this.$message(`删除[${row.title}]成功!`);
      if (id) {
        $request.get(`/admin/api/article/del?id=${id}`).then(res=> {
         const insertSuccess = res.data.affectedRows > 0;
          if (insertSuccess) {
            this.fetchApi(this.params);
          } else {
            this.$message.error(res.data.message);
          }
      });
      } else {
        this.$message.error('请选择要删除的文章！');
      }
    },
    //批量选择
    batchSelect(val) {
      this.batchSelectArray = val;
    },
    //批量删除
    batchDel() {
      this.$confirm("将批量删除选择文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const list = this.batchSelectArray;
        if (list && list.length) {
          let ids = [];
          list.map(item=> {
            ids.push(item.id);
          })
          this.handleDelete(ids.join(','));
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      });
    }
  },
  created() {
    this.fetchApi(this.params);
  },
  computed: {

  }
};
</script>
