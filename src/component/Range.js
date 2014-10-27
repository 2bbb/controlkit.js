var ObjectComponent = require('../core/component/ObjectComponent');
var Default = require('../core/Default');
var Node = require('../core/document/Node');
var NodeType = require('../core/document/NodeType');
var NumberInput_Internal = require('./internal/NumberInput_Internal');
var CSS = require('../core/document/CSS');
var Event_ = require('../core/event/Event');
var EventType = require('../core/event/EventType');

function Range(parent,object,value,params)
{
    ObjectComponent.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    params          = params          || {};
    params.onChange = params.onChange || this._onChange;
    params.onFinish = params.onFinish || this._onFinish;

    params.step     = params.step || Default.RANGE_STEP;
    params.dp       = params.dp   || Default.RANGE_DP;

    /*---------------------------------------------------------------------------------*/

    this._onChange  = params.onChange;
    this._onFinish  = params.onFinish;

    var step = this._step = params.step,
        dp   = this._dp   = params.dp;

    /*---------------------------------------------------------------------------------*/

    //FIXME: history push pop

    var lablMinNode = new Node(NodeType.DIV);
    var inputMin    = this._inputMin = new NumberInput_Internal(step,dp,
                                                                           this.pushHistoryState.bind(this),
                                                                           this._onInputMinChange.bind(this),
                                                                           this._onInputMinFinish.bind(this));

    var lablMaxNode = new Node(NodeType.DIV);
    var inputMax    = this._inputMax = new NumberInput_Internal(step,dp,
                                                                           this.pushHistoryState.bind(this),
                                                                           this._onInputMaxChange.bind(this),
                                                                           this._onInputMaxFinish.bind(this));

    /*---------------------------------------------------------------------------------*/

    var wrapLablMin  = new Node(NodeType.DIV).setStyleClass(CSS.Wrap),
        wrapInputMin = new Node(NodeType.DIV).setStyleClass(CSS.Wrap),
        wrapLablMax  = new Node(NodeType.DIV).setStyleClass(CSS.Wrap),
        wrapInputMax = new Node(NodeType.DIV).setStyleClass(CSS.Wrap);


        lablMinNode.setStyleClass(CSS.Label).setProperty('innerHTML','MIN');
        lablMaxNode.setStyleClass(CSS.Label).setProperty('innerHTML','MAX');

    /*---------------------------------------------------------------------------------*/

    var values = this._object[this._key];

    inputMin.setValue(values[0]);
    inputMax.setValue(values[1]);

    /*---------------------------------------------------------------------------------*/

    var wrapNode = this._wrapNode;

        wrapLablMin.addChild(lablMinNode);
        wrapInputMin.addChild(inputMin.getNode());
        wrapLablMax.addChild(lablMaxNode);
        wrapInputMax.addChild(inputMax.getNode());

        wrapNode.addChild(wrapLablMin);
        wrapNode.addChild(wrapInputMin);
        wrapNode.addChild(wrapLablMax);
        wrapNode.addChild(wrapInputMax);
};

Range.prototype = Object.create(ObjectComponent.prototype);

/*---------------------------------------------------------------------------------*/

Range.prototype._onInputChange = function()
{
    this.dispatchEvent(new Event_(this,EventType.VALUE_UPDATED,null));
    this._onChange();
};

Range.prototype._onInputFinish = function()
{
    this.dispatchEvent(new Event_(this,EventType.VALUE_UPDATED,null));
    this._onFinish();
};

/*---------------------------------------------------------------------------------*/

Range.prototype._updateValueMin = function()
{
    var values     = this._object[this._key];

    var inputMin   = this._inputMin,
        inputValue = inputMin.getValue();

    if(inputValue >= this._inputMax.getValue()){inputMin.setValue(values[0]);return;}
    values[0] = inputValue;

};

Range.prototype._updateValueMax = function()
{
    var values     = this._object[this._key];

    var inputMax   = this._inputMax,
        inputValue = inputMax.getValue();

    if(inputValue <= this._inputMin.getValue()){inputMax.setValue(values[1]);return;}
    values[1] = inputValue;
};

/*---------------------------------------------------------------------------------*/

Range.prototype.onValueUpdate = function(e)
{
    if(e.data.origin == this)return;

    if(e.data.origin == null)
    {
        //console.log('undo: ' + History.getInstance().getState(this._object,this._key));
    }

    //console.log(History.getInstance().getState(this._object,this._key));

    var values = this._object[this._key];

    this._inputMin.setValue(this._object[this._key][0]);
    this._inputMax.setValue(this._object[this._key][1]);
};


Range.prototype._onInputMinChange = function(){this._updateValueMin();this._onInputChange();};
Range.prototype._onInputMinFinish = function(){this._updateValueMin();this._onInputFinish();};
Range.prototype._onInputMaxChange = function(){this._updateValueMax();this._onInputChange();};
Range.prototype._onInputMaxFinish = function(){this._updateValueMax();this._onInputFinish();};


module.exports = Range;


