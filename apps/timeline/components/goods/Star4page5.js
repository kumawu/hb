/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;
var Text = ReactCanvas.Text;
var FontFace = ReactCanvas.FontFace;
var measureText = ReactCanvas.measureText;
var StarsNum = 30;
var items = [];
var Star4page5 = React.createClass({
  getInitialState: function () {
    return {
      starsTop:0
    };
  },
  componentWillMount: function() {
    for (var i = 0; i < StarsNum; i++) {
      var titleStyle = this.getTitleStyle();

      console.log('calculating star4page5 postion',titleStyle);
      items.push(this.renderStar('star4page5'+i, titleStyle));
    }
    this.firstTime = true;
    console.log('star4page5 willMount');
  },
  changeDirection : function(d,step){
    var attr = 'top';
    var _step = 0;
    if(d=='left'){
      attr = 'left';
      _step = 0-step*1;
    }else if(d=='right'){
      attr = 'left';
      _step = step;
    }
    console.log('Star4page5 change ',attr);

    var self = this;
    var _newValue = 0;
    items.map(function(item){
      _newValue = item.props.style[attr]*1+_step;
      // item.props.style.alpha = 0.4;//do u need fadein?
      if(_newValue <= 0){
        // item.props.style.alpha = 0;
        _newValue = self.props.width;
      }
      console.log('Star4page5 items',attr,_newValue,item.props.style[attr]);
      item.props.style[attr] = _newValue;
      
    });
    
    console.log('This is star4page5 call setState');
    this.setState({starsTop:_newValue});
    //待检测是否有重复
    this._pendingAnimationFrame= requestAnimationFrame(function(){
      self.changeDirection(d,step);
    });
    // setTimeout(function(){
    //   self.changeDirection(d,step)
    // },40);
    this.regStop();
  },
  regStop:function(){
    var self = this;
    setTimeout(this.stopAni, 50000);
  },
  stopAni:function(){
    console.log('star4page5 stop ani');
    cancelAnimationFrame(this._pendingAnimationFrame);
  },
  componentWillUnmount:function(){
    console.log('star4page5 unmount');
    this.stopAni();
    items=[];
  },
  componentDidMount: function() {
    this.firstTime = true;
    console.log('star4page5 did mount');
  },
  componentDidUpdate:function(){
    console.log('star4page5 update');
    if (this.props.scrollTop == 0 && this.firstTime == true && this.props.ANIMATIONON) {
      this.firstTime = false;
      this.changeDirection('left',2);
    }
  },
  render: function() {
    console.log('This Star4page5 rendering.',items,(items.length != 0)?items[0].props.style.top:0,this.props.scrollTop);
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
      <Text style = {titleStyle} key={index} >.< /Text>
    );
  },

  // Styles
  // ======
  
  getTitleStyle: function() {
    var size = Math.ceil(Math.random()*20);
    return {
      alpha:.4,
      shadowColor: '#fff',
      shadowBlur:10,
      borderRadius:size/2,//size/2
      left: Math.random()*this.props.width/2,
      width: size,
      height: size,
      fontSize: size,
      lineHeight: size,
      top: Math.random()*this.props.height/2+this.props.height/5,
      color: '#fff',
      zIndex: 1,
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

module.exports = Star4page5;