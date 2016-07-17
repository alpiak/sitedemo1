if (typeof newbeef === undefined) {
	var newbeef;
}
	
(function () {
	newbeef.setUpImageSlidebox = (function () {
		var imageul = document.getElementById("image-slidebox").getElementsByTagName("ul")[0];
		var active = imageul.getElementsByClassName("active")[0].getAttribute("data-imgid");
		var left; // Controls the position of the image ul
		
		function onActive(id) {
			left = -450 * id;
			imageul.style.left = left + "px";
		}
		
		return function () {
			var interval;
			
			interval = setInterval(function () {
				if (active < 4) {
					active++;
				} else {
					active = 0;
				}	
				onActive(active);
			}, 3000);
		}
	}());
}());