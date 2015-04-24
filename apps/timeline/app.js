/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Page = require('./components/Page');
var Page1 = require('./components/Page1');
var Page2 = require('./components/Page2');
var Page3 = require('./components/Page3');
var Page4 = require('./components/Page4');
// var articles = require('../common/data');

var Surface = ReactCanvas.Surface;
var ListView = ReactCanvas.ListView;
var pages = [Page1,Page2,Page3,Page4];
var App = React.createClass({
  
  render: function () {
    
    var size = this.getSize();
    console.log('this is app rendering',size.height);
    return (
      <Surface top={0} left={0} width={size.width} height={size.height}>
        <ListView
          style={this.getListViewStyle()}
          snapping={true}
          scrollingDeceleration={0.92}
          scrollingPenetrationAcceleration={0.13}
          numberOfItemsGetter={this.getNumberOfPages}
          itemHeightGetter={this.getPageHeight}
          itemGetter={this.renderPage} />
      </Surface>
    );
  },

  renderPage: function (pageIndex, scrollTop) {
    var size = this.getSize();
    // var article = articles[pageIndex % articles.length];
    var pageScrollTop = pageIndex * this.getPageHeight() - scrollTop;
    var widthRatio = size.width/1242;
    var heightRatio = size.height/2208;
    return (
      <Page
        width={size.width}
        height={size.height}
        widthRatio={widthRatio}
        heightRatio={heightRatio}
        pageIndex={pageIndex}
        container={pages[pageIndex]}
        scrollTop={pageScrollTop} />
    );
  },

  getSize: function () {
    return document.getElementById('main').getBoundingClientRect();
  },

  // ListView
  // ========

  getListViewStyle: function () {
    var size = this.getSize();
    return {
      top: 0,
      left: 0,
      width: size.width,
      height: size.height
    };
  },

  getNumberOfPages: function () {
    return pages.length;
  },

  getPageHeight: function () {
    return this.getSize().height;
  }

});

React.render(<App />, document.getElementById('main'));
