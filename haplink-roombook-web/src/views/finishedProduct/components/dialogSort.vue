<template>
  <el-dialog title="排序" :visible.sync="open" :before-close="cancel">
    <div class="dialog-title" slot="title">
      <i class="el-icon-document-add"></i>{{ title }}
    </div>
    <div class="content">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="编号" prop="nickName" label-width="60px">
          <span style="color: #3060BA;padding-right: 4px">屋-</span>
          <el-input style="width: 123px;" size="small" v-model="form.nickName" placeholder="请输入用户昵称"
                    maxlength="30"/>
        </el-form-item>
        <el-form-item label="名称" prop="phonenumber">
          <el-input style="width: 300px;" size="small" v-model="form.phonenumber" placeholder="请输入手机号码"
                    maxlength="11"/>
        </el-form-item>
        <el-form-item label="范围描述" label-width="135px">
          <el-input style="width: 530px;" v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="成品构造">
        </el-form-item>
      </el-form>
      <div class="box">
        <div class="left">
          <div class="title">选择类型</div>
          <div style="margin-bottom: 24px" class="search">
            <el-input style="width: 108px;" size="small" v-model="form.phonenumber" placeholder="输入关键词"/>
            <el-button style="width: 72px; margin: 0 8px" size="mini" @click="resetQuery">清空条件</el-button>
            <el-button style="width: 44px; margin-left: 0px;" class="search-btn" type="primary" size="mini"
                       @click="handleQuery">搜索
            </el-button>
          </div>
          <div class="ol">
            <el-table stripe height="384" :data="typeList" highlight-current-row @current-change="handleCurrentChange">
              <el-table-column label="序号" type="index" width="60" align="center"/>
              <el-table-column label="类型" align="left" prop="name" :show-overflow-tooltip="true"/>
            </el-table>
            <div class="action-box"></div>
          </div>
        </div>
        <div class="center">
          <div class="title">选择厚度与做法</div>
          <div style="margin-bottom: 24px;display: flex;justify-content: center" class="search">
            <el-input style="width: 237px;" size="small" v-model="form.phonenumber" placeholder="请输入关键词"/>
            <el-button style="width: 72px; margin: 0 8px" size="mini" @click="resetQuery">清空条件</el-button>
            <el-button style="width: 44px; margin-left: 0px;" class="search-btn" type="primary" size="mini"
                       @click="handleQuery">搜索
            </el-button>
          </div>
          <div class="ol">
            <el-table v-if="reload2" ref="tableRef2" row-key="id" stripe height="384" :data="practiceLibrariesList" highlight-selection-row @selection-change="handleSelectionChange1" :row-class-name="tableRowClassName">
              <el-table-column label="序号" type="index" width="60" align="center"/>
              <el-table-column type="selection" width="50" align="center" :selectable="selectableFn"/>
              <el-table-column label="构造内容" align="left" prop="content" :show-overflow-tooltip="true"/>
              <el-table-column label="结构厚度(mm)" align="center" prop="thickness" width="120"
                               :show-overflow-tooltip="true"/>
            </el-table>
            <div class="action-box">
              已选择{{ selectionSum1 }} 条<span>共{{ practiceLibrariesList.length }}条</span>
            </div>
          </div>
        </div>
        <div class="copy flex-column-center" @click="clickCopy">
          <i class="el-icon-document-copy"></i>
          <div>复制</div>
        </div>
        <div class="right">
          <div class="right-top flex-column-center">
            <div class="right-top-top">构造层次预览</div>
            <div class="right-top-bom">从外至内,从上到下</div>
          </div>
          <div class="ol">
            <el-table v-if="reload1" stripe height="378" class="draggable-table" :data="choosePracticeLibrariesList"
                      @selection-change="handleSelectionChange2">
              <el-table-column label="序号" type="index" width="60" align="center"/>
              <el-table-column type="selection" width="50" align="center"/>
              <el-table-column label="构造内容" align="left" prop="content" :show-overflow-tooltip="true"/>
              <el-table-column label="结构厚度(mm)" align="center" prop="thickness" width="120"
                               :show-overflow-tooltip="true"/>
              <el-table-column label="构造类别" align="center" prop="typeName" width="100"
                               :show-overflow-tooltip="true">
                <span style="color: #A8ABB2;" slot-scope="scope">{{ scope.row.typeName }}</span>
              </el-table-column>
            </el-table>
            <div class="action-box1 flex-jus-between">
              <div class="action-box1-left">已选择{{ selectionSum2 }} 条<span>共{{ choosePracticeLibrariesList.length }}条</span></div>
              <div class="action-box1-right" @click="delSelection2">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="submitForm">确 定</el-button>
      <el-button size="small" @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>

import Sortable from "sortablejs";

