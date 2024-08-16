<template>
  <div id="app">
    <router-view />
    <theme-picker />
  </div>
</template>

<script>
import ThemePicker from "@/components/ThemePicker";
import ZoomRatio from '@/utils/zoom'
import DevicePixelRatio from '@/utils/devicePixelRatio'

export default {
  name: "App",
  components: { ThemePicker },
  mounted() {
    window.onresize = () => {
      return (() => {
        // @vuese
        // 监听窗口大小触发onresize事件,在不同的页面可用this.$EventBus.$on('onresize',()=>{}) 来触发此函数 ,离开页面要用this.$EventBus.$off('onresize') 销毁监听 不然到其他页面改变窗口大小会报错
        this.$EventBus.$emit('onresize')
      })();
    }
  },
  created() {
    // new ZoomRatio().init()
    // new DevicePixelRatio().init()
  },
  metaInfo() {
        return {
            title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
            titleTemplate: title => {
                return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
            }
        }
    }
};
</script>
<style scoped>
#app .theme-picker {
  display: none;
}
</style>
