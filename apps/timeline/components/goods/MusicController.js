/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var tweenState = require('react-tween-state');
var Group = ReactCanvas.Group;
var Image = ReactCanvas.Image;
var onIcon = '/apps/timeline/components/res/musicon.png';
var offIcon = '/apps/timeline/components/res/musicoff.png'
var MusicController = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    return {
      icon:onIcon
    };
  },
  componentWillMount: function() {
  },
  componentDidMount: function() {
   
  },
  render: function() {
    // console.log('this is Tree rendering');
    var musicIconStyle = this.getMusicIconStyle();
    var handleClick = this.handleClick;
    var grounStyle = this.getGroupStyle();
    return (
      <Group style={grounStyle} onClick={handleClick}>
        <Image style={musicIconStyle} onClick={handleClick} src={this.state.icon} fadeIn={true} useBackingStore={true} />
      </Group>
    );
  },

  // Styles
  // ======
  handleClick:function(e){
    var music = document.getElementById('music');
    if(music.getAttribute('mute') == null||music.getAttribute('mute') == 'false'){
      music.pause();
      music.muted=true;
     music.setAttribute('mute',true);
      // this.setState('icon',offIcon);
    }else{
      music.play();
      music.muted=false;
      music.setAttribute('mute',false);
      // this.setState('icon',onIcon);
    }
  },
  getMusicIconStyle: function () {
    return {
      top: 49*this.props.heightRatio,
      left: 1111*this.props.widthRatio,
      width: 80*this.props.widthRatio,
      height: 80*this.props.heightRatio,
      zIndex: 5,
      alpha: 1
    };
  },
  getGroupStyle: function () {
    return {
      width: this.props.width/5,
      height: 160*this.props.heightRatio,
      top: 0,
      left: this.props.width*4/5,
      alpha: 1,
      zIndex: 3
    };
  }
});

module.exports = MusicController;