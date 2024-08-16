<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="项目名称" prop="projectId">
        <el-select v-model="queryParams.projectId" placeholder="请选择项目名称" clearable>
          <el-option
            v-for="item in projectOptions"
            :key="item.id"
            :label="item.projectName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="摄像机IP" prop="cameraIp">
        <el-input
          v-model="queryParams.cameraIp"
          placeholder="请输入摄像机IP"
          maxlength = "50"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上联光交" prop="occCode">
        <el-input
          v-model="queryParams.occCode"
          placeholder="请输入上联光交"
          maxlength = "100"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备名称" prop="deviceName">
        <el-input
          v-model="queryParams.deviceName"
          placeholder="请输入设备名称"
          maxlength = "200"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="杆号" prop="poleNo" label-width="120">
        <el-input
          v-model="queryParams.poleNo"
          maxlength = "50"
          placeholder="请输入杆号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="立杆地址" prop="poleAddress">
        <el-input
          v-model="queryParams.poleAddress"
          placeholder="请输入立杆地址"
          maxlength = "200"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="建设方式" prop="buildMode">
        <el-input
          v-model="queryParams.buildMode"
          maxlength = "100"
          placeholder="请输入建设方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="派出所" prop="policeStation">
        <el-select v-model="queryParams.policeStation" placeholder="请选择派出所" clearable>
          <el-option
            v-for="item in policeStationOptions"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>

      </el-form-item>
