<template>
  <el-dialog :visible.sync="generalDialogVisible" :before-close="cancel">
    <div class="dialog-title" slot="title">
      <i class="el-icon-circle-check"></i>{{ generalDialogTitle }}
    </div>
    <div class="generalBox">
      <div class="generalLeft">
        <div class="title">构造层数据库</div>
        <div style="margin-bottom: 24px;display: flex;justify-content: center" class="search">
          <el-input
            style="width: 56%;"
            v-model="generalLeftSearch"
            placeholder="输入厚度、做法关键字"
            prefix-icon="el-icon-search"
            size="small"
          ></el-input>
          <el-button style="width: 18%; margin: 0 2%" size="mini" @click="clearFilters1">清空条件</el-button>
          <el-button style="width: 13%; margin-left: 0px;" type="primary" size="mini" @click="handleGetItemByOrgId" class="search-btn">搜索</el-button>
        </div>
        <div class="ol">
          <el-table :data="generalLeftTable"  ref="tableRef2" row-key="id" stripe height="92%" highlight-selection-row @selection-change="handleSelectionChange1" >
            <el-table-column type="selection" width="44" align="center" :selectable="selectableFn"/>
            <el-table-column label="序号" type="index" align="center" width="44"/>
            <el-table-column label="构造内容" align="left" width="222" prop="content" :show-overflow-tooltip="true"/>
            <el-table-column label="结构厚度(mm)" align="center" width="100" prop="thickness" :show-overflow-tooltip="true"/>
          </el-table>
          <div class="action-box flex-left">
            已选择 {{ selectionSum1 }} 条，共 {{ generalLeftTable.length }} 条
          </div>
        </div>
      </div>
      <div class="copy flex-column-center" @click="handleCopy2">
        <i class="el-icon-document-copy"></i>
        <div>复制</div>
      </div>
      <div class="generalRight">
        <div class="title">预选框</div>
        <div style="margin-bottom: 24px;display: flex;justify-content: center" class="search">
          <el-input
            v-model="generalRightSearch"
            placeholder="输入厚度、做法关键字"
            prefix-icon="el-icon-search"
            size="small"
            style="width: 56%;"
          ></el-input>
          <el-button style="width: 18%; margin: 0 2%" size="mini" @click="clearFilters2">清空条件</el-button>
          <el-button style="width: 13%; margin-left: 0px;" type="primary" @click="searchRightTable" size="mini" class="search-btn">搜索</el-button>
        </div>
        <div class="ol">
          <el-table :data="filteredGeneralRightTable" row-key="id"  class="draggable-table" @selection-change="handleSelectionChange2">
            <el-table-column type="selection" width="44" align="center"/>
            <el-table-column label="序号" type="index" align="center" width="44"/>
            <el-table-column label="构造内容" align="left" width="222" prop="content" :show-overflow-tooltip="true"/>
            <el-table-column label="结构厚度(mm)" align="center" width="100" prop="thickness" :show-overflow-tooltip="true"/>
          </el-table>
          <div class="action-box1 flex-jus-between">
            <div class="action-box1-left">已选择 {{ selectionSum2 }} 条，共 {{ filteredGeneralRightTable.length }} 条</div>
            <div class="action-box1-right" @click="handleDeleteSelected">删除</div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleGeneralSubmit">确 认</el-button>
      <el-button @click="cancel" size="small" type="primary" >取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { batchInsert, getItemByOrgId } from '@/api/database/general'
import Sortable from 'sortablejs'

