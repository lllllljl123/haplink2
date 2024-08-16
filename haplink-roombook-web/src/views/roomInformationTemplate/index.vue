<template>
  <div class="app-container">
    <el-row class="box" :gutter="20">
      <el-col class="box flex-column-center" :span="5" :xs="24">
        <div class="left-title">
          <img src="@/assets/images/document.png" alt="">
          <span>房间信息模版目录</span>
        </div>
        <el-input
            size="small"
            v-model="keyword"
            placeholder="请输入关键词"
            @keyup.enter.native="handleQuery"
        />
        <div class="left-btn flex-center">
          <el-button class="search-btn" type="primary" size="mini" @click="getHeaderListFn">搜索</el-button>
          <el-button size="mini" @click="resetTree">清空条件</el-button>
        </div>
        <div class="left-tree card">
          <el-tree
              :data="data1"
              node-key="id"
              :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span class="ellipsis flex-center" :class="data.parentId === 0?'pre-label':'chi-label'">{{ formatTreelabelFn(data.indexLabel.slice(0,data.indexLabel.length-1)) }} <span class="tree-line" v-if="data.parentId !== 0">|</span> {{ node.label }}</span>
              <span>
                <img @click="toggleShow(data,false)" v-show="data.show" class="eye" src="@/assets/images/eye-hidden.png" alt="">
                <img @click="toggleShow(data,true)" v-show="!data.show" class="eye" src="@/assets/images/eye-show.png" alt="">
              </span>
            </span>
          </el-tree>
        </div>
      </el-col>

      <el-col :span="19" :xs="24">
        <div class="right card">
          <el-col class="calcTable" :xs="24">
            <el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
              <el-form-item label="防水需求">
                <el-select
                    v-model="queryParams.isWaterproof"
                    placeholder="请选择防水需求"
                    clearable
                    style="width: 180px"
                >
                  <el-option
                      v-for="dict in dict.type.sys_yes_no"
                      :key="dict.value"
                      :label="dict.label"
                      :value="dict.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="防爆需求">
                <el-select
                    v-model="queryParams.isExplosionProof"
                    placeholder="请选择防水需求"
                    clearable
                    style="width: 180px"
                >
                  <el-option
                      v-for="dict in dict.type.sys_yes_no"
                      :key="dict.value"
                      :label="dict.label"
                      :value="dict.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="房间编号">
                <el-input
                    v-model="queryParams.roomNo"
                    placeholder="请输入房间编号"
                    clearable
                    style="width: 180px"
                    @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="数据是否已添加">
                <el-select
                    v-model="queryParams.isDataAdded"
                    placeholder="请选择"
                    clearable
                    style="width: 180px"
                >
                  <el-option
                      v-for="dict in dict.type.sys_yes_no"
                      :key="dict.value"
                      :label="dict.label"
                      :value="dict.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="房间名称">
                <el-input
                    v-model="queryParams.roomName"
                    placeholder="请输入房间名称"
                    clearable
                    style="width: 180px"
                    @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item>
                <el-button class="search-btn" type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">清空条件</el-button>
              </el-form-item>
            </el-form>

            <el-row :gutter="10" class="mb8">
              <el-col :span="1.5">
                <el-button
                    type="primary"
                    icon="el-icon-document-add"
                    size="mini"
                    @click="handleAdd"
                    v-hasPermi="['system:user:add']"
                >新增
                </el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  plain
                  icon="el-icon-delete"
                  size="mini"
                  :disabled="multiple"
                  @click="handleBatchDelete"
                  v-hasPermi="['system:user:remove']"
                >删除</el-button>
              </el-col>
            </el-row>
            <div class="occupy"></div>
            <el-table stripe  v-if="refreshTable" :height="getTableHeight('right','occupy')"
                      v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" fixed="left"/>
              <el-table-column label="序号" type="index" width="60" align="center"/>
              <el-table-column v-if="item.show" :label="item.label" align="center" :prop="item.field" v-for="item in data1" :key="item.id">
                <template v-if="item.children.length">
                  <TableColumn :item="itemChildren" v-for="itemChildren in item.children" :key="itemChildren.id"></TableColumn>
                </template>
              </el-table-column>
              <el-table-column
                  label="操作"
                  align="center"
                  width="140"
                  fixed="right"
                  class-name="small-padding fixed-width"
              >
                <template slot-scope="scope" v-if="scope.row.userId !== 1">
                  <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-edit"
                      @click="handleUpdate(scope.row)"
                      v-hasPermi="['system:user:edit']"
                  >编辑
                  </el-button>
                  <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-delete"
                      @click="handleDelete(scope.row)"
                      v-hasPermi="['system:user:remove']"
                  >删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </div>
        <pagination
            class="pagination"
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
        />
      </el-col>
    </el-row>
    <DialogAdd :open="showDialog" :title="dialogTitle" :formData="dialogFormData" @cancel="dialogCancel"></DialogAdd>
  </div>
</template>

<script>
import {getHeaderList, roomMessageDelete, roomMessageList} from "@/api/roomInformationTemplate"
import {getTableHeight} from "@/utils";
import TableColumn from "@/views/roomInformationTemplate/components/tableColumn.vue";
import DialogAdd from "./components/dialogAdd.vue"
import {del} from "@/api/finishedProduct";

