<template>
  <div></div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {

      loginRules: {

      },
      loading: false,
      // 验证码开关
      captchaOnOff: true,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log("路由："+route)
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    //平台单独的登录
    this.getLoginByNameAndTokenJ();
  },
  methods: {
    /**
     * 三方平台单点登陆
     * 只传递token
     */
    getLoginByNameAndTokenJ(){
      //获取地址栏中的token
      const token = this.$route.query.token;
      console.log("token:" + token);
      //调用登录的接口
      if(token===''||token===undefined||token==null){
        //不是那边系统过来的，不走这个地方（阻止created的方法继续向下走）
      }else{
        //转圈圈，不要看到登陆页面，无感体验
        this.loading = true;
        const logininfo = {
          "token": token
        };
        //执行另一套登录操作
        //不是本系统的用户,去J平台登陆去
        this.$store.dispatch("LoginJHaveToken", logininfo).then(() => {
          // this.$message.success("登录成功");
          this.loading = false;
          this.$router.push({path: this.redirect || "/"}).catch(() => {});
        }).catch(err=> {
          console.log("有异常信息",err);
          //异常信息
          this.loading = false;
        });
      }
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">

</style>

