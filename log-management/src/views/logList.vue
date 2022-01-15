<template>
  <el-row :gutter="20">
    <el-col :span="6">
      错误类型：
      <el-select v-model="type" class="m-2" placeholder="选择错误类型" size="large" clearable>
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      错误信息：
      <el-input v-model="msg" placeholder="输入错误信息" clearable />
    </el-col>
    <el-col :span="7">
      时间：
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        clearable
      />
    </el-col>
    <el-col :span="5">
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button @click="resetList">重置</el-button>
    </el-col>
  </el-row>
  <br />
  <el-table :data="tableData" style="width: 100%">
    <el-table-column class="cs-type-err" prop="type" label="错误类型" width="220" />
    <el-table-column prop="msg" label="错误信息" />
    <el-table-column prop="source" label="出错文件" />
    <el-table-column prop="device" label="user-agent" />
    <el-table-column prop="browser" label="用户设备" width="120" />
    <el-table-column prop="create_time" label="出错时间" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="viewDetails(scope.row)">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    @current-change="handleCurrentChange"
  />
</template>
<script lang="ts">
import * as dayjs from 'dayjs'
import { defineComponent } from "vue";
import { getLogList } from "@/api/log";
import { LogListParams } from "@/type";
export default defineComponent({
  name: 'logList',
  data() {
    return {
      time: '',
      msg: '',
      type: '',
      typeList: [
        {
          value: 'xhr',
          label: '接口',
        },
        {
          value: 'promise',
          label: 'JS',
        },
        {
          value: 'resource',
          label: '资源',
        },
      ],
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
      this.getList();
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
    resetList() {
      this.total = 0;
      this.time = '';
      this.msg = '';
      this.type = '';
      this.params.count = 1;
      this.getList();
    },
    async getList() {
      console.log(this.time, this.msg, this.type)

      const params: any = {
        id: Number(this.$route.params.id),
        size: this.params.size,
        count: this.params.count - 1,
      };

      if (this.msg) {
        params.msg = this.msg
      }

      if (this.type) {
        params.type = this.type
      }

      if (this.time) {
        params.starTime = dayjs(this.time[0]).valueOf();
        params.endTime = dayjs(this.time[1]).valueOf();
      }

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
      this.params.count = val;
      console.log(this.params)
      this.getList();
    }
  }
})
</script>

<style scoped>
>>> .el-table__row .el-table_1_column_1 .cell,
.cs-type-err {
  color: #0080f8;
  font-weight: 500;
}

>>> .el-col {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

>>> .el-input {
  width: 250px;
}
</style>