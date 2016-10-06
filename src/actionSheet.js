(function ($) {

    let $actionSheetWrapper = null;

    /**
     * show actionSheet
     * @param {Array} menus
     * @param {Array} actions
     */
    $.weui.actionSheet = function (menus = [], actions = [{label: '取消'}]) {
        const cells = menus.map((item, idx) => {
            return `<div class="weui-actionsheet__cell">${item.label}</div>`;
        }).join('');
        const action = actions.map((item, idx) => {
            return `<div class="weui-actionsheet__cell">${item.label}</div>`;
        }).join('');
        const html = `<div>
            <div class="weui-mask"></div>
            <div class="weui-actionsheet">
                <div class="weui-actionsheet__menu">
                    ${cells}
                </div>
                <div class="weui-actionsheet__action">
                    ${action}
                </div>
            </div>
        </div>`;

        $actionSheetWrapper = $(html);
        $('body').append($actionSheetWrapper);

        // add class
        $actionSheetWrapper.find('.weui-mask').show();
        $actionSheetWrapper.find('.weui-actionsheet').addClass('weui-actionsheet_toggle');

        // bind event
        $actionSheetWrapper.on('click', '.weui-actionsheet__menu .weui-actionsheet__cell', function (){
            const item = menus[$(this).index()];
            const cb = item.onClick || $.noop;
            cb.call();
            $.weui.hideActionSheet();
        }).on('click', '.weui-mask', function (){
            $.weui.hideActionSheet();
        }).on('click', '.weui-actionsheet__action .weui-actionsheet__cell', function (){
            const item = actions[$(this).index()];
            const cb = item.onClick || $.noop;
            cb.call();
            $.weui.hideActionSheet();
        });
    };

    $.weui.hideActionSheet = function (){
        if(!$actionSheetWrapper){
            return;
        }

        var $mask = $actionSheetWrapper.find('.weui-mask');
        var $actionsheet = $actionSheetWrapper.find('.weui-actionsheet');

        $mask.hide();
        $actionsheet.removeClass('weui-actionsheet_toggle');

        $actionsheet.on('transitionend webkitTransitionEnd', function () {
            $actionSheetWrapper.remove();
            $actionSheetWrapper = null;
        });
    };

})($);