<template>
    <div class="container">
      <h2>联系方式</h2>
      <address>
        <strong>汽车之友信息科技有限公司.</strong><br> 成都市天府三街节大厦 100 号<br>
        <abbr title="Phone">联系电话:</abbr> 400-123-123
      </address>

      <h2>建议</h2>
      <el-form ref="form" :model="formData" label-width="100px" class="form-horizontal">
        <el-form-item label="姓名">
          <el-input v-model="formData.truename"></el-input>
        </el-form-item>

        <el-form-item label="称呼">
          <el-radio-group v-model="formData.radio">
            <el-radio label="先生">先生</el-radio>
            <el-radio label="女士">女士</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="你的职位">
          <el-select v-model="formData.job">
            <el-option label="开发者" value="开发者"></el-option>
            <el-option label="运营者" value="运营者"></el-option>
            <el-option label="管理人员" value="管理人员"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="你最喜欢“汽车之友“的哪个功能">
          <el-checkbox-group v-model="formData.favorite">
            <el-checkbox label="汽车产品介绍">汽车产品介绍</el-checkbox>
            <el-checkbox label="汽车市场行情">汽车市场行情</el-checkbox>
            <el-checkbox label="汽车保养维修">汽车保养维修</el-checkbox>
            <el-checkbox label="其他">其他</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="更多建议">
          <el-input type="textarea" v-model="formData.suggestion"></el-input>
          <p>请不要超过500个字</p>
        </el-form-item>

        <div class="text-center">
          <el-button type="primary" @click="submitForm">提交</el-button>
        </div>
      </el-form>
    </div>
  </template>

  <script>
  export default {
    name: 'aboutUs',
    data() {
      return {
        formData: {
          truename: '',
          radio: '先生',
          job: '开发者',
          favorite: [],
          suggestion: ''
        }
      };
    },
    methods: {
      submitForm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            // 这里可以添加提交表单的逻辑
          }
        });
      }
    }
  };
  </script>

  <style scoped>
  /* 样式可以根据需要进行自定义 */
  .container {
    padding: 20px;
  }
  </style>
