<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
<!--      <el-form-item label="摄像机ID" prop="cameraId">
        <el-input
          v-model="queryParams.cameraId"
          placeholder="请输入摄像机ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
<!--      <el-form-item label="项目ID" prop="projectId">
        <el-input
          v-model="queryParams.projectId"
          placeholder="请输入项目ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
<!--      <el-form-item label="设备编码[20位]" prop="deviceCode">
        <el-input
          v-model="queryParams.deviceCode"
          placeholder="请输入设备编码[20位]"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="键盘编号[9位]" prop="keyCode">
        <el-input
          v-model="queryParams.keyCode"
          placeholder="请输入键盘编号[9位]"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="摄像机IP" prop="cameraIp">
        <el-input
          v-model="queryParams.cameraIp"
          placeholder="请输入摄像机IP"
          maxlength = "50"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     <el-form-item label="所属项目" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          maxlength = "100"
          placeholder="请输入所属项目"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="派出所" prop="policeStation">-->
<!--        <el-input-->
<!--          v-model="queryParams.policeStation"-->
<!--          placeholder="请输入派出所"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="杆号" prop="poleNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.poleNo"-->
<!--          placeholder="请输入杆号"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="杆地址" prop="poleAddress">-->
<!--        <el-input-->
<!--          v-model="queryParams.poleAddress"-->
<!--          placeholder="请输入杆地址"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="设备名称" prop="deviceName">
        <el-input
          v-model="queryParams.deviceName"
          placeholder="请输入设备名称"
          maxlength = "100"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="建设方式" prop="buildMode">
        <el-input
          v-model="queryParams.buildMode"
          placeholder="请输入建设方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="变更日期">
        <el-date-picker
          v-model="daterangeChangeDate"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="变更类型" prop="changeType">
        <el-select v-model="queryParams.changeType" placeholder="请选择变更类型" clearable>
          <el-option
            v-for="dict in dict.type.change_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="变更状态" prop="changeState">
        <el-select v-model="queryParams.changeState" placeholder="请选择变更状态" clearable>
          <el-option
            v-for="dict in dict.type.change_state"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="变更人" prop="changePerson">
        <el-input
          v-model="queryParams.changePerson"
          placeholder="请输入变更人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-document-add"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['device:history:add']"
        >新增</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['device:history:edit']"
        >编辑</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['device:history:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['device:history:export']"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleClose"
          v-hasPermi="['assets:history:export']"
        >关闭
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="historyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center">
        <template v-slot="scope">
          <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="摄像机ID" align="center" prop="cameraId" />
      <el-table-column label="项目ID" align="center" prop="projectId" />

      <el-table-column label="键盘编号[9位]" align="center" prop="keyCode" />-->

      <el-table-column label="所属项目" align="center" prop="projectName" />
<!--      <el-table-column label="派出所" align="center" prop="policeStation" />
      <el-table-column label="杆号" align="center" prop="poleNo" />
      <el-table-column label="杆地址" align="center" prop="poleAddress" />-->
      <el-table-column label="设备名称" align="center" prop="deviceName" />
      <el-table-column label="设备编码" align="center" prop="deviceCode" />
      <el-table-column label="摄像机IP" align="center" prop="cameraIp" />
<!--      <el-table-column label="建设方式" align="center" prop="buildMode" />
      <el-table-column label="背包箱" align="center" prop="bagNum" />
      <el-table-column label="设备厂商" align="center" prop="manufacturer" />
      <el-table-column label="摄像机类型" align="center" prop="cameraType" />
      <el-table-column label="摄像机功能类型" align="center" prop="cameraFuncType" />
      <el-table-column label="MDU MAC地址" align="center" prop="mduMac" />
      <el-table-column label="PON端口" align="center" prop="ponPort" />
      <el-table-column label="MDU ID" align="center" prop="mduId" />
      <el-table-column label="局端OLT" align="center" prop="localOlt" />
      <el-table-column label="经度" align="center" prop="lat" />
      <el-table-column label="纬度" align="center" prop="lng" />
      <el-table-column label="安装时间" align="center" prop="installationTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.installationTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备状态" align="center" prop="deviceStatus" />-->
      <el-table-column label="变更日期" align="center" prop="changeDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.changeDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="变更类型" align="center" prop="changeType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.change_type" :value="scope.row.changeType"/>
        </template>
      </el-table-column>
      <el-table-column label="变更状态" align="center" prop="changeState">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.change_state" :value="scope.row.changeState"/>
        </template>
      </el-table-column>
      <el-table-column label="变更说明" align="center" prop="changeExplain" :show-overflow-tooltip="true" />
      <el-table-column label="变更人" align="center" prop="changePerson" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-tickets"
            v-hasPermi="['device:history:list']"
            @click="handleDetails(scope.row)"
          >详情</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-s-check"
            :disabled="scope.row.changeState!==1"
            @click="handleAudited(scope.row)"
            v-hasPermi="['device:history:audited']"
          >审核</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['device:history:edit']"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['device:history:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改设备管理-摄像机修改记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" :disabled="isDetails" >
<!--        <el-form-item label="摄像机ID" prop="cameraId">
          <el-input v-model="form.cameraId" placeholder="请输入摄像机ID" />
        </el-form-item>
        <el-form-item label="项目ID" prop="projectId">
          <el-input v-model="form.projectId" placeholder="请输入项目ID" />
        </el-form-item>-->
        <el-form-item label="设备编码" maxlength = "100" prop="deviceCode">
          <el-input v-model="form.deviceCode" placeholder="请输入设备编码[20位]" readonly />
        </el-form-item>
<!--        <el-form-item label="键盘编号[9位]" prop="keyCode">
          <el-input v-model="form.keyCode" placeholder="请输入键盘编号[9位]" />
        </el-form-item>-->
        <el-form-item label="摄像机IP" prop="cameraIp">
          <el-input v-model="form.cameraIp" maxlength = "50" placeholder="请输入摄像机IP" readonly />
        </el-form-item>
<!--        <el-form-item label="所属项目" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入所属项目" />
        </el-form-item>
        <el-form-item label="派出所" prop="policeStation">
          <el-input v-model="form.policeStation" placeholder="请输入派出所" />
        </el-form-item>
        <el-form-item label="杆号" prop="poleNo">
          <el-input v-model="form.poleNo" placeholder="请输入杆号" />
        </el-form-item>
        <el-form-item label="杆地址" prop="poleAddress">
          <el-input v-model="form.poleAddress" placeholder="请输入杆地址" />
        </el-form-item>-->
        <el-form-item label="设备名称" prop="deviceName">
          <el-input v-model="form.deviceName" maxlength = "200" placeholder="请输入设备名称" readonly />
        </el-form-item>
<!--        <el-form-item label="建设方式" prop="buildMode">
          <el-input v-model="form.buildMode" placeholder="请输入建设方式" />
        </el-form-item>
        <el-form-item label="背包箱" prop="bagNum">
          <el-input v-model="form.bagNum" placeholder="请输入背包箱" />
        </el-form-item>
        <el-form-item label="设备厂商" prop="manufacturer">
          <el-input v-model="form.manufacturer" placeholder="请输入设备厂商" />
        </el-form-item>
        <el-form-item label="MDU MAC地址" prop="mduMac">
          <el-input v-model="form.mduMac" placeholder="请输入MDU MAC地址" />
        </el-form-item>
        <el-form-item label="PON端口" prop="ponPort">
          <el-input v-model="form.ponPort" placeholder="请输入PON端口" />
        </el-form-item>
        <el-form-item label="MDU ID" prop="mduId">
          <el-input v-model="form.mduId" placeholder="请输入MDU ID" />
        </el-form-item>
        <el-form-item label="局端OLT" prop="localOlt">
          <el-input v-model="form.localOlt" placeholder="请输入局端OLT" />
        </el-form-item>
        <el-form-item label="经度" prop="lat">
          <el-input v-model="form.lat" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="纬度" prop="lng">
          <el-input v-model="form.lng" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="安装时间" prop="installationTime">
          <el-date-picker clearable
            v-model="form.installationTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择安装时间">
          </el-date-picker>
        </el-form-item>-->
        <el-form-item label="变更日期" prop="changeDate">
          <el-date-picker clearable :readonly="isDetails"
            v-model="form.changeDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择变更日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="变更类型" prop="changeType">
          <el-select v-model="form.changeType" placeholder="请选择变更类型" :readonly="isDetails">
            <el-option
              v-for="dict in dict.type.change_type"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变更状态" prop="changeState">
          <el-select v-model="form.changeState" placeholder="请选择变更状态" :readonly="isDetails">
            <el-option
              v-for="dict in dict.type.change_state"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变更说明" prop="changeExplain">
          <el-input v-model="form.changeExplain" type="textarea" placeholder="请输入内容" :readonly="isDetails" />
        </el-form-item>
        <el-form-item label="变更人" prop="changePerson">
          <el-input v-model="form.changePerson" maxlength = "200" placeholder="请输入变更人" :readonly="isDetails" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" :readonly="isDetails" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" v-if="!isDetails">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog title="审核" :visible.sync="auditedOpen" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="说明" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="auditedYesNo(true)">同 意</el-button>
        <el-button @click="auditedYesNo(false)">不同意</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listHistory, getHistory, delHistory, addHistory, updateHistory, audited } from "@/api/device/history";

