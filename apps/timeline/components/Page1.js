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
var backgroundImage = rootPath+'/res/starry.jpg';
var Stars = require('./goods/Stars');
var Angel = require('./goods/Angel');
var Head = require('./goods/Head');
var Ground = require('./goods/Ground');
var Tree = require('./goods/Tree');
var Constellation = require('./goods/Constellation');
var HeadSize = 90;
var Page1 = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    return {
      nameStyleFontSize:CONTENT_INSET
    };
  },

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    scrollTop: React.PropTypes.number.isRequired,
    pageIndex: React.PropTypes.number.isRequired
  },
  componentDidMount: function() {

    this.tweenState('nameStyleFontSize', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 1000,
      delay:500,
      endValue: 20
    });

  },
  componentDidUpdate:function(){
    console.log('Page1 update',this.props.scrollTop);
  },
  componentWillMount: function () {
      var constellationMapping = {'Taurus':' 金牛座','Gemini':' 双子座'.'Aries':' 白羊座'};
  //   // Pre-compute headline/excerpt text dimensions.
      this.article = {name:$CONFIG['uname'],constellation:$CONFIG['constellation']+constellationMapping[$CONFIG['constellation']],desc:$CONFIG['birthyear']+'年'+$CONFIG['birthmonth']+'月'+$CONFIG['birthday']+'日， 夜空中诞生了一颗新星， 飘摇中落到了微博的树枝上。'};

  },
  fixTextPostion:function(){

  },
  calTextMetric:function(){
    var maxWidth = this.props.width - 2 * CONTENT_INSET;
    var nameStyle = this.getNameStyle();
    this.nameMetrics = measureText(this.article.name, maxWidth, nameStyle.fontFace, nameStyle.fontSize, nameStyle.lineHeight);
    var constellationStyle = this.getConstellationStyle();
    this.constellationMetrics = measureText(this.article.constellation, maxWidth, constellationStyle.fontFace, constellationStyle.fontSize, constellationStyle.lineHeight);
    var descStyle = this.getDescStyle();
    this.descMetrics = measureText(this.article.desc, maxWidth, descStyle.fontFace, descStyle.fontSize, descStyle.lineHeight);

  },

  render: function () {
    // console.log('this is Page1 rendering',this.state.heightRatio);
    var groupStyle = this.getGroupStyle();
    var imageStyle = this.getImageStyle();
    
    // var excerptStyle = this.getExcerptStyle();
    var pageIndex = this.props.pageIndex;
    
    var nameStyle = this.getNameStyle();
    var musicIconStyle = this.getMusicIconStyle();
    // nameStyle.left = this.props.width/2-this.nameMetrics.width/2;
    // nameStyle.width = this.nameMetrics.width;
    // nameStyle.height = this.nameMetrics.height;

    var constellationStyle = this.getConstellationStyle();
    var descStyle = this.getDescStyle();
    // console.log('ratiooooooooooo',this.props.width,this.props.height,this.props.widthRatio,this.props.heightRatio);

    return (
      <Group style={groupStyle}>
        <Image style={imageStyle} src={backgroundImage} fadeIn={true} useBackingStore={true} />
        <Image style={musicIconStyle} src='/apps/timeline/components/res/musicoff.png' fadeIn={true} useBackingStore={true} />
        <Stars
          useBackingStore={true}
          width={this.props.width}
          ANIMATIONON={this.props.ANIMATIONON}
          height={this.props.height}
          scrollTop={this.props.scrollTop} />
        <Angel
          useBackingStore={true}
          width={this.props.width}
          ANIMATIONON={this.props.ANIMATIONON}
          height={this.props.height}
          scrollTop={this.props.scrollTop} />
        <Constellation
          width={this.props.width}
          widthRatio = {this.props.widthRatio}
          heightRatio = {this.props.heightRatio}
          height={this.props.height} />
        <Tree
          width={this.props.width}
          widthRatio = {this.props.widthRatio}
          heightRatio = {this.props.heightRatio}
          height={this.props.height} />
        <Ground
          width={this.props.width}
          widthRatio = {this.props.widthRatio}
          heightRatio = {this.props.heightRatio}
          height={this.props.height} />
        <Head
          HeadSize={HeadSize}
          width={this.props.width}
          height={this.props.height} />
        <Group style={this.getTextGroupStyle()}>
          <Text style={nameStyle}>{this.article.name}</Text>
          <Text style={constellationStyle}>{this.article.constellation}</Text>
          <Text style={descStyle}>{this.article.desc}</Text>
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

  getImageHeight: function () {
    return Math.round(this.props.height/1.5);
  },

  getImageStyle: function () {
    return {
      top: 0,
      left: 0,
      width: this.props.width,
      height: this.props.height,
      backgroundColor: '#eee',
      zIndex: IMAGE_LAYER_INDEX,
      alpha: 1
    };
  },

  getMusicIconStyle: function () {
    return {
      top: 49*this.props.heightRatio,
      left: 1111*this.props.widthRatio,
      width: 80*this.props.widthRatio,
      height: 80*this.props.heightRatio,
      zIndex: IMAGE_LAYER_INDEX,
      alpha: 1
    };
  },

  getTextGroupStyle: function () {
    var imageHeight = this.getImageHeight();
    var translateY = 0;
    var alphaMultiplier = (this.props.scrollTop <= 0) ? -TEXT_ALPHA_SPEED_OUT_MULTIPLIER : TEXT_ALPHA_SPEED_IN_MULTIPLIER;
    var alpha = 1 - (this.props.scrollTop / this.props.height) * alphaMultiplier;
    alpha = Math.min(Math.max(alpha, 0), 1);
    translateY = -this.props.scrollTop * TEXT_SCROLL_SPEED_MULTIPLIER;
    return {
      width: this.props.width,
      height: LINEHEIGHT*3,
      left: 0,
      alpha: alpha,
      translateY: translateY,
      zIndex: 4,
      top:this.props.height/2+HeadSize/2-35,
    };
  },
  getNameStyle:function () {
    var _fontSize = 20;
    return {
      shadowColor:'#fff',
      color:'#fff',
      // left: this.state.nameStyleLeft,
      left:CONTENT_INSET,
      width: this.props.width - 2 * CONTENT_INSET,
      height:_fontSize,
      fontSize: this.getTweeningValue('nameStyleFontSize'),
      lineHeight: LINEHEIGHT,
      top: this.props.height/2+HeadSize/2-35,
      zIndex: 5,
      fontFace: FontFace('Georgia, serif'),
      textAlign:'center',
      textBaseline :'middle'
    };
  },
  getConstellationStyle:function () {
    return {
      shadowColor:'#fff',
      color:'#fff',
      // left: CONTENT_INSET,
      left:CONTENT_INSET,
      width: this.props.width - 2 * CONTENT_INSET,
      height:CONTENT_INSET,
      fontFace: FontFace('Georgia, serif'),
      fontSize: 12,
      lineHeight: LINEHEIGHT,
      top:this.props.height/2+HeadSize/2-25+LINEHEIGHT,
      textAlign:'center',
      textBaseline :'middle'
    };
  },
  getDescStyle:function () {
    return {
      shadowColor:'#fff',
      shadowBlur:20,
      color:'#fff',
      // left: CONTENT_INSET,
      left:CONTENT_INSET,
      width: this.props.width - 2 * CONTENT_INSET,
      height:CONTENT_INSET*2+LINEHEIGHT,
      fontFace: FontFace('Georgia, serif'),
      fontSize: 12,
      lineHeight: LINEHEIGHT,
      top:this.props.height/2+HeadSize/2-22+LINEHEIGHT*2,
      textAlign:'center',
      textBaseline :'middle',
    };
  }

});

module.exports = Page1;
