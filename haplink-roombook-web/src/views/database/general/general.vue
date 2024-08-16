<!--TODO:通用按钮的格式-->

<template>
  <div class="database">
    <div class="tabs-container1">
      <div class="custom-tabs">
        <el-tabs v-model="activeTab" @tab-click="handleClick">
          <el-tab-pane
            v-for="(tab, index) in tabs"
            :key="tab.id"
            :label="tab.name"
            :name="tab.id.toString()"
            class="custom-tab"
          >
            <div :class="'inner-content-box-low' + (index + 1)">
              <div class="custom-sub-tabs">
                <el-tabs
                  v-model="activeSubTab"
                  tab-position="top"
                  @tab-click="handleSubTabClick"
                  class="custom-sub-tabs-inner"
                >
                  <el-tab-pane
                    v-for="(subTab, subIndex) in tab.subset"
                    :key="tab.id + '-' + subTab.id"
                    :label="subTab.name"
                    :name="subTab.name"
                    :class="'tab-pane-low' + (subIndex + 1)"
                  ></el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="bottom card">
      <el-col :xs="24">
        <div class="current-path">
          当前层级：{{ currentPath }}
        </div>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
          <el-form-item label="内容">
            <el-input
              v-model="queryParams.content"
              placeholder="请输入内容"
              clearable
              style="width: 180px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="最近修改时间" label-width="100px">
            <el-date-picker
              v-model="dateRange"
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
          <el-col :span="1.5">
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              @click="showBatchDeleteConfirm"
              v-hasPermi="['system:user:remove']"
            >批量删除</el-button>
            <el-button
              v-if="showGeneralButton[activeSubTab]"
              type="primary"
              plain
              icon="el-icon-folder-add"
              @click="handleGeneral"
            >通用</el-button>
          </el-col>
        </el-row>
        <div class="occupy"></div>
        <el-table stripe class="body-border" :max-height="getTableHeight('card','occupy')" v-loading="loading" :data="filteredList" @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" width="50" type="index"/>
          <el-table-column label="内容" align="left" prop="content" width="532" header-align="left"/>
          <el-table-column label="结构厚度(mm)" align="center" prop="thickness" width="100" header-align="center"/>
          <el-table-column label="创建时间" align="center" prop="createTime" width="100"/>
          <el-table-column label="创建人" align="center" prop="createBy" width="100" header-align="center"></el-table-column>
          <el-table-column label="最近修改时间" align="center" prop="updateTime" width="100" />
          <el-table-column label="操作" width="200" class-name="small-padding fixed-width" align="center">
            <template slot-scope="scope" v-if="scope.row.userId !== 1">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >删除</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-document-copy"
                @click="handleCopy(scope.row)"
              >复制</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </div>
      <pagination
        class="pagination-container"
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.Size"
        @pagination="fetchSubTabData"
      >
      </pagination>
    <div>
      <HandleAddDialog
        :handleAddvisible.sync="addDialogVisible"
        @click-Houdu = "clickHoudu"
        @mouse-up-Txt = "mouseupTxt"
        @close-Tag = "closeTag"
        @can-cel = "cancel"
        @handle-Submit = "handleSubmit"
      />
    </div>
    <div>
      <GeneralDialog
        :generalDialogVisible.sync="generalDialogVisible"
        :generalDialogTitle="generalDialogTitle"
        :generalLeftSearch="generalLeftSearch"
        :generalLeftTable="generalLeftTable"
        :selectedCountLeft="selectedCountLeft"
        :totalCountLeft="totalCountLeft"
        :filteredGeneralRightTable="filteredGeneralRightTable"
        :selectedCountRight="selectedCountRight"
        :totalCountRight="totalCountRight"
        @clear-filters-2="clearFilters2"
        @get-item-by-org-id="handleGetItemByOrgId"
        @copy-2="handleCopy2"
        @clear-filters-3="clearFilters3"
        @search-right-table="searchRightTable"
        @delete-selected="handleDeleteSelected"
        @general-submit="handleGeneralSubmit"
        @cancel="cancel"
        @handle-General-Dialog-Close="handleGeneralDialogClose"
      />
    </div>

    <el-dialog
      title="确认删除"
      :visible.sync="batchDeleteDialogVisible"
      width="30%">
      <span>确认要删除选中的项目吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchDeleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleBatchDeleteConfirm">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ListTab, ListTable, deleteItem, insertItem, updateItem, getItemByOrgId, batchInsert} from '@/api/database/general'; // 引入你的接口函数
