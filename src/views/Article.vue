<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-card>
      <div class="article-title-wrapper" style="text-align: center;">
        <h1 class="article-title">{{article.title}}</h1>
        <div class="article-detail">
          <i class="fa fa-calendar"></i>
          <span>{{article.date}}</span>
          <el-divider direction="vertical"></el-divider>
          <i class="fa fa-eye"></i>
          <span>{{article.read}}</span>
          <el-divider direction="vertical"></el-divider>
          <i class="fa fa-bookmark-o"></i>
          <span>{{article.ctgr}}</span>
        </div>
      </div>
      <div class="article-content typo">
        <h2 id="前因">前因</h2>
        <p>
          有一个需求，前端通过
          <code class="language-markup">axios</code>发送用户名和密码到后台，后台查询数据库后，确认合法用户后直接把信息存进
          <code class="language-markup">session</code>里边，而为了实现这个 需求，就需要前端解决跨域，并且将cookie存到本地计算机中。
          <!--more-->
        </p>
        <h2 id="实现">实现</h2>
        <p>
          首先是通过代理实现跨域请求：前端发送
          <code class="language-markup">url:http://localhost:8081/beforeLogin</code>，访问到
          <code class="language-markup">http://localhost:8080/testJson4servlet/beforeLogin</code>
        </p>
        <p>
          参照广大网友的步骤：在和
          <code class="language-markup">package.json</code>同级目录下新建配置文件
          <code class="language-markup">vue.config.js</code>
        </p>
        <pre class="line-numbers"><code class="language-javascript line-numbers">// vue.config.js
module.exports = {

    devServer: {
        port: 8081,
        proxy: {
            '/api': {

                target: 'http://localhost:8080/testJson4servlet/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                }
            }
        },
        disableHostCheck: true,
    }

}
</code></pre>
        <p>
          在
          <code class="language-markup">main.js</code>中配置全局
          <code class="language-markup">axios</code>
        </p>
        <pre class="line-numbers"><code class="language-javascript line-numbers">import Axios from 'axios'
Vue.use(ElementUI);

Vue.prototype.$axios = Axios;


Vue.config.productionTip = false
Axios.defaults.withCredentials = true;
</code></pre>
        <p>在需要发送请求的地方加上前缀url：&quot;api&quot;</p>
        <pre class="line-numbers"><code
  class="language-javascript line-numbers"
>this.$axios.get(&quot;/api/beforeLogin&quot;).then((res) =&gt; {
	console.log(res);
});
</code></pre>
        <hr />
        <p>这样子虽然能够发送请求，后台也能够接受数据，但是！！！，每次发送的sessionID都不一样，这样子无法进行登陆验证（你会发现每次登陆后，下次还要登陆），在浏览器里边打开审查元素也看不到Cookie，但是在响应头Response headers里边看到了set-cookie：</p>
        <pre class="line-numbers"><code
  class="line-numbers"
>set-cookie: JSESSIONID=DFBEA9837130E7DA23723674A2B3EFE9; Path=/testJson4servlet; HttpOnly
</code></pre>
        <p>
          注意到后面的这个
          <code class="language-markup">testJson4servlet</code>，这个地址刚好是我后台
          <code class="language-markup">tomcat</code>的项目地址。
        </p>
        <p>
          由于我们前面使用代理的时候设置了rul前缀为api，导致这里对应不上，因此需要在
          <code class="language-markup">vue.config.js</code>改我们的前缀
          <code class="language-markup">url</code>为我们的项目地址
        </p>
        <pre class="line-numbers"><code class="language-javascript line-numbers">// vue.config.js
module.exports = {

    devServer: {
        port: 8081,
        proxy: {
            '/testJson4servlet': {

                target: 'http://localhost:8080/testJson4servlet/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/testJson4servlet': '',
                }
            }
        },
        disableHostCheck: true,
    }

}
</code></pre>
        <p>请求代码相应地进行修改</p>
        <pre class="line-numbers"><code
  class="language-javascript line-numbers"
>this.$axios.get(&quot;/api/beforeLogin&quot;).then((res) =&gt; {
	console.log(res);
});
</code></pre>
        <p>后台打印的sessionId终于短时间内不会改变了！！！:D</p>
        <pre class="line-numbers"><code class="language-cmd line-numbers">org.apache.catalina.session.StandardSessionFacade@7fa755a9
