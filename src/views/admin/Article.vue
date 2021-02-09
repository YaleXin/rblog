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
      <el-form-item prop="categoryInput" label="分类">
        <el-select filterable allow-create v-model="blog.categoryInput" placeholder="请选择文章类别">
          <el-option
            v-for="(ctgr, index) in categoryList"
            :key="ctgr.id"
            :label="ctgr.name"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select
          v-model="blog.tagsInput"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签"
        >
          <el-option v-for="(tag, index) in tagList" :key="tag.id" :label="tag.name" :value="index"></el-option>
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
      <el-form-item prop="description" label="文章描述">
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
import innerHttp from "../../network/innerHttp.js";
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
        tagsInput: [],
        tags: [],
        time: "",
        description: "",
        categoryInput: "",
        category: [],
        date: "",
        createTime: ""
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
        categoryInput: {
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
        description: {
          required: true,
          message: "请输入文章描述",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    submit() {
      this.$refs.blogForm.validate(valid => {
        if (valid) {
          this.parseForm();
          this.addBlog();
        } else {
          this.$alert("请输入必填项", "发布失败", {
            confirmButtonText: "确定",
            callback: action => {}
          });
          return false;
        }
      });
    },
    addBlog() {
      innerHttp
        .put("/admin/blog/add", {
          data: JSON.stringify(this.blog)
        })
        .then(res => {
          if (res.status === 200) {
            this.addBlogSuccess();
          }
        })
        .catch(e => {});
    },
    addBlogSuccess() {
      this.$message({
        showClose: true,
        message: "添加成功！",
        type: "success"
      });
      this.$router.replace("/admin/index").catch(e => {});
    },
    parseForm() {
      const index = this.blog.categoryInput;
      if (typeof index !== "number") {
        this.blog.category = {
          id: -1,
          name: index
        };
      } else {
        this.blog.category = this.categoryList[index];
      }
      this.blog.tags = [];
      let tags = this.blog.tags;
      for (let i = 0; i < this.blog.tagsInput.length; i++) {
        if (typeof this.blog.tagsInput[i] !== "number") {
          tags.push({
            id: -1,
            name: this.blog.tagsInput[i]
          });
        } else {
          tags.push(this.tagList[this.blog.tagsInput[i]]);
        }
      }
      // 将输入的日期和时间进行拼装
      let g = new Date();
      let time =
        this.blog.date.getFullYear() +
        "-" +
        (this.blog.date.getMonth() + 1) +
        "-" +
        this.blog.date.getDate() +
        " " +
        this.blog.time.getHours() +
        ":" +
        this.blog.time.getMinutes() +
        ":" +
        this.blog.time.getSeconds();
      this.blog.createTime = new Date(time);
      delete this.blog.tagsInput;
      delete this.blog.categoryInput;
    }
  },
  activated() {
    this.blog.name = "";
    this.blog.categoryInput = {};
    this.blog.tagsInput = [];
    this.blog.content = "";
    this.blog.description = "";
    innerHttp
      .get("/tag/all")
      .then(res => {
        this.tagList = res.data.tags;
      })
      .catch(e => {});
    innerHttp
      .get("/category/all")
      .then(res => {
        this.categoryList = res.data.categories;
      })
      .catch(e => {});
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
