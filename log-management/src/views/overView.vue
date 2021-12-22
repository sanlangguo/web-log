<template>
  <add-project @updateList="getList" />
  <div class="cs-card">
    <template v-for="item: { id: number, name: string } in list">
      <el-card class="box-card">
        <template #header>
          <div class="cs-seting">
            <div>项目：{{ item.name }}</div>
            <el-dropdown @command="handleCommand">
              <el-icon>
                <setting />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="item">查看配置</el-dropdown-item>
                  <el-dropdown-item :command="(item.id)">删除该应用</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
        <div class="cs-list-box" @click="viewDetails(item)">
          <p class="cs-text">健康总分</p>
          <el-progress type="circle" :percentage="25" />
          <div class="cs-list">
            <p>
              JS报错率：
              <b>86.8%</b>
            </p>
            <p>
              自定义异常率：
              <b>86.8%</b>
            </p>
            <p>
              接口报错率：
              <b>86.8%</b>
            </p>
            <p>
              静态资源报错率：
              <b>86.8%</b>
            </p>
          </div>
        </div>
      </el-card>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Setting } from '@element-plus/icons'
import { getProList, delPro } from "@/api/log";
import addProject from "../components/addProject.vue";
import { ElMessageBox, ElMessage } from 'element-plus';
import { ProList } from '../type'
export default defineComponent({
  components: {
    addProject,
    Setting
  },
  name: 'logList',
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    viewDetails(item: ProList) {
      this.$router.push({
        
      })
    },
    async getList() {
      const res = await getProList();
      if (res.status === 200 && res.data && res.data.length) {
        this.list = res.data;
      } else {
        this.list = [];
      }
    },
    handleCommand(command: any) {
      if (typeof command === 'number') {
        ElMessageBox.confirm(
          '是否要删除该项目?',
          '提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
          .then(async () => {
            const res = await delPro(command);
            if (res.status === 200) {
              ElMessage({
                type: 'success',
                message: '删除成功',
              })
              this.getList()
            }
          })
      } else {
        this.$router.push({ path: `/pro-details/${command.id}` })
      }
    }
  }
})
</script>

<style scoped>
.cs-card {
  display: flex;
  flex-wrap: wrap;
}
.box-card {
  width: 450px;
  margin-top: 16px;
  margin-right: 16px;
}
.cs-list-box {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.cs-text {
  margin-right: 16px;
}
.cs-list {
  font-size: 14px;
  padding-left: 16px;
  padding-right: 16px;
}

.cs-list p {
  color: #a3a5b0;
}
.cs-list b {
  font-weight: 500;
  color: #363b52;
  font-family: DIN Alternate Bold;
}
.cs-seting {
  display: flex;
  justify-content: space-between;
}
</style>