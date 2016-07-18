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
			var left = document.getElementById(leftid);
			var right = document.getElementById(rightid);
            var seperator = document.getElementById(seperatorid);
			var originEventX;

            function resize() {
				var _event = window.event || arguments.callee.arguments[0];
				var eventXDiff = _event.clientX - originEventX;
				
				if (Math.abs(eventXDiff) > 8) {
					var leftwidthpercent = _event.clientX / document.body.clientWidth * 100;
					
					originEventX = _event.clientX;
					left.style.width = leftwidthpercent - 1.3 + "%";
					right.style.width = 100 - parseFloat(left.style.width, 10) + "%";
				}
				if (typeof callback === "function"){
					callback();
				}
			}
			
            seperator.onmousedown = function () {
                var _event = window.event || arguments.callee.arguments[0];
				originEventX = _event.clientX;
				
                document.onmousemove = resize;
            }
            document.onmouseup = function () {
                document.onmousemove = null;
            }
        }
    }());
}());