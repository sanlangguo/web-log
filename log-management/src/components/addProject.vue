<template>
  <el-button type="primary" @click="dialogVisible = true">创建项目</el-button>
  <el-dialog v-model="dialogVisible" title="创建项目" width="30%">
    <el-form
      v-loading="loading"
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="项目类型" prop="type">
        <el-radio v-model="ruleForm.type" label="h5">H5</el-radio>
      </el-form-item>
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="ruleForm.name" type="text" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" >保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { createPro } from "@/api/log";
import { ElMessage } from 'element-plus';
export default defineComponent({
  name: "addProject",
  emits: {
    updateList: null,
  },
  created() {

  },
  data() {
    const checkType = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the type"));
      }
    };
    const checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the name again"));
      } else if (value !== this.ruleForm.name) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      loading: false,
      ruleForm: {
        name: "",
        type: "h5",
      },
      rules: {
        name: [{ validator: checkName, trigger: "blur" }],
        type: [{ validator: checkType, trigger: "blur" }],
      },
    };
  },
  methods: {
    async submitForm(formName: string) {
      this.loading = true;
      if (this.ruleForm.name) {
        const res = await createPro(this.ruleForm);
        if (res.status === 200) {
          this.ruleForm = {
            name: "",
            type: "h5",
          };
          ElMessage({
            message: '添加成功！',
            type: 'success',
            onClose: () => {
              this.dialogVisible = false;
              this.loading = false;
              this.$emit('updateList');
            }
          })
        } else {
          this.loading = false;
          ElMessage({
            message: res.data.msg,
            type: 'error',
          })
        }
      }
    },
    resetForm(formName: string) {
      this.$refs[formName].resetFields();
    },
  },
});
</script>