//ControlKit.Range = function(parent,object,value,params)
//{
//    ControlKit.ObjectComponent.apply(this,arguments);
//
//    /*---------------------------------------------------------------------------------*/
//
//    params          = params          || {};
//    params.onChange = params.onChange || this._onChange;
//    params.onFinish = params.onFinish || this._onFinish;
//
//    params.step     = params.step || ControlKit.Default.RANGE_STEP;
//    params.dp       = params.dp   || ControlKit.Default.RANGE_DP;
//
//    /*---------------------------------------------------------------------------------*/
//
//    this._onChange  = params.onChange;
//    this._onFinish  = params.onFinish;
//
//    var step = this._step = params.step,
//        dp   = this._dp   = params.dp;
//
//    /*---------------------------------------------------------------------------------*/
//
//    //FIXME: history push pop
//
//    var lablMinNode = new ControlKit.Node(ControlKit.NodeType.DIV);
//    var inputMin    = this._inputMin = new ControlKit.NumberInput_Internal(step,dp,
//                                                                           this.pushHistoryState.bind(this),
//                                                                           this._onInputMinChange.bind(this),
//                                                                           this._onInputMinFinish.bind(this));
//
//    var lablMaxNode = new ControlKit.Node(ControlKit.NodeType.DIV);
//    var inputMax    = this._inputMax = new ControlKit.NumberInput_Internal(step,dp,
//                                                                           this.pushHistoryState.bind(this),
//                                                                           this._onInputMaxChange.bind(this),
//                                                                           this._onInputMaxFinish.bind(this));
//
//    /*---------------------------------------------------------------------------------*/
//
//    var wrapLablMin  = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.Wrap),
//        wrapInputMin = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.Wrap),
//        wrapLablMax  = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.Wrap),
//        wrapInputMax = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.Wrap);
//
//
//        lablMinNode.setStyleClass(ControlKit.CSS.Label).setProperty('innerHTML','MIN');
//        lablMaxNode.setStyleClass(ControlKit.CSS.Label).setProperty('innerHTML','MAX');
//
//    /*---------------------------------------------------------------------------------*/
//
//    var values = this._object[this._key];
//
//    inputMin.setValue(values[0]);
//    inputMax.setValue(values[1]);
//
//    /*---------------------------------------------------------------------------------*/
//
//    var wrapNode = this._wrapNode;
//
//        wrapLablMin.addChild(lablMinNode);
//        wrapInputMin.addChild(inputMin.getNode());
//        wrapLablMax.addChild(lablMaxNode);
//        wrapInputMax.addChild(inputMax.getNode());
//
//        wrapNode.addChild(wrapLablMin);
//        wrapNode.addChild(wrapInputMin);
//        wrapNode.addChild(wrapLablMax);
//        wrapNode.addChild(wrapInputMax);
//};
//
//ControlKit.Range.prototype = Object.create(ControlKit.ObjectComponent.prototype);
//
///*---------------------------------------------------------------------------------*/
//
//ControlKit.Range.prototype._onInputChange = function()
//{
//    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.VALUE_UPDATED,null));
//    this._onChange();
//};
//
//ControlKit.Range.prototype._onInputFinish = function()
//{
//    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.VALUE_UPDATED,null));
//    this._onFinish();
//};
//
///*---------------------------------------------------------------------------------*/
//
//ControlKit.Range.prototype._updateValueMin = function()
//{
//    var values     = this._object[this._key];
//
//    var inputMin   = this._inputMin,
//        inputValue = inputMin.getValue();
//
//    if(inputValue >= this._inputMax.getValue()){inputMin.setValue(values[0]);return;}
//    values[0] = inputValue;
//
//};
//
//ControlKit.Range.prototype._updateValueMax = function()
//{
//    var values     = this._object[this._key];
//
//    var inputMax   = this._inputMax,
//        inputValue = inputMax.getValue();
//
//    if(inputValue <= this._inputMin.getValue()){inputMax.setValue(values[1]);return;}
//    values[1] = inputValue;
//};
//
///*---------------------------------------------------------------------------------*/
//
//ControlKit.Range.prototype.onValueUpdate = function(e)
//{
//    if(e.data.origin == this)return;
//
//    if(e.data.origin == null)
//    {
//        //console.log('undo: ' + ControlKit.History.getInstance().getState(this._object,this._key));
//    }
//
//    //console.log(ControlKit.History.getInstance().getState(this._object,this._key));
//
//    var values = this._object[this._key];
//
//    this._inputMin.setValue(this._object[this._key][0]);
//    this._inputMax.setValue(this._object[this._key][1]);
//};
//
//
//ControlKit.Range.prototype._onInputMinChange = function(){this._updateValueMin();this._onInputChange();};
//ControlKit.Range.prototype._onInputMinFinish = function(){this._updateValueMin();this._onInputFinish();};
//ControlKit.Range.prototype._onInputMaxChange = function(){this._updateValueMax();this._onInputChange();};
//ControlKit.Range.prototype._onInputMaxFinish = function(){this._updateValueMax();this._onInputFinish();};
//
//
//