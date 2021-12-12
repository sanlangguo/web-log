<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="nav-hd-box">
          <p>1</p>
          <el-dropdown placement="bottom-end" @command="handleCommand">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            >
              {{ name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-avatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <Menu />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
// import { setup } from 'vue'
import Menu from '../components/menu.vue'
import { useRouter } from "vue-router";
import { ArrowDown } from "@element-plus/icons";
export default {
  components: {
    ArrowDown,
    Menu
  },
  setup() {
    const router = useRouter();
    const handleClick = () => {
      alert("button click");
    };
    const handleCommand = () => {
      router.push('/login')
    };
    return {
      handleClick,
      handleCommand,
    };
  },
  data() {
    return {
      size: 10,
      color: "red",
      name: "ceshi",
    };
  },
};
</script>
<style scoped>
.home {
  height: 100vh;
}
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
}

.el-aside {
  height: 100%;
  background-color: #000;
  color: var(--el-text-color-primary);
  width: auto;
}

>>> .el-container {
  height: 100%;
}
.nav-hd-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>