org.apache.catalina.session.StandardSessionFacade@7fa755a9
org.apache.catalina.session.StandardSessionFacade@7fa755a9
org.apache.catalina.session.StandardSessionFacade@7fa755a9
</code></pre>
        <p>----------------------------------</p>
        <h1>
          中文网页重设与排版：
          <i class="serif">Typo.css</i>
        </h1>
        <br />

        <h2 id="tagline" class="serif">一致化浏览器排版效果，构建最适合中文阅读的网页排版</h2>

        <ol id="table">
          <li>
            <a href="#section1">
              关于
              <i class="serif">Typo.css</i>
            </a>
          </li>
          <li>
            <a href="#section2">排版实例</a>
            <ul>
              <li>
                <a href="#section2-1">例1：论语学而篇第一</a>
              </li>
              <li>
                <a href="#section2-2">例2：英文排版</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#section3">附录</a>
            <ul>
              <li>
                <a href="#appendix1">
                  <i class="serif">Typo.css</i> 排版偏重点
                </a>
              </li>
              <li>
                <a href="#appendix2">开源许可</a>
              </li>
            </ul>
          </li>
        </ol>

        <h2 id="section1">
          一、关于
          <i class="serif">Typo.css</i>
        </h2>

        <p>
          <i class="serif">Typo.css</i> 的目的是，在一致化浏览器排版效果的同时，构建最适合中文阅读的网页排版。
        </p>
        <h4>现状和如何去做：</h4>

        <p class="typo-first">
          排版是一个麻烦的问题
          <sup>
            <a href="#appendix1"># 附录一</a>
          </sup>，需要精心设计，而这个设计却是常被视觉设计师所忽略的。前端工程师更常看到这样的问题，但不便变更。因为在多个 OS 中的不同浏览器渲染不同，改动需要多的时间做回归测试，所以改变变得更困难。而像我们一般使用的
          Yahoo、Eric Meyer 和 Alice base.css 中采用的 Reset 都没有很好地考虑中文排版。
          <i
            class="serif"
          >Typo.css</i> 要做的就是解决中文排版的问题。
        </p>

        <p>
          <strong>
            <i class="serif">Typo.css</i> 测试于如下平台：
          </strong>
        </p>
        <div style="width: 100%; overflow-x: auto;">
          <table summary="Typo.css 的测试平台列表">
            <thead>
              <tr>
                <th>OS/浏览器</th>
                <th>Firefox</th>
                <th>Chrome</th>
                <th>Safari</th>
                <th>Opera</th>
                <th>IE9</th>
                <th>IE8</th>
                <th>IE7</th>
                <th>IE6</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OS X</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Win 7</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Win XP</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
                <td>-</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
              </tr>
              <tr>
                <td>Ubuntu</td>
                <td>✔</td>
                <td>✔</td>
                <td>-</td>
                <td>✔</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>中文排版的重点和难点</h4>

        <p>
          在中文排版中，HTML4 的很多标准在语义在都有照顾到。但从视觉效果上，却很难利用单独的 CSS 来实现，像
          <abbr title="在文字下多加一个点">着重号</abbr>（例：这里
          <em class="typo-em">强调一下</em>）。在 HTML4 中，专名号标签（
          <code>&lt;u&gt;</code>）已经被放弃，而
          HTML5 被
          <a href="//html5doctor.com/u-element/">重新提起</a>。
          <i class="serif">Typo.css</i> 也根据实际情况提供相应的方案。我们重要要注意的两点是：
        </p>
        <ol>
          <li>语义：语义对应的用法和样式是否与中文排版一致</li>
          <li>表现：在各浏览器中的字体、大小和缩放是否如排版预期</li>
        </ol>
        <p>
          对于这些，
          <i class="serif">Typo.css</i> 排版项目的中文偏重注意点，都添加在附录中，详见：
        </p>
        <blockquote>
          <b>附录一</b>：
          <a href="#appendix1">
            <i class="serif">Typo.css</i> 排版偏重点
          </a>
        </blockquote>

        <p>
          目前已有像百姓网等全面使用
          <i class="serif">Typo.css</i> 的项目，测试平台的覆盖，特别是在
          <abbr title="手机、平板电脑等移动平台">移动端</abbr>上还没有覆盖完主流平台，希望有能力的同学能加入测试行列，或者加入到
          <i class="serif">Typo.css</i>
          的开发。加入方法：
          <a href="https://github.com/sofish/Typo.css">
            参与
            <i class="serif">Typo.css</i> 开发
          </a>。如有批评、建议和意见，也随时欢迎给在 Github 直接提
          <a href="https://github.com/sofish/Typo.css/issues">issues</a>，或给
          <abbr title="Sofish Lin, author of Typo.css" role="author">我</abbr>发
          <a href="mailto:sofish@icloud.com">邮件</a>。
        </p>

        <h2 id="section2">二、排版实例：</h2>

        <p>
          提供2个排版实例，第一个中文实例来自于来自于
          <cite class="typo-unique">张燕婴</cite>的《论语》，由于古文排版涉及到的元素比较多，所以采用《论语》中《学而》的第一篇作为排版实例介绍；第2个来自到经典的
          Lorem Ipsum，并加入了一些代码和列表等比较具有代表性的排版元素。
        </p>

        <h3 id="section2-1">例1：论语学而篇第一</h3>

        <p>
          <small>
            <b>作者：</b>
            <abbr title="名丘，字仲尼">孔子</abbr>（
            <time>前551年9月28日－前479年4月11日</time>
            ）
          </small>
        </p>

        <h4>本篇引语</h4>

        <p>《学而》是《论语》第一篇的篇名。《论语》中各篇一般都是以第一章的前二三个字作为该篇的篇名。《学而》一篇包括16章，内容涉及诸多方面。其中重点是「吾日三省吾身」；「节用而爱人，使民以时」；「礼之用，和为贵」以及仁、孝、信等道德范畴。</p>

        <h4>原文</h4>

        <p>子曰：「学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知，而不愠，不亦君子乎？」</p>

        <h4>译文</h4>

        <p>孔子说：「学了又时常温习和练习，不是很愉快吗？有志同道合的人从远方来，不是很令人高兴的吗？人家不了解我，我也不怨恨、恼怒，不也是一个有德的君子吗？」</p>

        <h4>评析</h4>

        <p>
          宋代著名学者
          <u class="typo-u">朱熹</u>对此章评价极高，说它是「入道之门，积德之基」。本章这三句话是人们非常熟悉的。历来的解释都是：学了以后，又时常温习和练习，不也高兴吗等等。三句话，一句一个意思，前后句子也没有什么连贯性。但也有人认为这样解释不符合原义，指出这里的「学」不是指学习，而是指学说或主张；「时」不能解为时常，而是时代或社会的意思，「习」不是温习，而是使用，引申为采用。而且，这三句话不是孤立的，而是前后相互连贯的。这三句的意思是：自己的学说，要是被社会采用了，那就太高兴了；退一步说，要是没有被社会所采用，可是很多朋友赞同
          <abbr
            title="张燕婴"
          >我</abbr>的学说，纷纷到我这里来讨论问题，我也感到快乐；再退一步说，即使社会不采用，人们也不理解我，我也不怨恨，这样做，不也就是君子吗？（见《齐鲁学刊》1986年第6期文）这种解释可以自圆其说，而且也有一定的道理，供读者在理解本章内容时参考。
        </p>

        <p>此外，在对「人不知，而不愠」一句的解释中，也有人认为，「人不知」的后面没有宾语，人家不知道什么呢？当时因为孔子有说话的特定环境，他不需要说出知道什么，别人就可以理解了，却给后人留下一个谜。有人说，这一句是接上一句说的，从远方来的朋友向我求教，我告诉他，他还不懂，我却不怨恨。这样，「人不知」就是「人家不知道我所讲述的」了。这样的解释似乎有些牵强。</p>

        <p>总之，本章提出以学习为乐事，做到人不知而不愠，反映出孔子学而不厌、诲人不倦、注重修养、严格要求自己的主张。这些思想主张在《论语》书中多处可见，有助于对第一章内容的深入了解。</p>

        <h3 id="section2-2">例2：英文排版</h3>

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
          type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
          essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
        <blockquote>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </blockquote>

        <h4>The standard Lorem Ipsum passage, used since the 1500s</h4>

        <p>
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        </p>

        <h4>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h4>

        <p>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
          eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
          voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
          velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim
          ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
          vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
        </p>

        <h4>List style in action</h4>
        <ul>
          <li>
            If you wish to succeed, you should use persistence as your good friend, experience as your reference, prudence as
            your brother and hope as your sentry.
            <p>如果你希望成功，当以恒心为良友，以经验为参谋，以谨慎为兄弟，以希望为哨兵。</p>
          </li>
          <li>
            Sometimes one pays most for the things one gets for nothing.
            <p>有时候一个人为不花钱得到的东西付出的代价最高。</p>
          </li>
          <li>
            Only those who have the patience to do simple things perfectly ever acquire the skill to do difficult things
            easily.
            <p>只有有耐心圆满完成简单工作的人，才能够轻而易举的完成困难的事。</p>
          </li>
        </ul>

        <h4>
          You may want to create a perfect
          <code>&lt;hr /&gt;</code> line, despite the fact that there will never have one
        </h4>
        <hr />
        <p>
          <abbr title="法国作家罗切福考尔德">La Racheforcauld</abbr> said:
          <mark>
            "Few things are impossible in themselves; and it is often for want of will, rather than of means, that man fails
            to succeed".
          </mark>
          You just need to follow the browser's behavior, and set a right
          <code>margin</code> to it。it will works nice as the
          demo you're watching now. The following code is the best way to render typo in Chinese:
        </p>
        <pre>