import GeneralDialog from '@/views/database/general/components/generalDialog.vue';
import {getTableHeight} from "@/utils";

export default {
  components: {
    GeneralDialog,
  },
  data() {
    return {
      showTextArea: true,
      showTag: false,
      position: {},
      dateRange:[],
      thickness: "",
      content: "",
      activeTab: '1',
      activeSubTab: '8',
      dialogMode:'新增',
      addDialogVisible: false,
      selectedRow: null,
      selectedCategory: '',
      currentPath: '',
      filteredList: [],
      generalLeftTable:[],
      generalRightTable:[],
      filteredGeneralRightTable:[],
      showGeneralButton: {},
      queryParams:{
        pageNum: 1,
        pageSize: 10,
      },

      loading: false,
      deptList: [],
      tabs: [], // 存放从接口获取的数据
      subTabs: [], // 存放当前选中tab的子tab
      total: 0,
      searchContent: '',
      searchDate: [],
      publishStatus: '',
      batchDeleteDialogVisible: false, // 控制批量删除确认对话框的显示
      generalDialogVisible: false,
      generalDialogTitle: '',
      generalLeftSearch: '',
      generalRightSearch: '',
    };
  },
  computed: {
    selectedCountLeft() {
      return this.generalLeftTable.filter(item => item.selected).length;
    },
    totalCountLeft() {
      return this.generalLeftTable.length;
    },
    selectedCountRight() {
      return this.filteredGeneralRightTable.filter(item => item.selected).length;
    },
    totalCountRight() {
      return this.filteredGeneralRightTable.length;
    },
    dialogTitle() {
      return this.dialogMode;
    },
  },
  methods: {
    getTableHeight,
    // 调整组织架构列表高度
    updateContainerHeight(index) {
      this.$nextTick(() => {
        const subTabsContainer = this.$el.querySelectorAll('.custom-sub-tabs-inner .el-tabs__nav')[index];
        const subTabsHeight = subTabsContainer ? subTabsContainer.scrollHeight : 0;
        this.$set(this.tabHeight, index, subTabsHeight);
      });
    },

    updateSliderPosition(tabClass) {
      this.$nextTick(() => {
        const tabs = this.$el.querySelectorAll(`${tabClass} .el-tabs__item`);
        const activeBar = this.$el.querySelector(`${tabClass} .el-tabs__active-bar`);
        const activeTab = Array.from(tabs).find(tab => tab.classList.contains('is-active'));

        if (activeTab && activeBar) {
          const tabWidth = activeTab.clientWidth;
          const tabOffsetLeft = activeTab.offsetLeft;

          activeBar.style.width = `${tabWidth}px`;
          activeBar.style.transform = `translateX(${tabOffsetLeft}px`;
        }
      });
    },

    //获取组织架构的接口
    getListTab() {
      ListTab().then(res => {
        this.tabs = res.data;
        if (this.tabs.length > 0) {
          const firstTab = this.tabs[0];
          this.activeTab = firstTab.id.toString();
          if (firstTab.subset.length > 0) {
            this.activeSubTab = firstTab.subset[0].name;
            this.currentPath = firstTab.name + ' > ' + this.activeSubTab;
            this.fetchSubTabData(firstTab.subset[0].id); // 传递第一个子标签的 ID
          }
          this.updateContainerHeight(); // 初始化时设置高度
        }
      });
    },

    //点击组织架构列表的第一层
    handleClick(tab, event) {
      setTimeout(() => {
        this.updateSliderPosition('.custom-tabs');
        this.updateContainerHeight();
      }, 0); // 延迟执行以确保更新正确

      const selectedTab = this.tabs.find(t => t.id.toString() === tab.name);
      if (selectedTab) {
        this.subTabs = selectedTab.subset.map(sub => ({
          id: sub.id,
          name: sub.name,
          label: sub.name
        }));
        this.activeSubTab = this.subTabs.length > 0 ? this.subTabs[0].name : '';
        this.currentPath = selectedTab.name + (this.activeSubTab ? ' > ' + this.activeSubTab : '');

        if (this.subTabs.length > 0) {
          this.fetchSubTabData();
        } else {
          this.filteredList = [];
          this.total = 0;
        }
      }
      this.updateGeneralButtonVisibility();
    },

    //点击组织架构列表的第二层
    handleSubTabClick(tab, event) {
      setTimeout(() => {
        this.updateSliderPosition('.custom-sub-tabs');
        this.updateContainerHeight();
      }, 0); // 延迟执行以确保更新正确

      const parentTab = this.tabs.find(t => t.id.toString() === this.activeTab);

      if (parentTab) {
        this.currentPath = parentTab.name + ' > ' + tab.label;
        this.fetchSubTabData();

      } else {
        console.error("parentTab not found");
      }
      this.form.category = tab.label;
      this.updateGeneralButtonVisibility();
    },

    //获得当前组织架构id
    getCurrentOrgId() {
      const parentTab = this.tabs.find(t => t.id.toString() === this.activeTab);
      const subTab = parentTab.subset.find(sub => sub.name === this.activeSubTab);
      return subTab.id;
    },

    //通过组织架构id获得列表数据
    fetchSubTabData() {
      this.loading = true;
      this.queryParams.orgId = this.getCurrentOrgId();
      this.queryParams.matchStatus = 'required';
      this.queryParams.materialsId = undefined;
      this.queryParams.parentId = undefined;
      if(this.dateRange[0]){
        this.queryParams.startTime = this.dateRange[0]
        this.queryParams.endTime = this.dateRange[1]
      } else {
        this.queryParams.startTime = ""
        this.queryParams.endTime = ""
      }
      console.log('Fetching data with params:', this.queryParams);

      ListTable(this.queryParams)
        .then(response => {
          console.log('API response:', response);
          if (response.code === 200) {
            this.filteredList = response.rows.map(item => ({
              ...item,
              path: this.currentPath,
              editMode: item.editMode || '编辑'
            })).sort((a, b) => a.id - b.id);
            this.total = response.total;
            if (this.generalDialogVisible) {
              this.generalLeftTable = response.rows; // 如果通用弹窗已打开，将数据赋值到generalLeftTable
            }
          } else {
            this.$message.error('获取数据失败');
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    //获取页尾的一页容量
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchSubTabData(this.getCurrentOrgId());// 调用 API 获取新的数据
    },

    //获取页尾的页数
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchSubTabData(this.getCurrentOrgId());  // 调用 API 获取新的数据
    },

    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },

    //获取dialog标题
    setDialogMode(mode) {
      this.dialogMode = mode;
    },

    //点击新增按钮
    handleAdd() {
      this.resetForm();
      this.addDialogVisible = true;
      this.form.category = this.activeSubTab;
      this.setDialogMode('新增');
      this.form.isGeneralAdded = false;

      const parentTab = this.tabs.find(t => t.id.toString() === this.activeTab);
      if (parentTab) {
        const subTab = parentTab.subset.find(sub => sub.name === this.activeSubTab);
        if (subTab) {
          this.form.categoryId = subTab.id;
        }
      }
    },

    //点击编辑按钮
    handleUpdate(row) {
      console.log("Handle Update", row);
      this.selectedRow = row;
      this.form = { ...row };
      this.addDialogVisible = true;
      this.setDialogMode('编辑');
      this.form.category = this.activeSubTab;

      const parentTab = this.tabs.find(t => t.id.toString() === this.activeTab);
      if (parentTab) {
        const subTab = parentTab.subset.find(sub => sub.name === this.activeSubTab);
        if (subTab) {
          this.form.categoryId = subTab.id;
        }
      }
    },

    //点击复制按钮
    handleCopy(row) {
      this.selectedRow = row;
      this.form = { ...row };
      this.addDialogVisible = true;
      this.setDialogMode('复制');
      this.form.category = this.activeSubTab;

      const parentTab = this.tabs.find(t => t.id.toString() === this.activeTab);
      if (parentTab) {
        const subTab = parentTab.subset.find(sub => sub.name === this.activeSubTab);
        if (subTab) {
          this.form.categoryId = subTab.id;
        }
      }
    },

    //新增/编辑/复制之后的确认提交
    handleSubmit() {
      if (this.dialogTitle=='编辑') {
        this.updateSubTabData(this.selectedRow);
        this.cancel();
      } else if(this.dialogTitle=='新增'){
        this.postSubTabData();
        this.cancel();
      }else if(this.dialogTitle=='复制'){
        this.postSubTabData();
        this.cancel();
      }
    },

    //新建提交
    postSubTabData() {
      console.log("Post SubTab Data", this.form);
      const requestData = {
        content: this.form.content,
        thickness: this.form.thickness,
        orgId: this.form.categoryId // 使用记录的类别 ID
      };

      insertItem(requestData)
        .then(response => {
          console.log("Insert Item Response", response.data);
          if (response.code === 200) {
            this.$message.success('新增成功');
            this.fetchSubTabData(this.form.categoryId); // 刷新数据
          } else {
            this.$message.error('新增失败: ' + response.message);
          }
        });
    },

    //编辑提交
    updateSubTabData(row) {
      console.log("Update SubTab Data", this.form);
      const requestData = {
        content: this.form.content,
        thickness: this.form.thickness,
        id: row.id,
        orgId: this.form.categoryId,
      };

      updateItem(requestData)
        .then(response => {
          console.log("Update Item Response", response.data);
          if (response.code === 200) {
            this.$message.success('更新成功');
            this.fetchSubTabData(this.form.categoryId); // 刷新数据
          } else {
            this.$message.error('更新失败: ' + response.message);
          }
        });
    },

    handleQuery(){
      this.queryParams.pageNum = 1;
      this.fetchSubTabData();
    },

    //主页的清空条件
    resetQuery() {
      this.queryParams.content = "";
      this.dateRange = [];
      this.fetchSubTabData(); // 重置过滤条件并刷新数据
    },

    //判断批量删除时是否有勾选
    showBatchDeleteConfirm() {
      const selectedIds = this.filteredList
        .filter(item => item.selected)
        .map(item => item.id);

      if (selectedIds.length === 0) {
        this.$message.warning('请选择要删除的项目');
        return;
      }
      this.batchDeleteDialogVisible = true;
    },

    //批量删除按钮
    handleBatchDeleteConfirm() {
      const selectedIds = this.filteredList
        .filter(item => item.selected)
        .map(item => item.id)
        .join(',');

      deleteItem(selectedIds)
        .then(response => {
          if (response.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetchSubTabData(this.getCurrentOrgId()); // 刷新数据
            this.deptList = this.deptList.filter(item => !item.selected);
            this.total = this.deptList.length;
            this.filteredList = this.deptList.sort((a, b) => a.id - b.id); // 更新filteredList并排序
          } else {
            this.$message.error('删除失败: ' + response.message);
          }
        })
        .finally(() => {
          this.batchDeleteDialogVisible = false; // 关闭确认对话框
        });
    },

    //每一行后面的删除
    handleDelete(row) {
      this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteItem(row.id)
          .then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
              this.fetchSubTabData(this.getCurrentOrgId());
              const index = this.deptList.indexOf(row);
              if (index !== -1) {
                this.deptList.splice(index, 1);
                this.total--;
                this.filteredList = this.deptList.sort((a, b) => a.id - b.id); // 更新filteredList并排序
              }
            } else {
              this.$message.error('删除失败: ' + response.message);
            }
          })
      })
    },

    //点击通用按钮
    handleGeneral() {
      const activeSubTabSuffix = this.activeSubTab.split('-')[1];
      const parentTab = this.tabs.find(tab => tab.id.toString() === this.activeTab);
      const generalParentTab = this.tabs.find(tab => tab.name === '通用工程');

      if (parentTab && generalParentTab) {
        const matchingSubTab = generalParentTab.subset.find(sub => sub.name.endsWith(activeSubTabSuffix));

        if (matchingSubTab) {
          this.currentOrgId = parentTab.subset.find(sub => sub.name.endsWith(activeSubTabSuffix)).id;  // 使用当前tab的子标签ID
          console.log('找到匹配的通用子标签 ID:', matchingSubTab.id);
          this.fetchSubTabData(matchingSubTab.id); // 初始化加载数据
        } else {
          console.warn('没有找到对应后缀的通用子标签');
        }
      } else {
        console.warn('没有找到当前选中的父级标签或通用工程标签');
      }

      this.generalDialogTitle = this.getGeneralTitle();
      this.generalDialogVisible = true;
    },

    //判断通用按钮是否出现
    updateGeneralButtonVisibility() {
      const commonSubNames = new Set(
        this.tabs.find(tab => tab.name === '通用工程')?.subset.map(sub => sub.name) || []
      );

      const parentTab = this.tabs.find(tab => tab.id.toString() === this.activeTab);
      const activeSubTabName = this.activeSubTab.split('-')[1];

      if (parentTab.name === '通用工程') {
        this.showGeneralButton[this.activeSubTab] = false;
      } else {
        this.showGeneralButton[this.activeSubTab] = commonSubNames.has(activeSubTabName);
      }
    },

    //点击通用按钮后的标题
    getGeneralTitle() {
      const subTabSuffix = this.activeSubTab.split('-')[1];
      return `通用-${subTabSuffix} 添加`;
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

    //通用dialog左表格的清空条件
    clearFilters2() {
      this.generalLeftSearch = '';
      this.handleGetItemByOrgId();
    },

    //通用框中将通用层数据复制给预选框
    handleCopy2() {
      const selectedItems = this.generalLeftTable.filter(item => item.selected);

      selectedItems.forEach(item => {
        const alreadyInRightTable = this.generalRightTable.some(rightItem => {
          return rightItem.content === item.content && rightItem.thickness === item.thickness;
        });

        if (!alreadyInRightTable) {
          this.generalRightTable.push({
            ...item,
            id: Date.now() + Math.random(),  // 确保新添加的行有唯一的ID
          });
        }

        // 将左表的该项设为不可选择
        item.disabled = true;
        item.selected = false; // 清除选中状态
      });

      this.filteredGeneralRightTable = [...this.generalRightTable];

      // 清除右表格中项的选中状态
      this.generalRightTable.forEach(item => {
        item.selected = false;
      });

      // 更新左表格中的选项状态
      this.updateLeftTableSelection();
    },

    //通用dialog左表格数据
    handleGetItemByOrgId() {
      const params = {
        orgId: this.currentOrgId,
        search: this.generalLeftSearch
      };

      getItemByOrgId(params)
        .then(response => {
          if (response.code === 200) {
            this.generalLeftTable = response.rows;
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

    //清空右表格搜索关键字
    clearFilters3() {
      this.generalRightSearch = '';
      this.filteredGeneralRightTable = [...this.generalRightTable]; // 恢复原始数据
      this.$forceUpdate();
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

    //用右上角×关闭通用dialog
    handleGeneralDialogClose(done) {
      this.generalRightTable = [];
      this.filteredGeneralRightTable = [];
      this.generalLeftTable = [];
      this.handleGetItemByOrgId();
      this.generalDialogVisible = false;
      done();
    },


    mouseupTxt() {
      let rangeTextareaDom = document.querySelector('.textarea').querySelector("textarea")

      this.position.start = rangeTextareaDom.selectionStart
      this.position.end = rangeTextareaDom.selectionEnd
    },

    clickHoudu() {
      this.showTextArea = false;
      this.showTag = true;

      // 获取需要插入内容的 DOM 元素
      let rangeTextareaDom = document.querySelector(".edit");
      let content = this.form.content;

      // 获取当前光标的位置
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);

      // 创建要插入的内容
      let span = document.createElement("span");
      span.className = "inserted-tag";
      span.textContent = content;

      // 在光标位置插入内容
      range.insertNode(span);

      // 调整光标位置到插入内容的后面
      range.setStartAfter(span);
      range.setEndAfter(span);
      selection.removeAllRanges();
      selection.addRange(range);
    },

    closeTag() {
      console.log("closeTag method triggered");
      this.showTextArea = true
      this.showTag = false
      let rangeTextareaDom = document.querySelector(".edit")
      let span1 = rangeTextareaDom.querySelector(".span1")
      let span2 = rangeTextareaDom.querySelector(".span2")
      this.form.content = span1.innerText + span2.innerText
      span1.remove()
      span2.remove()
    },

    resetForm() {
      console.log("Reset Form");
      this.form = {
        category: '',
        categoryId: null,
        thickness: '',
        content: ''
      };
      this.selectedRow = null;
    },

    parseTime(time) {
      const date = new Date(time);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份补零
      const day = date.getDate().toString().padStart(2, '0'); // 天补零
      return `${year}-${month}-${day}`;
    },

    cancel() {
      console.log("Cancel");
      this.addDialogVisible = false;
    },
  },

  mounted() {
    this.getListTab();
    this.updateSliderPosition('.custom-tabs');
    this.updateSliderPosition('.custom-sub-tabs');
    this.filteredList = this.deptList.sort((a, b) => a.id - b.id); // 初始时将 filteredList 设置为 deptList并排序
    this.updateContainerHeight();
    this.updateGeneralButtonVisibility();
  }
}

</script>

<style scoped>
.tabs-container1 {
  width: 1612px;
  background: #FFFFFF;
  border-radius: 6px;
  margin-left: 24px;
  margin-top: 12px;
  border: 1px solid #d0d0d0;
  overflow: hidden;
}

.custom-tabs {
  display: flex;
  flex-wrap: wrap; /* 使tab自动换行 */
  padding-left: 32px;
  padding-bottom:0px;
  padding-right:80px;
}

.custom-tabs ::v-deep .el-tabs__nav {
  display: flex;
  flex-wrap: wrap; /* 使tab自动换行 */
}

.custom-tabs ::v-deep .el-tabs__item {
  font-size: 16px;
  font-weight: bold;
}

.inner-content-box-low1,
.inner-content-box-low2,
.inner-content-box-low3,
.inner-content-box-low4,
.inner-content-box-low5,
.inner-content-box-low6,
.inner-content-box-low7 {
  margin-top: 4px;
  overflow: visible;
}

.custom-sub-tabs {
  overflow: visible;
}

/* 只调整用于实现多行的样式 */
.custom-sub-tabs-inner >>> .el-tabs__nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 使tab左对齐 */
}

.custom-sub-tabs-inner >>> .el-tabs__item {
  padding: 0;
  margin-right: 44px; /* 设置固定间距 */
}

.custom-tabs >>> .el-tabs__item.is-active {
  color: #3060BA;
}

.custom-tabs >>> .el-tabs__item:hover {
  color: #3060BA;
}

/* 设置第一层Tab之间的距离 */
.custom-tabs ::v-deep .el-tabs__item {
  margin-right: 104px;
}

/* 设置第二层Tab之间的距离 */
.custom-sub-tabs-inner ::v-deep .el-tabs__item {
  margin-right: 44px;
}

/* 设置滑块的宽度和间距与Tab同步 */
.custom-tabs ::v-deep .el-tabs__active-bar,
.custom-sub-tabs-inner ::v-deep .el-tabs__active-bar {
  background-color: #3060BA;
  height: 2px;
  transition: transform 0.3s ease, width 0.3s ease;
  position: absolute;
  bottom: 0;
}

/* 隐藏第二层 tab 的滑块和下面的横线 */
.custom-sub-tabs-inner ::v-deep .el-tabs__active-bar {
  display: none;
}

.custom-sub-tabs-inner ::v-deep .el-tabs__header {
  border-bottom: none;
}


.current-path {
  margin-top: 24px;
  margin-left: 24px;
  width: 600px;
  height: 12px;
  font-weight: 500;
  font-size: 12px;
  color: #7794C4;
  line-height: 12px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.general_button{
  width:72px;
  height:32px;
  background:#C9952D;
  border-radius: 4px;
  margin-top: 16px;
  margin-left: 16px;
  font-size: 14px;
  text-align: center;
  padding:0px;
}









.custom-dialog .el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 确保对话框内容正确对齐 */
.custom-dialog .el-dialog__header,
.custom-dialog .el-dialog__body,
.custom-dialog .el-dialog__footer {
  width: 100%;
  box-sizing: border-box;
}

.dialog1 >>> .el-dialog__header {
  height: 40px;
  padding:0px;
}

.dialog1 >>> .el-dialog__body {
  height: 360px;
  padding:0px;
}

.dialog1 >>> .dialog-footer {
  margin-bottom:12px;
  margin-right:35px;
  height: 32px;
  padding:0px;
}

.dialog1 >>> .el-dialog__footer {
  height: 56px;
  padding:0px;
  margin:0px;
}

.custom-dialog-title{
  width: 40px;
  height: 24px;
  //font-family: OPlusSans 3.0, OPlusSans 30;
  font-weight: 400;
  font-size: 20px;
  color: #4E5969;
  line-height: 24px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-top:8px;
  margin-left:48px;
}


.type{
  width: 28px;
  height: 16px;
  margin-left:36px;
  margin-top:47px;
}

.type_chosen{
  width: 137px;
  height: 32px;
  margin-left:66px;
  margin-top:39px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
}

.depth{
  width: 56px;
  height: 16px;
  //font-family: OPlusSans 3.0, OPlusSans 30;
  font-weight: 500;
  font-size: 14px;
  color: #4E5969;
  line-height: 16px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-top:47px;
  margin-left:32px;
}

.input-depth{
  width: 123px;
  height: 32px;
  border-radius: 0px 0px 0px 0px;
  padding:0px;
  margin-top:39px;
  margin-left:38px;
}

.content{
  width:28px;
  height:16px;
  margin-left:36px;
  margin-top:32px;
}

.input-hint{
  width: 374px;
  height: 12px;
  //font-family: OPlusSans 3.0, OPlusSans 30;
  font-weight: 400;
  font-size: 10px;
  color: #7794C4;
  line-height: 12px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-left:130px;
  margin-top:20px;
}

.box1{
  width:350px;
  height:117px;
  background: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #D2DBEC;
  margin-left:130px;
  margin-top:4px;
}

.transfer_button{
  width:12px;
  height:12px;
  padding:0px;
  border:0px;
  margin-left:15px;
  margin-top:4px;
}

.custom-textarea >>>.el-input__inner{
  width: 330px;
  height: 76px;
  margin-left:10px;
  margin-top:8px;
  padding: 0px;
}

.preview{
  width: 28px;
  height: 16px;
  margin-left:36px;
  margin-top:32px;
}

.cancel1 {
  width: 52px;
  height: 32px;
  background: #E8EDF5;
  border-radius: 4px;
  border: none;
}

.cancel-word1 {
  font-weight: 500;
  font-size: 10px;
  color: #5E8CD5;
  text-align: center;
}

.sure1 {
  width: 52px;
  height: 32px;
  background: #3060BA;
  border-radius: 4px;
  border: none;
}

.sure-word1 {
  font-weight: 500;
  font-size: 10px;
  color: #FFFFFF;
  text-align: center;
}

.tag{
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #5E8CD5;
  background:#F8F8F9;
  font-family: PingFang SC, PingFang SC;
  font-weight: 500;
  font-size: 14px;
  font-color: #7794C4;
  line-height: 16px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.operation-buttons {
  display: flex;
  justify-content: space-between;
}

.pagination-container {
  width: calc(100% - 48px);
  margin: 10px auto;
  background-color: transparent;
}

</style>
