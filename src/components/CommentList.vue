<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <div v-for="c in topCommentList" :key="c.id" class="comment-reply-item">
      <!-- 顶楼贴 -->
      <el-row>
        <el-col :span="avaterColSize">
          <el-avatar :size="avatarSize" :src="c.info.avatar">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
        </el-col>
        <el-col :span="infoColSize">
          <div class="comment-info">
            By
            <span class="comment-author">{{c.info.nickname}}</span>
            At
            <span>{{c.info.date}}</span>
            With
            <span>{{c.info.OS}}</span>
            <span>{{c.info.browser}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="comment-content">{{c.content}}</div>
          <el-row type="flex" justify="end">
            <el-col :span="4">
              <el-button
                @click="replyClick(c.id, c.info.nickname)"
                class="reply-btn"
                type="primary"
                icon="el-icon-edit"
                size="mini"
                plain
              >回复</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <!-- 回复贴 -->
      <el-row type="flex" justify="end">
        <el-col :span="23">
          <el-row v-for="r in c.replyList" :key="r.id" class="comment-reply-item">
            <el-row>
              <el-col :span="avaterColSize">
                <el-avatar :size="avatarSize" :src="r.info.avatar">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                </el-avatar>
              </el-col>
              <el-col :span="infoColSize">
                <div class="comment-info">
                  By
                  <span class="comment-author">{{r.info.nickname}}</span>
                  At
                  <span>{{r.info.date}}</span>
                  With
                  <span>{{r.info.OS}}</span>
                  <span>{{r.info.browser}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="comment-content">
                  <span>@</span>
                  <span style="color:  #35b8ff">{{r.replyNickname}}</span>
                  <span>:</span>
                  {{r.content}}
                  <el-row type="flex" justify="end">
                    <el-col :span="4">
                      <el-button
                        @click="replyClick(r.id, r.info.nickname)"
                        class="reply-btn"
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        plain
                      >回复</el-button>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../eventBus/index.js";
export default {
  name: "CommentList",
  components: {},
  data() {
    return {
      topCommentList: [
        {
          info: {
            nickname: "黄阿信",
            email: "495592364@qq.com",
            avatar: "",
            date: "2012 12/12/12 23:19:09",
            browser: "chrome",
            OS: "Windows"
          },
          content: "五块钱如何花三天？",
          id: 0,
          replyList: [
            {
              info: {
                nickname: "回复者1",
                avatar: "",
                email: "1265656@163.com",
                date: "2012 12/12/12 23:19:09",
                browser: "chrome",
                OS: "Windows"
              },
              content: "人可以不吃饭几天？",
              id: 0,
              // 回复的楼层
              replyId: 0,
              replyNickname: "黄阿信",
              // 顶层       虽然可以将每个回复节点的父节点设计成只有一个，
              //            但是为了方便定位和后端整理，可以设计成2个
              topCommentId: 0
            },
            {
              info: {
                nickname: "回复者2",
                avatar: "",
                email: "1265656@163.com",
                date: "2012 12/12/12 23:19:09",
                browser: "chrome",
                OS: "Windows"
              },
              content: "晚上睡大街会被警察抓吗？",
              id: 1,
              // 回复的楼层
              replyId: 0,
              replyNickname: "回复者1",
              // 顶层       虽然可以将每个回复节点的父节点设计成只有一个，
              //            但是为了方便定位和后端整理，可以设计成2个
              topCommentId: 0
            }
          ]
        },
        {
          info: {
            nickname: "顶层评论者2",
            date: "2012 12/12/12 23:19:09",
            email: "3380257166@qq.com",
            avatar: ""
          },
          content: "今天是个好天气",
          id: 1,
          replyList: []
        }
      ],
      styleInfo: {
        // 移动端
        avatarSize: 36,
        avaterColSize: 4,
        infoColSize: 20
      }
    };
  },
  created() {
    console.log(this.topCommentList);
    this.topCommentList.forEach(topCmt => {
      topCmt.info.avatar =
        "https://v1.alapi.cn/api/avatar?email=" + topCmt.info.email;
      topCmt.replyList.forEach(rpl => {
        rpl.info.avatar =
          "https://v1.alapi.cn/api/avatar?email=" + rpl.info.email;
      });
    });
  },
  methods: {
    avatarInit() {},
    replyClick(id, atNickname) {
      EventBus.$emit("replyClick", id, atNickname);
      document.getElementById("input-textarea").scrollIntoView();
    }
  },
  computed: {
    avatarSize() {
      return document.body.clientWidth >= 1000 ? 60 : 36;
    },
    avaterColSize() {
      return document.body.clientWidth >= 1000 ? 2 : 4;
    },
    infoColSize() {
      return document.body.clientWidth >= 1000 ? 22 : 20;
    }
  }
};
</script>

<style scoped>
.comment-info > .comment-author {
  font-weight: bold;
  font-size: 1.1em;
  color: #35b8ff;
}
.comment-info > span {
  font-size: 0.5em;
  padding-left: 5px;
}
.reply-btn {
  font-size: 8px;
}
</style>