<!--      <el-form-item label="所属项目" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入所属项目"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->

      <el-form-item label="摄像机类型" prop="cameraType" label-width="120">
        <el-select v-model="queryParams.cameraType" placeholder="请选择摄像机类型" clearable>
          <el-option
            v-for="dict in dict.type.camera_type"
            :key="dict.label"
            :label="dict.label"
            :value="dict.label"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="OLT" prop="localOlt">
        <el-select v-model="queryParams.localOlt" @change="handleOltChange" placeholder="请选择OLT" clearable>
          <el-option
            v-for="item in localOltOptions"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="PON口" prop="ponPort">
        <el-select v-model="queryParams.ponPort" placeholder="请选择PON口" clearable>
          <el-option
            v-for="item in ponPortOptions"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <!--      <el-form-item label="键盘编号" prop="keyCode">
              <el-input
                v-model="queryParams.keyCode"
                placeholder="请输入键盘编号[9位]"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->

      <!--      <el-form-item label="设备厂商" prop="manufacturer">
              <el-select v-model="queryParams.manufacturer" placeholder="请选择设备厂商" clearable>
                <el-option
                  v-for="dict in dict.type.camera_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="摄像机功能类型" prop="cameraFuncType">
              <el-input
                v-model="queryParams.cameraFuncType"
                placeholder="请输入摄像机功能类型"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="安装时间" prop="installationTime">
              <el-date-picker clearable
                v-model="queryParams.installationTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择安装时间">
              </el-date-picker>
            </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery(3)">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-tabs type="card" v-model="showType" @tab-click="handleTabClick">
      <el-tab-pane label="查看列表" name="first" stretch="false" :key="showType">
        <div class="tempBox"></div>
        <div class="list-content">
          <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button
                type="primary"
                plain
                icon="el-icon-document-add"
                size="mini"
                @click="handleAdd"
                v-hasPermi="['device:camera:add']"
              >新增
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="success"
                plain
                icon="el-icon-edit"
                size="mini"
                :disabled="single"
                @click="handleUpdate"
                v-hasPermi="['device:camera:edit']"
              >编辑
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple"
                @click="handleDelete"
                v-hasPermi="['device:camera:remove']"
              >删除
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="info"
                plain
                icon="el-icon-upload"
                size="mini"
                @click="handleImport"
                v-hasPermi="['device:camera:import']"
              >导入
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="warning"
                plain
                icon="el-icon-download"
                size="mini"
                @click="handleExport"
                v-hasPermi="['device:camera:export']"
              >导出
              </el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
          </el-row>

          <el-table v-loading="loading" :data="cameraList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" align="center"/>
            <el-table-column label="序号" type="index" width="70" align="center">
              <template v-slot="scope">
                <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <!--          <el-table-column label="主键ID" align="center" prop="id"/>-->
            <el-table-column label="设备编码" align="center" prop="deviceCode" :show-overflow-tooltip="true"/>
            <el-table-column label="设备名称" align="center" prop="deviceName" :show-overflow-tooltip="true"/>
            <!--      <el-table-column label="键盘编号[9位]" align="center" prop="keyCode" />-->
            <el-table-column label="摄像机IP" align="center" prop="cameraIp"/>
            <el-table-column label="所属项目" align="center" prop="projectName"/>
            <el-table-column label="派出所" align="center" prop="policeStation"/>
            <el-table-column label="杆号" align="center" prop="poleNo"/>
            <el-table-column label="杆地址" align="center" prop="poleAddress" :show-overflow-tooltip="true"/>
            <el-table-column label="建设方式" align="center" prop="buildMode"/>
            <!--      <el-table-column label="背包箱" align="center" prop="bagNum" />-->
            <!--      <el-table-column label="设备厂商" align="center" prop="manufacturer">
                    <template slot-scope="scope">
                      <dict-tag :options="dict.type.camera_type" :value="scope.row.manufacturer"/>
                    </template>
                  </el-table-column>-->
            <el-table-column label="摄像机类型" align="center" prop="cameraType"/>
            <el-table-column label="局端OLT" align="center" prop="localOlt" :show-overflow-tooltip="true"/>
            <el-table-column label="PON端口" align="center" prop="ponPort"/>
            <!--      <el-table-column label="摄像机功能类型" align="center" prop="cameraFuncType" />
                  <el-table-column label="MDU MAC地址" align="center" prop="mduMac" />
                  <el-table-column label="MDU ID" align="center" prop="mduId" />
                  <el-table-column label="经度" align="center" prop="lat" />
                  <el-table-column label="纬度" align="center" prop="lng" />-->
            <el-table-column label="安装时间" align="center" prop="installationTime">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.installationTime, '{y}-{m}-{d}') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="设备状态" align="center" prop="deviceStatus"/>
            <!--      <el-table-column label="备注" align="center" prop="remark" />-->
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width" >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-tickets"
                  @click="handleDetails(scope.row)"
                  v-hasPermi="['device:camera:list']"
                >详情
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-coordinate"
                  :disabled="!scope.row.lat"
                  @click="handlePoint(scope.row)"
                  v-hasPermi="['device:camera:list']"
                >定位
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="['device:camera:edit']"
                >编辑
                </el-button>
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  size="mini"
                  @click="handleDelete(scope.row)"
                  v-hasPermi="['device:camera:remove']"
                >删除
                </el-button>
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
        </div>
      </el-tab-pane>
      <el-tab-pane label="查看撒点" name="second">
        <div class="mid" id="Map"></div>
      </el-tab-pane>

      <el-tab-pane label="设备变更" name="third">
        <span slot="label" v-if="changeNum > 0">
         待提交
         <el-badge :value="changeNum" v-if="changeNum > 0" :max="9" ></el-badge>
        </span>
        <span slot="label" v-if="auditedNum > 0">
         待审核
         <el-badge :value="auditedNum" v-if="auditedNum > 0" :max="9" ></el-badge>
        </span>
      </el-tab-pane>

    </el-tabs>

    <!-- 添加或修改摄像机对话框 -->
    <el-dialog class="update-form" :title="title" :visible.sync="open" width="70%" append-to-body
               :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="项目名称" prop="projectId">
