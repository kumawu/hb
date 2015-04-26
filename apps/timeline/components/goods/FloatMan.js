/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;
var tweenState = require('react-tween-state');
var Image = ReactCanvas.Image;
var Body = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    this.w = 264*this.props.widthRatio;
    this.h = 184*this.props.heightRatio;
    return {
      left:0-this.w
    };
  },
  componentWillMount: function() {
    console.log('body componentWillMount');
  },
  componentDidUpdate:function(){
    console.log('float update',this.props.scrollTop,this.firstTime);
    if (this.props.scrollTop == 0 && this.firstTime == true) {
      var self = this;
      this.firstTime = false;
      console.log('This is floatman call tweenState');
      this.tweenState('left', {
        easing: tweenState.easingTypes.easeInOutQuad,
        duration: 1000,
        delay: 50,
        endValue: this.w / 4
      });
    }
  },
  componentDidMount: function() {
    this.firstTime = true;
  },
  render: function() {
    console.log('this is body rendering');
    var imageStyle = this.getImageStyle();
    return (
      <Image style={imageStyle} src='/apps/timeline/components/res/float.png' fadeIn={true} useBackingStore={true} />
    );
  },

  // Styles
  // ======

  getImageStyle: function () {
    return {
      top: this.props.height/2,
      left: this.getTweeningValue('left'),
      width: this.w,
      height: this.h,
      zIndex: 3,
    };
  }
});

module.exports = Body;