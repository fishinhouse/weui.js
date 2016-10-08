(function ($) {
    var oldFnTab = $.fn.tab;
    $.fn.tab = function (options){
        options = $.extend({
            defaultIndex: 0,
            activeClass: `weui-bar__item_on`,
            onToggle: $.noop
        }, options);
        const $tabbarItems = this.find('.weui-tabbar__item, .weui-navbar__item');
        const $tabBdItems = this.find('.weui-tab__panel');

        this.toggle = function (index){
            const $defaultTabbarItem = $tabbarItems.eq(index);
            $defaultTabbarItem.addClass(options.activeClass).siblings().removeClass(options.activeClass);

            const $defaultTabBdItem = $tabBdItems.eq(index);
            $defaultTabBdItem.show().siblings().hide();

            options.onToggle(index);
        };
        const self = this;

        this.on('click', '.weui-tabbar__item, .weui-navbar__item', function (e){
            const index = $(this).index();
            self.toggle(index);
        });

        this.toggle(options.defaultIndex);

        return this;
    };
    $.fn.tab.noConflict = function(){
        return oldFnTab;
    };
})($);