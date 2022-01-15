<template>
  <div class="login">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      class="demo-ruleForm"
    >
      <el-form-item label="账号：" prop="number">
        <el-input
          v-model="ruleForm.number"
          type="text"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="pass">
        <el-input
          v-model="ruleForm.pass"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { login } from "@/api/login";

export default {
  data() {
    const number = (rule: any, value: string | number, callback: any) => {
      if (value === "") {
        callback(new Error("Please input the number"));
      } else {
        if (this.ruleForm.number !== "") {
          this.$refs.ruleForm.validateField("number");
        }
        callback();
      }
    };
    const pass = (rule: any, value: string | number, callback: any) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        number: "",
      },
      rules: {
        number: [{ validator: number, trigger: "blur" }],
        pass: [{ validator: pass, trigger: "blur" }],
      },
    };
  },
  methods: {
    async submitForm(formName: string) {
      this.$refs[formName].validate(async (valid: any) => {
        if (valid) {
          const res = await login(this.ruleForm);
          if (res.status == 200 && res.data) {
            this.$router.push("/");
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName: string): void {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.login {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>