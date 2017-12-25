/**********/
/****
 * 这是一个自己封装的可以通过‘自定义模板’来添加html的小功能
 * 仅用来添加模板，不对其中数据做修改，如需做初始化数据，请在回调函数中进行自定义配置
 * 
 * 注意：
 * 	1.需要传入模板中需要替换的字符串，‘尽量用特殊标记标出’，这里采用的是字符串替换，并不是正则匹配
 *  	2.必须写上ROW_NUMB TEMPLATE等默认参数，这些参数是默认替换的，用以标记行号及行类型
 *	(默认参数有:data-rowtype="TEMPLATE"   data-rownumb="ROW_NUMB"  data-rowbtn="BTN_ROW" BTN_ROW_VALUE)
 *
 * 使用：
 * 	html：
 * 		<div name='WRAPPER' class='row editRow-hook'>
 * 			<div data-rowType='TEMPLATE' data-rowNumb="ROW_NUMB" hidden class="clearfix mb-5">
 * 				<div class='col-sm-2'>
 * 					<input name='NEED_REPLACE_VALUE' value='NEED_REPLACE_VALUE' class='form-control'></input>
 * 				</div>
 * 				<div class='col-sm-1'>
 * 					<button type='button' class='btn btn-success col-sm-9 text-center' data-rowBtn='BTN_ROW'>BTN_ROW_VALUE</button>
 * 				</div>
 * 			</div>
 * 		</div>
 *
 * 	js:
 * 		改成了jquery插件，也可以直接调用addTemplateRow函数本身，需要添加传入的element参数（稍微修改一下源代码）
 * 		$('div[name=WRAPPER]').addTemplateRow({
 *			addRowDatas:{
 *				"BTN_ROW":'DEL',
 *				"BTN_ROW_VALUE":'-'
 *			},
 *			initRows_length:Number,//初始化时，需要的行数
 *			initRows_callback:function(currentRow){},//初始化时，添加行的回调函数(用于修改初始化行中的参数)
 *			addCallback:function(currentRow){},//添加行时的回调函数
 *			delCallback:function(currentRow){}//删除行时的回调函数
 * 		})
 * ******/
/**********/

jQuery.fn.extend({
	addTemplateRow
});


/* addTemplateRow  */
function addTemplateRow(option){
	//默认配置
	var _default_option = {
		addRowDatas:{},
		initRows_length:1,
		initRows_callback:function(){},
                addCallback:function(){},
                delCallback:function(){}
	}
	//整合传入的配置参数
	var _option = Object.assign({},_default_option,option);
	
	var _elWrapper = $(this),
	        _template = _elWrapper.find('>div[data-rowType=TEMPLATE]')[0].outerHTML,
	        _rowBtns = _elWrapper.find('[data-rowBtn]');
	var _replaceOption = _option.addRowDatas,
		_initRows_length = _option.initRows_length,
		_initRows_callback = _option.initRows_callback;
	        _addCallback = option.addCallback,
	        _delCallback = option.delCallback;

	//初始化行数
	for(var i=0;i<_initRows_length;i++){
		var replaceOption = _replaceOption;
		var count = i;
		if(i==0){
			replaceOption = Object.assign({},{
				"BTN_ROW_VALUE":'+',
				"BTN_ROW":'ADD',
			});
		}
		replaceOption['ROW_NUMB'] = count;//添加行号	
		var template = _dealTemplate(_template,replaceOption);//获得处理后的模板
                _addRow(_elWrapper,template,_initRows_callback);//调用添加函数
		_elWrapper.find('>div[data-rowType=ROW]').show();//让添加的行都显示
	}

	//添加事件
	_elWrapper.on('click','div[data-rowType] [data-rowBtn]',function(){
	        var btnType = $(this)[0].dataset.rowbtn.toLowerCase();
	        if(btnType =='add'){
	                var template = _dealTemplate(_template,_replaceOption);
	                _elWrapper.append(template);
	                _elWrapper.find('>div[data-rowType=ROW]').show();
	                if(_addCallback){
	                        _addCallback();
	                }
	        }else if(btnType =='del'){
	                var thisRow = $(this).parents('div[data-rowType=ROW]');
	                thisRow.remove();
	                if(_delCallback){
	                        _delCallback();
	                }
	        }
	});


/** function部分 **/
	//addRow
	function _addRow(wrapper,template,callback){
	        $(wrapper).append(template);
		var lastrow = wrapper.find('[data-rowType=ROW]:last');
		callback(lastrow);
	}
	//endof addRow
	
	//deleteRow
	function _deleteRow(wrapper,item,callback){
	        $(wrapper).find(item).remove();
		callback(wrapper);
	}
	//end of deleteRow
	        
	//dealTemplate
	function _dealTemplate(_template,_option){
	        var option = {
	                        "TEMPLATE":'ROW',
	                },
	                template = _template;   
	        option = Object.assign({},option,_option);      
	        if(option){
	                var replaceKeys = Object.keys(option);
	                for(var i of replaceKeys){
	                        template = template.replace(i,option[i]);
	                }
	        }
	        return template;        
	}
	//end of dealTemplate
/** end of function部分 **/
}
/* end of addTemplateRow  */
