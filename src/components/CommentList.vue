<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <div v-for="c in topCommentList" :key="c.id">
      <!-- 顶楼贴 -->
      <el-row>
        <el-col :span="4">
          <el-avatar :size="avatarSize" src="https://empty">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
        </el-col>
        <el-col :span="20">
          <div class="comment-info">
            <span>By</span>
            <span>{{c.info.nickname}}</span>
            <i class="fa fa-desktop" aria-hidden="true"></i>
            {{c.info.OS}}
            <i class="fa fa-internet-explorer" aria-hidden="true"></i>
            {{c.info.browser}}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="comment-content">{{c.content}}</div>
        </el-col>
      </el-row>
      <!-- 回复贴 -->
      <el-row type="flex" justify="end">
        <el-col :span="23">
          <el-row v-for="r in c.replyList" :key="r.id">
            <el-row>
              <el-col :span="4">
                <el-avatar :size="avatarSize" src="https://empty">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                </el-avatar>
              </el-col>
              <el-col :span="20">
                <div class="comment-info">
                  <span>By</span>
                  <span>{{r.info.nickname}}</span>
                  <i class="fa fa-desktop" aria-hidden="true"></i>
                  {{r.info.OS}}
                  <i
                    class="fa fa-internet-explorer"
                    aria-hidden="true"
                  ></i>
                  {{r.info.browser}}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="comment-content">{{r.content}}</div>
              </el-col>
            </el-row>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentList",
  components: {},
  data() {
    return {
      topCommentList: [
        {
          info: {
            nickname: "顶层评论者",
            date: "2012 12/12/12 23:19:09",
            browser: "chrome",
            OS: "Windows"
          },
          content: "顶层回复信息。。。。。。。。。。。。",
          id: 0,
          replyList: [
            {
              info: {
                nickname: "回复者1",
                date: "2012 12/12/12 23:19:09",
                browser: "chrome",
                OS: "Windows"
              },
              content: "回帖回复信息。。。。。。。。。。。。",
              id: 0,
              // 回复的楼层
              replyId: 0,
              // 顶层       虽然可以将每个回复节点的父节点设计成只有一个，
              //            但是为了方便定位和后端整理，可以设计成2个
              topCommentId: 0
            }
          ]
        },
        {
          info: { nickname: "顶层评论者2", date: "2012 12/12/12 23:19:09" },
          content: "",
          id: 1
        }
      ],
      styleInfo: {
        // 移动端
        avatarSize: 36,
        avaterColSize: 4,
        infoColSize: 20,
      }
    };
  },
  created() {
  },
  methods: {
    
  },
  computed: {
    avatarSize() {
      return document.body.clientWidth >= 1000 ? 60 : 36;
    },
    avaterColSize(){
        return document.body.clientWidth >= 1000 ? 60 : 36;
    },
    infoColSize(){
        return document.body.clientWidth >= 1000 ? 60 : 36;
    },
  }
};
</script>

<style scoped>
.comment-info {
  /* display: inline; */
  height: 36px;
}
</style>
