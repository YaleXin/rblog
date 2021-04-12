<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <div v-for="topCmt in comments" :key="topCmt.id" class="comment-reply-item">
      <!-- 顶楼贴 -->
      <el-row>
        <el-col :span="avaterColSize">
          <el-avatar :size="avatarSize" :src="gravaterImg(topCmt.email)">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
        </el-col>
        <el-col :span="infoColSize">
          <div class="comment-info">
            <span v-if="topCmt.adminComment" style="color:red">
              <i class="fa fa-thumb-tack" aria-hidden="true"></i>
              <span>博主</span>
            </span>
            <span class="comment-author">{{topCmt.nickname}}</span>

            <span>{{topCmt.createTime}}</span>

            <span>{{topCmt.os}}</span>
            <span>{{topCmt.browser}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="comment-content">{{topCmt.content}}</div>
          <el-row type="flex" justify="end">
            <el-col :span="4">
              <el-button
                @click="replyClick(topCmt.id, topCmt.nickname)"
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
      <el-row type="flex" justify="end" class="reply-box">
        <el-col :span="23">
          <el-row
            v-for="replyCmt in topCmt.replyComments"
            :key="replyCmt.id"
            class="comment-reply-item"
          >
            <el-row>
              <el-col :span="avaterColSize">
                <el-avatar :size="avatarSize" :src="gravaterImg(replyCmt.email)">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                </el-avatar>
              </el-col>
              <el-col :span="infoColSize">
                <div class="comment-info">
                  <span v-if="replyCmt.adminComment" style="color:red">
                    <i class="fa fa-thumb-tack" aria-hidden="true"></i>
                    <span>博主</span>
                  </span>
                  <span class="comment-author">{{replyCmt.nickname}}</span>
                  <span>{{replyCmt.createTime}}</span>
                  <span>{{replyCmt.os}}</span>
                  <span>{{replyCmt.browser}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="comment-content">
                  <span>@</span>
                  <span style="color:  #35b8ff">{{replyCmt.replyNickname}}</span>
                  <span>:</span>
                  {{replyCmt.content}}
                  <el-row type="flex" justify="end">
                    <el-col :span="4">
                      <el-button
                        @click="replyClick(replyCmt.id, replyCmt.nickname)"
                        class="reply-btn"
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        plain
                      >回复</el-button>
                    </el-col>
                    <el-col :span="2"></el-col>
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
import md5 from "js-md5";
import { EventBus } from "../eventBus/index.js";
export default {
  name: "CommentList",
  components: {},
  data() {
    return {
      // comments: [

      // ],
      styleInfo: {
        // 移动端
        avatarSize: 36,
        avaterColSize: 4,
        infoColSize: 20
      }
    };
  },
  props: {
    comments: {
      type: Array,
      default: () => {
        return [
          {
            id: 0,
            nickname: "",
            email: "",
            content: "",
            createTime: "2021-02-13 23:11:51",
            os: "",
            browser: "",
            replyComments: [
              {
                id: 1,
                nickname: "",
                email: "",
                content: "",
                createTime: "2021-02-13 23:11:51",
                replyNickname: "",
                content: "",
                os: "",
                browser: ""
              }
            ]
          }
        ];
      }
    }
  },
  created() {},
  methods: {
    avatarInit() {},
    replyClick(id, atNickname) {
      EventBus.$emit("replyClick", id, atNickname);
      document.getElementById("input-textarea").scrollIntoView();
    },
    gravaterImg(email) {
      const types = ["identicon", "monsterid", "wavatar", "retro"];
      const type = types[email.length % 4];
      // https://www.gravatar.com/avatar/5ca4962228b25bb180ed14794013c4bc?d=monsterid
      return (
        "https://sdn.geekzu.org/avatar/" + md5(email.trim()) + "?d=" + type
      );
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
  margin-right: 500px;
}
.reply-box {
  background-color: beige;
}
.comment-reply-item {
  margin-top: 20px;
}
</style>
