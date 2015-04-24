/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;
var tweenState = require('react-tween-state');
var Image = ReactCanvas.Image;

// var Text = ReactCanvas.Text;
// var FontFace = ReactCanvas.FontFace;
// var measureText = ReactCanvas.measureText;
var Star = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    return {
      alpha:1
    };
  },
  componentWillMount: function() {
    
    // this.setState({starsTop:_newValue});
    // //待检测是否有重复
    // requestAnimationFrame(this.changeTop);
    // // setTimeout(this.changeTop,1000);
    this.regStop();
  },
  regStop:function(){
    // var self = this;
    // setTimeout(function() {
    //   self.stopAni();
    // }, 50000);
  },
  stopAni:function(){
  },
  componentWillUnmount:function(){
    this.stopAni();
  },
  changeAlpha : function(){
    var self = this;
    console.log('This is star call tweenState');
    this.tweenState('alpha', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 2000,
      delay: 500,
      endValue: 0.2,
      onEnd: function() {
        self.tweenState('alpha', {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: 1000,
          delay: 100,
          endValue: 1,
          onEnd:this.changeAlpha
        });
      }
    });
  },
  componentDidMount: function() {
    setTimeout(this.changeAlpha,1000);
  },
  componentDidUpdate:function(){
  },
  render: function() {
    // console.log('this is Star rendering');
    var imageStyle = this.getImageStyle();
    return (
      <Image style={imageStyle} src='/apps/timeline/components/res/star.png' fadeIn={true} useBackingStore={true} />
    );
  },

  // Styles
  // ======
  
  getTitleStyle: function() {
    var size = 100;
    return {
      alpha:this.getTweeningValue('alpha'),
      backgroundColor:'#000',
      shadowColor: '#999',
      shadowBlur:20,
     // borderRadius:size2,//size/2
      left: 733*this.props.widthRatio,
      width: size,
      height: size,
      fontSize: size,
      lineHeight: size,
      top: 1465*this.props.heightRatio,
      color: '#ff0',
      zIndex: 4,
      fontFace: FontFace('Avenir Next Condensed, Helvetica, sans-serif', null, {
        weight: 400
      })
    };
  },
  getTextGroupStyle: function () {
    // var imageHeight = this.getImageHeight();
    var translateY = 0;
    // var alphaMultiplier = (this.props.scrollTop <= 0) ? -TEXT_ALPHA_SPEED_OUT_MULTIPLIER : TEXT_ALPHA_SPEED_IN_MULTIPLIER;
    // var alpha = 1 - (this.props.scrollTop / this.props.height) * alphaMultiplier;
    // alpha = Math.min(Math.max(alpha, 0), 1);
    // translateY = -this.props.scrollTop * TEXT_SCROLL_SPEED_MULTIPLIER;
    return {
      width: this.props.width,
      height: this.props.height,
      top: 0,
      left: 0,
      alpha: 1,
      translateY: translateY,
      zIndex: 4
    };
  },
  getImageStyle: function () {
    this.width = 25 * this.props.widthRatio;
    this.height = 26 * this.props.heightRatio;
    console.log('star getImageStyle',this.props.widthRatio,this.props.heightRatio);
    return {
      top: 1465*this.props.heightRatio,//this.getTweeningValue('top'),
      left: 723*this.props.widthRatio,
      width: this.width,
      height: this.height,
      zIndex: 3,
      alpha:this.getTweeningValue('alpha')
    };
  }
});

module.exports = Star;