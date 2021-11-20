<template>
  <div class="wrapper">
    <el-card class="box-card">
      <div class="bar"></div>
    </el-card>

    <!-- footer区域   -->
    <el-footer>
      <div class="footer-fluid">Copyright ©2019 AuthorXuYunYun</div>
    </el-footer>
  </div>
</template>
<script>
import echarts from "echarts";
import axios from "axios";
import $ from "jquery";
export default {
  inject: ["reload"],
  data() {
    return {
      dialogVisible: false
    };
  },

  mounted() {
    this.Bar();
    this.Bar.prototype = {
            init: function () {
                this.setData();
                this.create();
                this.bindEvent();
            },
    }
    //this.init();
  },

  methods: {
    init() {
      // this.setData();
      // this.create();
      // this.bindEvent();
    },
    Bar() {
      this.data = null;
      this.$el = $(".bar");
      this.init();
    },
    create() {
      var barData = this.data;
      var html = "";
      for (var i = 0; i < barData.length; i++) {
        html +=
          '<div class="row">\n' +
          '        <span class="desc">' +
          barData[i].desc +
          "</span>\n" +
          '        <span class="num">' +
          barData[i].num +
          "</span>\n" +
          '        <span class="progressBar">\n' +
          '            <span class="percent"></span>\n' +
          "        </span>\n" +
          "    </div>";
      }
      this.$el.empty().append(html);
    },
    bindEvent() {
      this.$el.find(".row").each(function(i, ele) {
        var num = parseInt(
          $(ele)
            .find(".num")
            .text()
        );
        var value = 100; //设置总值为100
        $(ele)
          .find(".percent")
          .css("width", (num / value) * 100 + "%");
      });
    },
    setData() {
      var barData = [
        { desc: "语文", num: this.getRandomInt(0, 100) },
        { desc: "数学", num: this.getRandomInt(0, 100) },
        { desc: "英语", num: this.getRandomInt(0, 100) }
      ];
      this.data = barData;
    },

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }
};
</script>
<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.wrapper {
  width: 100%;
  height: 100%;
}

.box-card {
  font-family: "nunito", sans-serif;
  width: 100%;
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
  border: 1px solid #eee;
}

.card-body {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
}

.el-footer {
  border-top: 1px solid #eee;
  padding: 15px;
  background: #f2f3f8;
}

.el-footer .footer-fluid {
  display: flex;
  align-items: center;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.bar {
  width: 300px;
  font-size: 0;
}
.bar .desc,
.bar .num,
.bar .progressBar {
  display: inline-block;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.bar .desc,
.bar .num {
  width: 20%;
}
.bar .num {
}
.bar .progressBar {
  width: 60%;
  height: 6px;
  background-color: #000;
}
.bar .progressBar .percent {
  float: left;
  height: 100%;
}
.bar .progressBar .percent:before {
  content: "";
  float: left;
  width: 0;
  height: 100%;
  background-color: #f00;
  -webkit-animation: barAnimate 1s 0.4s forwards;
}
@-webkit-keyframes barAnimate {
  to {
    width: 100%;
  }
}
</style>
