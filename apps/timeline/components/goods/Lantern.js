/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;
var Image = ReactCanvas.Image;
var tweenState = require('react-tween-state');
var lanternNum = 9;
var lanternItems = [];
var lanternElement = [];
var lanternElement = [];
var imageUrl = '../timeline/components/res/lantern/';
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
      for (var i = 0; i < lanternNum; i++) {
        lanternItems.push({"index":i,"url":imageUrl+(i+1)+'.png',flag:false});
      }
    }
  },
  changeAlpha : function(){
    var self = this;
    var randomIndex = Math.ceil(Math.random() * (lanternNum-1));
    var randomTime = Math.random() * 200;
    console.log('lantern randomIndex',randomIndex);
    if (!lanternItems[randomIndex].flag) {
      console.log('lantern randomIndex call alpha for',randomIndex,lanternItems[randomIndex]);
      lanternItems[randomIndex].flag = true;
      this.tweenState('alpha' + randomIndex, {
        easing: tweenState.easingTypes.easeInOutQuad,
        duration: 5000,
        delay: 100,
        endValue: 1,
        onEnd:function(){
          lanternItems[randomIndex].flag = false;
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
    if (this.props.scrollTop == 0 && this.firstTime == true) {
      this.firstTime = false;
      this.changeAlpha();
    }
  },
  render: function() {
    // console.log('This is lantern rendering');
    if(this.props.scrollTop!==0){
      // this.stopAni();
    }
    var self = this;
    // console.log('This is Lantern rendering',this.state,lanternItems.length);
    lanternElement = lanternItems.map(this.renderLanterns);
    console.log('lantern after rendering lanternElement',lanternElement);
    return (
      <Group style={this.getTextGroupStyle()} useBackingStore={true}>
        {lanternElement}
      </Group>
    );
  },
  renderLanterns : function (item) {
    var itemIndex = item.index;
    var item;
    var style = {
      top: 0,
      left: 0,
      width: this.props.width,
      height: this.props.height,
      zIndex: 4,
      alpha:this.getTweeningValue('alpha'+itemIndex),//this.getTweeningValue('alpha'+itemIndex)
    };
    if(!lanternElement[itemIndex]){
      item = this.createImage(lanternItems[itemIndex],style,itemIndex);
    }else{
      item = lanternElement[itemIndex];
      console.log('lantern renderLanterns item',itemIndex,this.getTweeningValue('alpha'+itemIndex),lanternItems[itemIndex].flag);
      item.props.style = style;
    }
    var srcUrl = lanternItems[itemIndex].url;
    // console.log('lantern renderLanterns',itemIndex,this.state['alpha'+itemIndex],srcUrl);
    // console.log('lantern renderLanterns',lanternItems,itemIndex,lanternItems[itemIndex]);
    // console.log('lantern renderLanterns',item);
    return item;
  },

  createImage:function(opt,style,index){
    console.log('lantern createImage',index,opt);
    return (
      <Image src={opt.url}  style = {style} key={'lantern'+index} />
    )
  },

  // Styles
  // ======
  
  getTextGroupStyle: function () {
    return {
      width: this.props.width,
      height: this.props.height,
      top: 0,
      left: 0,
      alpha: 1,
      zIndex: 2
    };
  }
});

module.exports = Lantern;