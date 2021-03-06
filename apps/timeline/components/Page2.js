/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var tweenState = require('react-tween-state');
var AngelFall = require('./goods/AngelFall');
var Star = require('./goods/Star');
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
var projects = [];
var honors= [];
var backgroundImage = 'http://img.t.sinajs.cn/t4/apps/hb/static/img/page2.jpg';
// var Stars = require('/apps/timeline/components/goods/Stars');
var Page2 = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    return {
      alpha:0,
      projectTop:150,
      honerTop:260
    };
  },

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    // article: React.PropTypes.object.isRequired,
    scrollTop: React.PropTypes.number.isRequired,
    pageIndex: React.PropTypes.number.isRequired
  },
  componentDidMount: function() {

    this.firstTime = true;

  },
  componentDidUpdate:function(){
    console.log('Page2 update',this.props.scrollTop,this.firstTime);
    if (this.props.scrollTop == 0 && this.firstTime == true) {
      this.firstTime = false;
      this.tweenState('alpha', {
        easing: tweenState.easingTypes.easeInOutQuad,
        duration: 1000,
        delay: 500,
        endValue: 1
      });
    }
  },
  componentWillUnmount:function(){
    projects=honors=[];
  },
  componentWillMount: function () {
    console.log('page2 will mount');

      // "project": [{
      //       "duty": "爱玛客 产品设计"
      //   }, {
      //       "duty": "员工关怀 数据录入"
      //   }, {
      //       "duty": "粉丝服务平台 啥都没干"
      //   }],
  //   // Pre-compute headline/excerpt text dimensions.
      this.article = {project:$CONFIG['project'],honor:$CONFIG['reward']};
      
      this.formatArticle({type:'p',data:this.article.project});
      if(this.article.honor!=0){
        this.formatArticle({type:'h',data:this.article.honor});
      }
  },
 
  render: function () {
    console.log('this is Page2 rendering',this.state);
    var groupStyle = this.getGroupStyle();
    var imageStyle = this.getImageStyle();
    var whaleStyle = this.getWhaleStyle();
    var pageIndex = this.props.pageIndex;
    // 
    var rewardStyle = this.getTitleStyle();
    rewardStyle.alpha = 0;
    return (
      <Group style={groupStyle}>
        <Image style={imageStyle} src={backgroundImage} fadeIn={true} useBackingStore={true} />
        <Image style={whaleStyle} src='/apps/timeline/components/res/whale.png' fadeIn={true} useBackingStore={true} />
        <AngelFall
          ANIMATIONON={this.props.ANIMATIONON}
          width={this.props.width}
          height={this.props.height}
          scrollTop={this.props.scrollTop} />
        <Star
          width={this.props.width}
          height={this.props.height}
          widthRatio = {this.props.widthRatio}
          heightRatio = {this.props.heightRatio}
          scrollTop={this.props.scrollTop} />
        <Group style={this.getTextGroupStyle()}  useBackingStore={true}>
          <Text style={this.getTitleStyle({top:100})}>项目经历</Text>
          {projects}
          <Text style={rewardStyle}>获奖情况</Text>
          {honors}
        </Group>
      </Group>
    );
  },
  renderText:function(type,text,index){
    return (
      <Text style={this.getArticleStyle(type,text,index)} key={type+index}>{text}</Text>
    );
  },
  formatArticle:function(opt){
    var self = this;
    var words = opt.data.split('\n');
    words.map(function(text,index){
      if(opt.type=='p'){
        projects.push(self.renderText(opt.type,text,index));
      }else{
        honors.push(self.renderText(opt.type,text,index))
      }
    })
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
  getWhaleStyle: function () {
    var _h = 1010*this.props.heightRatio;
    return {
      top: this.props.height - _h,
      left: 0,
      width: this.props.width,
      height: _h,
      zIndex: 5,
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
      top:100,
    };
  },
  getTitleStyle:function (opt) {
    if(opt&&opt.top){
      var _top = opt.top
    }
    return {
      alpha:1,
      shadowColor:'#fff',
      color:'#fff',
      left:CONTENT_INSET,
      width: this.props.width - 2 * CONTENT_INSET,
      height:CONTENT_INSET,
      fontSize: CONTENT_INSET,
      lineHeight: LINEHEIGHT,
      top: _top||100,
      zIndex: 2,
      fontFace: FontFace('Georgia, serif'),
      textAlign:'center',
      textBaseline :'middle'
    };
  },
  getArticleStyle:function (type,text,index) {
    var _w = measureText(text,this.props.width,FontFace('Georgia, serif'),CONTENT_INSET,LINEHEIGHT).width;
    var _offset = (type=='p')?0:LINEHEIGHT*5;
    return {
      shadowColor:'#fff',
      color:'#fff',
      alpha:1,//this.getTweeningValue('alpha')
      left:(this.props.width - _w)/2,
      width: _w,
      height:CONTENT_INSET,
      fontSize: CONTENT_INSET,
      lineHeight: LINEHEIGHT,
      top: 110+(index+1)*LINEHEIGHT+_offset,//this.getTweeningValue('projectTop')+
      zIndex: 2,
      fontFace: FontFace('Georgia, serif'),
      textAlign:'center',
      textBaseline :'middle'
    };
  }
});

module.exports = Page2;