export default {
  name: "dialogSort",
  props: {
    open: {
      type: Boolean,
      default: false
    },
    typeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {},
      rules: {
        userName: [
          {required: true, message: "用户名称不能为空", trigger: "blur"},
          {min: 2, max: 20, message: '用户名称长度必须介于 2 和 20 之间', trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: "用户昵称不能为空", trigger: "blur"}
        ],
        password: [
          {required: true, message: "用户密码不能为空", trigger: "blur"},
          {min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur'}
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      practiceLibrariesList: [],
      choosePracticeLibrariesList: [],
      selectionList1: [],
      selectionList2: [],
      chooseTypeName: "",
      reload1: true,
      reload2: true,
      selectionSum1: 0,
      selectionSum2: 0,
    }
  },
  mounted() {

  },
  methods: {
    submitForm() {

    },
    cancel() {

    },
    resetQuery() {

    },
    handleQuery() {

    },
    handleCurrentChange(val) {
      // if (this.chooseTypeName !== val.name) {
      this.chooseTypeName = val.name
      this.practiceLibrariesList = val.practiceLibraries
      this.reload2 = false
      setTimeout(()=>{
        this.reload2 = true
      },0)
      // }
    },
    handleSelectionChange1(selection) {
      this.selectionSum1 = selection.length
      this.practiceLibrariesList.forEach(i=>{
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
    delSelection2(){
      if(this.selectionList2.length <= 0) return
      this.recoveryPracticeLibrariesList()
      this.delChoosePracticeLibraries()
    },
    recoveryPracticeLibrariesList(){
      this.selectionList2.forEach(f=>{
        let temp = this.typeList.find(d=>d.name===f.typeName)
        temp.practiceLibraries.forEach(ff=>{
          if(ff.id===f.id){
            ff.disable = false
          }
        })
      })
      let t = this.typeList.find(i=>i.name===this.chooseTypeName)
      this.handleCurrentChange(t)
    },
    delChoosePracticeLibraries(){
      this.selectionList2.forEach(f=>{
        this.choosePracticeLibrariesList = this.choosePracticeLibrariesList.filter(ff=>ff.id!==f.id)
      })
    },
    clickCopy() {
      if (this.selectionList1.length > 0) {
        this.selectionList1.forEach(f => {
          f.typeName = this.chooseTypeName
          f.disable = true
          f.check = false
        })
        this.choosePracticeLibrariesList = this.choosePracticeLibrariesList.concat(this.selectionList1)
        this.$refs.tableRef2.clearSelection()
        this.$nextTick(()=>{
          this.sortableFn()
        })
      }
    },
    sortableFn(){
      const tbody = document.querySelector('.draggable-table .el-table__body-wrapper tbody')
      new Sortable(tbody, {
        // handle: '.handle', // handle's class
        animation: 150,
        // 需要在odEnd方法中处理原始eltable数据，使原始数据与显示数据保持顺序一致
        onEnd: ({newIndex, oldIndex}) => {
          const targetRow = this.choosePracticeLibrariesList[oldIndex]
          this.choosePracticeLibrariesList.splice(oldIndex, 1)
          this.choosePracticeLibrariesList.splice(newIndex, 0, targetRow)
          this.reload1 = false
          setTimeout(()=>{
            this.reload1 = true
            this.$nextTick(()=>{
              this.sortableFn()
            })
          },0)
        },
      })
    },
    selectableFn(row){
      return !row.disable
    },
    tableRowClassName({ row }) {
      if(row.check){
        return "choose-item"
      } else if(row.disable){
        return "disable-item"
      } else {
        return ""
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  width: 1334px;
}

::v-deep .el-table__body tr.choose-item td.el-table__cell{
  background-color: #ccdffb !important;
}
::v-deep .el-table__body tr.disable-item td.el-table__cell div{
  color: #D2DBEC !important;
}

.content {
  padding: 0 20px;

  ::v-deep .el-form--inline .el-form-item {
    margin-right: 0;
  }

  ::v-deep .el-form-item {
    margin-bottom: 0;
  }
}

.box {
  margin-top: 20px;
  width: 100%;
  height: 530px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ::v-deep .el-button {
    padding-right: 0;
    padding-left: 0;
  }

  .left {
    width: 240px;

  }

  .ol {
    width: 100%;
    height: 420px;
    border: 1px solid #D2DBEC;
    overflow: hidden;
  }

  .action-box{
    height: 34px;
    border-top: 1px solid #D2DBEC;
    text-align: center;
    font-family: var(--fontRegular);
    font-weight: 400;
    font-size: 13px;
    color: #8B8B8B;
    line-height: 34px;
    span{
      padding-left: 16px;
    }
  }
  .action-box1{
    height: 40px;
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

  .center {
    width: 417px;

  }

  .copy {
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

  .right {
    width: 530px;

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
