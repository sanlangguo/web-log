<template>
  <add-project @updateList="getList" />
  <div class="cs-card">
    <template v-for="item: any in list">
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
          <p class="cs-text">错误总个数</p>
          <el-tag class="ml-2" type="danger">{{item.allNumber || 0}}</el-tag>
          <div class="cs-list">
            <p>
              JS报错（个数）：
              <b>{{item.promise || 0}}</b>
            </p>
            <p>
              接口（个数）：
              <b>{{item.xhr || 0}}</b>
            </p>
            <p>
              静态资源（个数）：
              <b>{{item.resource || 0}}</b>
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
import { getProList, delPro, getLogstatistcs } from "@/api/log";
import addProject from "../components/addProject.vue";
import { ElMessageBox, ElMessage } from 'element-plus';
import { ProList, Page } from '../type'
export default defineComponent({
  components: {
    addProject,
    Setting
  },
  name: 'logList',
  data() {
    return {
      params: {
        size: 10,
        count: 1,
      },
      list: [] as any,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    viewDetails(item: ProList) {
      this.$router.push({
        path: `/logList/${item.id}`
      })
    },
    async getList() {
      const params = {
        size: this.params.size,
        count: this.params.count -1
      };
      const res = await getProList(params);
      if (res.status === 200 && res.data && res.data.length) {
        this.list = res.data;
        this.getLogstatistcs(params);
      } else {
        this.list = [];
      }
    },
    async getLogstatistcs(params: Page) {
      const res = await getLogstatistcs(params);
      this.list.map((item: any) => {
        res.data.data.map((val:any) => {
          if (val.id === item.id) {
            item[val.type] = val.count;
            if (item.allNumber) {
              item.allNumber += val.count;
            } else {
              item.allNumber = val.count;
            }
          }
        })
      })
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