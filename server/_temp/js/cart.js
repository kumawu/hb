(function($){
    //编辑 //完成
    $('[node-type="edit"]').on('click',function(){
        var txt = $(this).children().text();
        $(this).parents('[node-type="storeSection"]').find('[node-type="editLayer"],[node-type="showLayer"],[node-type="del"]').toggle();      
        if (txt == '编辑') {
            $(this).children().text('完成');
        }else{
            $(this).children().text('编辑');
        }
    });
    
    //删除
    $('[node-type="del"]').on('click',function(){

    });
    //需要联动，如果选中就联动
    //方案为监听各个店铺
    $(document).on('cart:count',function(e,data){
        console.log('counttt',data);
    });
    //结算
    $('[node-type="count"]').click(function(){
        //ajax

    });
    //checkbox
    $('[node-type="checkGoods"]').on('click',function(){
        var layer = $(this).parents('[node-type="storeSection"]')
        if($(this).prop('checked')){
            if($(this).parents('[node-type="storeSection"]').find('input[type="checkbox"]:not(:checked)').length == 1){//checkStore
                layer.find('[node-type="checkStore"]').prop('checked',true);
            }
        }else{
            layer.find('[node-type="checkStore"]').prop('checked',false);
        }

    });
    $('[node-type="checkStore"]').on('click',function(){
        var _checkbox = $(this).parents('[node-type="storeSection"]').find('[node-type="checkGoods"]');
        var self = $(this);
        var _checked = $(this).prop('checked');
        if($(this).prop('checked')){
            _checkbox.prop('checked',true);
            var cost = 0;
            _checkbox.map(function(index,goods){
                console.log(goods,index);
                cost += $(goods).attr('cost')*1*$(goods).parents('[node-type="goodsSection"]').find('input[node-type="amountInput"]').val()*1
            })
            $(document).trigger('cart:count',cost)
        }else{
            _checkbox.prop('checked',false);
            _checkbox.map(function(index,goods){
                console.log(goods,index);
                cost += $(goods).attr('cost')*1*$(goods).parents('[node-type="goodsSection"]').find('input[node-type="amountInput"]').val()*1
            })
            $(document).trigger('cart:count',0-cost)
        }
    });
    //加数量
    $('[node-type="more"]').on('click',function(){
        var num = $(this).prev().val()*1+1;
        $(this).prev().val(num);
        //显示层数量改变
        $(this).parents('[node-type="goodsSection"]').find('[node-type="amount"]').text('x'+num)
        //改变总金额
        //find if selected
        changeCost4Goods($(this),num,$(this).prev().attr('cost'));
    });
    //减少
    $('[node-type="less"]').on('click',function(){
        var num = $(this).next().val()*1-1;
        $(this).next().val(num);

        //改变总金额
        //find if selected
        changeCost4Goods($(this),num,$(this).next().attr('cost'));
    });

    $('[node-type="amountInput"]').on('blur',function(){

    });
    $('[node-type="amountInput"]').on('change',function(){
        changeCost4Goods($(this),$(this).val(),$(this).attr('cost'));
    });
    function changeCost4Goods(el,amount,cost){
        //find if selected
        //计算金额存在问题！！！！有的地方加减1，有的地方直接是个数，直接个数，在减1时，不正确，因为个数是0
        //所以总金额的计算，应该是每次都重新从头计算,不要相对值
        if(el.parents('[node-type="goodsSection"]').find(':checked').length == 1){
            var cost = amount*1*cost*1;
            $(document).trigger('cart:count',cost)
        }
    }
    //换分类
    //call 王政 callback为回填
    //confirm

})(Zepto);