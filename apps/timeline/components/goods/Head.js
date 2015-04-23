/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;

var Image = ReactCanvas.Image;


var Head = React.createClass({
  componentWillMount: function() {
  },
  componentDidMount: function() {
  },
  render: function() {
    var imageStyle = this.getImageStyle();
    return (
      <Group style={this.getTextGroupStyle()}>
        <Image style={imageStyle} src='http://tp3.sinaimg.cn/1662625950/180/5704204700/0' fadeIn={true} useBackingStore={true} />
      </Group>
    );
  },

  // Styles
  // ======

  getImageStyle: function () {
    var _borderWidht = 7;
    return {
      top: this.props.height/2-this.props.HeadSize/2-50,
      left: this.props.width/2-this.props.HeadSize/2,
      width: this.props.HeadSize,
      height: this.props.HeadSize,
      zIndex: 3,
      borderRadius:this.props.HeadSize/2,
      borderWidth:_borderWidht,
      borderStyle:'solid',
      borderColor:'#40547a',
      rotate:30*Math.PI/180
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
      width: this.props.HeadSize,
      height: this.props.HeadSize,
      top: this.props.height/2-this.props.HeadSize/2-50,
      left: this.props.width/2-this.props.HeadSize/2,
      alpha: 0.8,
      translateY: translateY,
      zIndex: 2,
    };
  }
});

module.exports = Head;