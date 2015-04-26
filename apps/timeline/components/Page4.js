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

var CONTENT_INSET = 12;
var LINEHEIGHT = 26;
var TEXT_SCROLL_SPEED_MULTIPLIER = 0.6;
var TEXT_ALPHA_SPEED_OUT_MULTIPLIER = 1.25;
var TEXT_ALPHA_SPEED_IN_MULTIPLIER = 2.6;
var IMAGE_LAYER_INDEX = 1;
var TEXT_LAYER_INDEX = 2;
var wordList = [];
var backgroundImage = '/apps/timeline/components/res/page4.jpg';
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
  },
 
  render: function () {
    console.log('this is Page4 rendering',this.state);
    var _temp = $CONFIG['uname'].split('');
    var name = '';
    _temp.map(function(item){
      name += item + ' '
    });
    console.log('name',name);
    var groupStyle = this.getGroupStyle();
    var imageStyle = this.getImageStyle();
    var logoStyle = this.getLogoStyle();
    var textStyle = this.getTextStyle();
    var text2Style = this.getTextStyle();
    text2Style.top += 30*_temp.length;
    text2Style.fontSize =CONTENT_INSET; 
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
        <Group style={this.getTextGroupStyle()} useBackingStore={true}>
          <Text style={textStyle}>{name}</Text>
          <Text style={text2Style}>生 日 快 乐</Text>
          <Image style={logoStyle} src='/apps/timeline/components/res/weibologo.png' useBackingStore={true} />
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
      top: 1776*this.props.heightRatio,
      left: this.props.width/2-_w/2,
      width: _w,
      height: 57*this.props.heightRatio,
      zIndex: IMAGE_LAYER_INDEX,
      alpha: 1
    };
  },
  getTextStyle: function(){
    return {
      top: this.props.height/2,
      left:this.props.width/2 - CONTENT_INSET/2,
      width: CONTENT_INSET,
      height: CONTENT_INSET *20,
      zIndex: TEXT_LAYER_INDEX,
      alpha: 1,
      shadowColor:'#fff',
      color:'#fff',
      fontSize: CONTENT_INSET*1.5,
      lineHeight: LINEHEIGHT,
      fontFace: FontFace('Georgia, serif'),
      textAlign:'center',
      textBaseline :'middle'
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
      top: 180+(index+1)*LINEHEIGHT,//this.getTweeningValue('projectTop')+
      zIndex: 2,
      fontFace: FontFace('Georgia, serif'),
      textAlign:'center',
      textBaseline :'middle'
    };
  }
});

module.exports = Page4;
