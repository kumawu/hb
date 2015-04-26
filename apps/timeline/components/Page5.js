/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var tweenState = require('react-tween-state');
var Group = ReactCanvas.Group;
var Image = ReactCanvas.Image;
var Text = ReactCanvas.Text;
var FontFace = ReactCanvas.FontFace;
var measureText = ReactCanvas.measureText;

var CONTENT_INSET = 12;
var LINEHEIGHT = 20;
var TEXT_SCROLL_SPEED_MULTIPLIER = 0.6;
var TEXT_ALPHA_SPEED_OUT_MULTIPLIER = 1.25;
var TEXT_ALPHA_SPEED_IN_MULTIPLIER = 2.6;
var IMAGE_LAYER_INDEX = 1;
var TEXT_LAYER_INDEX = 2;
var rootPath = '/apps/timeline/components';
var backgroundImage = rootPath+'/res/page5.jpg';
var Star4page5 = require('./goods/Star4page5');
var FloatMan = require('./goods/FloatMan');
var MultiLineText = require('./goods/MultiLineText');
var dayNum = 388;
var Page5 = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    return {
      days:1
    };
  },
  componentDidMount: function() {

    this.firstTime = true;
  },
  startCountUp:function(){
    // var newValue = this.state.days*1+1;

    // console.log('page5 newvalue',newValue);
    // if(newValue<=dayNum){
    this.tweenState('days', {
          easing: tweenState.easingTypes.easeOutQuad,
          duration: 2000,
          delay: 100,
          endValue: dayNum
        });

      // this.setState({days:newValue});
      // setTimeout(this.startCountUp,40)
    // }
    
  },
  componentDidUpdate:function(){
    // console.log('Page5 update',this.props.scrollTop);
    if (this.props.scrollTop == 0 && this.firstTime == true) {
      this.firstTime = false;
        this.startCountUp();
    }
  },
  componentWillMount: function () {
  //   // Pre-compute headline/excerpt text dimensions.
    

    //this.calTextMetric();
  },

  render: function () {
    console.log('this is Page5 rendering',this.props.width);
    this.article = {words:'2014年4月5日\n正式加入商业产品部\n宇宙之大  能够相遇  已是难得\n这是第'+Math.ceil(this.getTweeningValue('days'))+'天'};
    var groupStyle = this.getGroupStyle();
    var imageStyle = this.getImageStyle();
    
    // var excerptStyle = this.getExcerptStyle();
    var pageIndex = this.props.pageIndex;
    // console.log('ratiooooooooooo',this.props.width,this.props.height,this.props.widthRatio,this.props.heightRatio);
// 
    return (
      <Group style={groupStyle}>
        <Image style={imageStyle} src={backgroundImage} fadeIn={true} useBackingStore={true} />
        <FloatMan
          widthRatio = {this.props.widthRatio}
          heightRatio = {this.props.heightRatio}
          width={this.props.width}
          height={this.props.height}
          scrollTop={this.props.scrollTop} />
        <Star4page5
          useBackingStore={true}
          width={this.props.width}
          ANIMATIONON={this.props.ANIMATIONON}
          height={this.props.height}
          scrollTop={this.props.scrollTop} />
        <MultiLineText
          width={this.props.width}
          height={this.props.height}//如果没写这些，页面就是空白，但是不会报错，所以需要检查参数
          data = {this.article.words}
          scrollTop={this.props.scrollTop} />
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
      zIndex: IMAGE_LAYER_INDEX,
      alpha: 2
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
      height: LINEHEIGHT*3,
      backgroundColor:'#000',
      left: 0,
      alpha: 1,
      translateY: translateY,
      zIndex: 5,
      top:this.props.height,
    };
  }
  

});

module.exports = Page5;
