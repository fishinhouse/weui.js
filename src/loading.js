(function ($) {
    let $loading = null;

    /**
     * show loading
     * @param {String} content
     */
    $.weui.loading = function (content = 'loading...') {
        if ($loading) {
            return;
        }

        const html = `
            <div class="weui-loading_toast">
                <div class="weui-mask_transparent"></div>
                <div class="weui-toast">
                    <i class="weui-loading weui-icon_toast"></i>
                    <p class="weui-toast__content">${content}</p>
                </div>
            </div>
        `;
        $loading = $(html);
        $('body').append($loading);
    };

    /**
     * hide loading
     */
    $.weui.hideLoading = function () {
        $loading && $loading.remove();
        $loading = null;
    };
})($);