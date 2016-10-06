(function ($) {

    /**
     * show toast
     * @param {String} content
     * @param {Object|Number} [options]
     */
    $.weui.toast = function (content = 'toast', options = {}) {

        if (typeof options === 'number') {
            options = {
                duration: options
            };
        }

        if (typeof options === 'function') {
            options = {
                callback: options
            };
        }

        options = $.extend({
            duration: 3000,
            callback: $.noop
        }, options);
        
        const html = `<div>
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-icon_toast weui-icon-success-no-circle"></i>
                <p class="weui-toast__content">${content}</p>
            </div>
        </div>`;
        let $toast = $(html);
        $('body').append($toast);

        setTimeout(function () {
            $toast.remove();
            $toast = null;
            options.callback();
        }, options.duration);
    };

})($);