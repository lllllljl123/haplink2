<template>
  <el-dialog :title="title" :visible.sync="generalDialogVisible" :before-close="cancel">
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
          <el-button style="width: 18%; margin: 0 2%" size="mini" @click="clearFilters2">清空条件</el-button>
          <el-button style="width: 13%; margin-left: 0px;" type="primary" size="mini" @click="handleGetItemByOrgId" class="search-btn">搜索</el-button>
        </div>
        <div class="ol">
          <el-table :data="generalLeftTable" row-key="id" stripe height="92%" highlight-selection-row>
            <el-table-column type="selection" width="44" align="center" :selectable="selectableFn"/>
            <el-table-column label="序号" type="index" align="center" width="44"/>
            <el-table-column label="构造内容" align="left" width="222" prop="content" :show-overflow-tooltip="true"/>
            <el-table-column label="结构厚度(mm)" align="center" width="100" prop="thickness" :show-overflow-tooltip="true"/>
          </el-table>
          <div class="table-footer1 flex-left">
            已选择 {{ selectedCountLeft }} 条，共 {{ totalCountLeft }} 条
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
          <el-button style="width: 18%; margin: 0 2%" size="mini" @click="clearFilters3">清空条件</el-button>
          <el-button style="width: 13%; margin-left: 0px;" type="primary" @click="searchRightTable" size="mini" class="search-btn">搜索</el-button>
        </div>
        <div class="ol">
          <el-table :data="filteredGeneralRightTable" row-key="id">
            <el-table-column type="selection" width="44" align="center" :selectable="selectableFn"/>
            <el-table-column label="序号" type="index" align="center" width="44"/>
            <el-table-column label="构造内容" align="left" width="222" prop="content" :show-overflow-tooltip="true"/>
            <el-table-column label="结构厚度(mm)" align="center" width="100" prop="thickness" :show-overflow-tooltip="true"/>
          </el-table>
          <div class="table-footer2 flex-jus-between">
            <div class="table-footer2-left">已选择 {{ selectedCountRight }} 条，共 {{ totalCountRight }} 条</div>
            <div class="table-footer2-right" @click="handleDeleteSelected">删除</div>
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
export default {
  props: {
    generalDialogVisible: Boolean,
    generalDialogTitle: String,
    generalLeftSearch: String,
    generalRightSearch: String,
    generalLeftTable: Array,
    selectedCountLeft: Number,
    totalCountLeft: Number,
    filteredGeneralRightTable: Array,
    selectedCountRight: Number,
    totalCountRight: Number,
  },
  methods: {
    clearFilters2() {
      this.$emit('clear-filters-2');
    },
    handleGetItemByOrgId() {
      this.$emit('get-item-by-org-id');
    },
    handleCopy2() {
      this.$emit('copy-2');
    },
    clearFilters3() {
      this.$emit('clear-filters-3');
    },
    searchRightTable() {
      this.$emit('search-right-table');
    },
    handleDeleteSelected() {
      this.$emit('delete-selected');
    },
    handleGeneralSubmit() {
      this.$emit('general-submit');
    },
    cancel() {
      this.$emit('cancel');
    },
    handleGeneralDialogClose(){
      this.$emit('handle-General-Dialog-Close');
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

  .table-footer1{
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

  .table-footer2{
    //height: 40px;
    height: 9%;
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
  }
}

</style>
