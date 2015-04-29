/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;
var tweenState = require('react-tween-state');
var Text = ReactCanvas.Text;
var FontFace = ReactCanvas.FontFace;
var measureText = ReactCanvas.measureText;
var StarsNum = 50;
var items = [];
var angel = [];
var renderTimes = 0;
var _tempArr=[];
var starSize = 3;
var clearTime,fallingLoop;
var direction = 8;
var Angel = React.createClass({
  getInitialState: function () {
    return {
      fStarsPosTop:0,
      fStarsPosLeft:0,
      fStarsAlpha:1
    };
  },
  componentWillMount: function() {
    // console.log('angel componentWillMount');
    for (var i = 0; i < StarsNum; i++) {
      items.push(this.renderStar(i,'angel'+i));
    }
  },

  falling : function(){
    // this.fallingLock=true;
    var _normalSpeed = 2;
    var _newTop = this.state.fStarsPosTop + _normalSpeed;
    var _newLeft = this.state.fStarsPosLeft + _normalSpeed*direction;

    if (_newTop >= this.props.height+StarsNum || _newLeft >= this.props.width+StarsNum) {
      cancelAnimationFrame(this._pendingAnimationFrame);
      // this.fallingLock = false;
      var _initTop = Math.random() * this.props.height / 1.7;
      var _initLeft = Math.random() * this.props.width / 1.5;
      console.log('This is Angel call setState');
      this.setState({
        fStarsPosTop: _initTop,
        fStarsPosLeft: _initLeft,
        fStarsAlpha:0
      });
      clearTime = setTimeout(this.falling, 3000);
    } else {
      renderTimes++;
      _tempArr.unshift({
        l: _newLeft,
        t: _newTop
      });
      if (_tempArr.length > StarsNum) {
        _tempArr.pop();
      }
      this.setState({
        fStarsPosTop: _newTop,
        fStarsPosLeft: _newLeft,
        fStarsAlpha: 1
      });
      // this._pendingAnimationFrame = requestAnimationFrame(this.falling);
      fallingLoop = setTimeout(this.falling,40)
    }
    this.regStop();
  },
  regStop:function(){
    var self = this;
    setTimeout(function() {
      self.stopAni();
    }, 50000);
  },
  stopAni:function(){
    if (clearTime) {
      clearTimeout(clearTime);
    }
    _tempArr = [];
    // cancelAnimationFrame(this._pendingAnimationFrame);
    clearTimeout(fallingLoop);
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
  componentWillUnmount:function(){
    // console.log('angel unmount');
    this.stopAni();
    items = [];
  },
  render: function() {
    // console.log('angel render',_tempArr.length,items.length);
    // if(this.props.scrollTop!==0){
    //   this.stopAni();
    // }
    var self = this;
    // renderTimes++;
    for (var i = 0, l = _tempArr.length; i < l; i++) {
      // console.log('iiiiiiiiiii',i,StarsNum);
      var item = items[i];
      var index = i;
      //用rendertime进行优化
      item.props.style.left = _tempArr[0].l - item.props.style.fontSize * i;
      item.props.style.top = _tempArr[0].t - item.props.style.fontSize * (i / direction);
      item.props.style.alpha = 1;
      item.props.style.alpha = 1 - item.props.style.left / this.props.width;

    }
    return (
      <Group style={this.getTextGroupStyle()}>
        {items}
      </Group>
    );
  },
  renderStar : function (index,key) {
    return (
      <Text style = {this.getfStarStyle(index)} key={key} > . < /Text>
    );
  },

  // Styles
  // ======
  getfStarStyle: function(index) {
    var ratio = tweenState.easingTypes.easeOutCubic(index,0,starSize-1,StarsNum); 
    //easeInCubic: function(t, b, _c, d) {
      // t: current time, b: beginning value, _c: final value, d: total duration
    var size = starSize-ratio;
    return {
      alpha:1,//this.state.starsAlpha
      backgroundColor:'#fff',
      shadowColor: '#999',
      shadowBlur:20,
      borderRadius:size/2,
      left: this.state.fStarsPosLeft,
      width: size,
      height: size,
      fontSize: size,
      lineHeight: size,
      top: this.state.fStarsPosTop,
      color: '#fff',
      fontFace: FontFace('Avenir Next Condensed, Helvetica, sans-serif', null, {
        weight: 500
      })
    };
  },
  
  getTextGroupStyle: function () {
    var translateY = 0;
    return {
      width: this.props.width,
      height: this.props.height/1.5,
      top: 0,
      left: 0,
      alpha: 1,
      translateY: translateY,
      zIndex: 2
    };
  }
});

module.exports = Angel;