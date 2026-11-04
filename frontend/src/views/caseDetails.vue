<template>
    <div class="case-details-page">
      <!-- 导航栏 -->
      <el-row class="navbar">
        <el-col :span="24">
          <el-menu mode="horizontal">
            <el-menu-item index="1"><a class="navbar-brand" href="../index.html">首页</a></el-menu-item>
            <el-menu-item index="2" class="active"><a href="#">案例详情</a></el-menu-item>
            <el-menu-item index="3"><a href="about.html">联系方式</a></el-menu-item>
            <el-menu-item index="4"><a href="#">登录</a></el-menu-item>
          </el-menu>
        </el-col>
      </el-row>

      <!-- 栅格系统布局 -->
      <el-container>
        <el-main>
          <el-row>
            <el-col :span="18">
              <!-- 正文区域 -->
              <el-page-header :title="pageTitle" :sub-title="pageSubtitle"></el-page-header>

              <!-- 正文内容 -->
              <el-blockquote>
                <p>{{ caseQuote }}</p>
              </el-blockquote>

              <!-- 正文 -->
              <p v-for="(paragraph, index) in caseContent" :key="index">{{ paragraph }}</p>

              <!-- 按钮 -->
              <el-row justify="center">
                <el-button class="btn-primary">顶</el-button>
                <el-button class="btn-danger">踩</el-button>
              </el-row>
            </el-col>

            <el-col :span="6">
              <!-- 相关信息 -->
              <el-image src="../images/case_1.jpeg" fit="contain"></el-image>
              <h3>相关内容</h3>
              <el-list>
                <el-list-item v-for="(item, index) in relatedItems" :key="index">
                  <a :href="item.link">{{ item.name }}</a>
                </el-list-item>
              </el-list>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
  </template>

  <script>
  export default {
    name: "aseDetails",
    data() {
      return {
        pageTitle: "汽车之友",
        pageSubtitle: "有价值的、有趣的汽车产品和信息服务",
        caseQuote: "汽车之友为您提供最新汽车报价,汽车图片,汽车价格大全,最精彩的汽车新闻、行情、评测、导购内容,是提供信息最快最全的中国汽车网站",
        caseContent: [
          "豪华运动精神——英菲尼迪M35",
          "英菲尼迪自从去年进入中国以来，凭借FX车型和G35逐渐在国内的豪华车市场占有了一席之地，很多人不再陌生这个品牌，大街上也能时不时看见英菲尼迪的身影。去年末，英菲尼迪又高调宣布旗下豪华运动轿车M35也正式进入中国，更巩固英菲尼迪在中国的豪华车品牌形象。M35其实在很早以前就已经出现在国内，不过那时它挂着日产风雅的商标，作为日产高端车的形象出现。此次在国内上市的M35是英菲尼迪全球同步的2008款车型，秉承了英菲尼迪一向的豪华运动精神。",
          // 这里继续添加其他段落内容...
        ],
        relatedItems: [
          { name: "雪佛兰汽车公司", link: "#" },
          { name: "别克汽车公司", link: "#" },
          { name: "凯迪拉克汽车公司", link: "#" },
          { name: "通用大宇汽车公司", link: "#" },
          { name: "悍马大宇汽车公司", link: "#" },
          { name: "大众大宇汽车公司", link: "#" },
          { name: "宝马大宇汽车公司", link: "#" },
          { name: "林肯大宇汽车公司", link: "#" },
          { name: "捷豹大宇汽车公司", link: "#" },
        ],
      };
    },
  };
  </script>

  <style scoped>
  .case-details-page {
    padding: 20px;
  }
  .navbar {
    margin-bottom: 20px;
  }
  </style>
