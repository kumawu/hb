/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;
var tweenState = require('react-tween-state');
var Image = ReactCanvas.Image;


var Constellation = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    return {
      alpha:0,
      top:0-this.props.height
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
    var _endTop = 97*this.props.heightRatio;
    this.tweenState('top', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 1000,
      delay:500,
      endValue: _endTop
    });
  },
  render: function() {
    // console.log('this is constellation rendering');
    var imageStyle = this.getImageStyle();
    return (
      <Image style={imageStyle} src='/apps/timeline/components/res/taurus.png' fadeIn={true} useBackingStore={true} />
    );
  },

  // Styles
  // ======

  getImageStyle: function () {
    this.width = 473 * this.props.widthRatio;
    this.height = 460 * this.props.heightRatio;
    return {
      top: this.getTweeningValue('top'),
      left: 520*this.props.widthRatio,
      width: this.width,
      height: this.height,
      zIndex: 5,
      alpha:this.getTweeningValue('alpha')
    };
  }
});

module.exports = Constellation;