<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><home-filled /></el-icon>
        <span>日志监控</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="logCount">日志统计</el-menu-item>
        <el-menu-item index="logList">日志查询</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
  HomeFilled
} from "@element-plus/icons";

export default defineComponent({
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
    HomeFilled
  },
  setup() {
    const isCollapse = ref(true);
    const handleOpen = (key: number, keyPath: Array<string>) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: number, keyPath: Array<string>) => {
      console.log(key, keyPath);
    };
    return {
      handleOpen,
      handleClose,
    };
  },
});
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100%;
}
</style>