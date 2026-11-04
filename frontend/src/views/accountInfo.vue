<template>

<div class="account-page" style="height: 100%; display: flex; justify-content: center; align-items: center;">

<el-container style="height: 100% ">
  <el-header  class="position">
    <!-- 顶栏容器 -->
            <!-- 导航栏 -->
            <div >
            <el-row :gutter="20" class="brand">
                <el-col :span="2"><div class="grid-content bg-purple">
                  <img class="logo" src="../images/logo.png" alt="Brand" />
                </div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">
                  <img class="main-logo" src="../images/main.png" alt="Main Logo" />
                </div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">
                  <router-link to="/login"><el-button type="primary">注销</el-button></router-link>
                </div></el-col>
            </el-row>
            </div>
  </el-header>

  <el-container>
    <el-aside width="200px">
      <div class="col-md-2">
          <!-- 左侧导航栏 -->
          <el-menu
            class="el-menu-vertical-demo"
            :default-active="activeIndex"
            router
            :collapse="isCollapse"
          >
          <!-- 分组一 -->
            <el-submenu index="1" class="ok1">
              <template slot="title">个人信息模块</template>
              <el-menu-item >
                <router-link to="/account">账户信息</router-link>
              </el-menu-item>
              <el-menu-item >
                <router-link to="/myseal">我的印章</router-link>
              </el-menu-item>
            </el-submenu>
          <!-- 分组二 -->
            <el-submenu index="2" class="ok2">
              <template slot="title">电子签章模块</template>
              <el-menu-item>
                <router-link to="/record">签章记录</router-link>
              </el-menu-item>
              <el-menu-item >
                <router-link to="/verify">验证签章</router-link>
              </el-menu-item>
              <el-menu-item>
                <router-link to="/signature">文档签章</router-link>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
    <el-main>
      <!-- 主要区域容器 -->
      <el-card >
      <div class="col-md-10">
            <div style="margin-top: 0%;">
                <div>
                    <div >
                        <h4>账户信息</h4>
                    </div>
                    <div >
                        <p style="margin-left: 50px;">
                            <label>用户名：</label>{{user.username}}
                        </p>
                        <p style="margin-left: 50px;">
                            <label>区块链账户地址：</label>{{user.chainAccount}}
                        </p>
                        <p style="margin-left: 50px;">
                            <label>姓名：</label>{{user.name}}
                        </p>
                        <p style="margin-left: 50px;">
                            <label>身份证号码：</label>{{user.cardId}}
                        </p>
                        <p style="margin-left: 50px;">
                            <label>电话号码：</label>{{user.phone}}
                        </p>
                        <p style="margin-left: 50px;">
                            <label>邮箱地址：</label>{{user.email}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </el-card>
    </el-main>
  </el-container>
</el-container>

</div>

  </template>

  <script>
  export default {
    name: "accountInfo",
    data() {
      return {
        user: {
          username: "",
          chainAccount: "",
          name: "",
          cardId: "",
          phone: "",
          email: "",
        },
      };
    },
    methods: {
      logout() {
        // 清除token
        localStorage.removeItem("Authorization");
      },
    },
    mounted() {
      // 请求拦截器(header中添加 token)
      this.axios.interceptors.request.use((request) => {
        request.headers.Authorization = localStorage.getItem("Authorization");
        return request;
      });

      // 响应拦截器(认证授权)
      this.axios.interceptors.response.use(
        (response) => {
          if (response.data.resultCode == 401) {
            // 跳转页面
            this.$router.push("/login");
          }
          return response;
        }
      );
      this.axios.get("/user/info").then((response) => {
        if (response.data.resultCode == 200) {
          this.user = response.data.data;
        }
      });
    },
  };
  </script>

  <style scoped>

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
  }

  .brand {
    display: flex;
    align-items: center;
  }

  .logo {
    height: 50px;
    margin-right: 10px;
  }

  .main-logo {
    height: 40px;
    margin-top: 20px;
  }

  .nav-list {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .el-menu-vertical-demo {
    width: 200px;
    text-align: center;
    margin-left: 20px;
  }

  .el-submenu__title {
    cursor: pointer;
  }

  .el-menu-item {
    text-align: center;
  }

  /* 卡片 */
  .el-main {
    background-color: white;
    text-align: center;
    line-height: 70px;

  }
  </style>
