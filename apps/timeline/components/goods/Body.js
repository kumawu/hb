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
    this.w = 1070*this.props.widthRatio;
    this.h = 917*this.props.heightRatio;
    return {
      bodyTop:this.props.height/2-this.h
    };
  },
  componentWillMount: function() {
    console.log('body componentWillMount');
  },
  componentDidUpdate:function(){
    console.log('body update',this.props.scrollTop,this.firstTime);
    if (this.props.scrollTop == 0 && this.firstTime == true) {
      var self = this;
      this.firstTime = false;
      console.log('This is Body call tweenState');
      this.tweenState('bodyTop', {
        easing: tweenState.easingTypes.easeInOutQuad,
        duration: 500,
        delay: 50,
        endValue: this.props.height / 2 - this.h / 4
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
      <Image style={imageStyle} src='../timeline/components/res/body.png' fadeIn={true} useBackingStore={true} />
    );
  },

  // Styles
  // ======

  getImageStyle: function () {
    return {
      top: this.getTweeningValue('bodyTop'),
      left: this.props.width/2-this.w/2,
      width: this.w,
      height: this.h,
      zIndex: 3,
    };
  }
});

module.exports = Body;