export default {
  name: "RoomInformationTemplate",
  components: {TableColumn,DialogAdd},
  dicts: ['sys_yes_no'],
  data() {
    return {
      keyword: "",
      data1: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      userList: [],
      loading: false,
      // 重新渲染表格状态
      refreshTable: true,
      showDialog: false,
      dialogTitle: "新增",
      dialogFormData:{},
      ids: [],
      single: true,
      multiple: true,
    }
  },
  mounted() {
    this.refreshTableFn()
  },
  created() {
    this.getHeaderListFn()
  },
  methods: {
    getTableHeight,
    refreshTableFn(){
      this.refreshTable = false;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    getHeaderListFn(){
      let params = {
        // major:"",
        search: this.keyword
      }
      getHeaderList(params).then(res=>{
        if(res.code === 200){
          this.recursionDataFn(res.data)
          this.$nextTick(()=>{
            this.data1 = res.data
            this.refreshTableFn()
            this.getList()
          })
        }
      })
    },
    recursionDataFn(arr,preIndex){
      arr.forEach((f,indexLabel)=>{
        // this.$set(f,"show",true)
        f.show = true
        f.indexLabel = indexLabel + 1 + "."
        if(preIndex){
          f.indexLabel = preIndex + f.indexLabel
        }
        if(f.children.length){
          this.recursionDataFn(f.children,f.indexLabel)
        }
      })
    },
    formatTreelabelFn(label){
      const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
      if(label.length === 1){
        return chineseNumbers[label] + "、"
      } else {
        return label
      }
    },
    toggleShow(row,boo){
      // row.show = boo
      this.recursionDataShowFn(row,boo)
      this.refreshTableFn()
    },
    findParentIdItem(parentId){
      let arr = []
      this.recursionGetArr(this.data1,arr)
      this.changeParentItemShowFn(arr,parentId)
    },
    changeParentItemShowFn(arr,parentId){
      let temp = arr.find(f=>f.id===parentId)
      if(temp){
        temp.show = true
        if(temp.parentId){
          this.changeParentItemShowFn(arr,temp.parentId)
        }
      }
    },
    recursionGetArr(array,arr){
      if(array.length){
        array.forEach(f=>{
          arr.push(f)
          this.recursionGetArr(f.children,arr)
        })
      }
    },
    recursionDataShowFn(row,boo){
      row.show = boo
      if(boo && row.parentId){
        this.findParentIdItem(row.parentId)
      }
      if(row.children.length){
        row.children.forEach(f=>{
          this.recursionDataShowFn(f,boo)
        })
      }
    },
    resetTree() {
      this.keyword = ""
      this.getHeaderListFn()
    },
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    resetQuery() {
      this.queryParams = {}
      this.handleQuery();
    },
    // append(data) {
    //   const newChild = {id: id++, label: 'testtest', children: []};
    //   if (!data.children) {
    //     this.$set(data, 'children', []);
    //   }
    //   data.children.push(newChild);
    // },
    // remove(node, data) {
    //   const parent = node.parent;
    //   const children = parent.data.children || parent.data;
    //   const index = children.findIndex(d => d.id === data.id);
    //   children.splice(index, 1);
    // },
    getList() {
      this.loading = true;
      roomMessageList(this.queryParams).then(response => {
            this.userList = response.rows;
            this.total = response.total;
          }
      ).finally(()=>{
        this.loading = false;
      });
    },
    handleAdd() {
      this.showDialog = true
    },
    handleUpdate(row){
      this.dialogTitle = "编辑"
      this.dialogFormData = row
      this.showDialog = true
    },
    handleDelete(row){
      this.$modal.confirm('是否确认删除？').then(function() {
        return roomMessageDelete(row.id);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    dialogCancel(arg){
      this.showDialog = false
      this.dialogFormData = {}
      if(arg){
        this.getList();
      }
    },
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    handleBatchDelete() {
      const userIds = this.ids.join(",");
      this.$modal.confirm('是否确认删除?').then(function() {
        return roomMessageDelete(userIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
  }
}
</script>

<style scoped lang="scss">
.box {
  height: 100%;
}

.calcTable {
  height: 100%;
}

.left {
  &-title {
    margin-bottom: 12px;
    display: flex;
    align-items: center;

    img {
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }

    span {
      font-family: var(--fontRegular);
      font-weight: 400;
      font-size: 20px;
      color: #4E5969;
      padding-left: 10px;
    }
  }

  &-btn {
    margin: 8px 0 12px 0;
  }

  &-tree {
    flex: 1;
    overflow: auto;
  }
}

.eye{
  width: 16px;
  height: 15px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;

  .tree-line{
    font-size: 10px;
    padding: 0 5px;
    color: #3060BA;
  }
}

.pre-label {
  font-family: var(--fontRegular);
  font-weight: 400;
  font-size: 16px;
  color: #3060BA;
  width: 80%;
  justify-content: flex-start;
}

.chi-label {
  font-family: var(--fontRegular);
  font-weight: 400;
  font-size: 12px;
  color: #4E5969;
  width: 80%;
  justify-content: flex-start;
}

::v-deep .el-tree-node__expand-icon  {
  font-size: 16px;
  color: #3060BA;
}
::v-deep .el-tree-node__expand-icon.is-leaf{
  color: transparent;
  cursor: default;
}

::v-deep .el-tree-node__content {
  height: 36px;
}

.right {
  height: 80vh;
}

.pagination{
  background-color: transparent;
}
</style>
