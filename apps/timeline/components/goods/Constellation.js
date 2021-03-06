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
      top:0
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
    // var _endTop = 97*this.props.heightRatio;
    // this.tweenState('top', {
    //   easing: tweenState.easingTypes.easeInOutQuad,
    //   duration: 1000,
    //   delay:500,
    //   endValue: _endTop
    // });
  },
  render: function() {
    var imageStyle = this.getImageStyle();
    var cons = 'http://img.t.sinajs.cn/t4/apps/hb/static/img/'+$CONFIG["constellation"]+'.png';
        console.log('this is constellation rendering',cons);

    return (
      <Image style={imageStyle} src={cons} fadeIn={true} useBackingStore={true} />
    );
  },

  // Styles
  // ======

  getImageStyle: function () {
    this.width = 1242 * this.props.widthRatio;
    this.height = 2280 * this.props.heightRatio;
    return {
      top: 0,
      left: 0,
      width: this.width,
      height: this.height,
      zIndex: 5,
      alpha:this.getTweeningValue('alpha')
    };
  }
});

module.exports = Constellation;