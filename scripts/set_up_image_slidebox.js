if (typeof newbeef === undefined) {
	var newbeef;
}
	
(function () {
	newbeef.setUpImageSlidebox = (function () {
		var imageul = document.getElementById("image-slidebox").getElementsByTagName("ul")[0];
		var active = imageul.getElementsByClassName("active")[0].getAttribute("data-imgid");
		var left = -450 * active; // controls the position of the image ul
		var lastActive, lastLeft; // remember the last active image index
		
		function onTrigger() {
			if (Math.abs(active - lastActive) < 4) {
				imageul.style.left = left + "px";
			} else {
				imageul.style.left = lastLeft - 450 + "px";
				setTimeout(function () {
					var interval;
					
					imageul.className += "onclone";
					imageul.style.left = left + "px";
					interval = setInterval(function () {
						if (imageul.style.left === left + "px") {
							clearInterval(interval);
							imageul.className = imageul.className.replace("onclone", "");
						}
					}, 100);
				}, 1000);
			}
		}
		
		return function () {
			var interval;
			
			interval = setInterval(function () {
				lastActive = active;
				if (active < 4) {
					active++;
				} else {
					active = 0;
				}
				left = -450 * active;
				lastLeft = -450 * lastActive;
				onTrigger();
			}, 3000);
		}
	}());
}());