/* 标题应该更贴紧内容，并与其他块区分，margin 值要相应做优化 */
h1,h2,h3,h4,h5,h6 {
    line-height:1;font-family:Arial,sans-serif;margin:1.4em 0 0.8em;
}
h1{font-size:1.8em;}
h2{font-size:1.6em;}
h3{font-size:1.4em;}
h4{font-size:1.2em;}
h5,h6{font-size:1em;}

/* 现代排版：保证块/段落之间的空白隔行 */
.typo p, .typo pre, .typo ul, .typo ol, .typo dl, .typo form, .typo hr {
    margin:1em 0 0.6em;
}
</pre>

        <h3 id="section3">三、附录</h3>

        <h5 id="appendix1">
          1、
          <i class="serif">Typo.css</i> 排版偏重点
        </h5>
        <table summary="Typo.css 排版偏重点">
          <thead>
            <tr>
              <th>类型</th>
              <th>语义</th>
              <th>标签</th>
              <th>注意点</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th rowspan="15">基础标签</th>
              <td>标题</td>
              <td>
                <code>h1</code> ～
                <code>h6</code>
              </td>
              <td>
                全局不强制大小，
                <code>.typo</code> 中标题与其对应的内容应紧贴，并且有相应的大小设置
              </td>
            </tr>
            <tr>
              <td>上、下标</td>
              <td>
                <code>sup</code>/
                <code>sub</code>
              </td>
              <td>保持与 MicroSoft Office Word 等程序的日常排版一致</td>
            </tr>
            <tr>
              <td>引用</td>
              <td>
                <code>blockquote</code>
              </td>
              <td>显示/嵌套样式</td>
            </tr>
            <tr>
              <td>缩写</td>
              <td>
                <code>abbr</code>
              </td>
              <td>
                是否都有下划线，鼠标
                <code>hover</code> 是否为帮助手势
              </td>
            </tr>
            <tr>
              <td>分割线</td>
              <td>
                <code>hr</code>
              </td>
              <td>
                显示的
                <code>padding</code> 和
                <code>margin</code>正确
              </td>
            </tr>
            <tr>
              <td>列表</td>
              <td>
                <code>ul</code>/
                <code>ol</code>/
                <code>dl</code>
              </td>
              <td>
                在全局没有
                <code>list-style</code>，在 .
                <code>typo</code> 中对齐正确
              </td>
            </tr>
            <tr>
              <td>定义列表</td>
              <td>
                <code>dl</code>
              </td>
              <td>
                全局
                <code>padding</code> 和
                <code>margin</code>为0， .
                <code>typo</code> 中对齐正确
              </td>
            </tr>
            <tr>
              <td>选项</td>
              <td>
                <code>input[type=radio[, checkbox]]</code>
              </td>
              <td>
                与其他
                <code>form</code> 元素排版时是否居中
              </td>
            </tr>
            <tr>
              <td>斜体</td>
              <td>
                <code>i</code>
              </td>
              <td>
                只设置一种斜体，让
                <code>em</code> 和
                <code>cite</code> 显示为正体
              </td>
            </tr>
            <tr>
              <td>强调</td>
              <td>
                <code>em</code>
              </td>
              <td>
                在全局显示正体，在
                <code>.typo</code> 中显示与
                <code>b</code> 和
                <code>strong</code> 的样式一致，为粗体
              </td>
            </tr>
            <tr>
              <td>加强</td>
              <td>
                <code>strong/b</code>
              </td>
              <td>显示为粗体</td>
            </tr>
            <tr>
              <td>标记</td>
              <td>
                <code>mark</code>
              </td>
              <td>类似荧光笔</td>
            </tr>
            <tr>
              <td>印刷</td>
              <td>
                <code>small</code>
              </td>
              <td>保持为正确字体的 80% 大小，颜色设置为浅灰色</td>
            </tr>
            <tr>
              <td>表格</td>
              <td>
                <code>table</code>
              </td>
              <td>
                全局不显示线条，在
                <code>table</code> 中显示表格外框，并且表头有浅灰背景
              </td>
            </tr>
            <tr>
              <td>代码</td>
              <td>
                <code>pre</code>/
                <code>code</code>
              </td>
              <td>
                字体使用
                <code>courier</code> 系字体，保持与
                <code>serif</code> 有比较一致的显示效果
              </td>
            </tr>
            <tr>
              <th rowspan="5">特殊符号</th>
              <td>着重号</td>
              <td>
                <em class="typo-em">在文字下加点</em>
              </td>
              <td>
                在支持
                <code>:after</code> 和
                <code>:before</code> 的浏览器可以做渐进增强实现
              </td>
            </tr>
            <tr>
              <td>专名号</td>
              <td>
                <u>林建锋</u>
              </td>
              <td>
                专名号，有下划线，使用
                <code>u</code> 或都
                <code>.typo-u</code> 类
              </td>
            </tr>
            <tr>
              <td>破折号</td>
              <td>——</td>
              <td>保持一划，而非两划</td>
            </tr>
            <tr>
              <td>人民币</td>
              <td>&yen;</td>
              <td>
                使用两平等线的符号，或者 HTML 实体符号
                <code>&amp;yen;</code>
              </td>
            </tr>
            <tr>
              <td>删除符</td>
              <td>
                <del>已删除（deleted）</del>
              </td>
              <td>一致化各浏览器显示，中英混排正确</td>
            </tr>
            <tr>
              <th rowspan="3">加强类</th>
              <td>专名号</td>
              <td>
                <code>.typo-u</code>
              </td>
              <td>
                由于
                <code>u</code> 被 HTML4 放弃，在向后兼容上推荐使用
                <code>.typo-u</code>
              </td>
            </tr>
            <tr>
              <td>着重符</td>
              <td>
                <code>.typo-em</code>
              </td>
              <td>
                利用
                <code>:after</code> 和
                <code>:before</code> 实现着重符
              </td>
            </tr>
            <tr>
              <td>清除浮动</td>
              <td>
                <code>.clearfix</code>
              </td>
              <td>与一般 CSS Reset 保持一对致 API</td>
            </tr>
            <tr>
              <th rowspan="5">注意点</th>
              <td colspan="3">（1）中英文混排行高/行距</td>
            </tr>
            <tr>
              <td colspan="3">（2）上下标在 IE 中显示效果</td>
            </tr>
            <tr>
              <td colspan="3">（3）块/段落分割空白是否符合设计原则</td>
            </tr>
            <tr>
              <td colspan="3">（4）input 多余空间问题</td>
            </tr>
            <tr>
              <td colspan="3">
                （5）默认字体色彩，目前采用
                <code>#333</code> 在各种浏览显示比较好
              </td>
            </tr>
          </tbody>
        </table>

        <h5 id="appendix2">2、开源许可</h5>

        <p>
          <i class="serif">Typo.css</i> 基于
          <a href="//zh.wikipedia.org/wiki/MIT_License">MIT License</a> 开源，使用代码只需说明来源，或者引用
          <a href="//typo.sofi.sh/license.txt">license.txt</a> 即可。
        </p>

        <p>--------------------------------</p>
        <pre><code class="language-c">#include &lt;Stdio.h&gt;
