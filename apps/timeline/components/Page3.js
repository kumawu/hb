/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var tweenState = require('react-tween-state');
var Body = require('./goods/Body');
var Bubble = require('./goods/Bubble');
var Group = ReactCanvas.Group;
var Image = ReactCanvas.Image;
var Text = ReactCanvas.Text;
var FontFace = ReactCanvas.FontFace;
var measureText = ReactCanvas.measureText;

var CONTENT_INSET = 12;
var LINEHEIGHT = 26;
var TEXT_SCROLL_SPEED_MULTIPLIER = 0.6;
var TEXT_ALPHA_SPEED_OUT_MULTIPLIER = 1.25;
var TEXT_ALPHA_SPEED_IN_MULTIPLIER = 2.6;
var IMAGE_LAYER_INDEX = 1;
var TEXT_LAYER_INDEX = 2;
var wordList = [];
var backgroundImage = '/apps/timeline/components/res/page3.jpg';
// var Stars = require('/apps/timeline/components/goods/Stars');
var MINALPHA = 0.3;
var delayTime =1000;
var Page3 = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    return {
      water1Alpha:1,
      water2Alpha:MINALPHA
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
      
      
      if(this.props.ANIMATIONON){
        console.log('This is page3 call tweenState');
        this.waterDecoration();
      }
    }
  },
  waterDecoration : function(){
    var step = 1250;
    var self = this;
    this.tweenState('water1Alpha', {
      duration: step,
      endValue: MINALPHA,
      onEnd:function(){
        self.tweenState('water1Alpha', {
          delay:delayTime,
          duration: step,
          endValue: 1
        });
      }
    });
    this.tweenState('water2Alpha', {
      duration: step,
      endValue: 1,
      onEnd:function(){
        self.tweenState('water2Alpha', {
          delay:delayTime,
          duration: step,
          endValue: MINALPHA
        });
      }
    });
    this.timer = setTimeout(this.waterDecoration,step*2+delayTime);
  },
  componentDidMount: function() {
    this.firstTime = true;
  },

  componentWillUnmount:function(){
    clearTimeout(this.timer);
  },
  componentWillMount: function () {
    this.article = {words:'旅 途 中 难 免 遇 到 波 折\nBe yourself\n做 最 好 的 自 己\n愿 无 岁 月 可 以 回 头'}
    if(wordList.length == 0){
      this.formatArticle(this.article.words)
    }
  //   // Pre-compute headline/excerpt text dimensions.
  },
 
  render: function () {
    // console.log('this is Page2 rendering',this.state);
    var groupStyle = this.getGroupStyle();
    var imageStyle = this.getImageStyle();
    var pageIndex = this.props.pageIndex;
    var water1Style =  this.getImageStyle();
    var water2Style =  this.getImageStyle();

    water1Style.alpha = this.getTweeningValue('water1Alpha');
    water1Style.zIndex = 3;
    water1Style.backgroundColor = '#000';
    water2Style.zIndex = 3;
    water2Style.alpha = this.getTweeningValue('water2Alpha');
    
        //   <Image style={imageStyle} src={backgroundImage} fadeIn={true} useBackingStore={true} />
    return (
      <Group style={groupStyle}>
         <Group style={groupStyle}>
          <Image style={water1Style} src='/apps/timeline/components/res/page3_1.jpg' fadeIn={true} useBackingStore={false} />
          <Image style={water2Style} src='/apps/timeline/components/res/page3_2.jpg' fadeIn={true} useBackingStore={false} />
        </Group>
        <Bubble
          width={this.props.width}
          height={this.props.height}
          ANIMATIONON={this.props.ANIMATIONON}
          scrollTop={this.props.scrollTop} />
        <Body
          widthRatio = {this.props.widthRatio}
          heightRatio = {this.props.heightRatio}
          scrollTop={this.props.scrollTop}
          width={this.props.width}
          height={this.props.height} />
        <Group style={this.getTextGroupStyle()} useBackingStore={true}>
          {wordList}
        </Group>
      </Group>
    );
  },
  renderText:function(text,index){
    console.log('Page3 cal text line');
    return (
      <Text style={this.getArticleStyle(text,index)} key={'page3W'+index}>{text}</Text>
    );
  },
  formatArticle:function(data){
    var self = this;
    var words = data.split('\n');
    words.map(function(text,index){
      wordList.push(self.renderText(text,index));
    });
  },
    // Styles
  // ======

  getGroupStyle: function () {
    return {
      top: 0,
      left: 0,
      width: this.props.width,
      height: this.props.height,
      backgroundColor:"#3e567e",
    };
  },

  getImageStyle: function () {
    return {
      top: 0,
      left: 0,
      width: this.props.width,
      height: this.props.height,
      zIndex: IMAGE_LAYER_INDEX,
      alpha: 1,
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
  
  getArticleStyle:function (text,index) {
    var _w = measureText(text,this.props.width,FontFace('Georgia, serif'),CONTENT_INSET,LINEHEIGHT).width;
    return {
      shadowColor:'#fff',
      color:'#fff',
      alpha:1,//this.getTweeningValue('alpha')
      left:(this.props.width - _w)/2,
      width: _w,
      height:this.props.height,
      fontSize: CONTENT_INSET,
      lineHeight: LINEHEIGHT,
      top: this.props.height/2-4*CONTENT_INSET-3*LINEHEIGHT +(index+1)*LINEHEIGHT,//this.getTweeningValue('projectTop')+
      zIndex: 4,
      fontFace: FontFace('Georgia, serif'),
      textAlign:'center',
      textBaseline :'middle'
    };
  }
});

module.exports = Page3;
