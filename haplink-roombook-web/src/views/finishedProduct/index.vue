<template>
  <div class="finishedProduct">
    <div class="top">
      <div class="top-left">
        <div class="top-left-title">成品类别</div>
        <div class="tabs">
          <div class="tab" :class="i.id===activeTabsId?'active-tab':''" v-for="i in tabsList" :key="i.id" @click="clickTab(i)">{{ i.category }}</div>
          <div class="tabs-line"></div>
        </div>
      </div>
<!--      <div class="top-right"></div>-->
    </div>
    <div class="bottom card">
      <el-col :xs="24">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
          <el-form-item label="编号">
            <el-input
                v-model="queryParams.number"
                placeholder="请输入编号"
                clearable
                style="width: 180px"
                @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="名称">
            <el-input
                v-model="queryParams.designation"
                placeholder="请输入名称"
                clearable
                style="width: 180px"
                @keyup.enter.native="handleQuery"
            />
          </el-form-item>
<!--          <el-form-item label="核实状态" prop="status">-->
<!--            <el-select-->
<!--                v-model="queryParams.verificationStatus"-->
<!--                placeholder="请选择核实状态"-->
<!--                clearable-->
<!--                style="width: 180px"-->
<!--            >-->
<!--              <el-option-->
<!--                  v-for="dict in dict.type.verification_status"-->
<!--                  :key="dict.value"-->
<!--                  :label="dict.label"-->
<!--                  :value="dict.value"-->
<!--              />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="最近修改时间" label-width="100px">
            <el-date-picker
                v-model="dateRange"
                @change="dateChange"
                style="width: 180px"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
            ></el-date-picker>
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
            >新增</el-button>
          </el-col>
<!--          <el-col :span="1.5">-->
<!--            <el-button-->
<!--                type="success"-->
<!--                plain-->
<!--                icon="el-icon-edit"-->
<!--                size="mini"-->
<!--                :disabled="single"-->
<!--                @click="handleEdit"-->
<!--                v-hasPermi="['system:user:edit']"-->
<!--            >修改</el-button>-->
<!--          </el-col>-->
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
        <el-table stripe class="body-border" :max-height="getTableHeight('card','occupy')" v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="编号" align="center" prop="number"/>
          <el-table-column label="名称" align="center" prop="designation" width="120" :show-overflow-tooltip="true" />
          <el-table-column label="构造做法(从外至内,从上到下)" align="center" width="360" prop="engineeringPractices" class-name="engineeringPractices-column" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div class="engineeringPractices" v-for="(i,inx) in scope.row.engineeringPractices"><span>{{ inx + 1 }}、</span>{{ i.content }}</div>
            </template>
          </el-table-column>
          <el-table-column label="燃烧性能" align="center" prop="combustionPerformance" width="120" :show-overflow-tooltip="true" />
          <el-table-column label="结构厚度(mm)" align="center" prop="constructionThickness" width="120" :show-overflow-tooltip="true" />
          <el-table-column label="范围描述" align="center" prop="scopeDescription" :show-overflow-tooltip="true" />
          <el-table-column label="创建时间" align="center" prop="createTime" width="120" />
          <el-table-column label="创建人" align="center" prop="createBy" width="120" />
          <el-table-column label="最近修改时间" align="center" prop="updateTime" width="120" />
          <!--          <el-table-column label="核实状态" align="center" key="status">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-switch-->
          <!--                  v-model="scope.row.status"-->
          <!--                  active-value="0"-->
          <!--                  inactive-value="1"-->
          <!--                  @change="handleStatusChange(scope.row)"-->
          <!--              ></el-switch>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
<!--          <el-table-column label="发布状态" align="center" key="phonenumber" prop="phonenumber" width="120" />-->
          <el-table-column
              label="操作"
              align="center"
              width="180"
              class-name="small-padding fixed-width"
          >
            <template slot-scope="scope" v-if="scope.row.userId !== 1">
              <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="['system:user:edit']"
              >编辑</el-button>
              <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                  v-hasPermi="['system:user:remove']"
              >删除</el-button>
              <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-document-copy"
                  @click="handleCopy(scope.row)"
                  v-hasPermi="['system:user:remove']"
              >复制</el-button>
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
    <DialogAdd :open="showDialog" :title="dialogTitle" :formData="dialogFormData" :category="activeTab" :typeList="practiceByCategoryList" @cancel="dialogCancel"></DialogAdd>
  </div>
</template>

<script>
import {del, finishedList, getEngineeringPracticeByCategory, libraryList} from "@/api/finishedProduct"
import {getTableHeight} from "@/utils";
import {delUser} from "@/api/system/user";
const DialogAdd = () => import("./components/dialogAdd.vue")

