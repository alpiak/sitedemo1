// name space
if (typeof newbeef === "undefined") {
    var newbeef = {};
}

// sub name spaces
if (typeof newbeef.blogReader === "undefined") {
    newbeef.blogReader = {};
}
if (typeof newbeef.blogGallery === "undefined") {
    newbeef.blogGallery = {};
}

newbeef.setLayout = (function () {
    var footer = document.getElementById("footer");
    var _documentHeight = document.body.offsetHeight ||
    (document.documentElement && (document.documentElement.offsetHeight ||
    document.documentElement.scrollHeight));
    
    return function () {
		
        // Set footer
        if (_documentHeight < window.innerHeight) {
            footer.style.position = "static";
        } else {
            footer.style.position = "fixed";
        }
     };
}());

newbeef.blogReader.resetLayout = (function () {
    var seperator = document.getElementById("seperator");
    return function () {
        seperator.style.height = "0";
    }
}());

newbeef.blogReader.setLayout = (function (resetLayout, setLayout) {
    var menu = document.getElementById("menu");
    var content = document.getElementById("content");
    var seperator = document.getElementById("seperator");

    return function () {
        resetLayout();
        setLayout();
		
        // set seperator
        if (content.offsetHeight > menu.offsetHeight) {
            seperator.style.height = content.offsetHeight + "px";
        } else {
            seperator.style.height = menu.offsetHeight + "px";
        }
    }
}(newbeef.blogReader.resetLayout, newbeef.setLayout));

newbeef.blogGallery.setLayout = (function (setLayout) {
    return function () {
        var i = $(".blog-gallery-block").first();
        (function () {
            try {
                i.find("p").css("width", i.find("img")[0].offsetWidth -
                parseInt(i.find("p").css("padding"), 10) * 2 -
                parseInt(i.find("p").css("margin"), 10) * 2 + "px");
            } catch (err) {
                i.find("p").css("width", "160px");
            }
            i.css("animation-play-state", "running");
            i = i.next();
            if (i.length != 0) {
                window.setTimeout(arguments.callee, 100);
            };
            setLayout();
        } ());
    };
} (newbeef.setLayout));