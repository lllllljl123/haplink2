<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="派出所" prop="policeStation">
        <el-input
          v-model="queryParams.policeStation"
          placeholder="请输入派出所"
          maxlength = "100"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="箱号" prop="occCode">
        <el-input
          v-model="queryParams.occCode"
          placeholder="请输入箱号"
          maxlength = "100"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="地址" prop="occAddress">
        <el-input
          v-model="queryParams.occAddress"
          placeholder="请输入地址"
          maxlength = "100"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery(3)">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-tabs type="card" v-model="showType">
      <el-tab-pane label="查看列表" name="first">
        <div class="tempBox"></div>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-document-add"
              size="mini"
              @click="handleAdd"
              v-hasPermi="['device:occ:add']"
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
              v-hasPermi="['device:occ:edit']"
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
              v-hasPermi="['device:occ:remove']"
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
              v-hasPermi="['device:occ:import']"
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
              v-hasPermi="['device:occ:export']"
            >导出
            </el-button>
          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="occList" @selection-change="handleSelectionChange">
-          <el-table-column type="selection" width="55" align="center" />
<!--                    <el-table-column label="主键ID" align="center" prop="id" />-->
          <el-table-column label="序号" type="index" width="70" align="center">
            <template v-slot="scope">
              <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="派出所" align="center" prop="policeStation" />
          <el-table-column label="电信箱号" align="center" prop="occCode" />
          <el-table-column label="主干1" align="center" prop="trunkCable1" />
          <el-table-column label="主干2" align="center" prop="trunkCable2" />
          <el-table-column label="地址" align="center" prop="occAddress" :show-overflow-tooltip="true"/>
          <el-table-column label="现有主干纤芯总数" align="center" prop="trunkCoreNum" />
          <el-table-column label="主干空余总数" align="center" prop="trunkCoreFree" />
          <el-table-column label="已布放配缆芯数" align="center" prop="trunkCoreUsed" />
          <el-table-column label="可接配缆芯数" align="center" prop="trunkCoreEnable" />
          <el-table-column label="光分" align="center" prop="lightSplitting" />
          <el-table-column label="剩余光分口" align="center" prop="residualLightSplitting" />
<!--          <el-table-column label="经度" align="center" prop="lat" />
          <el-table-column label="纬度" align="center" prop="lng" />-->