int main(){
    printf(&quot;hello world\n&quot;);
    return 0;
}
</code></pre>
        <hr />
        <pre><code class="language-java">class Test{
    public static void main(String[] args) {
        System.out.println(&quot;hello world&quot;);
    }    
}

</code></pre>
        <p>====================</p>

        <hr />
        <div style="width: 100%; overflow-x: auto;">
          <table>
            <thead>
              <tr>
                <th>OS/浏览器</th>
                <th>Firefox</th>
                <th>Chrome</th>
                <th>Safari</th>
                <th>Opera</th>
                <th>IE9</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>张三</td>
                <td>1</td>
                <td>计科</td>
                <td>普通</td>
                <td>信息工程</td>
                <td>123</td>
              </tr>
              <tr>
                <td>张三</td>
                <td>1</td>
                <td>计科</td>
                <td>普通</td>
                <td>信息工程</td>
                <td>123</td>
              </tr>
              <tr>
                <td>张三</td>
                <td>1</td>
                <td>计科</td>
                <td>普通</td>
                <td>信息工程</td>
                <td>123</td>
              </tr>
              <tr>
                <td>李四</td>
                <td>2</td>
                <td>软件</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>=========</p>
        <img src="https://q.yalexin.top/14.jpg" class="ui rounded image fancy-box-img" alt />
        <img src="https://q.yalexin.top/15.jpg" class="ui rounded image fancy-box-img" alt />
        <img src="https://q.yalexin.top/16.jpg" class="ui rounded image fancy-box-img" alt />
        <img src="https://q.yalexin.top/17.jpg" class="ui rounded image fancy-box-img" alt />
        <img src="https://q.yalexin.top/18.jpg" class="ui rounded image fancy-box-img" alt />
      </div>
      <comment class="comment-card"></comment>
    </el-card>
  </div>
