(function ($) {
    $.fn.searchBar = function (options) {
        options = $.extend({
            focusingClass:'weui-search-bar_focusing',
            searchText:"搜索",
            cancelText:"取消"
        },options);

        let html = `<div class="weui-search-bar">
                    <form class="weui-search-bar__form">
                        <div class="weui-search-bar__box">
                            <i class="weui-icon-search"></i>
                            <input type="search" class="weui-search-bar__input" id="weui-search-bar__input" placeholder="${options.searchText}" required/>
                            <a href="javascript:" class="weui-icon-clear"></a>
                        </div>
                        <label for="weui-search-bar__input" class="weui-search-bar__label">
                            <i class="weui-icon-search"></i>
                            <span>${options.searchText}</span>
                        </label>
                    </form>
                    <a href="javascript:" class="weui-search-bar__cancel-btn">${options.cancelText}</a>
                </div>`;

        let $search = $(html);
        this.append($search);

        const $searchBar = this.find('.weui-search-bar');
        const $searchText = this.find('.weui-search-bar__label');
        const $searchInput = this.find('.weui-search-bar__input');

        this.on('focus', '#weui-search-bar__input', function () {
            $searchText.hide();
            $searchBar.addClass(options.focusingClass);
            bindEvent($searchInput, 'onfocus', options);
        }).on('blur', '#weui-search-bar__input', function () {
            $searchBar.removeClass(options.focusingClass);
            !!$(this).val() ? $searchText.hide() : $searchText.show();
            bindEvent($searchInput, 'onblur', options);
        }).on('touchend', '.weui-search-bar__cancel-btn', function () {
            $searchInput.val('');
            bindEvent($searchInput, 'oncancel', options);
        }).on('touchend', '.weui-icon-clear', function (e) {
            //阻止默认动作
            e.preventDefault();
            $searchInput.val('');
            if(document.activeElement.id != 'weui-search-bar__input') {
                $searchInput.trigger('focus');
            }
            bindEvent($searchInput, 'onclear', options);
        }).on('input', '.weui-search-bar__input', function () {
            bindEvent($searchInput, 'input', options);
        }).on('submit', '.weui-search-bar__form', function () {
            if(typeof(options.onsubmit) == 'function'){
                bindEvent($searchInput, 'onsubmit', options);
                return false;
            }
        });

        function bindEvent(target,event,options){
            if(typeof(options[event]) == 'function'){
                let value = $(target).val();
                options[event].call(target, value);
            }
        }
    };
})($);