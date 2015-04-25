/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;
var Text = ReactCanvas.Text;
var FontFace = ReactCanvas.FontFace;
var measureText = ReactCanvas.measureText;
var StarsNum = 10;
var items = [];
var Bubble = React.createClass({
  getInitialState: function () {
    return {
      starsTop:0
    };
  },
  componentWillMount: function() {
    for (var i = 0; i < StarsNum; i++) {
      var titleStyle = this.getTitleStyle();
      console.log('calculating bubble postion');
      items.push(this.renderStar('bubble'+i, titleStyle));
    }
    this.firstTime = true;
    console.log('bubble willMount');
  },
  changeTop : function(){
    console.log('bubble change Top',this.props.scrollTop);

    var self = this;
    var _top = 0;
    items.map(function(item){
      _top = item.props.style.top*1-0.5;
      item.props.style.alpha = 0.4;
      if(_top <= self.props.height/2-140){
        item.props.style.alpha = 0;
        _top = Math.random()*self.props.height/5+self.props.height/2;
      }
      console.log('bubble items',_top,item.props.style.top);
      item.props.style.top = _top;
      
    });
    
    console.log('This is Bubble call setState');
    this.setState({starsTop:_top});
    //待检测是否有重复
    // this._pendingAnimationFrame= requestAnimationFrame(this.changeTop);
    setTimeout(this.changeTop,40);
    this.regStop();
  },
  regStop:function(){
    var self = this;
    setTimeout(this.stopAni, 50000);
  },
  stopAni:function(){
    console.log('bubble stop ani');
    cancelAnimationFrame(this._pendingAnimationFrame);
  },
  componentWillUnmount:function(){
    console.log('bubble unmount');
    this.stopAni();
    items=[];
  },
  componentDidMount: function() {
    this.firstTime = true;
    console.log('bubble did mount');
  },
  componentDidUpdate:function(){
    console.log('bubble update');
    if (this.props.scrollTop == 0 && this.firstTime == true && this.props.ANIMATIONON) {
      this.firstTime = false;
      this.changeTop();
    }
  },
  render: function() {
    console.log('This Bubble rendering.',items,(items.length != 0)?items[0].props.style.top:0,this.props.scrollTop);
    if(this.props.scrollTop!==0){
      this.stopAni();
    }
    return (
      <Group style={this.getTextGroupStyle()} useBackingStore={false}>
        {items}
      </Group>
    );
  },
  renderStar : function (index,titleStyle) {
    return (
      <Text style = {titleStyle} key={index} >o< /Text>
    );
  },

  // Styles
  // ======
  
  getTitleStyle: function() {
    var size = Math.ceil(Math.random()*10);
    return {
      alpha:.4,
      backgroundColor:'#fff',
      shadowColor: '#fff',
      shadowBlur:10,
      borderRadius:size/2,//size/2
      left: Math.random()*this.props.width/2+this.props.width/4,
      width: size,
      height: size,
      fontSize: size,
      lineHeight: size,
      top: Math.random()*this.props.height/2+this.props.height/5,
      color: '#fff',
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

module.exports = Bubble;