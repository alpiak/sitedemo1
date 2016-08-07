if (typeof newbeef === undefined) {
	var newbeef;
}
	
(function () {
	newbeef.setUpImageSlidebox = (function () {
		var imageul = document.getElementById("image-slidebox").getElementsByTagName("ul")[0];
		var active = imageul.getElementsByClassName("active")[0].getAttribute("data-imgid");
		var left = -450 * active; // controls the position of the image ul
		var lastActive, lastLeft; // remember the last active image index
		var activeDiffer // active - lastActive
		var cloneLeft; // for the cloned images
		
		function activeApply() {
			activeDiffer = active - lastActive;
			if (Math.abs(activeDiffer) < 4) {
				imageul.style.left = left + "px";
			} else {
				if (activeDiffer < 0) {
					cloneLeft = lastLeft - 450;
				} else {
					cloneLeft = lastLeft + 450;
				}
				imageul.style.left = cloneLeft + "px";
				imageul.className += "onclone";
				
				// switch from the cloned image to the real image
				setTimeout(function () {
					var interval;
					
					imageul.style.left = left + "px";
					interval = setInterval(function () {
						if (imageul.style.left === left + "px") {
							clearInterval(interval);
							imageul.className = imageul.className.replace("onclone", "");
						}
					}, 50);
				}, 1000);
			}
		}
		
		function activeIncrease () {
			lastActive = active;
			if (active < 4) {
				active++;
			} else {
				active = 0;
			}
			left = -450 * active;
			lastLeft = -450 * lastActive;
		}
		
		function activeDecrease () {
			lastActive = active;
			if (active > 0) {
				active--;
			} else {
				active = 4;
			}
			left = -450 * active;
			lastLeft = -450 * lastActive;
		}
		
		return function () {
			var interval = setInterval(function () {
				activeIncrease();
				activeApply();
			}, 3000);
			
			document.getElementById("slide-previous").onclick = function () {
				activeDecrease();
				activeApply();
			}
			document.getElementById("slide-next").onclick = function () {
				activeIncrease();
				activeApply();
			}
		}
	}());
}());