export default {
  name: "index",
  dicts: ['verification_status'],
  components:{
    DialogAdd
  },
  data() {
    return {
      tabsList: [],
      activeTabsId: null,
      preActiveTabsId: null,
      activeTab: {},
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      userList: [],
      loading: false,
      ids: [],
      single: true,
      multiple: true,
      dateRange: [],
      dialogTitle: "新增",
      dialogFormData: {},
      showDialog: false,
      practiceByCategoryList: [],
    };
  },
  mounted() {
    this.getFinishedListFn()

  },
  methods:{
    getTableHeight,
    getFinishedListFn(){
      finishedList().then(res=>{
        if(res.code === 200){
          this.tabsList = res.data
          this.activeTabsId = this.tabsList[0].id
          this.activeTab = this.tabsList[0]
          this.getList()
          this.formatTabFn()
        }
      })
    },
    formatTabFn(){
      this.$nextTick(()=>{
        let tabs = document.querySelector(".tabs")
        let activeTab = document.querySelector(".active-tab")
        let tabsLine = document.querySelector(".tabs-line")
        let tabsLeft = tabs.getBoundingClientRect().left
        let activeTabLeft = activeTab.getBoundingClientRect().left
        tabsLine.style.width = activeTab.getBoundingClientRect().width + "px"
        tabsLine.style.left = activeTabLeft - tabsLeft + "px"
      })
    },
    clickTab(i){
      if(this.activeTabsId === i.id) return
      this.activeTabsId = i.id
      this.activeTab = i
      this.formatTabFn()
      this.getList();
    },
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    dateChange(e){
      // console.log(e,this.dateRange);
    },
    getList() {
      this.loading = true;
      this.queryParams.category = this.activeTabsId
      if(this.dateRange[0]){
        this.queryParams.startTime = this.dateRange[0]
        this.queryParams.endTime = this.dateRange[1]
      } else {
        this.queryParams.startTime = ""
        this.queryParams.endTime = ""
      }
      libraryList(this.queryParams).then(response => {
            this.userList = response.rows;
            this.total = response.total;
          }
      ).finally(()=>{
        this.loading = false;
      });
    },
    resetQuery() {
      this.dateRange = [];
      this.queryParams.number = ""
      this.resetForm("queryForm");
      this.handleQuery();
    },
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    reset() {
      this.form = {};
      this.resetForm("form");
    },
    getPracticeByCategoryListFn(){
      let params = {
        category: this.activeTabsId
      }
      getEngineeringPracticeByCategory(params).then(res=>{
        if(res.code === 200){
          this.practiceByCategoryList = res.data
        }
      })
    },
    handleAdd() {
      this.flagGetPracticeByCategoryListFn()
      this.dialogTitle = "新增"
      this.showDialog = true
      this.reset();

    },
    handleBatchDelete() {
      const userIds = this.ids.join(",");
      this.$modal.confirm('是否确认删除?').then(function() {
        return del(userIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    flagGetPracticeByCategoryListFn(){
      if(this.preActiveTabsId !== this.activeTabsId){
        this.preActiveTabsId = this.activeTabsId
        this.getPracticeByCategoryListFn()
      }
    },
    handleEdit(){
      this.dialogTitle = "编辑"
      this.showDialog = true
    },
    handleUpdate(row){
      this.flagGetPracticeByCategoryListFn()
      this.dialogTitle = "编辑"
      this.dialogFormData = row
      this.showDialog = true
    },
    handleCopy(row){
      this.flagGetPracticeByCategoryListFn()
      this.dialogTitle = "复制"
      this.dialogFormData = row
      this.showDialog = true
    },
    handleDelete(row){
      this.$modal.confirm('是否确认删除？').then(function() {
        return del(row.id);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    dialogCancel(arg){
      this.showDialog = false
      this.practiceByCategoryList = [...this.practiceByCategoryList]
      if(arg){
        this.getList();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.top{
  //width: 1612px;
  width: calc(100% - 48px);
  height: 114px;
  background: #FFFFFF;
  border-radius: 6px 6px 6px 6px;
  margin: 12px auto;
  padding: 16px 20px;

  &-left{
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-title{
      font-family: var(--fontMedium);
      font-weight: 500;
      font-size: 20px;
      color: #4E5969;
    }

    .tabs{
      border-bottom: 1px solid #a4b9e0;
      display: flex;
      justify-content: space-between;
      position: relative;

      .tab{
        padding: 8px 12px;
        box-sizing: border-box;
        font-family: var(--fontBold);
        font-weight: 500;
        font-size: 15px;
        color: #4E5969;

        &:hover{
          color: #3060BA;
          cursor: pointer;
        }
      }

      .active-tab{
        color: #3060BA;
      }

      &-line{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 20px;
        height: 2px;
        background-color: #3060ba;
        transition: left .3s cubic-bezier(.645,.045,.355,1);
      }
    }
  }
}

.bottom{
  width: calc(100% - 48px);
  height: 592px;
  margin: 0 auto;



  .engineeringPractices{
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    border-bottom: 1px solid #eff1f6;
    line-height: 20px;
    font-family: var(--fontRegular);
    font-weight: 400;
    font-size: 12px;
    color: #455969;

    &:last-child{
      border-bottom: 0 !important;
    }
    span{
      padding-left: 8px;
      padding-right: 8px;
    }
  }

}

.pagination{
  width: calc(100% - 48px);
  margin: 10px auto;
  background-color: transparent;
}

::v-deep .engineeringPractices-column.el-table__cell {
  padding: 0 !important;

  .cell{
    padding: 0 !important;
  }
}
</style>
