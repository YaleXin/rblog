<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-form :rules="rules" ref="blogForm" :model="blog" label-position="left" label-width="80px">
      <el-form-item prop="name" label="标题">
        <el-input class="blog-name-input" v-model="blog.name" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item prop="category" label="分类">
        <el-select filterable allow-create v-model="blog.category" placeholder="请选择文章类别">
          <el-option v-for="ctgr in categoryList" :key="ctgr.id" :label="ctgr.name" :value="ctgr"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select
          v-model="blog.tag"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签"
        >
          <el-option v-for="tag in tagList" :key="tag.id" :label="tag.name" :value="tag.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" required>
        <el-col :span="5">
          <el-form-item prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="blog.date"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="time">
            <el-time-picker style="margin-left:20px;" placeholder="选择时间" v-model="blog.time"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item prop="category" label="文章描述">
        <el-input
          :autosize="{ minRows: 5, maxRows: 10}"
          type="textarea"
          placeholder="用于简单描述您的文章"
          v-model="blog.description"
        ></el-input>
      </el-form-item>
    </el-form>
    <p>文章正文</p>
    <markdown theme="dark" v-model="blog.content"></markdown>
    <el-button @click="submit" class="publish-btn" plain type="primary">发布</el-button>
  </div>
</template>

<script>
import Markdown from "vue-meditor";
export default {
  name: "Article",
  components: {
    Markdown
  },
  data() {
    return {
      blog: {
        name: "",
        content: "",
        tag: [],
        time: "",
        description: "",
        category: "",
        date: ""
      },
      tagList: [
        { id: 0, name: "暴力法" },
        { id: 1, name: "哈希" },
        { id: 2, name: "并发" },
        { id: 3, name: "可重入锁" },
        { id: 4, name: "闭包" },
        { id: 5, name: "数字签名" },
        { id: 6, name: "对称加密" }
      ],
      categoryList: [
        { id: 0, name: "算法" },
        { id: 1, name: "Java" },
        { id: 2, name: "Linux相关" },
        { id: 3, name: "情感生活" },
        { id: 4, name: "其他" }
      ],
      rules: {
        name: {
          required: true,
          message: "请输入文章标题名称",
          trigger: "blur"
        },
        category: {
          required: true,
          message: "请输入文章分类",
          trigger: "blur"
        },
        date: {
          required: true,
          message: "请输入创建文章的日期",
          trigger: "blur"
        },
        time: {
          required: true,
          message: "请输入创建文章的时间",
          trigger: "blur"
        },
        category: { required: true, message: "请输入文章描述", trigger: "blur" }
      }
    };
  },
  methods: {
    clg() {
      console.log(this.blog.content);
    },
    submit() {
      this.$refs.blogForm.validate(valid => {
        if (valid) {
          console.log(this.blog);
          alert("submit!");
        } else {
          this.$alert("请输入必填项", "发布失败", {
            confirmButtonText: "确定",
            callback: action => {}
          });
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.blog-name-input {
  width: 30%;
}
.publish-btn {
  margin-top: 5px;
}
</style>
