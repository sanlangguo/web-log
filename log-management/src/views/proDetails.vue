<template>
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
      <el-input
        v-model="ruleForm.name"
        type="text"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="项目配置" prop="name">
      <p >localhost:3000/{{id}}</p>
    </el-form-item>
    <el-form-item>
      <el-button @click="goHome">取消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElMessage } from 'element-plus';
import { createPro, getProDetail, updatePro } from "@/api/log";
export default defineComponent({
  name: "proDetails",
  async created() {
    this.id = this.$route.params.id;
    const res = await getProDetail({id: this.$route.params.id});
    if (res.data) {
      this.ruleForm = res.data[0];
    }
    console.log(res,'res')
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
      id: null,
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
    goHome() {
      this.$router.push('/overView')
    },
    async submitForm(formName: string) {
      console.log(this.$route, 'this.$route.query.id')
      this.loading = true;
      if (this.ruleForm.name) {
        let res = null;
        if (this.$route.params.id) {
          const params = {
            name: this.ruleForm.name,
            id: this.$route.params.id
          };
          res = await updatePro(params);
        } else {
          res = await createPro(this.ruleForm);
        }
        if (res.status === 200) {
          this.ruleForm = {
            name: "",
            type: "h5",
          };
          ElMessage({
            message: `${this.$route.params.id ? '修改':'添加'}成功！`,
            type: 'success',
            onClose: () => {
              this.dialogVisible = false;
              this.loading = false;
              this.goHome()
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
    }
  }

});
</script>