export default {
  props: {
    generalDialogTitle: String,
    generalDialogVisible:{
      type:Boolean,
      default:false
    },
    currentOrgId: {
      type: Number, // 确保类型与传递的值一致
      required: true, // 如果 `selectedOrgId` 是必需的，可以添加此选项
    },
  },
  data(){
    return{
      generalLeftSearch: "",
      generalRightSearch: "",
      generalLeftTable: [],
      generalRightTable: [],
      filteredGeneralRightTable: [],
      selectionList1: [],
      selectionList2: [],
      selectionSum1: 0,
      selectionSum2: 0,
    }
  },

  computed: {

  },

  watch: {
    generalDialogVisible(newVal) {
      if (newVal) {
        this.handleGetItemByOrgId();
      }
    }
  },

  methods: {
    clearFilters1() {
      this.generalLeftSearch = ""
      this.handleGetItemByOrgId()
    },

    //通用dialog左表格数据
    handleGetItemByOrgId() {
      const params = {
        orgId: this.currentOrgId,
        search: this.generalLeftSearch
      };

      getItemByOrgId(params)
        .then(response => {
          console.log('API Response:', response); // 检查 API 响应是否正确
          if (response.code === 200) {
            this.generalLeftTable = response.rows;
            console.log('Updated generalLeftTable:', this.generalLeftTable); // 检查数据是否正确更新
            this.updateLeftTableSelection();
          } else {
            this.$message.error('获取数据失败');
          }
        })
        .catch(error => {
          console.error('请求失败:', error);
          this.$message.error('请求失败');
        });

    },

    handleCopy2() {
      // 使用 selectionList1 中的选中项来处理复制逻辑
      const selectedItems = this.selectionList1;

      selectedItems.forEach(item => {
        // 检查右表中是否已存在相同的内容和厚度
        const alreadyInRightTable = this.generalRightTable.some(rightItem => {
          return rightItem.content === item.content && rightItem.thickness === item.thickness;
        });

        if (!alreadyInRightTable) {
          // 将新项加入到右表，并生成唯一的ID
          this.generalRightTable.push({
            ...item,
            id: Date.now() + Math.random(),  // 确保新添加的行有唯一的ID
          });
        }

        // 更新左表的 check 状态
        item.check = false; // 清除选中状态
      });

      // 更新右表格的显示数据
      this.filteredGeneralRightTable = [...this.generalRightTable];

      // 清除右表格中项的选中状态
      this.generalRightTable.forEach(item => {
        item.check = false;
      });

      // 更新左表格中的选项状态（如果需要）
      this.updateLeftTableSelection();
    },

    //检查左侧内容是否在右侧出现
    updateLeftTableSelection() {
      this.generalLeftTable.forEach(leftItem => {
        const isInRightTable = this.generalRightTable.some(rightItem => {
          return rightItem.content === leftItem.content && rightItem.thickness === leftItem.thickness;
        });

        if (isInRightTable) {
          this.$set(leftItem, 'disabled', true);
          this.$set(leftItem, 'selected', true);
          console.log(`Item '${leftItem.content}' is in right table, set to disabled.`);
        } else {
          this.$set(leftItem, 'disabled', false);
          this.$set(leftItem, 'selected', false);
          console.log(`Item '${leftItem.content}' is not in right table, set to enabled.`);
        }
      });
    },

    clearFilters2() {
      this.generalRightSearch = '';
      this.filteredGeneralRightTable = [...this.generalRightTable]; // 恢复原始数据
      this.$forceUpdate();
    },

    //通用右表格搜索
    searchRightTable() {
      const keyword = this.generalRightSearch.trim().toLowerCase(); // 获取搜索关键词并转为小写
      if (keyword) {
        this.filteredGeneralRightTable = this.generalRightTable.filter(item => {
          // 根据关键词匹配内容和厚度
          return item.content.toLowerCase().includes(keyword) || item.thickness.toString().includes(keyword);
        });
      } else {
        this.filteredGeneralRightTable = [...this.generalRightTable]; // 如果没有关键词，显示所有数据
      }
    },

    //删除右表格选中数据
    handleDeleteSelected() {
      this.generalRightTable = this.generalRightTable.filter(item => !item.selected);
      this.filteredGeneralRightTable = [...this.generalRightTable];      // 同步 filteredGeneralRightTable
      this.updateLeftTableSelection();
    },

    //通用确认提交
    handleGeneralSubmit() {
      const params = {
        orgId: this.currentOrgId,
        libraries: this.filteredGeneralRightTable.map(item => ({
          content: item.content,
          thickness: item.thickness
        }))
      };
      batchInsert(params)
        .then(response => {
          if (response.code === 200) {
            this.$message.success('新增成功');

            // 在提交成功后，遍历 filteredGeneralRightTable 赋值 editMode
            this.filteredGeneralRightTable.forEach(item => {
              item.editMode = '编辑母版'; // 此处条件检查逻辑是否正确
              console.log("Updated item:", item);
            });

            this.fetchSubTabData(this.getCurrentOrgId());  // 刷新数据

            // 清空右表格
            this.generalRightTable = [];
            this.filteredGeneralRightTable = [];

            this.generalLeftTable = [];

            this.generalDialogVisible = false;
          } else {
            this.$message.error('新增失败: ' + response.message);
          }
        });
    },

    handleSelectionChange1(selection) {
      this.selectionSum1 = selection.length
      this.practiceLibrariesList1.forEach(i=>{
        i.check = false
      })
      if(selection.length > 0){
        selection.forEach(f=>{
          f.check = true
        })
      }
      this.selectionList1 = selection
    },

    handleSelectionChange2(selection) {
      this.selectionSum2 = selection.length
      this.selectionList2 = selection
    },
    
    selectableFn(row){
      return !row.disable
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  width: 1200px;
  height: 750px;
}

::v-deep .el-dialog__body{
  padding:0px;
}

::v-deep .el-table__body tr.choose-item td.el-table__cell{
  background-color: #ccdffb !important;
}
::v-deep .el-table__body tr.disable-item td.el-table__cell div{
  color: #D2DBEC !important;
}


.generalBox{
  margin-top:11px;
  width: 96%;
  margin-left:25px;
  display: flex;
  justify-content: space-between;
  height:643px;
  align-items: center;

  ::v-deep .el-button {
    padding-right: 0;
    padding-left: 0;
  }

  .generalLeft{
    width:517px;
  }

  .ol {
    width: 100%;
    height: 487px;
    border: 1px solid #D2DBEC;
    overflow: hidden;
  }

  .action-box{
    //height: 34px;
    height: 8%;
    border-top: 1px solid #D2DBEC;
    font-family: var(--fontRegular);
    font-weight: 400;
    font-size: 13px;
    color: #8B8B8B;
    span{
      padding-left: 16px;
    }
  }
  .action-box1{
    height: 40px;
    //height: 9%;
    border-top: 1px solid #D2DBEC;
    padding: 0 20px 0 8px;
    &-left{
      font-family: var(--fontRegular);
      font-weight: 400;
      font-size: 13px;
      color: #8B8B8B;
      span{
        padding-left: 16px;
      }
    }
    &-right{
      font-family: var(--fontRegular);
      font-weight: 400;
      font-size: 14px;
      color: #3060BA;
      cursor: pointer;
    }
  }

  .title {
    font-family: var(--fontMedium);
    font-weight: 500;
    font-size: 20px;
    color: #4E5969;
    text-align: center;
    margin-top: 9px;
    margin-bottom: 24px;
  }

  .copy {
    cursor: pointer;
    width: 52px;
    height: 52px;
    background: #3060BA;
    border-radius: 4px 4px 4px 4px;

    i {
      width: 11px;
      height: 12px;
      color: #fff;
    }

    div {
      font-family: var(--fontMedium);
      font-weight: 500;
      font-size: 10px;
      color: #FFFFFF;
      margin-top: 4px;
    }
  }

  .generalRight{
    width:520px;

    &-top {
      width: 530px;
      height: 110px;
      background: #D2DBEC;
      border-radius: 4px 4px 0px 0px;

      &-top {
        font-family: var(--fontMedium);
        font-weight: 500;
        font-size: 20px;
        color: #4E5969;
        margin-bottom: 16px;
      }

      &-bom {
        font-family: var(--fontRegular);
        font-weight: 400;
        font-size: 16px;
        color: #4E5969;
      }
    }

  }
}

</style>
