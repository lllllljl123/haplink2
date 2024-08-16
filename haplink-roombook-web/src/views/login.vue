<template>
  <div class="login">
    <div class="now-time">
      <div class="date">{{ nowTimes.year }}-{{ nowTimes.mon }}-{{ nowTimes.dd }}</div>
      <div class="week">星期{{ week }}</div>
      <div class="time">{{ nowTimes.hou }}:{{ nowTimes.min }}:{{ nowTimes.sec }}</div>
    </div>
    <div class="login-box">
      <div class="login-box-title">RoomBook房间信息系统</div>
      <div class="login-box-content">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              type="text"
              auto-complete="off"
              placeholder="账号"
            >
              <img slot="prefix" src="../assets/images/user.png" alt="">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="pwd"
              v-model="loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="密码"
              @keyup.enter.native="handleLogin"
            >
              <img slot="prefix" src="../assets/images/pwd.png" alt="">
              <img @click.stop="showPwdFn" slot="suffix" src="../assets/images/show-icon.png" alt="">
            </el-input>
          </el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" style="margin:10px 0px 4px 0px;">记住密码</el-checkbox>
        </el-form>
      </div>
      <div class="login-box-btn" @click.prevent="handleLogin">
        <span v-if="!loading">登 录</span>
        <span v-else>登 录 中...</span>
      </div>
    </div>
  </div>

</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import {encrypt, decrypt} from '@/utils/jsencrypt'
import SliderVerifyCode from "@/components/SliderVerifyCode/index.vue";

export default {
  name: "Login",
  components: {SliderVerifyCode},
  data() {
    return {
      week: "",
      nowTimes: {
        year: "",
        mon: "",
        dd: "",
        hou: "",
        min: "",
        sec: "",
      },
      codeUrl: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          {required: true, trigger: "blur", message: "请输入您的账号"}
        ],
        password: [
          {required: true, trigger: "blur", message: "请输入您的密码"}
        ],
        code: [{required: true, trigger: "change", message: "请输入验证码"}]
      },
      loading: false,
      // 验证码开关
      captchaEnabled: false,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    let code = this.$route.query.code || ""
    if(code){
      this.loginSsoFn(code)
    }
    this.getCode();
    this.getCookie();
  },
  mounted() {
    let timer = setInterval(() => {
      this.setNowTimes();
    }, 1000)
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer)
      timer = null
    })
  },
  methods: {
    loginSsoFn(code){
      this.loading = false;
      let data = {
        code: code
      }
      this.$store.dispatch("LoginSso", data).then(() => {
        this.$router.push({path: this.redirect || "/"}).catch(() => {
        });
      }).catch(() => {
        this.loading = false;
        if (this.captchaEnabled) {
          this.getCode();
        }
      });
    },
    setNowTimes() {
      let myDate = new Date();
      let mo = myDate.getMonth() + 1;
      this.nowTimes.year = myDate.getFullYear();
      this.nowTimes.mon = String(mo < 10 ? '0' + mo : mo);
      this.nowTimes.dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate());
      this.nowTimes.hou = String(myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours());
      this.nowTimes.min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes());
      this.nowTimes.sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds());
      this.week = '日一二三四五六'.charAt(new Date().getDay());
    },
    showPwdFn() {
      let pwd = document.querySelector(".pwd").querySelector("input")
      if (pwd.type === "password") {
        pwd.type = "text"
      } else {
        pwd.type = "password"
      }
    },
    getCode() {
      getCodeImg().then(res => {
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, {expires: 30});
            Cookies.set("password", encrypt(this.loginForm.password), {expires: 30});
            Cookies.set('rememberMe', this.loginForm.rememberMe, {expires: 30});
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            // const url = "https://webapi.amap.com/maps?v=1.4.15&key=8f4d6d3844f5a743face02ac91781fd2&plugin=Map3D,AMap.DistrictSearch"
            // this.loadAMap(url)
            // const url1 = "https://webapi.amap.com/ui/1.1/main.js?v=1.1.1"
            // this.loadAMap(url1)
            this.$router.push({path: this.redirect || "/"}).catch(() => {
            });
          }).catch(() => {
            this.loading = false;
            if (this.captchaEnabled) {
              this.getCode();
            }
          });
        }
      });
    },
    // loadAMap(url){
    //   const script = document.createElement("script")
    //   script.type = "text/javascript";
    //   // IE兼容
    //   if (script.readyState) {
    //     script.onreadystatechange = function () {
    //       if (script.readyState === "loaded" || script.readyState === "complete") {
    //         script.onreadystatechange = null;
    //         console.log("地图加载成功");
    //       }
    //     };
    //   } else {
    //     //其他浏览器
    //     script.onload = function () {
    //       console.log("地图加载成功");
    //     };
    //   }
    //   script.src = url;
    //   document.getElementsByTagName("head")[0].appendChild(script);
    // },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@font-face {
  font-family: D-DIN-Bold;
  src: url("../assets/font/D-DIN-Bold.otf");
}

