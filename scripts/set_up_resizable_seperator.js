if (typeof newbeef === "undefined") {
    var newbeef = {};
}
if (typeof newbeef.blogReader === "undefined") {
    newbeef.blogReader = {};
}

(function () {
    newbeef.blogReader.setUpResizableSeperator =
    (function () {
        return function (leftid, seperatorid, rightid, callback) {
            var seperator = document.getElementById(seperatorid);
            seperator.onmousedown = function () {
                document.onmousemove = resize;
            }
            document.onmouseup = function () {
                document.onmousemove = undefined;
            }

            function resize() {
                var left = document.getElementById(leftid);
                var right = document.getElementById(rightid);
                var _event = window.event || arguments.callee.arguments[0];
                var leftwidthpercent = _event.clientX / document.body.clientWidth * 100;
                left.style.width = leftwidthpercent - .3 + "%";
                right.style.width = 100 - parseFloat(left.style.width, 10) + "%";
                if (typeof callback === "function"){
                    callback();
                }
        }
        }
    }());
}());