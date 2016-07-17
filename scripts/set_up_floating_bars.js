if (typeof newbeef === "undefined") {
    var newbeef = {};
}

(function () {
    newbeef.setUpFloatingBars = (function () {
        var nav = document.getElementById("nav");
        var navtop = nav.offsetTop;
        var footer = document.getElementById("footer");

        return function () {
            footer.style.position = "fixed";

            window.onresize = window.onscroll = function () {
                // get document scrolltop
                var _scrollTop = window.pageYOffset ||
                document.documentElement.scrollTop || document.body.scrollTop;

                // get document height
                var _documentHeight = document.body.offsetHeight ||
                (document.documentElement && (document.documentElement.offsetHeight ||
                document.documentElement.scrollHeight));

                // behavior of the navigation bar
                if (_scrollTop >= navtop) {
                    nav.style.position = "fixed";
                    nav.style.left = "0";
                    nav.style.top = "0";
                } else {
                    nav.style.position = "relative";
                }

				console.log(_documentHeight,"<",_scrollTop,window.innerHeight,"+5",_scrollTop+window.innerHeight);
                // behavior of the footer bar
                if (footer.style.position === "fixed" &&
            _documentHeight < _scrollTop + window.innerHeight + 5) {
                    footer.style.position = "static";
                } else if (footer.style.position === "static" &&
            footer.offsetTop + footer.offsetHeight + 5 > _scrollTop + window.innerHeight) {
                    footer.style.position = "fixed";
                }
            }
        }
    }());
}());