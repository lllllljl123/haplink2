<template>
  <el-table-column v-if="item.show" :label="item.label" align="center" :prop="item.field">
    <template v-if="item.children.length">
      <tableColumn :item="itemChildren" v-for="itemChildren in item.children" :key="itemChildren.id"></tableColumn>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "tableColumn",
  props:{
    item:{
      type:Object,
      default:()=>{}
    }
  }
}
</script>

<style scoped lang="scss">

</style>
