<template>
    <div id="app" class="modal-dialog" style="margin-top: 5%;">
      <el-card class="login-card">
        <div slot="header" class="text-center">注册</div>
        <el-form ref="userForm" :model="user" :rules="rules" label-width="120px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="区块链账户地址" prop="chainAccount">
            <el-input v-model="user.chainAccount" placeholder="请输入区块链账户地址"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="user.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码" prop="cardId">
            <el-input v-model="user.cardId" placeholder="请输入身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="user.phone" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址" prop="email">
            <el-input v-model="user.email" placeholder="请输入邮箱地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submit">确定</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>

  export default {
    name: 'userRegister',
    data() {
      return {
        user: {
          username: '',
          password: '',
          chainAccount: '',
          name: '',
          cardId: '',
          phone: '',
          email: ''
        },
        rules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          chainAccount: [{ required: true, message: '请输入区块链账户地址', trigger: 'blur' }],
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          cardId: [{ required: true, message: '请输入身份证号码', trigger: 'blur' }],
          phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }]
        }
      };
    },
    methods: {
      submit() {
        this.$refs.userForm.validate(valid => {

          if (valid) {
            this.axios.post('/user/register', this.user).then(response => {
              if (response.data.resultCode === 200) {
                alert('注册成功')
                setTimeout(() => {
                  // 跳转页面
                  this.$router.push('/login');
                }, 1000);
              } else {
                alert('注册失败');
              }
            }).catch(error => {
              console.error(error);
              alert('网络错误，请稍后再试');
            });
          }
        });
      }
    }
  };
  </script>

  <style scoped>
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