<!--          <el-table-column label="光交箱状态" align="center" prop="occStatus" />-->
<!--          <el-table-column label="备注" align="center" prop="remark" />-->
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['device:occ:edit']"
              >编辑</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-coordinate"
                :disabled="!scope.row.lat"
                @click="handlePoint(scope.row)"
                v-hasPermi="['device:occ:remove']"
              >定位</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-upload2"
                @click="handleUpload(scope.row)"
                v-hasPermi="['device:occ:add']"
              >附件</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['assets:record:remove']"
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
      </el-tab-pane>
      <el-tab-pane label="查看撒点" name="second">
        <div class="mid" id="Map"></div>
      </el-tab-pane>
    </el-tabs>

    <!-- 附件管理对话框 -->
    <el-dialog title="附件管理" :visible.sync="uploadOpen" width="50%" append-to-body>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="附件" prop="builtDrawings">
          <file-upload disabled :limit="100" :fileSize="100" :fileType='["dwg"]'
                       v-model="form.builtDrawings"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改光交箱对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="派出所" prop="policeStation">
          <el-input v-model="form.policeStation" maxlength = "100" placeholder="请输入派出所" />
        </el-form-item>
        <el-form-item label="电信箱号" prop="occCode">
          <el-input v-model="form.occCode" maxlength = "100" placeholder="请输入箱号" />
        </el-form-item>
        <el-form-item label="主干1" prop="trunkCable1">
          <el-input v-model="form.trunkCable1" maxlength = "200" placeholder="请输入主干1" />
        </el-form-item>
        <el-form-item label="主干2" prop="trunkCable2">
          <el-input v-model="form.trunkCable2" maxlength = "200" placeholder="请输入主干2" />
        </el-form-item>
        <el-form-item label="地址" prop="occAddress">
          <el-input v-model="form.occAddress" maxlength = "250" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="现有主干纤芯总数" prop="trunkCoreNum">
          <el-input v-model="form.trunkCoreNum" maxlength = "50" placeholder="请输入现有主干纤芯总数" />
        </el-form-item>
        <el-form-item label="主干空余总数" prop="trunkCoreFree">
          <el-input v-model="form.trunkCoreFree" maxlength = "200" placeholder="请输入主干空余总数" />
        </el-form-item>
        <el-form-item label="已布放配缆芯数" prop="trunkCoreUsed">
          <el-input v-model="form.trunkCoreUsed"  maxlength = "200" placeholder="请输入主已布放配缆芯数" />
        </el-form-item>
        <el-form-item label="主干芯数" prop="trunkCoreEnable">
          <el-input v-model="form.trunkCoreEnable" maxlength = "200" placeholder="可接配缆芯数" />
        </el-form-item>
        <el-form-item label="光分" prop="lightSplitting">
          <el-input v-model="form.lightSplitting" maxlength = "200" placeholder="请输入光分" />
        </el-form-item>
        <el-form-item label="剩余光分口" prop="residualLightSplitting">
          <el-input v-model="form.residualLightSplitting" maxlength = "200" placeholder="请输入剩余光分" />
        </el-form-item>
        <el-form-item label="经度" prop="lat">
          <el-input v-model="form.lat" placeholder="请输入经度" maxlength = "100" @input="(v)=>(form.lat=v.replace(/^\D*(\d*(?:\.\d{0,20})?).*$/g, '$1'))" />
        </el-form-item>
        <el-form-item label="纬度" prop="lng">
          <el-input v-model="form.lng" placeholder="请输入纬度" maxlength = "100" @input="(v)=>(form.lng=v.replace(/^\D*(\d*(?:\.\d{0,20})?).*$/g, '$1'))" />
        </el-form-item>
<!--        <el-form-item label="光交箱状态" prop="occStatus">
          <el-input v-model="form.occStatus" placeholder="请输入光交箱状态" />
        </el-form-item>-->
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" maxlength = "500" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 用户导入固定资产对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body
               :close-on-click-modal="false">
      <el-form :rules="rules">
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

    <div  class="cityInfo" v-show="showData.show" :style="{left:showData.px.x+'px',top:showData.px.y +'px'}">
      <div class='info'>
        <div style="border-bottom: 1px solid #c0c4cc;text-align: center">{{ showData.occCode }}</div>
<!--        <div class="info-item">-->
<!--          <div class="label">光交类型：</div>-->
<!--          <div class="value">{{ showData.occType }}</div>-->
<!--        </div>-->
        <div class="info-item">
          <div class="label">派出所：</div>
          <div class="value">{{ showData.policeStation }}</div>
        </div>
        <div class="info-item">
          <div class="label">地址：</div>
          <div class="value">{{ showData.occAddress }}</div>
        </div>
        <div class="info-item">
          <div class="btn" @click="handleUpdate(showData)">编辑</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listOcc, getOcc, delOcc, addOcc, updateOcc } from "@/api/device/occ";
import {getToken} from "@/utils/auth";

