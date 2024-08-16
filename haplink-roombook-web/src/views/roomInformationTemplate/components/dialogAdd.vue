<template>
  <el-dialog :title="title" :visible.sync="open" :before-close="cancel">
    <div class="dialog-title" slot="title">
      <i class="el-icon-document-add"></i>{{ title }}
    </div>
    <div class="content">
      <el-form ref="form" :model="form" :rules="rules">
        <div style="color: #3060ba">概述:</div>
        <div style="display: flex;flex-wrap: wrap">
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="楼层编号" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.floorNo" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="房间编号" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.roomNo" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="房间名称" label-width="43%" prop="roomName">
              <el-input style="width: 100%;" size="small" v-model="form.roomName" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="房间面积(m²)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.roomArea" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="是否为洁净区" label-width="43%">
              <el-select v-model="form.isCleanArea" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="是否有窗" label-width="43%">
              <el-select v-model="form.isWindowed" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="是否防水" label-width="43%">
              <el-select v-model="form.isWaterproof" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="是否防油" label-width="43%">
              <el-select v-model="form.isGreaseProofing" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="是否防静电" label-width="43%">
              <el-select v-model="form.isAntiStatic" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="是否有喷淋" label-width="43%">
              <el-select v-model="form.isSprayed" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="是否需排烟" label-width="43%">
              <el-select v-model="form.isSmokeRequired" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="是否有氮气" label-width="43%">
              <el-select v-model="form.isNitrogenPresent" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="是否有氩气" label-width="43%">
              <el-select v-model="form.isArgonPresent" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="是否有氦气" label-width="43%">
              <el-select v-model="form.isHelium" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="是否有二氧化碳" label-width="43%">
              <el-select v-model="form.isCarbonDioxide" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="是否有压缩空气" label-width="43%">
              <el-select v-model="form.isCompressedAir" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="是否需防爆" label-width="43%">
              <el-select v-model="form.isExplosionProof" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="火灾危险性" label-width="43%">
              <el-select v-model="form.fireRisk" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.fire_risk"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="是否为仓库" label-width="43%">
              <el-select v-model="form.isWarehouse" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div style="color: #3060ba">建筑:</div>
        <div style="display: flex;flex-wrap: wrap">
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="层高(mm)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.storeyHeight" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="净高(mm)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.clearHeight" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="人数(人)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.numberOfPeople" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="内墙工程" label-width="43%">
              <el-select v-model="form.interiorWallWorksId" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in interiorWallWorksIdList"
                    :key="dict.id"
                    :label="dict.number+dict.designation"
                    :value="dict.id"
                >
                  <span style="float: left">{{ dict.number }} {{ dict.designation }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="地面工程" label-width="43%">
              <el-select v-model="form.groundEngineeringId" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in groundEngineeringIdList"
                    :key="dict.id"
                    :label="dict.number+dict.designation"
                    :value="dict.id"
                >
                  <span style="float: left">{{ dict.number }} {{ dict.designation }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="楼面工程" label-width="43%">
              <el-select v-model="form.floorWorksId" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in floorWorksIdList"
                    :key="dict.id"
                    :label="dict.number+dict.designation"
                    :value="dict.id"
                >
                  <span style="float: left">{{ dict.number }} {{ dict.designation }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="顶棚工程" label-width="43%">
              <el-select v-model="form.ceilingWorkId" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in ceilingWorkIdList"
                    :key="dict.id"
                    :label="dict.number+dict.designation"
                    :value="dict.id"
                >
                  <span style="float: left">{{ dict.number }} {{ dict.designation }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="踢脚工程" label-width="43%">
              <el-select v-model="form.kickingWorksId" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in kickingWorksIdList"
                    :key="dict.id"
                    :label="dict.number+dict.designation"
                    :value="dict.id"
                >
                  <span style="float: left">{{ dict.number }} {{ dict.designation }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="楼板构造厚度(mm)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.floorThickness" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="结构降板(mm)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.structuralDropPlate" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
        </div>

        <div style="color: #3060ba">工艺:</div>
        <div style="display: flex;flex-wrap: wrap">
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="洁净等级" label-width="43%">
              <el-select v-model="form.cleanliness" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.cleanliness"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div style="color: #3060ba">结构:</div>
        <div style="display: flex;flex-wrap: wrap">
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="楼面活荷载(kN/m²)" label-width="43%">
              <el-select v-model="form.floorLiveLoad" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.floor_live_load"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div style="color: #3060ba">给排水:</div>
        <div style="display: flex;flex-wrap: wrap">
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="是否有给水" label-width="43%">
              <el-select v-model="form.isHaveWaterSupply" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="是否有排水" label-width="43%">
              <el-select v-model="form.isHaveDrainage" style="width: 100%;" placeholder="请选择">
                <el-option
                    v-for="dict in dict.type.sys_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="城市用水/热水" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.cityWater" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="消防喷淋系统" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.fireSprinklerSystem" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="洗眼器" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.eyeBath" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="工艺废水" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.processWastewater" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="去离子水" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.deionizedWater" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
        </div>

        <div style="color: #3060ba">电气:</div>
        <div style="display: flex;flex-wrap: wrap">
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="工艺要求/特殊电力荷载" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.theProcessRequiresSpecialElectricLoads" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="门禁(个)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.numberOfAccessControl" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="闭路电视摄像头(个)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.cctvCameras" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="红外线防盗系统(个)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.infraredAntiTheftSystem" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="电源插座(单相)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.powerOutletSinglePhase" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="电源插座(3相)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.powerSocketThreePhase" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="电话终端" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.telephoneTerminal" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="宽带终端" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.broadbandTerminal" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="要求的不间断电源" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.uninterruptiblePowerSupplyRequired" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="照明-照度" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.illumination" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="灯具类型" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.lampsType" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
        </div>

        <div style="color: #3060ba">暖通:</div>
        <div style="display: flex;flex-wrap: wrap">
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="空调类型" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.typeOfAirConditioner" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="夏季最高/最低温度(℃)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.summerMinMaxTemperature" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="冬季最高/最低温度(℃)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.winterMinMaxTemperature" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="相对湿度(%)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.relativeHumidity" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;margin-right: 5%">
            <el-form-item label="换气次数(次)" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.exhaustNumber" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
          <div style="width: 30%;margin-bottom:  26px;">
            <el-form-item label="热力泄漏" label-width="43%">
              <el-input style="width: 100%;" size="small" v-model="form.heatLeakage" placeholder="请输入"
                        maxlength="30"/>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="submitForm">确 定</el-button>
      <el-button size="small" @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>

import { libraryList } from "@/api/finishedProduct"
import {roomMessageInsert, roomMessageUpdate} from "@/api/roomInformationTemplate"

export default {
  name: "dialogAdd",
  dicts: ['sys_yes_no', 'fire_risk', 'cleanliness', 'floor_live_load'],
  props: {
    title: {
      type: String,
      default: "新增"
    },
    formData: {
      type: Object,
      default: () => {
      }
    },
    open: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      form: {},
      rules: {
        roomName: [
          {required: true, message: "房间名称不能为空", trigger: "blur"},
        ],
      },
      interiorWallWorksIdList: [],
      groundEngineeringIdList: [],
      floorWorksIdList: [],
      ceilingWorkIdList: [],
      kickingWorksIdList: [],
    }
  },
  watch:{
    formData:{
      handler(newVal){
        this.form = {...newVal}
      },
      deep:true
    },
  },
  mounted() {
    this.interiorWallWorksIdListFn()
    this.groundEngineeringIdListFn()
    this.floorWorksIdListFn()
    this.ceilingWorkIdListFn()
    this.kickingWorksIdListFn()
  },
  methods: {
    interiorWallWorksIdListFn(){
      let params = {
        pageNum: 1,
        pageSize: 999,
        category: 3,
      }
      libraryList(params).then(response => {
            this.interiorWallWorksIdList = response.rows;
          }
      )
    },
    groundEngineeringIdListFn(){
      let params = {
        pageNum: 1,
        pageSize: 999,
        category: 5,
      }
      libraryList(params).then(response => {
            this.groundEngineeringIdList = response.rows;
          }
      )
    },
    floorWorksIdListFn(){
      let params = {
        pageNum: 1,
        pageSize: 999,
        category: 4,
      }
      libraryList(params).then(response => {
            this.floorWorksIdList = response.rows;
          }
      )
    },
    ceilingWorkIdListFn(){
      let params = {
        pageNum: 1,
        pageSize: 999,
        category: 6,
      }
      libraryList(params).then(response => {
            this.ceilingWorkIdList = response.rows;
          }
      )
    },
    kickingWorksIdListFn(){
      let params = {
        pageNum: 1,
        pageSize: 999,
        category: 7,
      }
      libraryList(params).then(response => {
            this.kickingWorksIdList = response.rows;
          }
      )
    },
    submitForm() {
      if (this.title === "新增") {
        this.addFn()
      } else if (this.title === "编辑") {
        this.roomMessageUpdateFn()
      }
    },
    addFn() {
      if (!this.form.roomName) {
        this.$modal.msgWarning("请输入房间名称!")
      }
      roomMessageInsert(this.form).then(res => {
        if (res.code === 200) {
          this.$modal.msgSuccess(res.msg)
          this.cancel("request")
        } else {
          this.$modal.msgError(res.msg)
        }
      })
    },
    roomMessageUpdateFn() {
      if (!this.form.roomName) {
        this.$modal.msgWarning("请输入房间名称!")
      }
      roomMessageUpdate(this.form).then(res => {
        if (res.code === 200) {
          this.$modal.msgSuccess(res.msg)
          this.cancel("request")
        } else {
          this.$modal.msgError(res.msg)
        }
      })
    },
    cancel(arg) {
      this.form = {}
      this.$emit("cancel", arg)
    },
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  width: 1334px;
}

.content {
  height: 640px;
  overflow: auto;
  padding: 0 20px;

  ::v-deep .el-form--inline .el-form-item {
    margin-right: 0;
  }

  ::v-deep .el-form-item {
    margin-bottom: 0;
  }
}
</style>
