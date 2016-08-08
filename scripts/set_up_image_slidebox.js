if (typeof newbeef === undefined) {
	var newbeef;
}
	
(function () {
	newbeef.setUpImageSlidebox = (function () {
		var imageul = document.getElementById("image-slidebox").getElementsByTagName("ul")[0];
		var active = imageul.getElementsByClassName("active")[0].getAttribute("data-imgid");
		var left = -450 * active; // controls the position of the image ul
		var lastActive = active, lastLeft = left; // remember the last active image index
		var len = document.getElementById("image-slidebox-ul")
		.getElementsByTagName("li").length - 2; // image list lengh
		var cloneLeft; // for the cloned images
		
		function activeApply() {
			if (Math.abs(active - lastActive) >= len - 1) {
				if (active === 0 && lastActive === len - 1) {
					cloneLeft = lastLeft - 450;
				} else {
					cloneLeft = lastLeft + 450;
				}
				imageul.style.left = cloneLeft + "px";
				
				// switch from the cloned image to the real image
				setTimeout(function () {
					var interval;
					
					imageul.className += "onclone";
					imageul.style.left = left + "px";
					interval = setInterval(function () {
						if (parseInt(imageul.style.left, 10) === left) {
							clearInterval(interval);
							imageul.className = imageul.className.replace("onclone", "");
						}
					}, 50);
				}, 1000);
			} else {
				imageul.style.left = left + "px";
			}
		}
		
		function activeIncrease () {
			lastActive = active;
			if (active < 4) {
				active++;
			} else {
				active = 0;
			}
			left = -450 * active - 450;
			lastLeft = -450 * lastActive - 450;
		}
		
		function activeDecrease () {
			lastActive = active;
			if (active > 0) {
				active--;
			} else {
				active = 4;
			}
			left = -450 * active - 450;
			lastLeft = -450 * lastActive - 450;
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