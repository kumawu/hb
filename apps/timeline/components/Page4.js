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
var backgoundImage = '/apps/timeline/components/res/page4.jpg';
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
      console.log('This is page3 call tweenState');
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
    var groupStyle = this.getGroupStyle();
    var imageStyle = this.getImageStyle();
    var pageIndex = this.props.pageIndex;
    return (
      <Group style={groupStyle}>
        <Image style={imageStyle} src={backgoundImage} fadeIn={true} useBackingStore={true} />
        <Lantern
          widthRatio = {this.props.widthRatio}
          heightRatio = {this.props.heightRatio}
          scrollTop={this.props.scrollTop}
          width={this.props.width}
          height={this.props.height} />
        <Group style={this.getTextGroupStyle()} useBackingStore={true}>
          
        </Group>
      </Group>
    );
  },
  renderText:function(text,index){
    console.log('Page4 cal text line');
    return (
      <Text style={this.getArticleStyle(text,index)} key={'page3W'+index}>{text}</Text>
    );
  },
  formatArticle:function(data){
    // var self = this;
    // var words = data.split('\n');
    // words.map(function(text,index){
    //   wordList.push(self.renderText(text,index));
    // });
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

  getTextGroupStyle: function () {
    var imageHeight = this.getImageHeight();
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
