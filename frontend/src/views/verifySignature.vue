<template>
    <div class="verify-page">
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


            <div class="col-md-10">
            <div class="alert alert-success" v-show="tip" role="alert">{{msg}}</div>
            <div class="form-group">

                <button type="button" id="button" class="btn btn-info btn-lg" @click="upload">上传文档</button>
                <span class="glyphicon glyphicon-share-alt" aria-hidden="true"
                    style="margin-left: 10px; margin-right: 10px;"></span>

                <button type="button" id="button" ref="button" class="btn btn-success btn-lg" data-toggle="modal"
                    data-target="#myModal" @click="verify">验证签章</button>

                 <!-- Modal -->
                <div v-show="isShow" class="modal fade" id="myModal" tabindex="-1" role="text"
                    aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="myModalLabel">签章信息</h4>
                            </div>
                            <div class="modal-body">
                                <p style="margin-left: 50px;">
                                    <label>姓名：</label> {{verifyInfo.name}}
                                </p>
                                <p style="margin-left: 50px;">
                                    <label>身份证号码：</label>{{verifyInfo.cardId}}
                                </p>
                                <p style="margin-left: 50px;">
                                    <label>区块链账户地址：</label>{{verifyInfo.chainAccount}}
                                </p>
                                <p style="margin-left: 50px;">
                                    <label>文件名称：</label>{{verifyInfo.filename}}
                                </p>
                                <p style="margin-left: 50px;">
                                    <label>文件编码：</label>{{verifyInfo.code}}
                                </p>
                                <p style="margin-left: 50px;">
                                    <label>签章时间：</label>{{verifyInfo.datetime}}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr style=" height:2px;border:none;border-top:2px dotted #185598;" />
            <div class="form-group" style="text-align: center">
                <input type="file" id="file" @change="change" ref="file" style="display: none;" />
                <img id="demo" src="../images/contract.jpg" style="width: 800px;opacity: 0.3;" @click="upload"
                    v-show="demoImg" />
                <img id="poster" :src="contract" alt="合约" v-show="posterImg" />
            </div>
        </div>


          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

  <script>
  export default {
    name: "verifySignature",
    data() {
      return {
            msg: "",
            tip: false,
            contract: "",
            demoImg: true,
            posterImg: false,
            status: 0,
            verifyInfo:{},
            isShow:false,
            isCollapse: false,
      };
    },
    methods: {
      logout() {
          //清除token
          localStorage.removeItem("Authorization")
          this.$router.push("/login");
      },

      async change(event) {
        this.demoImg = false;
        this.posterImg = true;
        this.status = 1;

        const file = event.target.files[0];
        if (file) {
          const result = await this.readFileAsDataURL(file);
          this.contract = result;
          this.filename = file.name;
        }
      },

      async readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = event => resolve(event.target.result);
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
        });
      },
      upload() {
          this.$refs.file.click()
      },

      async verify(event) { //同步发送 axios 请求(获取数据后弹出模态框)
          if (this.status == 0) {
              this.msg = "请上传文档"
              this.tip = true
              alert("请上传文档")
              event.stopPropagation() //阻止事件冒泡(防止弹出模态框)
              setTimeout(() => {
                  this.tip = false
              }, 1000)
              return
          }

          await this.axios.post("/seal/verify", {"imgBase64":this.contract}).then(response => {
              if (response.data.resultCode == 200) {
                  this.verifyInfo = response.data.data
                  alert("验证通过")
                  this.isShow=true;

              }else{
                alert("hash值不一致，验证签章失败");
              }
          })
      },

      finish() {
          this.status = 0
          this.verifyInfo = {}
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
  },
};
</script>

  <style scoped>
  .verify-page {
    padding: 20px;
  }
  .navbar {
    margin-bottom: 20px;
  }
  .verify-actions {
    margin-bottom: 20px;
  }
  .verify-image {
    margin-top: 20px;
    text-align: center;
  }
  .img {
      max-width: 100%;
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
 .el-main{
  line-height: normal;
 }

  </style>