export default {
  name: "Occ",
  data() {
    return {
      //显示列表或撒点tab
      showType: "first",
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
      // 光交箱表格数据
      occList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示附件管理
      uploadOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        policeStation: null,
        occCode: null,
        occAddress: null,
        trunkCoreNum: null,
        trunkCoreUsed: null,
        lat: null,
        lng: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        policeStation: [
          {required: true, message: "派出所不能为空", trigger: "blur"}
        ],
        occCode: [
          {required: true, message: "电信箱号不能为空", trigger: "blur"}
        ],
      },
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
        url: process.env.VUE_APP_BASE_API + "/device/occ/import"
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
    };
  },
  // created() {
  //   this.getList();
  // },
  destroyed() {
    // 离开页面销毁监听事件   不然到其他页面改变窗口大小会报错
    this.$EventBus.$off('onresize')
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
  mounted() {
    this.calcMapPos()
    this.$EventBus.$on('onresize', () => {
      this.calcMapPos()
    })
    // this.getList();
    this.getAllPoint();
  },
  methods: {
    getAllPoint() {
      listOcc({pageNum: 1, pageSize: 9999,}).then(response => {
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
          // x:880,
          // y:505
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
        this.calcMapTop = rect.top - 80
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
        let lat, lng
        for (let i = 0; i < _this.occList.length; i++) {
          if (_this.occList[i].lat && _this.occList[i].lng) {
            lat = _this.occList[i].lat
            lng = _this.occList[i].lng
            break
          }
        }
        _this.map = new AMap.Map("Map", {
          zoom: 16, //级别
          center: [_this.initMapLat, _this.initMapLng],//city[0].center, //中心点坐标
          // center: [114.30,30.59],//city[0].center, //中心点坐标
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
        } else {
          _this.getList();
        }
      });
    },
    setMake(allPointList,boo) {
      let style = [
        {
          url: require('../../../assets/images/occ.png'),//"https://a.amap.com/jsapi_demos/static/images/mass2.png",
          anchor: new AMap.Pixel(0, 0),
          size: new AMap.Size(22, 22),
          "border-radius": "6px"
        },
        {
          url: require('../../../assets/images/dw2.png'),
          anchor: new AMap.Pixel(0, 0),
          size: new AMap.Size(22, 22),
          "border-radius": "6px"
        }
      ];
      let arry = []
      allPointList.forEach((x, inx) => {
        if (x.lat && x.occCode) {
          if (x.deviceStatus === "在用") {
            x.style = 0
          } else {
            x.style = 0
          }
          x.lnglat = [x.lat, x.lng]
          arry.push(x)
        }
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
    /** 查询光交箱列表 */
    getList(boo) {
      this.loading = true;
      listOcc(this.queryParams).then(response => {
        this.occList = response.rows;
        if (this.occList[0] && this.occList[0].lat) {
          this.initMapLat = this.occList[0].lat
          this.initMapLng = this.occList[0].lng
        }
        if (this.occList[0] && this.calcMapTop <= 0) {
          this.calcMapPos()
        }
        if (this.showType === "second") {
          if (this.occList[0] && boo === 3) {
            this.handlePoint(this.occList[0])
          }
        }
        this.total = response.total;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.uploadOpen = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        policeStation: null,
        occCode: null,
        trunkCable1: null,
        trunkCable2: null,
        occAddress: null,
        trunkCoreNum: null,
        trunkCoreFree: null,
        trunkCoreUsed: null,
        trunkCoreEnable: null,
        lightSplitting: null,
        residualLightSplitting: null,
        lat: null,
        lng: null,
        builtDrawings: null,
        occStatus: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    async handleQuery(boo) {
      let params = {
        ...this.queryParams,
        pageSize:999
      }
      const response = await listOcc(params)
      let temp = []
      if (response.rows[0]) {
        temp = response.rows.filter(x => x.lat)
        this.initMapLat = temp[0]?.lat
        this.initMapLng = temp[0]?.lng
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
      this.title = "添加光交箱";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOcc(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "编辑光交箱";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateOcc(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.uploadOpen = false;
              this.getList();
            });
          } else {
            addOcc(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.uploadOpen = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除光交箱？').then(function () {
        return delOcc(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('device/occ/template', {}, `设备模板_${new Date().getTime()}.xlsx`)
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
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "光交箱设备清单导入";
      this.upload.open = true;
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('device/occ/export', {
        ...this.queryParams
      }, `occ_${new Date().getTime()}.xlsx`)
    },
    /** 附件管理按钮操作 */
    handleUpload(row) {
      this.reset();
      const id = row.id
      getOcc(id).then(response => {
        this.form = response.data;
        this.uploadOpen = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped>

.el-form-item {
  margin-bottom: 5px;
}

.el-tooltip__popper {
  max-width: 90%
}

.app-container {
  position: relative;
}

.tempBox {
  width: 100%;
  height: 72vh;
  position: absolute;
  z-index: -99;
  visibility: hidden;
}

.mid {
  width: 100%;
  height: 72vh;
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
      width: 100%;
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
