/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;
var tweenState = require('react-tween-state');

var Image = ReactCanvas.Image;


var Ground = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    return {
      alpha:0
      // top:this.props.height
    };
  },
  componentWillMount: function() {
  },
  componentDidMount: function() {
    this.tweenState('alpha', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 1000,
      delay:500,
      endValue: 1
    });
    // var _endTop = this.props.height - this.height;
    // this.tweenState('top', {
    //   easing: tweenState.easingTypes.easeInOutQuad,
    //   duration: 1000,
    //   delay:500,
    //   endValue: _endTop
    // });
  },
  render: function() {
    // console.log('this is Ground rendering');
    var imageStyle = this.getImageStyle();
    return (
      <Image style={imageStyle} src='../timeline/components/res/ground.png' fadeIn={true} useBackingStore={true} />
    );
  },

  // Styles
  // ======

  getImageStyle: function () {
    this.width = 1242 * this.props.widthRatio;
    this.height = 570 * this.props.heightRatio;
    // console.log(this.props.widthRatio,this.props.heightRatio);
    return {
      top: this.props.height - this.height,//this.getTweeningValue('top'),
      left: this.props.width/2-this.width/2,
      width: this.width,
      height: this.height,
      zIndex: 2,
      alpha:this.getTweeningValue('alpha')
    };
  }
});

module.exports = Ground;