</template>

<script>
$(document).ready(function() {
  console.log("ready");
  $('[data-fancybox="gallery"]').fancybox({
    buttons: ["share", "close", "download"],
    hash: false
  });
});
import Comment from "../components/Comment.vue";
import Prism from "prismjs";
export default {
  name: "Article",
  components: {
    Comment
  },
  activated() {
    Prism.highlightAll();
    console.log("activated");
  },
  created() {
    console.log("creat");
  },
  methods: {
    open(e) {}
  },
  mounted() {
    let imgNodeArray = document.querySelectorAll(".fancy-box-img");
    imgNodeArray.forEach(imgNode => {
      let aNode = document.createElement("a");
      aNode.href = imgNode.getAttribute("src");
      aNode.setAttribute("data-transition-effect", "zoom-in-out");
      aNode.setAttribute("data-animation-effect", "slide");
      aNode.setAttribute("data-fancybox", "gallery");
      aNode.setAttribute("data-capion", "这是一张图片");
      imgNode.parentNode.appendChild(aNode);
      aNode.appendChild(imgNode);
      aNode.style.border = "none";
    });
  },
  data() {
    return {
      article: {
        id: 0,
        title: "题目",
        date: "2019-2-3",
        ctgr: "分类一",
        read: 12,
        commentEnable: true,
        content: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  props: {
    // blog: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       id: 1,
    //       title: "某个题目",
    //       dscr: "描述",
    //       date: "2020-2-3",
    //       read: 12,
    //       ctgr: "分类"
    //     };
    //   }
    // }
  }
};
</script>

<style scoped>
@import "../assets/css/typo.css";

table {
  overflow-x: auto;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

/*鼠标悬停在表格上时，表格的背景和鼠标的形状*/
table tr:hover {
  background-color: #66d9ef !important;
  cursor: pointer;
}

/*表格头部*/
table thead {
  font-weight: bolder;
  background-color: #a2a5a7;
}
/*even为偶数行 odd为奇数行
    设置表格的主体部分偶数行的样式
  */
table tbody tr:nth-child(even) {
  background-color: rgb(241, 241, 241);
}
img.rounded {
  border-radius: 10px;
}
.comment-card {
  margin-top: 10px;
}
</style>
