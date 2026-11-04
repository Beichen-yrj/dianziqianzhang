<template>
    <div class="my-seal-page">
      <!-- 导航栏 -->
      <el-container style="height: 100% ">
        <el-header  class="position">
          <!-- 顶栏容器 -->
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
            <div class="col-md-10" style="text-align: center;margin-top: 100px;">
            <img :src="seal" />
        </div>

          </el-main>
        </el-container>
      </el-container>

    </div>
</template>

<script>
  export default {
    name: "mySeal",
    data() {
      return {
        seal: "",
      };
    },
    methods: {

    },
    mounted() {
      this.axios
        .get("/user/seal", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((response) => {
          if (response.data.resultCode == 200) {
            this.seal = "data:image/png;base64," + response.data.data;
          }
        });
    },
  };
  </script>

  <style scoped>
  .my-seal-page {
    padding: 20px;
  }
  .navbar {
    margin-bottom: 20px;
  }


  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
  }

  .el-aside {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 800px;
    height: 800px;
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


  </style>
