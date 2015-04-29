/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var tweenState = require('react-tween-state');
var Lantern = require('./goods/Lantern');
var Group = ReactCanvas.Group;
var Image = ReactCanvas.Image;
var Text = ReactCanvas.Text;
var FontFace = ReactCanvas.FontFace;
var measureText = ReactCanvas.measureText;
var MultiLineText = require('./goods/MultiLineText');

var CONTENT_INSET = 12;
var LINEHEIGHT = 16;
var TEXT_SCROLL_SPEED_MULTIPLIER = 0.6;
var TEXT_ALPHA_SPEED_OUT_MULTIPLIER = 1.25;
var TEXT_ALPHA_SPEED_IN_MULTIPLIER = 2.6;
var IMAGE_LAYER_INDEX = 1;
var TEXT_LAYER_INDEX = 3;
var wordList = [];
var backgroundImage = 'http://img.t.sinajs.cn/t4/apps/hb/static/img/page4.jpg';
// var Stars = require('/apps/timeline/components/goods/Stars');
var Page4 = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    return {
      alpha:0.5
    };
  },

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    // article: React.PropTypes.object.isRequired,
    scrollTop: React.PropTypes.number.isRequired,
    pageIndex: React.PropTypes.number.isRequired
  },
  componentDidUpdate:function(){
    console.log('page3 update', this.props.scrollTop, this.firstTime);
    if (this.props.scrollTop == 0 && this.firstTime == true) {
      var self = this;
      this.firstTime = false;
      // console.log('This is page4 call tweenState');
      // this.tweenState('alpha', {
      //   easing: tweenState.easingTypes.easeInOutQuad,
      //   duration: 500,
      //   delay: 100,
      //   endValue: 20
      // });
    }
  },
  componentDidMount: function() {
    this.firstTime = true;
  },

  componentWillUnmount:function(){
  },
  componentWillMount: function () {
  //   // Pre-compute headline/excerpt text dimensions.
      this.article = {words:'星光依然不够照亮你的前路\n点亮许愿灯为你祝福\n浩瀚的星空，感谢有你相伴'};
  },
 
  render: function () {
    console.log('this is Page4 rendering',this.state);
    
    console.log('name',name);
    var groupStyle = this.getGroupStyle();
    var imageStyle = this.getImageStyle();

    var textStyle = this.getTextStyle();
    var text2Style = this.getTextStyle();
    text2Style.top = textStyle.top+30;
    text2Style.fontSize =CONTENT_INSET*2;
    text2Style.height =CONTENT_INSET*2;
    var logoStyle = this.getLogoStyle();
    logoStyle.top = text2Style.top + 2*CONTENT_INSET+2*LINEHEIGHT;
    var pageIndex = this.props.pageIndex;
    return (
      <Group style={groupStyle}>
        <Image style={imageStyle} src={backgroundImage} fadeIn={true} useBackingStore={true} />
        <Lantern
          widthRatio = {this.props.widthRatio}
          heightRatio = {this.props.heightRatio}
          ANIMATIONON={this.props.ANIMATIONON}
          scrollTop={this.props.scrollTop}
          width={this.props.width}
          height={this.props.height} />
        <MultiLineText
          width={this.props.width}
          height={this.props.height}//如果没写这些，页面就是空白，但是不会报错，所以需要检查参数
          data = {this.article.words}
          initTop ={this.props.height/2}
          scrollTop={this.props.scrollTop} />
        <Group style={this.getTextGroupStyle()} useBackingStore={true}>
          <Text style={textStyle}>{$CONFIG['uname']}</Text>
          <Text style={text2Style}>生 日 快 乐</Text>
          <Image style={logoStyle} src='http://img.t.sinajs.cn/t4/apps/hb/static/img/weibologo.png' useBackingStore={true} />
        </Group>
      </Group>
    );
  },

    // Styles
  // ======

  getGroupStyle: function () {
    return {
      top: 0,
      left: 0,
      width: this.props.width,
      height: this.props.height
    };
  },

  getImageStyle: function () {
    return {
      top: 0,
      left: 0,
      width: this.props.width,
      height: this.props.height,
      backgroundColor: '#000',
      zIndex: IMAGE_LAYER_INDEX,
      alpha: 1
    };
  },
  getLogoStyle : function(){
    var _w = 70*this.props.widthRatio;
    return {
      top: this.props.height/2,//this.props.height/2-4*CONTENT_INSET-3*LINEHEIGHT +(index+1)*LINEHEIGHT
      left: this.props.width/2-_w/2,
      width: _w,
      height: 57*this.props.heightRatio,
      zIndex: IMAGE_LAYER_INDEX,
      alpha: 1
    };
  },
  getTextGroupStyle: function () {
    var translateY = 0;
    var alphaMultiplier = (this.props.scrollTop <= 0) ? -TEXT_ALPHA_SPEED_OUT_MULTIPLIER : TEXT_ALPHA_SPEED_IN_MULTIPLIER;
    var alpha = 1 - (this.props.scrollTop / this.props.height) * alphaMultiplier;
    alpha = Math.min(Math.max(alpha, 0), 1);
    translateY = -this.props.scrollTop * TEXT_SCROLL_SPEED_MULTIPLIER;
    return {
      width: this.props.width,
      height: this.props.height,
      left: 0,
      alpha: alpha,
      translateY: translateY,
      zIndex: 4,
      top:0,
    };
  },
  getTextStyle: function(){
    var lineOfWords = this.article.words.split('\n').length;
    console.log('lineOfWords',lineOfWords);
    return {
      top: this.props.height/1.8+lineOfWords*CONTENT_INSET+lineOfWords*LINEHEIGHT,
      left:0,
      width: this.props.width,
      height: CONTENT_INSET,
      zIndex: TEXT_LAYER_INDEX,
      alpha: 1,
      shadowColor:'#fff',
      color:'#fff',
      fontSize: CONTENT_INSET,
      lineHeight: LINEHEIGHT,
      fontFace: FontFace('Georgia, serif'),
      textAlign:'center',
      textBaseline :'middle'
    };
  }
});

module.exports = Page4;
