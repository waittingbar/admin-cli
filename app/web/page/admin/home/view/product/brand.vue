<template>
  <div>
    <div class="search">
      <el-row class="clear">
        <label>关键字:</label>
        <el-input
          size="small"
          class="search-input"
          clearable
          v-model="params.name"
          placeholder="关键字"
        ></el-input>
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
      style="width: 100%;"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" align="center" width="100" label="序号"></el-table-column>
      <el-table-column prop="brand_code" align="center" label="品牌code"></el-table-column>
      <el-table-column prop="brand_name" align="center" label="品牌名称"></el-table-column>
      <el-table-column prop="brand_manufacturer_name" align="center" label="所属厂家"></el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="props">
          <router-link :to="{params: {id: props.row.id}}" tag="span">
            <el-button
              type="info"
              size="small"
              icon="edit"
              @click="openDialog('edit', props.row)"
            >修改</el-button>
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
          slot="handler"
        >
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
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      width="600px"
      title="编辑品牌"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="品牌名称" prop="name" :label-width="formLabelWidth">
          <el-input class="form-context-length" v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属厂家" prop="manufactorId" :label-width="formLabelWidth">
          <el-select style="width: 374px" v-model="form.manufactorId" placeholder="请选择厂家" @change="selectWorkName()">
            <el-option
              v-for="item in optionsList"
              :key="item.manufactor_code"
              :label="item.manufactor_name"
              :value="item.manufactor_code"
            ></el-option>
          </el-select>
          <!-- <el-input class="form-context-length" v-model="form.manufactorId" auto-complete="off"></el-input> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitMenus">确 定</el-button>
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
import $request from "framework/network/request";
// import { constants } from 'crypto';
export default {
  data() {
    return {
      articleList: [],
      total: 0,
      dialogType: "add",
      params: {
        name: "",
        pageIndex: 1,
        pageSize: 10
      },
      optionsList: [],
      //请求时的loading效果
      loading: false,
      //批量选择数组
      batchSelectArray: [],
      dialogFormVisible: false,
      form: {
        name: undefined,
        manufactorId: undefined,
        manufactorName: undefined
      },
      formLabelWidth: "120px",
      rules: {
        name: [{ required: true, message: "请输入品牌名称", trigger: "blur" }],
        manufactorId: [
          { required: true, message: "请选择品牌地址", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getMenuList(json) {
      this.loading = true;
      $request
        .get(
          `/admin/api/brand/list?pageIndex=${json.pageIndex}&pageSize=${json.pageSize}&name=${json.name}`
        )
        .then(res => {
          if (res.data.list && res.data.list.length) {
            this.total = res.data.total;
            this.articleList = res.data.list;
          } else {
            this.articleList = [];
            this.total = 0;
          }
          this.loading = false;
        });
    },
    getManufactorList(json) {
      $request.get(`/admin/api/manufactor/list?pageIndex=${json.pageIndex}&pageSize=${json.pageSize}&name=${json.name}`).then(res=> {
        if(res.data.list && res.data.list.length){
          this.optionsList = res.data.list;
        }else{
          this.optionsList = [];
        }
      });
    },
    selectWorkName(id) {
      this.form.manufactorName = this.optionsList.find((item)=>{return item.manufactorId === id})
    },
    query() {
      const params = this.params;
      params.pageIndex = 1;
      this.getMenuList(params);
    },
    openDialog(type, row) {
      this.form = {
        name: type === "edit" ? row.brand_name : undefined,
        manufactorId: type === "edit" ? row.brand_manufacturer_Id : undefined,
        manufactorName:type === "edit" ? row.brand_manufacturer_name : undefined,
        code: type === "edit" ? row.brand_code : undefined
      };
      // this.$refs.form.resetFields();
      this.dialogFormVisible = true;
    },
    submitMenus() {
      // 提交操作
      this.$refs["form"].validate(valid => {
        if (valid) {
          $request.post("/admin/api/brand/add", this.form).then(res => {
            const insertSuccess = res.data.affectedRows === 1;
            if (insertSuccess) {
              this.dialogFormVisible = false;
              this.getMenuList(this.params);
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          console.log("error submit!!");
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
      this.getMenuList(this.params);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.params.pageIndex = val;
      this.getMenuList(this.params);
    },
    handleEdit(index, row) {
      this.$message(`你点击了编辑操作 index:${index}, id:${row.id}`);
    },
    handleDelete(id) {
      // this.$message(`删除[${row.title}]成功!`);
      if (id) {
        $request.get(`/admin/api/brand/del?id=${id}`).then(res => {
          const insertSuccess = res.data.affectedRows > 0;
          if (insertSuccess) {
            this.$message.success("删除成功！");
            this.getMenuList(this.params);
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message.error("请选择要删除的品牌！");
      }
    },
    //批量选择
    batchSelect(val) {
      this.batchSelectArray = val;
    },
    //批量删除
    batchDel() {
      this.$confirm("将批量删除选择品牌, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const list = this.batchSelectArray;
          if (list && list.length) {
            let ids = [];
            list.map(item => {
              ids.push(item.id);
            });
            this.handleDelete(ids.join(","));
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getMenuList(this.params);
    this.getManufactorList({pageIndex: 1, pageSize: 1000, name: ''});
  },
  computed: {}
};
</script>
