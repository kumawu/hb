/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;
var tweenState = require('react-tween-state');
var Text = ReactCanvas.Text;
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

  },

  componentWillUnmount:function(){
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
    // console.log('this is Star rendering');★
    var starStyle = this.getTitleStyle();
    // <Image style={imageStyle} src='http://img.t.sinajs.cn/t4/apps/hb/static/img/star.png' fadeIn={true} useBackingStore={true} />
    return (
      <Text style={starStyle}>★</Text>
      
    );
  },

  // Styles
  // ======
  
  getTitleStyle: function() {
    var size = 10;
    return {
      alpha:this.getTweeningValue('alpha'),
      shadowColor: '#999',
      shadowBlur:20,
     // borderRadius:size2,//size/2
      left: 720*this.props.widthRatio,
      width: size,
      height: size,
      fontSize: size,
      lineHeight: size,
      top: this.props.height*0.60,
      color: '#ff0',
      zIndex: 4
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
  }
});

module.exports = Star;