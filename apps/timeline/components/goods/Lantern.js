/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;
var Image = ReactCanvas.Image;
var tweenState = require('react-tween-state');
var lanternNum = 3;
var lanternItems = [];
var lanternElement = [];
var lightItems = [9,4,1];
var imageUrl = 'http://img.t.sinajs.cn/t4/apps/hb/static/img/lantern/';
var Lantern = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function () {
    return {
      alpha0:0.1,
      alpha1:0.1,
      alpha2:0.1,
      alpha3:0.1,
      alpha4:0.1,
      alpha5:0.1,
      alpha6:0.1,
      alpha7:0.1,
      alpha8:0.1,
    };
  },
  componentWillMount: function() {
    if(lanternItems.length == 0){
      lightItems.map(function(name,index){
        lanternItems.push({"index":index,"url":imageUrl+name+'.png',flag:false});
      })
      
      // for (var i = 0; i < lanternNum; i++) {
      //   lanternItems.push({"index":i,"url":imageUrl+(i+1)+'.png',flag:false});
      // }
    }
  },
  changeAlpha : function(){
    var self = this;
    var randomIndex = Math.floor(Math.random() * lanternNum);
    var randomTime = Math.random() * 1000;
    // console.log('lantern randomIndex',randomIndex);
    if (!lanternItems[randomIndex].flag) {
      // console.log('lantern randomIndex call alpha for',randomIndex);
      lanternItems[randomIndex].flag = true;
      this.tweenState('alpha' + randomIndex, {
        easing: tweenState.easingTypes.easeInOutQuad,
        duration: 500,
        delay: 100,
        endValue: 1,
        onEnd:function(){
          self.tweenState('alpha' + randomIndex, {
            easing: tweenState.easingTypes.easeInOutQuad,
            duration: 500,
            delay: 100,
            endValue: 0.1,
            onEnd:function(){
              lanternItems[randomIndex].flag = false;
            }
          });
        }
      });
    }
       
    setTimeout(function() {
      self.changeAlpha();
    }, randomTime);
  },
  regStop:function(){
    // var self = this;
    // setTimeout(function() {
    //   self.stopAni();
    // }, 50000);
  },
  stopAni:function(){
    // cancelAnimationFrame(this._pendingAnimationFrame);
    // clearTimeout(this.blinkLoop)
    items = [];
  },
  componentWillUnmount:function(){
    // this.stopAni();
    lanternItems=[];
    lanternElement = [];
  },
  componentDidMount: function() {
    this.firstTime = true;
  },
  componentDidUpdate:function(){
    // console.log('lantern update', this.props.scrollTop, this.firstTime);
    if (this.props.scrollTop == 0 && this.firstTime == true  && this.props.ANIMATIONON) {
      this.firstTime = false;
      this.changeAlpha();
    }
  },
  render: function() {
    // console.log('This is lantern rendering');
    if(this.props.scrollTop!==0){
      // this.stopAni();
    }
    var groupStyle = this.getGroupStyle();
    lanternElement = lanternItems.map(this.renderLanterns);
    // console.log('This is Lantern rendering',this.state,lanternItems.length);
    // lanternElement = lanternItems.map(this.renderLanterns);
    // console.log('lantern after rendering lanternElement',lanternElement);
    return (
      <Group style={groupStyle}>
        {lanternElement}
      </Group>
    );
  },
  renderLanterns : function (item) {
    var itemIndex = item.index;
    var style = this.getLanternStyle(itemIndex);
    return (
      <Image style = {style} src={lanternItems[itemIndex].url}  key={'lantern'+itemIndex} />
    )
  },

  // Styles
  // ======
  getLanternStyle:function(index){
    // console.log('getLanternStyle',index,this.getTweeningValue('alpha'+index));
    return {
      top: 0,
      left: 0,
      width: this.props.width,
      height: this.props.height,
      zIndex: 4,
      alpha:this.getTweeningValue('alpha'+index),//this.getTweeningValue('alpha'+itemIndex)
    };
  },
  getGroupStyle: function () {
    return {
      top: 0,
      left: 0,
      zIndex: 4,
      width: this.props.width,
      height: this.props.height
    };
  },
});

module.exports = Lantern;