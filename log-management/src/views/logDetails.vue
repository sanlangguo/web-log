<template>
  <el-descriptions title="日志详情">
    <el-descriptions-item label="项目版本号:">{{ data.tag || '--' }}</el-descriptions-item>
    <el-descriptions-item label="错误发生页面:">{{ data.page_url }}</el-descriptions-item>
    <el-descriptions-item label="用户设备:">{{ data.browser }}</el-descriptions-item>
    <el-descriptions-item label="错误类型:">{{ data.type }}</el-descriptions-item>
    <el-descriptions-item label="设备信息:">{{ data.device }}</el-descriptions-item>
    <el-descriptions-item label="错误信息:">{{ data.msg }}</el-descriptions-item>
    <el-descriptions-item label="出错文件:">{{ data.source }}</el-descriptions-item>
    <el-descriptions-item label="出错时间:">{{ data.create_time }}</el-descriptions-item>
    <el-descriptions-item label="出错行号:">{{ data.lineno }}</el-descriptions-item>
    <el-descriptions-item label="出错列号:">{{ data.colno }}</el-descriptions-item>
    <el-descriptions-item label="错误HTML标签:">{{ data.tag_name }}</el-descriptions-item>
    <el-descriptions-item label="返回错误状态码:">{{ data.status }}</el-descriptions-item>
    <el-descriptions-item label="响应错误值:">{{ data.req_data }}</el-descriptions-item>
    <el-descriptions-item label="接口地址:">{{ data.res_url }}</el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, ref, computed } from "vue";
import { useRouter } from 'vue-router';
import { getLogDetails } from "@/api/log";




// filters
const data = ref({} as any)

const route = useRouter();

onBeforeMount(async () => {
  const res = await getLogDetails(route.currentRoute.value.params);
  if (res.status === 200 && res.data.data && res.data.data.length) {
    data.value = res.data.data[0];
  } else { data.value = {}; }
  console.log(route.currentRoute.value.params)
})

</script>