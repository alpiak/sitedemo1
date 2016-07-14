if (typeof newbeef === "undefined") {
    var newbeef = {};
}

(function () {
    newbeef.setUpSlideDropdown =
    (function(){

        function showDropdown() {
            $(this)
            .find(".slidedown-container:first")
            .stop(1, 1)
            .slideDown("fast", function () {
            $(this).css("overflow", "visible");
            });
        }
        function hideDropdown() {
            $(this)
            .find(".slidedown-container:first")
            .stop(1, 0)
            .slideUp("fast");
        }

        return function (classname) {
            $(function () {
                $("." + classname).mouseenter(showDropdown);
                $("." + classname).mouseleave(hideDropdown);
            });
        }    
    }());
}());