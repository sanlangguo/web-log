<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu :index="item.path" v-for="item in navs" :key="item.path">
      <template #title>
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{item.name}}</span>
      </template>
      <el-menu-item-group v-for="key in item.children" :key="key.path">
        <el-menu-item :index="key.path">{{key.name}}</el-menu-item>
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
const navs = [
  {
    path: 'logCount',
    name: '日志监控',
    icon: 'home-filled',
    children: [
      {
        path: 'logCount',
        name: '日志监控',
      },
      {
        path: 'logList',
        name: '日志查询',
      }
    ]
  }
]

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
      navs
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