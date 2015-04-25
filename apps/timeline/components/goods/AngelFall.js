/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;
var tweenState = require('react-tween-state');
var Text = ReactCanvas.Text;
var FontFace = ReactCanvas.FontFace;
var measureText = ReactCanvas.measureText;
var StarsNum = 20;
var AFitems = [];
var blinks = [];//starItemIndex
var blinkNum = 3;
var AngelFall = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    return {
      starsTop:100,
    };
  },
  componentWillMount: function() {
    
    // console.log('componentWillMount',items);
    // this.fallingLock=false;
  },
  changeAfTop : function(){
    
    var _a = this.state.fStarsPosTop;
    var _step = 0.5;
    var self = this;

    // console.log('this is AF rendering',this.state);
    var _top=0;
    AFitems.map(function(item) {
      _top = item.props.style.top * 1 + _step;
      if (_top >= self.props.height / 2 + 140) {
        _top = Math.random() * self.props.height / 4 + self.props.height / 3;
      }
      console.log('af items',_top,item.props.style.top);
      item.props.style.top = _top;

    });
    console.log('This is AF call setState');
    this.setState({starsTop:_top});
    //待检测是否有重复
    // this._pendingAnimationFrame = requestAnimationFrame(this.changeAfTop);
    setTimeout(this.changeAfTop,40);
    this.regStop();
  },
  regStop:function(){
    var self = this;
    setTimeout(function() {
      self.stopAni();
    }, 50000);
  },
  stopAni:function(){
    console.log('AF stop ani');
    cancelAnimationFrame(this._pendingAnimationFrame);
    // items = [];
  },
  componentWillUnmount:function(){
    this.stopAni();
    AFitems=[];
  },
  componentDidMount: function() {
    this.firstTime = true;
  },
  componentDidUpdate:function(){
    console.log('af update',this.props.scrollTop,this.firstTime);
    if (this.props.scrollTop == 0 && this.firstTime == true && this.props.ANIMATIONON) {
      for (var i = 0; i < StarsNum; i++) {
      AFitems.push(this.renderStar('blink'+i));
    }
      this.firstTime = false;
      
      // setTimeout(this.changeAfTop,500);
      console.log('af begin changeAfTop');
    }
  },
  render: function() {
    console.log('This is AF rendering',(AFitems.length!=0)?AFitems[0].props.style.top:0);
     if(this.props.scrollTop!==0){
      this.stopAni();
    }
    return (
      <Group style={this.getTextGroupStyle()}>
        {AFitems}
      </Group>
    );
  },
  renderStar : function (index) {
    var titleStyle = this.getTitleStyle();
    return (
      <Text style = {titleStyle} key={index} > . < /Text>
    );
  },

  // Styles
  // ======
  
  getTitleStyle: function() {
    var size = Math.ceil(Math.random()*1);
    return {
      alpha:.4,
      backgroundColor:'#fff',
      shadowColor: '#999',
      shadowBlur:20,
      borderRadius:size*2,//size/2
      left: Math.random()*this.props.width/2+this.props.width/4,
      width: size,
      height: size,
      fontSize: size,
      lineHeight: size,
      top: Math.random()*this.props.height/4+this.props.height/3,
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
      width: Math.random()*this.props.width/2-this.props.width/4+this.props.width/2,
      height: Math.random()*this.props.height/4+this.props.height/2+140,
      top: 0,
      left: 0,
      alpha: 1,
      translateY: translateY,
      zIndex: 2
    };
  }
});

module.exports = AngelFall;