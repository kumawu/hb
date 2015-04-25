/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;
var tweenState = require('react-tween-state');
var Text = ReactCanvas.Text;
var FontFace = ReactCanvas.FontFace;
var measureText = ReactCanvas.measureText;
var StarsNum = 30;
var items = [];
var increase = true;
var blinks = [];//starItemIndex
var blinkNum = 3;
var Stars = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    return {
      starsAlpha:0.3,
      increaseLock:false,
      fStarsPosTop:0,
      fStarsPosLeft:0,
      fStarsAlpha:0
    };
  },
  componentWillMount: function() {
    for (var i = 0; i < StarsNum; i++) {
      var titleStyle = this.getTitleStyle();
      items.push(this.renderStar('blink'+i, titleStyle));
    }
    // this.fallingLock=false;
  },
  changeAlpha : function(){
    var _a = this.state.starsAlpha;
    var _step = 0.1;
    var _lock = true;
    if(_a >= 0.9 && increase){
      increase = !increase;
    }else if(_a <= 0.2 && !increase){
      increase = !increase;
      _lock = false;
    }
    var _newValue = increase?_a+_step:_a-_step;
    console.log('This is stars call setState');
    // this.setState({starsAlpha:_newValue,increaseLock:_lock});
    //待检测是否有重复
    // this._pendingAnimationFrame = requestAnimationFrame(this.changeAlpha);
    this.blinkLoop = setTimeout(this.changeAlpha,40);
    this.regStop();
  },
  regStop:function(){
    var self = this;
    setTimeout(function() {
      self.stopAni();
    }, 50000);
  },
  stopAni:function(){
    // cancelAnimationFrame(this._pendingAnimationFrame);
    clearTimeout(this.blinkLoop)
    items = [];
  },
  componentWillUnmount:function(){
    this.stopAni();
    items=[];
  },
  componentDidMount: function() {
    this.firstTime = true;
  },
  componentDidUpdate:function(){
    if (this.props.scrollTop == 0 && this.firstTime == true && this.props.ANIMATIONON) {
      this.firstTime = false;
      this.falling();
    }
  },
  render: function() {
    if(this.props.scrollTop!==0){
      this.stopAni();
    }
    console.log('this is Stars rendering',this.state);
    var _a = this.state.starsAlpha;
    if(items.length != 0){
      if (!this.state.increaseLock) {
        blinks = [];
        for (var i = 0; i < blinkNum; i++) {

          blinks.push(items[Math.floor(Math.random() * StarsNum)]);
        }
      }
      blinks.map(function(star) {
        star.props.style.alpha = _a;
      });
    }
    return (
      <Group style={this.getTextGroupStyle()}>
        {items}
      </Group>
    );
  },
  renderStar : function (index,titleStyle) {
    return (
      <Text style = {titleStyle} key={index} > . < /Text>
    );
  },

  // Styles
  // ======
  
  getTitleStyle: function() {
    var size = Math.ceil(Math.random()*2);
    return {
      alpha:this.state.starsAlpha,
      backgroundColor:'#fff',
      shadowColor: '#999',
      shadowBlur:20,
      borderRadius:size*2,//size/2
      left: 50*Math.random()*10,
      width: size,
      height: size,
      fontSize: size,
      lineHeight: size,
      top: 50*Math.random()*10,
      color: '#ff0',
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
      zIndex: 2
    };
  }
});

module.exports = Stars;