@font-face {
  font-family: AlibabaPuHuiTi-3-55-Regular;
  src: url("../assets/font/AlibabaPuHuiTi-3-55-Regular.ttf");
}

.login {
  width: 100vw;
  height: 100vh;
  //background-color: #000;
  background-image: url("../assets/images/login-bg.png");
  background-size: 100%;
  background-repeat: no-repeat;


  .now-time {
    position: fixed;
    left: 5%;
    bottom: 8%;

    .date {
      font-family: D-DIN-Bold;
      font-size: 20px;
      color: #b3c1d5;
    }

    .week {
      font-family: Noto Sans, Noto Sans;
      font-weight: normal;
      font-size: 16px;
      color: #96a7bf;
    }

    .time {
      font-family: D-DIN-Bold;
      font-weight: bold;
      font-size: 36px;
      text-shadow: 0 2px 4px rgba(255, 255, 255, .5);
      //background-image: linear-gradient(to bottom, #fff 60%, #659ad0 70%);
      background-image: linear-gradient(to bottom, #F9FBFF 0%, #BDD5FF 100%);
      background-clip: text;
      color: transparent;
    }
  }

  .login-box {
    //width: 23%;
    //height: 45%;
    width: 446px;
    height: 432px;
    background: rgba(255, 255, 255, 0.9);
    box-sizing: border-box;
    border: 2px solid transparent;
    background-image: linear-gradient(#fff, #fff),
    linear-gradient(226deg, rgba(0, 218, 236, 0), rgba(0, 218, 236, 1));
    background-origin: border-box;
    background-clip: content-box, border-box;
    border-radius: 8px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


    &-title {
      font-family: AlibabaPuHuiTi-3-55-Regular;
      font-weight: normal;
      font-size: 36px;
      color: rgba(15, 53, 107, 0.8);
    }

    &-content {
      margin-top: 40px;
      margin-bottom: 40px;

      .el-input--medium .el-input__inner {
        line-height: 48px;
        width: 337px;
        height: 48px;
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.2);
        box-shadow: inset 0px 2px 4px 0px #C7D3DD;
        overflow: hidden;
        padding-left: 54px;
        font-family: Noto Sans SC, Noto Sans SC;
        font-weight: normal;
        font-size: 20px;
        //color: #C7D3DD;
      }

      .el-input__prefix {
        line-height: 48px;
        padding-left: 20px;

        img {
          width: 24px;
          height: 24px;
          vertical-align: middle;
        }
      }

      .el-input__suffix {
        line-height: 48px;
        padding-right: 20px;
        cursor: pointer;

        img {
          width: 24px;
          height: 24px;
          vertical-align: middle;
        }
      }

      .el-checkbox {
        transform: translateX(5px);
      }

      .el-checkbox__inner {
        transform: scale(1.6);
        //width: 24px;
        //height: 24px;
      }

      .el-checkbox__label {
        font-family: Noto Sans SC, Noto Sans SC;
        font-weight: 400;
        font-size: 16px;
        color: rgba(15, 53, 107, 0.5);
      }

    }

    &-btn {
      //width: 75%;
      //height: 12%;
      width: 337px;
      height: 56px;
      background: linear-gradient(90deg, #4592FF 0%, #307ADB 100%);
      box-shadow: 0px 10px 20px 0px rgba(69, 146, 255, 0.6);
      border-radius: 28px 28px 28px 28px;
      font-family: Noto Sans SC, Noto Sans SC;
      font-weight: 500;
      font-size: 24px;
      color: #FFFFFF;
      line-height: 56px;
      text-align: center;
      cursor: pointer;
    }
  }
}

//@media screen and (max-width: 1367px) {
//  .box {
//    width: 28%;
//    height: 28%;
//    right: 3%;
//  }
//}

</style>
