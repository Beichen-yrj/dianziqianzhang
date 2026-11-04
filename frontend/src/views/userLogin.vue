<template>
    <div id="app" style="margin-top: 10%;">

      <el-card class="login-card">
        <div slot="header" class="text-center">登录</div>
        <el-form ref="userForm" :model="user" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">确定</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>

  <script>
  export default {
    name: 'userLogin',
    data() {
      return {
        user: {
          username: '',
          password: '',
        },
        rules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        },
      };
    },
    methods: {
      submit() {
        this.$refs.userForm.validate(valid => {
          if (valid) {
            this.axios.post('/user/login', this.user).then(response => {
              if (response.data.resultCode === 200) {
                alert('登录成功')
                setTimeout(() => {
                  // 跳转页面
                  this.$router.push('/home');
                }, 1000);
                // 保存token
                localStorage.setItem('Authorization', response.data.data);
              } else {
                alert('登录失败')
                setTimeout(() => {
                  this.tip = false;
                }, 1000);
              }
            });
          }
        });
      },
    },
  };
  </script>

  <style>
  .text-center {
    text-align: center;
  }

  .login-card {
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    padding: 20px;
  }
  </style>
