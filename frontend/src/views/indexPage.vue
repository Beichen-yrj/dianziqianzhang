<template>
  <div class="index-page" style="height: 100% ">

    <el-container style="height: 100% ">
      <el-container>
        <el-header class="position">
          <!-- 导航栏 -->
          <div>
            <el-row :gutter="20">
              <el-col :span="2">
                <div class="grid-content bg-purple">
                  <img alt="Brand" src="../images/logo.png" style="height: 50px;">
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <img alt="Brand" src="../images/main.png" style="height: 40px; margin-top: 20px;">
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="1">
                <div class="grid-content bg-purple">
                  <router-link to="/register"><el-button type="success" @click="logout">注册</el-button></router-link>
                </div>
              </el-col>
              <el-col :span="1">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="1">
                <div class="grid-content bg-purple">
                  <router-link to="/login"><el-button type="success" @click="logout">登录</el-button></router-link>
                </div>
              </el-col>

            </el-row>
          </div>
        </el-header>
        <el-main>
          <!-- 轮播图 -->
          <div class="block">
            <el-carousel :interval="5000" arrow="always" height="30rem">
              <el-carousel-item v-for="(slide, index) in slides" :key="index">
                <div class="pic_item">
                  <img :src="slide.image" alt="Slide Image" class="img1">
                  <h1>{{ slide.title }}</h1>
                  <p>{{ slide.description }}</p>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>

          <!-- 栅格系统 -->
          <el-container class="case">
            <el-main>
              <el-row>
                <el-col :span="8" v-for="(item, index) in cases" :key="index">
                  <img :src="item.image" alt="Case Image" class="case-image">
                  <h2>{{ item.title }}</h2>
                  <p>{{ item.description }}</p>
                </el-col>
              </el-row>
            </el-main>
          </el-container>

          <!-- 栅格系统 -->
          <el-container class="screenshot">
            <el-main>
              <el-row :class="{ item: index % 2 === 0 }" v-for="(item, index) in screenshots" :key="index">
                <el-col :span="12">
                  <img :src="item.image" alt="Screenshot Image" class="screenshot-image">
                </el-col>
                <el-col :span="12">
                  <h2>{{ item.title }}</h2>
                  <p v-html="item.content"></p>
                </el-col>
              </el-row>
            </el-main>
          </el-container>

        </el-main>
        <!-- 底部 -->
        <hr />
        <footer>
          Copyright 2023 by Hello All rights reserved.
        </footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "indexPage",
  data() {
    return {
      slides: [
        {
          image: require('../images/pic_1.jpeg'),
          title: "基于区块链电子签章解决方案",
          description: "避免签章记录被删除导致无法审计与追溯",
        },
        {
          image: require('../images/pic_2.jpg'),
          title: "基于区块链电子签章解决方案",
          description: "避免签章记录被篡改导致审计、监管有误",
        },
        {
          image: require("../images/pic_3.jpg"),
          title: "基于区块链电子印章解决方案",
          description: "防止文件造假",
        },
      ],
      cases: [
        {
          image: require("../images/case_1.png"),
          title: "政务应用案例",
          description: "非常不错的产品，我很喜欢",
        },
        {
          image: require("../images/case_2.png"),
          title: "企业应用案例",
          description: "非常不错的产品，我很喜欢",
        },
        {
          image: require("../images/case_3.png"),
          title: "个人应用案例",
          description: "非常不错的产品，我很喜欢",
        },
      ],
      screenshots: [
        {
          image: require("../images/custom_1.jpg"),
          title: "传统电子签章系统的弊端",
          content: `
              <b>传统电子签章系统，由于是中心化系统或数据库存储印章使用记录、签章密码等数据，存在丢失或篡改的风险，不利于可信监管、审计以及完整追溯</b><br/>
              情形1:若电子签章系统不存储完整的签章记录，比如记录定期删除...<br/>
              情形2:篡改使用记录，若签章人员非法使用了电子印章，为了逃避责任修改了使用记录...<br/>
              情形3:若有人伪造了印章图样对文件进行了盖章，并且在数据库伪造了使用记录，事后也无法审计与追责...<br/>
              情形4:系统或数据库遭到攻击,删除记录、篡改记录，甚至篡改印章图片，对印章使用部门造成损失，对事后审计与追溯产生影响...
            `,
        },
        {
          image: require("../images/custom_2.jpg"),
          title: "基于区块链电子签章系统的优势",
          content: `
              区块链电子印章系统使用联盟链，将印章数据作为数字资料上链...
            `,
        },
      ],
    };
  },
};
</script>

<style scoped>
.index-page {
  padding: 0px;
}

.navbar {
  margin-bottom: 20px;
}

.screenshot-image {
  width: 100%;
}

.case {
  margin-top: 20px;
}

.screenshot {
  margin-top: 40px;
}

.screenshot .item {
  margin-bottom: 40px;
}
.screenshot p{
  text-align: left;
  line-height: 38px;
  text-indent: 2em;
}

.el-header,
.el-footer {
  background-color: #e9ebeddb;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-row {
  margin-bottom: 20px;
  /* &:last-child {
      margin-bottom: 0;
    } */
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

/* .img1{
      width:100%;
      height:inherit;
    } */
.block {
  width: 100%;
  text-align: center;
}

.pic_item {
  position: relative;
  height: 100%;

}

.pic_item img {
  width: 100%;
  height: 100%;
}

.pic_item h1 {
  position: absolute;
  bottom: 3rem;
  color: white;
  font-size: 45px;
  left: 450px;
}

.pic_item p {
  position: absolute;
  bottom: 2rem;
  color: white;
  left: 600px;
}
.el-main{
  line-height: normal;
}
</style>
