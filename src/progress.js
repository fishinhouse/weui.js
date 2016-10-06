(function ($) {
    $.fn.progress = function (options) {
        options = $.extend({
            value: 0
        }, options);
        if (options.value < 0) {
            options.value = 0;
        }

        if (options.value > 100) {
            options.value = 100;
        }

        const $progress = this.find('.weui-progress__inner-bar');
        if($progress.length === 0){
            const opr = typeof options.onClick === 'function' ? `<a href="javascript:;" class="weui-progress__opr">
                    <i class="weui-icon-cancel"></i>
                </a>` : '';
            const html = `<div class="weui-progress">
                <div class="weui-progress__bar">
                    <div class="weui-progress__inner-bar" style="width: ${options.value}%;"></div>
                </div>
                ${opr}
            </div>`;
            if (typeof options.onClick === 'function'){
                this.on('click', '.weui-progress__opr', () => {
                    options.onClick.call(this);
                });
            }
            return this.html(html);
        }

        //return $progress.animate({
        //    width: `${options.value}%`
        //}, 100);
        return $progress.width(`${options.value}%`);
    };
})($);