<template>
  <div class="navbar">
<!--  UI  <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />-->

<!--  UI   <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!topNav"/>-->
<!--  UI  <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav"/>-->

    <div class="left">
      <div class="left-label">我的专业</div>
      <el-select size="mini" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="right-menu">
      <img class="help-document hover-effect" src="@/assets/imgs/help-document.png" alt="">
      <img class="question hover-effect" src="@/assets/imgs/question.png" alt="">
      <img class="user-pic hover-effect" src="@/assets/imgs/user-pic.png" alt="">
      <router-link to="/user/profile">
        <span class="username">{{ name }}</span>
      </router-link>
      <img class="exit hover-effect" src="@/assets/imgs/exit.png" alt="" @click="logout">

<!--      <template v-if="device!=='mobile'">-->
<!--        <search id="header-search" class="right-menu-item" />-->

<!--&lt;!&ndash;        <el-tooltip content="帮助文档" effect="dark" placement="bottom">-->
<!--          <haplink-doc id="haplink-doc" class="right-menu-item hover-effect" />-->
<!--        </el-tooltip>&ndash;&gt;-->

<!--        <screenfull id="screenfull" class="right-menu-item hover-effect" />-->

<!--        <el-tooltip content="布局大小" effect="dark" placement="bottom">-->
<!--          <size-select id="size-select" class="right-menu-item hover-effect" />-->
<!--        </el-tooltip>-->

<!--      </template>-->

<!--      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">-->
<!--        <div class="avatar-wrapper">-->
<!--&lt;!&ndash;          <img :src="avatar" class="user-avatar">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-avatar class="user-avatar" >{{name}}</el-avatar>&ndash;&gt;-->
<!--          <el-button class="user-info" type="info" >{{name}}</el-button>-->
<!--&lt;!&ndash;          <el-link type="primary" class="user-avatar">{{name}}</el-link>&ndash;&gt;-->

<!--          <i class="el-icon-caret-bottom" />-->
<!--        </div>-->
<!--        <el-dropdown-menu slot="dropdown">-->
<!--          <router-link to="/user/profile">-->
<!--            <el-dropdown-item>个人中心</el-dropdown-item>-->
<!--          </router-link>-->
<!--          <el-dropdown-item @click.native="setting = true">-->
<!--            <span>布局设置</span>-->
<!--          </el-dropdown-item>-->
<!--          <el-dropdown-item divided @click.native="logout">-->
<!--            <span>退出登录</span>-->
<!--          </el-dropdown-item>-->
<!--        </el-dropdown-menu>-->
<!--      </el-dropdown>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import HaplinkGit from '@/components/Haplink/Git'
import HaplinkDoc from '@/components/Haplink/Doc'

export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    HaplinkGit,
    HaplinkDoc
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'device'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    }
  },
  data(){
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  methods: {
    // toggleSideBar() {
    //   this.$store.dispatch('app/toggleSideBar')
    // },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          // 若依nginx 配置二级路径存在 location 404的问题
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        })
      }).catch(() => {});
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  //height: 50px; // UI
  height: 56px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  //.hamburger-container {
  //  line-height: 46px;
  //  height: 100%;
  //  float: left;
  //  cursor: pointer;
  //  transition: background .3s;
  //  -webkit-tap-highlight-color:transparent;
  //
  //  &:hover {
  //    background: rgba(0, 0, 0, .025)
  //  }
  //}

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .left{
    float: left;
    height: 100%;
    display: flex;
    align-items: center;
    &-label{
      font-family: var(--fontMedium);
      font-weight: 500;
      font-size: 12px;
      color: #8B8B8B;
      margin: 0 16px;
    }

    ::v-deep .el-input__inner{ // UI
      background: #FFFFFF;
      box-shadow: inset 0px 2px 4px 0px rgba(0,0,0,0.25);
      border-radius: 0;
      border: 0;
      width: 172px;
      height: 24px;
    }
    ::v-deep .el-select .el-input .el-select__caret{ //UI
      color: #5E8CD5;
      font-weight: bold;
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;  // UI
    align-items: center;  // UI
    &:focus {
      outline: none;
    }

    .help-document {
      width: 26px;
      height: 26px;
    }
    .question {
      width: 26px;
      height: 26px;
      margin-left: 16px;
      margin-right: 16px;
    }
    .user-pic {
      width: 32px;
      height: 32px;
    }
    .username{
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      font-size: 14px;
      color: #4E5969;
      margin-left: 7px;
      margin-right: 24px;
    }
    .exit {
      width: 24px;
      height: 24px;
      margin-right: 24px;
    }


    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          font-size: medium;
        }

        .user-info{
          cursor: pointer;
          height: 35px;
          vertical-align: middle;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
