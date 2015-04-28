var React = require('react');
var ReactCanvas = require('react-canvas');
var Group = ReactCanvas.Group;
var Text = ReactCanvas.Text;
var FontFace = ReactCanvas.FontFace;
var measureText = ReactCanvas.measureText;

var CONTENT_INSET = 12;
var LINEHEIGHT = 26;
var TEXT_SCROLL_SPEED_MULTIPLIER = 0.6;
var TEXT_ALPHA_SPEED_OUT_MULTIPLIER = 1.25;
var TEXT_ALPHA_SPEED_IN_MULTIPLIER = 2.6;
var IMAGE_LAYER_INDEX = 1;
var TEXT_LAYER_INDEX = 2;
var list = [];

var MultiLineText = React.createClass({

  propTypes: {
    data: React.PropTypes.string.isRequired,
    scrollTop: React.PropTypes.number.isRequired
    // style: React.PropTypes.object,
    // useBackingStore: React.PropTypes.bool
  },


  componentDidMount: function () {
    console.log('MultiLineText did mount',this.props.data);
    list = this.formatArticle(this.props.data); 
  },

  componentWillUnmount: function () {
    list = []; 
  },

  componentDidUpdate: function () {
  
  },

  render: function () {
    list = this.formatArticle(this.props.data); 
    console.log('This is MultiLineText rendering',this.props.data,list);
    return (
      <Group style={this.getTextGroupStyle()}>
        {list}
      </Group>
    );
  },
  renderText:function(text,index){
    console.log('MultiLineText cal text line');
    return (
      <Text style={this.getArticleStyle(text,index)} key={text.substring(0,2)+index}>{text}</Text>
    );
  },
  formatArticle:function(data){
    var self = this;
    var words = data.split('\n');
    var wordList = [];
    words.map(function(text,index){
      wordList.push(self.renderText(text,index));
    });
    return wordList;
  },
  getArticleStyle:function (text,index) {
    var _w = measureText(text,this.props.width,FontFace('Georgia, serif'),CONTENT_INSET,LINEHEIGHT).width;
    return {
      shadowColor:'#fff',
      color:'#fff',
      alpha:1,//this.getTweeningValue('alpha')
      left:(this.props.width - _w)/2,//(this.props.width - _w)/2
      width: _w,
      height:this.props.height,
      fontSize: CONTENT_INSET,
      lineHeight: LINEHEIGHT,
      top: this.props.height/5+(index+1)*LINEHEIGHT,//this.getTweeningValue('projectTop')+
      zIndex: 5,
      fontFace: FontFace('Georgia, serif'),
      textAlign:'center',
      textBaseline :'middle'
    };
  },
  getTextGroupStyle: function () {
    var translateY = 0;
    var alphaMultiplier = (this.props.scrollTop <= 0) ? -TEXT_ALPHA_SPEED_OUT_MULTIPLIER : TEXT_ALPHA_SPEED_IN_MULTIPLIER;
    var alpha = 1 - (this.props.scrollTop / this.props.height) * alphaMultiplier;
    alpha = Math.min(Math.max(alpha, 0), 1);
    translateY = -this.props.scrollTop * TEXT_SCROLL_SPEED_MULTIPLIER;
    return {
      width: this.props.width,
      height: this.props.height,
      left: 0,
      alpha: alpha,
      translateY: translateY,
      zIndex: 4,
      top:0,
    };
  }

});

module.exports = MultiLineText;