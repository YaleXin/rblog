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
        <el-select
          value-key="id"
          filterable
          allow-create
          v-model="blog.category"
          placeholder="请选择文章类别"
        >
          <el-option v-for="ctgr in categoryList" :key="ctgr.id" :label="ctgr.name" :value="ctgr"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select
          value-key="id"
          v-model="blog.tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签"
        >
          <el-option v-for="tag in tagList" :key="tag.id" :label="tag.name" :value="tag"></el-option>
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
        tags: [],
        time: "",
        description: "",
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
          const blogId = this.$route.params.id;
          if (blogId !== "-1") {
            this.updateBlog();
          } else {
            this.addBlog();
          }
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
            this.handleBlogSuccess("添加成功");
          }
        })
        .catch(e => {});
    },
    updateBlog() {
      innerHttp
        .put("/admin/blog/modify", {
          data: JSON.stringify(this.blog)
        })
        .then(res => {
          if (res.status === 200) {
            this.handleBlogSuccess("更新成功");
          }else{
            this.$message({
              showClose: true,
              message: "更新失败",
              type: 'error'
            })
          }
        })
        .catch(e => {});
    },
    handleBlogSuccess(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "success"
      });
      this.$router.replace("/admin/index").catch(e => {});
    },
    parseForm() {
      const category = this.blog.category;
      if (category.id === undefined) {
        this.blog.category = {
          id: -1,
          name: category
        };
      }
      for (let i = 0; i < this.blog.tags.length; i++) {
        if (this.blog.tags[i].id === undefined) {
          let tagName = this.blog.tags[i];
          this.blog.tags[i] = {
            id: -1,
            name: tagName
          };
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
      console.log('this.blog.createTime -- >');
      console.log(this.blog.createTime);
    },
    loadBlogById(id) {
      innerHttp
        .get("/admin/blog/" + id)
        .then(res => {
          this.parseData2Form(res.data);
        })
        .catch(e => {});
    },
    parseData2Form(rawBlog) {
      let createTimeStr = rawBlog.createTime;
      rawBlog.createTime = new Date(createTimeStr);
      rawBlog.date = rawBlog.createTime;
      rawBlog.time = rawBlog.createTime;
      this.blog = rawBlog;
    }
  },
  activated() {
    let id = this.$route.params.id;
    if (id !== "-1") {
      this.loadBlogById(id);
    } else {
      this.blog.name = "";
      this.blog.category = {};
      this.blog.tags = [];
      this.blog.content = "";
      this.blog.time = "";
      this.blog.date = "";
      this.blog.description = "";
    }
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