<!--              <el-input v-model="form.projectId" placeholder="请选择项目名称" :readonly="showHistory" />-->
                <el-select v-model="form.projectId" placeholder="请选择项目名称" :disabled="showHistory" clearable style="width: 100%">
                  <el-option
                    v-for="item in projectOptions"
                    :key="item.id"
                    :label="item.projectName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              <!--              <el-input v-if="showHistory" :value="formHistory.deviceCode" disabled/>-->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备编码" prop="deviceCode">
              <el-input v-model="form.deviceCode" placeholder="请输入设备编码[20位]" maxlength = "100" :disabled="showHistory" />
              <!--              <el-input v-if="showHistory" :value="formHistory.deviceCode" disabled/>-->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="设备名称" prop="deviceName">
              <el-input v-model="form.deviceName" placeholder="请输入设备名称" maxlength = "200"/>
              <el-input v-if="showHistory" v-model="formHistory.deviceName" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="摄像机IP" prop="cameraIp" >
              <el-input v-model="form.cameraIp" placeholder="请输入摄像机IP" maxlength = "100" />
              <el-input v-if="showHistory" v-model="formHistory.cameraIp" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上联光交箱号" prop="cameraIp" label-width="120px">
              <el-input v-model="form.occCode" placeholder="请输入上联光交箱号" maxlength = "200" />
              <el-input v-if="showHistory" v-model="formHistory.occCode" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="所属项目" prop="projectName">
              <el-input v-model="form.projectName" placeholder="请输入所属项目" maxlength = "200" />
              <el-input v-if="showHistory" v-model="formHistory.projectName" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="派出所" prop="policeStation">
              <el-input v-model="form.policeStation" placeholder="请输入派出所" maxlength = "100" />
              <el-input v-if="showHistory" v-model="formHistory.policeStation" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="杆号" prop="poleNo" label-width="120px">
              <el-input v-model="form.poleNo" placeholder="请输入杆号" maxlength = "50" />
              <el-input v-if="showHistory" v-model="formHistory.poleNo" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="设备厂商" prop="manufacturer">
              <el-input v-model="form.manufacturer" placeholder="请选择设备厂商" maxlength = "200" />
              <el-input v-if="showHistory" v-model="formHistory.manufacturer" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="摄像机类型" prop="cameraType" label-width="100px">
              <!--              <el-select v-model="form.cameraType" placeholder="请选择摄像机类型">
                              <el-option
                                v-for="dict in dict.type.camera_type"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.label"
                              ></el-option>
                            </el-select>-->
              <el-input v-model="form.cameraType" placeholder="请选择摄像机类型"/>
              <el-input v-if="showHistory" v-model="formHistory.cameraType" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="摄像机功能类型" prop="cameraFuncType" label-width="120px">
              <el-input v-model="form.cameraFuncType" placeholder="请输入摄像机功能类型" maxlength = "200" />
              <el-input v-if="showHistory" v-model="formHistory.cameraFuncType" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="键盘编号" prop="keyCode">
              <el-input v-model="form.keyCode" placeholder="请输入键盘编号[9位]" maxlength = "100" />
              <el-input v-if="showHistory" v-model="formHistory.keyCode" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建设方式" prop="buildMode">
              <el-input v-model="form.buildMode" placeholder="请输入建设方式" maxlength = "100" />
              <el-input v-if="showHistory" v-model="formHistory.buildMode" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="MDU MAC地址" prop="mduMac" label-width="120px">
              <el-input v-model="form.mduMac" placeholder="请输入MDU MAC地址" maxlength = "100" />
              <el-input v-if="showHistory" v-model="formHistory.mduMac" :disabled="true"/>
            </el-form-item>

          </el-col>
        </el-row>


        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="背包箱" prop="bagNum">
              <el-input v-model="form.bagNum" placeholder="请输入背包箱" maxlength = "10" />
              <el-input v-if="showHistory" v-model="formHistory.bagNum" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="PON端口" prop="ponPort">
              <el-input v-model="form.ponPort" placeholder="请输入PON端口" maxlength = "50" />
              <el-input v-if="showHistory" v-model="formHistory.ponPort" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="MDU ID" prop="mduId" label-width="120px">
              <el-input v-model="form.mduId" placeholder="请输入MDU ID" maxlength = "50" />
              <el-input v-if="showHistory" v-model="formHistory.mduId" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="局端OLT" prop="localOlt">
              <el-input v-model="form.localOlt" placeholder="请输入局端OLT" maxlength = "50" />
              <el-input v-if="showHistory" v-model="formHistory.localOlt" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经度" prop="lat">
              <el-input v-model="form.lat" placeholder="请输入经度" maxlength = "50" @input="(v)=>(form.lat=v.replace(/^\D*(\d*(?:\.\d{0,20})?).*$/g, '$1'))"/>
              <el-input v-if="showHistory" v-model="formHistory.lat" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纬度" prop="lng" label-width="120px">
              <el-input v-model="form.lng" placeholder="请输入纬度" maxlength = "50" @input="(v)=>(form.lng=v.replace(/^\D*(\d*(?:\.\d{0,20})?).*$/g, '$1'))" />
              <el-input v-if="showHistory" v-model="formHistory.lng" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="安装时间" prop="installationTime">
              <el-date-picker clearable
                              style="width: 100%"
                              v-model="form.installationTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="请选择安装时间">
              </el-date-picker>
              <el-input v-if="showHistory" v-model="formHistory.installationTime" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="立杆地址" prop="poleAddress">
              <el-input v-model="form.poleAddress" placeholder="请输入立杆地址" maxlength = "100" />
              <el-input v-if="showHistory" v-model="formHistory.poleAddress" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" maxlength = "500"  placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 摄像机设备详情对话框 -->
    <el-dialog title="摄像机设备详情" :visible.sync="details_open" width="70%" append-to-body
               :close-on-click-modal="false">

      <el-tabs type="box-card">
        <el-tab-pane label="基本信息">
          <el-form ref="form" :model="form" :disabled="true" label-width="100px">

            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="项目名称" prop="projectId">

                  <el-select v-model="form.projectId" clearable style="width: 100%">
                    <el-option
                      v-for="item in projectOptions"
                      :key="item.id"
                      :label="item.projectName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备编码" prop="deviceCode">
                  <el-input v-model="form.deviceCode"  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">

              <el-col :span="8">
                <el-form-item label="设备名称" prop="deviceName">
                  <el-input v-model="form.deviceName"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="摄像机IP" prop="cameraIp">
                  <el-input v-model="form.cameraIp"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上联光交箱号" prop="occCode">
                  <el-input v-model="form.occCode"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="所属项目" prop="projectName">
                  <el-input v-model="form.projectName"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="派出所" prop="policeStation">
                  <el-input v-model="form.policeStation"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="杆号" prop="poleNo">
                  <el-input v-model="form.poleNo"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="设备厂商" prop="manufacturer">
                  <el-input v-model="form.manufacturer"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="摄像机类型" prop="cameraType" label-width="100px">
                  <el-select v-model="form.cameraType" style="width: 220px">
                    <el-option
                      v-for="dict in dict.type.camera_type"
                      :key="dict.value"
                      :label="dict.label"
                      :value="dict.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="摄像机功能类型" prop="cameraFuncType" label-width="120px">
                  <el-input v-model="form.cameraFuncType"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="键盘编号" prop="keyCode">
                  <el-input v-model="form.keyCode"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="建设方式" prop="buildMode">
                  <el-input v-model="form.buildMode"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="MDU MAC地址" prop="mduMac" label-width="120px">
                  <el-input v-model="form.mduMac"/>
                </el-form-item>

              </el-col>
            </el-row>


            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="背包箱" prop="bagNum">
                  <el-input v-model="form.bagNum"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="PON端口" prop="ponPort">
                  <el-input v-model="form.ponPort"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="MDU ID" prop="mduId">
                  <el-input v-model="form.mduId"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="局端OLT" prop="localOlt">
                  <el-input v-model="form.localOlt"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经度" prop="lat">
                  <el-input v-model="form.lat"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="纬度" prop="lng">
                  <el-input v-model="form.lng"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="安装时间" prop="installationTime">
                  <el-date-picker clearable
                                  v-model="form.installationTime"
                                  type="date"
                                  value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="16">
                <el-form-item label="立杆地址" prop="poleAddress">
                  <el-input v-model="form.poleAddress"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" type="textarea"/>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <el-tabs type="box-card">
        <el-tab-pane label="变更历史">

          <el-table :data="historyList" >
            <el-table-column label="变更日期" align="center" prop="changeDate" width="180">
              <template v-slot="scope">
                <span>{{ parseTime(scope.row.changeDate, '{y}-{m}-{d}') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="变更类型" align="center" prop="changeType">
              <template v-slot="scope">
                <dict-tag :options="dict.type.change_type" :value="scope.row.changeType"/>
              </template>
            </el-table-column>
            <el-table-column label="变更状态" align="center" prop="changeState">
              <template v-slot="scope">
                <dict-tag :options="dict.type.change_state" :value="scope.row.changeState"/>
              </template>
            </el-table-column>
            <el-table-column label="变更说明" align="center" prop="changeExplain" :show-overflow-tooltip="true" />
            <el-table-column label="变更人" align="center" prop="changePerson" />
            <el-table-column label="备注" align="center" prop="remark" />

          </el-table>

        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 用户导入固定资产对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body
               :close-on-click-modal="false">
      <el-form ref="form">
        <el-form-item label="项目名称" prop="projectId">
          <el-select v-model="upload.projectId" placeholder="请选择项目">
            <el-option
              v-for="item in projectOptions"
              :key="item.id"
              :label="item.projectName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-divider></el-divider>
        <el-upload
          ref="upload"
          :limit="1"
          accept=".xlsx, .xls"
          :headers="upload.headers"
          :action="upload.url + '?updateSupport=' + upload.updateSupport + '&projectId=' + upload.projectId"
          :disabled="upload.isUploading"
          :on-progress="handleFileUploadProgress"
          :on-success="handleFileSuccess"
          :auto-upload="false"
          drag
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip text-center" slot="tip">
            <div class="el-upload__tip" slot="tip">
              <el-checkbox v-model="upload.updateSupport"/>
              是否更新已经存在的数据
            </div>
            <span>仅允许导入xls、xlsx格式文件。</span>
            <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
                     @click="importTemplate">下载模板
            </el-link>
          </div>
        </el-upload>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>

    <div class="cityInfo" v-show="showData.show" :style="{left:showData.px.x+'px',top:showData.px.y +'px'}">
      <div class='info'>
        <div style="border-bottom: 1px solid #c0c4cc;text-align: center">{{ showData.deviceName }}</div>
        <div class="info-item">
          <div class="label">所属项目：</div>
          <div class="value">{{ showData.projectName }}</div>
        </div>
        <div class="info-item">
          <div class="label">派出所：</div>
          <div class="value">{{ showData.policeStation }}</div>
        </div>
        <div class="info-item">
          <div class="label">像机类型：</div>
          <div class="value">{{ showData.cameraType }}</div>
        </div>
        <div class="info-item">
          <div class="btn" @click="handleUpdate(showData)">编辑</div>
          <div class="btn" @click="handleDetails(showData)">详情</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  listCamera,
  getCamera,
  delCamera,
  addCamera,
  updateCamera,
  selectLocalOltList,
  selectPonPortList,
  selectPoliceStationList
} from "@/api/device/camera";

import {changeSum, getCameraHistory, listHistory} from "@/api/device/history";
import {listProject} from "@/api/assets/project";
import {getToken} from "@/utils/auth";
import {parseTime} from "../../../utils/haplink";

export default {
  name: "Camera",
  dicts: ['camera_type','change_type','change_state'],
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
      // 摄像机表格数据
      cameraList: [],
      // 弹出层标题
      title: "",
      // 是否显示添加、编辑弹出层
      open: false,
      // 是否显示历史框
      showHistory: true,
      // 是否显示详情弹出层
      details_open: false,
      //项目选项
      projectOptions: [],
      //olt选项
      localOltOptions: [],
      //pon选项
      ponPortOptions: [],
      //派出所
      policeStationOptions: [],
      // 设备管理-摄像机修改记录表格数据
      historyList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deviceCode: null,
        keyCode: null,
        cameraIp: null,
        projectName: null,
        policeStation: null,
        poleNo: null,
        poleAddress: null,
        deviceName: null,
        buildMode: null,
        manufacturer: null,
        cameraType: null,
        cameraFuncType: null,
        installationTime: null,
        deviceStatus: null,
        localOlt: null,
        ponPort: null,
        projectId: null,
      },
      //显示列表或撒点tab
      showType: "first",
      //待提交总条数
      changeNum: 0,
      //待审核总条数
      auditedNum: 0,
      // 表单参数
      form: {},
      // 表单历史
      formHistory: {},
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 项目id
        projectId: null,
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: {Authorization: "Bearer " + getToken()},
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/device/camera/import"
      },
      // 表单校验
      rules: {
        //projectId: [
        //  {required: true, message: "请选择项目", trigger: "blur"}
        //],
        deviceName: [
          {required: true, message: "设备名称不能为空", trigger: "blur"}
        ],
        deviceCode: [
          {required: true, message: "项目编号不能为空", trigger: "blur"}
        ]
      },
      showData: {
        show: false,
        px: {x: 0, y: 0}
      },
      map: null,
      calcMapTop: 0,
      marker: null,
      initMapLat: 121.53,
      initMapLng: 31.26,
      calcMapWidth: 0,
      calcMapHeight: 0,
      allPointList: [],
      mass:null,
    };
  },
  created() {
    this.getChangeSum();
    this.getProjectInfo();
    this.getLocalOltList();
    this.getPoliceStationList();
    //this.getPonPortList(null);
  },
  destroyed() {
    // 离开页面销毁监听事件   不然到其他页面改变窗口大小会报错
    this.$EventBus.$off('onresize')
  },
  mounted() {
    this.$EventBus.$on('onresize', () => {
      this.calcMapPos()
    })

    this.getAllPoint();
  },
  watch: {
    showType(n) {
      if (n === "first") {
        this.showData = {
          px: {
            x: 0,
            y: 0
          }
        }
      }
    }
  },
  methods: {
    parseTime,
    getAllPoint() {
      listCamera({pageNum: 1, pageSize: 9999,}).then(response => {
        if (response.rows[0]) {
          let temp = response.rows.filter(x => x.lat)
          this.initMapLat = temp[0].lat
          this.initMapLng = temp[0].lng
          this.allPointList = temp
        }
        this.initMap()
      });
    },
    handlePoint(row) {
      this.initMapLat = row.lat
      this.initMapLng = row.lng
      row = {
        ...row,
        px: {
          // x:870,
          // y:540
          x: this.calcMapWidth / 2 + 40, // 40 为标记图片的宽度+地图左侧距离菜单空白区域宽度
          y: this.calcMapHeight / 2 + this.calcMapTop // 22 为标记图片高度
        },
        show: true
      }
      this.showData = row
      this.map.setZoomAndCenter(16, [this.initMapLat, this.initMapLng]); //同时设置地图层级与中心点
      this.showType = "second"
    },
    calcMapPos() {
      this.$nextTick(() => {
        let tabsContent = document.querySelector(".tempBox")
        let rect = tabsContent.getBoundingClientRect()
        // this.calcMapTop = rect.top - 50
        this.calcMapTop = rect.top - 84
        this.calcMapWidth = rect.width
        this.calcMapHeight = rect.height
      })
    },
    initMap() {
      let _this = this;
      new AMap.DistrictSearch({
        extensions: "all",
        subdistrict: 0
      }).search('上海', function (status, result) {
        // 先更具名字来查出城市中心位置 再 初始化地图
        let city = result?.districtList?.filter(x => {
          // 只获取省级和城市级的
          return x.level === "city" || x.level === "province";
        });
        // 初始化地图
        // lat:121.5038599 展示
        // lng:31.2738934
        // lat:31.275904650880463  不展示
        // lng:121.4994389202977
        // lat:121.4994389202977  我更改鹏哥代码经纬度顺序之后
        // lng:31.275904650880463
        _this.map = new AMap.Map("Map", {
          zoom: 16, //级别
          // center:[112.20,31.04],
          // center: [_this.cameraList[0].lat,_this.cameraList[0].lng],//city[0].center, //中心点坐标
          center: [_this.initMapLat, _this.initMapLng],//city[0].center, //中心点坐标
          viewMode: "2D", //使用3D视图
          defaultCursor: "pointer",
          expandZoomRange: true,
          zooms: [3, 100],
          pitch: 40 // 俯视角度
        });

        let object3Dlayer = new AMap.Object3DLayer({zIndex: 110, opacity: 1});
        _this.map.add(object3Dlayer);

        // 设置省份边界   只显示一个地方
        let outer = [
          new AMap.LngLat(-360, 90, true),
          new AMap.LngLat(-360, -90, true),
          new AMap.LngLat(360, -90, true),
          new AMap.LngLat(360, 90, true)
        ];
        let holes = city[0].boundaries;
        let pathArray = [outer];
        pathArray.push.apply(pathArray, holes);
        let polygon = new AMap.Polygon({
          pathL: pathArray,
          strokeColor: "rgba(255,255,255,0)",
          strokeWeight: 1,
          strokeOpacity: 0.8,
          fillColor: "rgba(236,240,250,1)",
          fillOpacity: 1,
          strokeStyle: "dashed",
          strokeDasharray: [10, 2, 10]
        });
        polygon.setPath(pathArray);
        _this.map.add(polygon);
        if (_this.allPointList[0]) {
          _this.setMake(_this.allPointList);
        }
        else {
          _this.getList();
        }
      });
    },
    setMake(allPointList,boo) {

      let style = [
        {
          url: require('../../../assets/images/camera-online.png'),//"https://a.amap.com/jsapi_demos/static/images/mass2.png",
          anchor: new AMap.Pixel(0, 0),
          size: new AMap.Size(22, 22),
          "border-radius": "6px"
        },
        {
          url: require('../../../assets/images/camera-lose.png'),
          anchor: new AMap.Pixel(0, 0),
          size: new AMap.Size(22, 22),
          "border-radius": "6px"
        }
      ];
      let arry = []
      allPointList.forEach((x, inx) => {
        if (x.deviceStatus === "在用") {
          x.style = 0
        } else {
          x.style = 1
        }
        x.lnglat = [x.lat, x.lng]
        arry.push(x)
      })

      this.mass = new AMap.MassMarks(arry, {
        opacity: 1,
        zIndex: 100,
        cursor: "pointer",
        style: style
      });

      this.marker = new AMap.Marker({content: " ", map: this.map});
      // 鼠标移到点上去

      this.mass.on("mouseover", (e) => {
        this.marker.setPosition(e.data.lnglat);
        let pixel = this.map.lngLatToContainer(e.data.lnglat);
        e.data.px = {
          x: pixel.x + 40,
          y: pixel.y + this.calcMapTop
        }
        e.data.show = true
        this.showData = e.data
      });

      this.mass.on("mouseout", () => {
        this.showData = {
          px: {
            x: 0,
            y: 0
          }
        }
      })

      // 标记点  点击事件
      this.mass.on('click', (e) => {
        this.map.setZoomAndCenter(18, e.data.lnglat)
      })
      this.map.add([this.mass]);
      if(boo){
        this.queryParams.pageNum = 1;
        this.getList(boo);
      }else {
        this.getList();
      }
    },
    /** 查询摄像机列表 */
    getList(boo) {
      this.loading = true;
      listCamera(this.queryParams).then(response => {
        this.cameraList = response.rows;
        if(this.cameraList[0]){
          this.initMapLat = this.cameraList[0].lat
          this.initMapLng = this.cameraList[0].lng
        }
        this.total = response.total;
        if (this.cameraList[0]&&this.calcMapTop<=0) {
          this.calcMapPos()
        }
        if(this.showType ==="second"){
          if(this.cameraList[0]&&boo===3){
            this.handlePoint(this.cameraList[0])
          }
        }
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    //查询待审核数量
    getChangeSum(){
      changeSum().then(
        response => {
          if(response.data != null) {
            this.changeNum = response.data.changeCount;
            this.auditedNum = response.data.auditedCount;
          }
        }
      )
    },
    //派出所
    getPoliceStationList() {
      selectPoliceStationList().then(response => {
        this.policeStationOptions = response.data;
      });
    },
    getLocalOltList() {
      selectLocalOltList().then(response => {
        this.localOltOptions = response.data;
      });
    },
    getPonPortList(olt) {
      selectPonPortList(olt).then(response => {
        this.ponPortOptions = response.data;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.details_open = false;
      this.reset();
    },
    /** 查询项目信息 */
    getProjectInfo() {
      listProject().then(response => {
        this.projectOptions = response.rows;
      });
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
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
        deviceStatus: null,
        occCode: null,
        projectId: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.resetForm("form");
    },
    resetHistory(){
      this.formHistory = {
        deviceCode: null,
      }
      this.resetForm("formHistory");
    },
    /** 搜索按钮操作 */
    async handleQuery(boo) {
      let params = {
        ...this.queryParams,
        pageSize:999
      }
      const response = await listCamera(params)
      let temp = []
      if (response.rows[0]) {
        temp = response.rows.filter(x => x.lat)
        this.initMapLat = temp[0].lat
        this.initMapLng = temp[0].lng
      }
      if(this.mass){
        this.map.remove(this.mass)
        this.mass = null
      }
      if(temp[0]){
        this.setMake(temp,boo)
      } else {
        this.queryParams.pageNum = 1;
        this.getList(boo);
      }

      // this.queryParams.pageNum = 1;
      // this.getList(boo);
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.showData.show = false
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加摄像机";
      this.showHistory = false;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.resetHistory();
      const id = row.id || this.ids
      getCameraHistory(id).then(response => {
        if(response.data != null) {
          this.formHistory = response.data;
        }
      });
      getCamera(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改摄像机设备信息";
        this.showHistory = true;
      });

    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCamera(this.form).then(response => {
              this.$modal.msgSuccess("修改申请提交成功，请等待审核");
              this.open = false;
              this.getList();
            });
          } else {
            addCamera(this.form).then(response => {
              this.$modal.msgSuccess("新增申请提交成功，请等待审核");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除摄像机？').then(function () {
        return delCamera(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除申请提交成功，请等待审核");
      }).catch(() => {
      });
    },
    /** 详情按钮操作 */
    handleDetails(row) {
      this.reset();
      const id = row.id || this.ids
      getCamera(id).then(response => {
        this.form = response.data;
        this.details_open = true;
      });
      let camera = {"cameraId": id, "changeState" : 2 }
      listHistory(camera).then(response => {
        this.historyList = response.rows;
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('device/camera/export', {
        ...this.queryParams
      }, `camera_${new Date().getTime()}.xlsx`)
    },

    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "摄像机设备清单导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('device/camera/template', {}, `设备模板_${new Date().getTime()}.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", {dangerouslyUseHTMLString: true});
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    //
    handleOltChange(row) {
      let obj = {"olt": row}
      this.getPonPortList(obj);
    },
    //按tab跳转
    handleTabClick(tab) {
      // 根据 tab.name 进行路由跳转
      if(tab.name === "third") {
        this.$router.push({
          name: 'History',
          path: '/assets/history',
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>

/*.el-form-item {
  margin-bottom: 5px;
}*/

.el-tooltip__popper {
  max-width: 90%
}

.el-tabs {
  margin-top: 15px;
}

.list-content {
  margin: 10px;
}

.app-container {
  position: relative;
}

.mid {
  width: 100%;
  height: 72vh;
}
.tempBox{
  width: 100%;
  height: 72vh;
  position: absolute;
  z-index: -99;
  visibility: hidden;
}

.cityInfo {
  border: none !important;
  border-radius: 6px !important;
  background: #fff !important;
  color: #000 !important;
  min-width: 260px !important;
  line-height: 30px !important;
  padding: 12px !important;
  font-size: 14px !important;
  position: absolute;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .info-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #c0c4cc;

    .label {
      width: 40%;
      text-align: right;
    }

    .value {
      width: 60%;
      text-align: left;
    }

    .btn {
      width: 50%;
      text-align: center;
      color: #3c9cff;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
