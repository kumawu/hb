/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;
var tweenState = require('react-tween-state');
var Text = ReactCanvas.Text;
var FontFace = ReactCanvas.FontFace;
var measureText = ReactCanvas.measureText;
var CONTENT_INSET = 12;
var LINEHEIGHT = 20;
var renderTimes = 0;
var clearTime,fallingLoop;
var Arrow = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    this.initTop = this.props.height-3*CONTENT_INSET;
    return {
      alpha:1,
      top:this.initTop
    };
  },
  componentWillMount: function() {
   
  },
  shine:function(){
    console.log('shine');
    var duration1 = 2000;
    var delay1 = 1000;
    var self = this;
    this.tweenState('top', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: duration1,
      delay:delay1,
      endValue: this.props.height,
      onEnd:function(){
        self.tweenState('top', {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: 20,
          delay:0,
          endValue: self.initTop
        });
        self.tweenState('alpha', {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: 500,
          delay:20,
          endValue: 1,
          onEnd:function(){
            self.shine();
          }
        });
      }
    });
    this.tweenState('alpha', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: duration1,
      delay:delay1,
      endValue: 0
    });
  },
 
  componentDidMount: function() {
    this.firstTime = true;
  },
  componentDidUpdate:function(){
    if (this.props.scrollTop == 0 && this.firstTime == true && this.props.ANIMATIONON) {
      this.firstTime = false;
      this.shine();
    }
  },
  componentWillUnmount:function(){
    // console.log('angel unmount');
  },
  render: function() {
    // console.log('angel render',_tempArr.length,items.length);
    if(this.props.scrollTop!==0){
      // this.stopAni();
    }
    
    return (
      <Group style={this.getTextGroupStyle()}>
        <Text style = {this.getfStarStyle()}> ∨< /Text>
      </Group>
    );
  },
 

  // Styles
  // ======
  getfStarStyle: function() {
    return {
      alpha:this.getTweeningValue('alpha'),//this.state.starsAlpha
      shadowColor: '#999',
      shadowBlur:20,
      left: 0,
      width: this.props.width,
      height: CONTENT_INSET,
      fontSize: CONTENT_INSET,
      lineHeight: LINEHEIGHT,
      top: this.getTweeningValue('top'),
      color: '#fff',
      textAlign:'center',
      textBaseline :'middle',
      zIndex: 4
    };
  },
  
  getTextGroupStyle: function () {
    return {
      width: this.props.width,
      height: this.props.height,
      top: 0,
      left: 0,
      alpha: 1,
      zIndex: 3
    };
  }
});

module.exports = Arrow;