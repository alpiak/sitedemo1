if (typeof newbeef === "undefined") {
    var newbeef = {};
}

(function () {
    newbeef.levelTwoColumns = (function () {       
        return function (id1, id2) {
                    var height1 = document.getElementById(id1).offsetHeight;
                    var height2 = document.getElementById(id2).offsetHeight;
                    if (height1 < height2) {
                        column1.style.height = height2 + "px";
                    }
                    else {
                        column2.style.height = height1 + "px";
                    }
                };
    }());
} ());