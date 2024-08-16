<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>RoomBook房间信息系统</h2>
        <p>
          <b>当前版本: </b>
          <el-tag type="success" size="small">
            <span>v{{ version }}</span>
          </el-tag>
        </p>
        <h3>
          欢迎使用!
        </h3>

      </el-col>
    </el-row>
    <el-divider />
<!--    <el-row :gutter="20">
&lt;!&ndash;      <el-col :xs="12" :sm="12" :md="6" :lg="4">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>邮件</span>
          </div>
          <div class="body">
              <p>推送数：0</p>
              <p>余量：0</p>
            <el-divider/>
            <el-button class="button" type="text">去发送</el-button>
          </div>
        </el-card>
      </el-col>&ndash;&gt;

      <el-col :xs="12" :sm="12" :md="6" :lg="4">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>联系信息</span>
          </div>
          <div class="body">
            <p>
              <i class="el-icon-s-promotion"></i> 网址：
              <el-link
                href="https://hl.chj-zhyq.com:8083/"
                target="_blank">https://hl.chj-zhyq.com:8083/
              </el-link>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: "1.0.1"
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
  },
  mounted() {
    console.log("auth",this.$auth.hasRole("user"),this.$auth.hasRole("admin"))
  }
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    padding: 0;
    min-height: auto;
  }
}
</style>

