/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
// var Page = require('./components/Page');
var Page1 = require('./components/Page1');
var Page2 = require('./components/Page2');
var Page3 = require('./components/Page3');
var Page4 = require('./components/Page4');
var Page5 = require('./components/Page5');
// var articles = require('../common/data');

var Surface = ReactCanvas.Surface;
var ListView = ReactCanvas.ListView;//出生、入职、挫折、成长、生日
var pages = [Page1,Page5,Page3,Page2,Page4];//page1 出生，page2 成长，page3 挫折，page4 生日，page5 入职
var ANIMATIONON = true;
var App = React.createClass({
  
  render: function () {
    
    var size = this.getSize();
    console.log('this is app rendering',size.height);
    return (
      <Surface top={0} left={0} width={size.width} height={size.height}>
        <ListView
          style={this.getListViewStyle()}
          snapping={true}
          scrollingDeceleration={0.92}
          scrollingPenetrationAcceleration={0.13}
          numberOfItemsGetter={this.getNumberOfPages}
          itemHeightGetter={this.getPageHeight}
          itemGetter={this.renderPage} />
      </Surface>
    );
  },

  renderPage: function (pageIndex, scrollTop) {
    var size = this.getSize();
    // var article = articles[pageIndex % articles.length];
    var pageScrollTop = pageIndex * this.getPageHeight() - scrollTop;
    var widthRatio = size.width/1242;
    var heightRatio = size.height/2208;
    var Temp = pages[pageIndex];

    return (
      <Temp
        width={size.width}
        height={size.height}
        widthRatio={widthRatio}
        heightRatio={heightRatio}
        pageIndex={pageIndex}
        ANIMATIONON={ANIMATIONON}
        container={pages[pageIndex]}
        scrollTop={pageScrollTop} />
    );
  },

  getSize: function () {
    return document.getElementById('main').getBoundingClientRect();
  },

  // ListView
  // ========

  getListViewStyle: function () {
    var size = this.getSize();
    return {
      top: 0,
      left: 0,
      width: size.width,
      height: size.height
    };
  },

  getNumberOfPages: function () {
    return pages.length;
  },

  getPageHeight: function () {
    return this.getSize().height;
  }

});

(function(){
  var imgs = ["http://img.t.sinajs.cn/t4/apps/hb/static/img/starry.jpg",
  "http://img.t.sinajs.cn/t4/apps/hb/static/img/page2.jpg",
  "http://img.t.sinajs.cn/t4/apps/hb/static/img/page3.jpg",
  "http://img.t.sinajs.cn/t4/apps/hb/static/img/page4.jpg",
  "http://img.t.sinajs.cn/t4/apps/hb/static/img/page5.jpg",
  "http://img.t.sinajs.cn/t4/apps/hb/static/img/body.png",
  "http://img.t.sinajs.cn/t4/apps/hb/static/img/whale.png",
  "http://img.t.sinajs.cn/t4/apps/hb/static/img/ground.png",
  "http://img.t.sinajs.cn/t4/apps/hb/static/img/Gemini.png",
  "http://img.t.sinajs.cn/t4/apps/hb/static/img/Taurus.png",
  ];
  var loaded = 0;
  var imgCache = [];
    for (var i=0, l=imgs.length;i<l; i++){
      imgCache[i]=new Image();
      imgCache[i].src=imgs[i];
      imgCache[i].onload=function(){
        loaded += 1;
        if(loaded == imgs.length){
          React.render(<App />, document.getElementById('main'));
        }
      }
    }
})();

