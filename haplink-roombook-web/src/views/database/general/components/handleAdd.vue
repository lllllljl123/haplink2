<template>
  <el-dialog :title="title" :visible.sync="addDialogVisible">
    <div class="dialog-title" slot="title">
      <i class="el-icon-document-add"></i>{{dialogTitle}}
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="form-content">
      <el-row class="row1" style="display: flex; align-items: center;">
        <div class="type" style="margin-right: 10px;">类别</div>
        <el-input v-model="form.category" placeholder="选择类别" class="type_chosen" disabled style="margin-right: 20px;"></el-input>

        <div class="depth" style="margin-right: 10px;">结构厚度</div>
        <el-input v-model="form.thickness" placeholder="输入厚度" clearable class="input-depth">
          <template slot="append">mm</template>
        </el-input>
      </el-row>
      <el-row class="row2">
        <el-col span="4">
          <div class="content">内容</div>
        </el-col>
        <el-row>
          <div class="input-hint">结构厚度建议填写，与结构的荷载计算有关；厚度建议通过“+”按钮添加便于数据联动</div>
        </el-row>
        <el-row>
          <div class="box1">
            <el-button icon="el-icon-circle-plus" @click="clickHoudu" class="transfer_button"></el-button>
            <el-input
              v-show="showTextArea"
              @blur="mouseupTxt"
              class="custom-textarea"
              v-model="form.content"
              placeholder="填写工程做法详细描述文字，不超过50字"
              clearable
            >
            </el-input>
            <div v-show="!showTextArea" contenteditable class="edit" style="width: 330px;height: 76px;border: 1px solid #000"></div>
            <el-tag v-show="showTag" class="tag" closable type="success" @close="closeTag" >
              {{ form.thickness }}
            </el-tag>
          </div>
        </el-row>
      </el-row>
      <el-row>
        <div class="preview">预览</div>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel" class="cancel1">
        <div class="cancel-word1">取消</div>
      </el-button>
      <el-button type="primary" @click="handleSubmit" class="sure1">
        <div class="sure-word1">
          {{ isEditing ? '保存' : '确认' }}
        </div>
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data(){
    return{
      showTextArea: true,
      showTag: false,
      form: {
        category: '',
        categoryId: null,
        thickness: '',
        content: '',
        isGeneralAdded:false,
      },
      rules: {
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        thickness: [{ required: true, message: '请输入厚度', trigger: 'blur' }]
      },
    }
  },

  props: {
    dialogVisible: Boolean,
    dialogTitle:String,
  },
  methods: {
    clickHoudu(){
      this.$emit('click-Houdu');
    },
    mouseupTxt(){
      this.$emit('mouse-up-Txt');
    },
    closeTag(){
      this.$emit('close-Tag');
    },
    cancel(){
      this.$emit('can-cel');
    },
    handleSubmit(){
      this.$emit('handle-Submit');
    }
  }
};
</script>

<style scoped lang="scss">

</style>
