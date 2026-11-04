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

            <el-row>
              <el-col :span="18">
                <!-- 显示提示信息 -->
                <el-alert v-show="tip" :type="tipType" show-icon>{{ msg }}</el-alert>

                <!-- 操作按钮 -->
                <div class="form-group">
                  <el-button type="info" size="large" @click="upload">上传文档</el-button>
                  <el-button type="success" size="large" @click="signature">文档签章</el-button>
                  <el-button type="primary" size="large" @click="uploadSeal">签章上链</el-button>
                </div>

                <!-- 显示个人印章 -->
                <hr style=" height:2px;border:none;border-top:2px dotted #185598;" />

                <div class="form-group" style="text-align: center">
                  <label>个人印章</label>
                  <img id="qrcode" :src="seal" />
                  <span class="input-group-addon glyphicon glyphicon-chevron-down" id="basic-addon1"></span>
                </div>

                <!-- 显示文档或签章图片 -->
                <div class="form-group" style="text-align: center">
                  <input type="file" @change="change" ref="file" style="display: none;" />
                  <img id="demo" src="../images/contract.jpg" style="width: 800px; opacity: 0.3;" @click="upload" v-show="demoImg" />
                  <img ref="poster" :src="contract" alt="合约" v-show="posterImg" />
                </div>
              </el-col>
            </el-row>

          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
export default {
  name: "mySignature",
  data() {
    return {
      seal: "",
      filename: "",
      tip: false,
      msg: "",
      status: 0,
      contract: "",
      demoImg: true,
      posterImg: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("Authorization");
      this.$router.push("/login");
    },

    change(event) {
      this.demoImg = false;
      this.posterImg = true;

      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file); // Initiates asynchronous request

      reader.onload = () => {
        this.contract = reader.result;
        this.filename = file.name;
        this.status = 1;
      };
    },

    upload() {
        this.$refs.file.click()
    },
    signature() {
      if (this.status == 0) {
          this.msg = "请上传文档"
          this.tip = true
          setTimeout(() => {
              this.tip = false
          }, 1000)
          return
      }
      this.status = 2
      this.generateSignature();
    },

    async generateSignature() {
      const canvas = document.createElement("canvas");
      canvas.width = this.$refs.poster.width;
      canvas.height = this.$refs.poster.height;
      const context = canvas.getContext("2d");
      context.rect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#fff";
      context.fill();

      const posterImage = new Image();
      posterImage.src = this.contract;
      posterImage.crossOrigin = "Anonymous";
      await posterImage.decode();
      context.drawImage(posterImage, posterImage.x, posterImage.y, posterImage.width, posterImage.height);

      const qrCodeImage = new Image();
      qrCodeImage.src = this.seal;
      qrCodeImage.crossOrigin = "Anonymous";
      await qrCodeImage.decode();
      context.drawImage(qrCodeImage, canvas.width / 2, canvas.height / 2, qrCodeImage.width, qrCodeImage.height);

      const base64 = canvas.toDataURL("image/png");
      this.contract = base64;
    },

    uploadSeal() {
      if (this.status != 2) {
          this.msg = "文档未上传或未签章";
          this.tip = true;
          setTimeout(() => {
              this.tip = false;
          }, 1000);
          return;
      }
      var imgBase64 = this.contract;
      this.axios.post("/seal/signature", {
          "filename": this.filename,
          "imgBase64": imgBase64,
      }).then(response => {
          if (response.data.resultCode == 200) {
              this.msg = "签章文档上链成功";
              this.tip = true;
              alert("签章文档上链成功")
              setTimeout(() => {
                  this.tip = false;
                  this.$router.push("/home");
              }, 1000);
          } else {
              this.msg = "签章文档上链失败";
              this.tip = true;
              alert("签章文档上链失败")
              setTimeout(() => {
                  this.tip = false;
              }, 1000);
          }
      }).catch(error => {
          console.error("Error:", error);
          // 处理错误情况
          alert("数据上链失败")
      });
    }
},
mounted() {
    // 请求发前拦截，header中添加 token
    this.axios.interceptors.request.use(request => {
        request.headers.Authorization = localStorage.getItem("Authorization")
        return request
    })

    //响应拦截器(认证授权)
    this.axios.interceptors.response.use(response => {
        if (response.data.resultCode == 401) {
            //跳转页面
            this.$router.push("/login");
        }
        return response
    })

    this.axios.get("/user/seal").then(response => {
        if (response.data.resultCode == 200) {
            this.seal = "data:image/png;base64," + response.data.data
        }
    })
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
