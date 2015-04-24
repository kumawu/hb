/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var tweenState = require('react-tween-state');
var Group = ReactCanvas.Group;
var Image = ReactCanvas.Image;

var Tree = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    return {
      alpha:0,
      // top:this.props.height/2
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
    // var _endTop = this.props.height - 668*this.props.heightRatio;
    // this.tweenState('top', {
    //   easing: tweenState.easingTypes.easeInOutQuad,
    //   duration: 1000,
    //   delay:500,
    //   endValue: _endTop
    // });
  },
  render: function() {
    // console.log('this is Tree rendering');
    var imageStyle = this.getImageStyle();
    return (
      <Image style={imageStyle} src='/apps/timeline/components/res/tree.png' fadeIn={true} useBackingStore={true} />
    );
  },

  // Styles
  // ======

  getImageStyle: function () {
    this.width = 332 * this.props.widthRatio;
    this.height = 397 * this.props.heightRatio;
    // console.log(this.props.widthRatio,this.props.heightRatio);
    return {
      top: this.props.height - 668*this.props.heightRatio,//this.getTweeningValue('top'),
      left: this.props.width/2-this.width/2,
      width: this.width,
      height: this.height,
      zIndex: 3,
      alpha:this.getTweeningValue('alpha')
    };
  }
});

module.exports = Tree;