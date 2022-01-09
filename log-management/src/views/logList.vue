<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column class="cs-type-err" prop="type" label="错误类型" width="220" />
    <el-table-column prop="msg" label="错误信息" />
    <el-table-column prop="source" label="出错文件" />
    <el-table-column prop="device" label="user-agent" />
    <el-table-column prop="browser" label="用户设备" width="120" />
    <el-table-column prop="create_time" label="出错时间" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="viewDetails(scope.row)"
          >查看详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next" :total="total"
    @current-change="handleCurrentChange"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { getLogList } from "@/api/log";
import { LogListParams } from "@/type";
export default defineComponent({
  name: 'logList',
  data() {
    return {
      total: 0,
      tableData: [],
      params: {
        size: 10,
        count: 1,
      } as LogListParams
    }
  },
  created() {
    if (this.$route.params.id) {
      this.params.id = Number(this.$route.params.id);
      const params = {
        ...this.params,
        count: this.params.count - 1
      }
      this.getList(params)
    } else {
      this.$router.push('/overView')
    }
  },
  methods: {
    viewDetails(row: any) {
      this.$router.push({
        path: `/logDetails/${row.id}`
      })
    },
    async getList(params: LogListParams) {
      const res = await getLogList(params);
      if (res.data.data && res.data.data.length) {
        this.tableData = res.data.data;
        this.total = res.data.total;
      } else {
        this.tableData = [];
        this.total = 0;
      }
    },
    handleCurrentChange(val: number) {
      const params = {
        ...this.params,
        count: val - 1
      }
      this.getList(params);
    }
  }
})
</script>

<style scoped>
>>> .el-table__row .el-table_1_column_1 .cell , .cs-type-err {
  color: #0080f8;
  font-weight: 500;
}
</style>