export default {
  name: "History",
  dicts: ['change_type', 'change_state'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 设备管理-摄像机修改记录表格数据
      historyList: [],
      // 弹出层标题
      title: "",
      // 是否详情
      isDetails: false,
      // 是否显示弹出层
      open: false,
      // 审核框是否显示
      auditedOpen: false,
      // 备注时间范围
      daterangeChangeDate: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cameraId: null,
        projectId: null,
        deviceCode: null,
        keyCode: null,
        cameraIp: null,
        projectName: null,
        policeStation: null,
        poleNo: null,
        poleAddress: null,
        deviceName: null,
        buildMode: null,
        cameraType: null,
        deviceStatus: null,
        changeDate: null,
        changeType: null,
        changeState: null,
        changePerson: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询设备管理-摄像机修改记录列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeChangeDate && '' !== this.daterangeChangeDate) {
        this.queryParams.params["beginChangeDate"] = this.daterangeChangeDate[0];
        this.queryParams.params["endChangeDate"] = this.daterangeChangeDate[1];
      }
      listHistory(this.queryParams).then(response => {
        this.historyList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        cameraId: null,
        projectId: null,
        deviceCode: null,
        keyCode: null,
        cameraIp: null,
        projectName: null,
        policeStation: null,
        poleNo: null,
        poleAddress: null,
        deviceName: null,
        buildMode: null,
        bagNum: null,
        manufacturer: null,
        cameraType: null,
        cameraFuncType: null,
        mduMac: null,
        ponPort: null,
        mduId: null,
        localOlt: null,
        lat: null,
        lng: null,
        installationTime: null,
        deviceStatus: "0",
        changeDate: null,
        changeType: null,
        changeState: null,
        changeExplain: null,
        changePerson: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeChangeDate = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加设备管理-摄像机修改记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHistory(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.isDetails = false;
        this.title = "修改设备管理-变更编辑";
      });
    },
    /*详情按钮操作*/
    handleDetails(row) {
      this.reset();
      const id = row.id || this.ids
      getHistory(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.isDetails = true;
        this.title = "修改设备管理-变更详情";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateHistory(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addHistory(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 审核按钮操作 */
    handleAudited(row) {
      this.reset();
      const id = row.id || this.ids
      getHistory(id).then(response => {
        this.form = response.data;
        this.auditedOpen = true;
      });
    },
    auditedYesNo(passed){
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            /** 同意2，拒绝3 */
            this.form.changeState = passed === true ? 2 : 3;
            updateHistory(this.form).then(response => {
              this.$modal.msgSuccess("审核成功");
              this.auditedOpen = false;
              this.getList();
            });
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除设备管理-摄像机修改项？').then(function() {
        return delHistory(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('device/history/export', {
        ...this.queryParams
      }, `history_${new Date().getTime()}.xlsx`)
    },
    /** 返回按钮操作 */
    handleClose() {
      this.$router.push({
        name: 'Camera',
        path: '/device/camera/index/'
      });
    },
  }
};
</script>
