if (typeof newbeef === "undefined") {
    var newbeef = {};
}

(function () {
    newbeef.setUpDropdown =
    function (classname) {
        var i, len;

        // IE 8 and below don't recognize getElementsByClassName, create a custom function for them.
        function _getElementByClassName(classname) {
            var elements = [];
            var allelements = document.getElementByTagName("*");
            for (i = 0, len = allelements.length; i < len; i++) {
                if (allelements[i].className == classname) {
                    elements[elements.length] = allelements[i];
                }
            }
            return elements;
        }

        // get the html elements of the dropsdowns
        try {
            var elements = document.getElementsByClassName(classname);
        } catch (err) {
            var elements = _getElementByClassName(classname); //for IE 8 and below version
        }

        // assign the events
        for (var i = 0, len = elements.length; i < len; i++) {
            element = elements[i];
            element.onmouseover = _showDropdown;
            element.onmouseout = _hideDropdown;
        }
        function _showDropdown() {
            var x;
            x = this.getElementsByTagName("ul");
            x[0].style.display = "block";
        }
        function _hideDropdown() {
            var x;
            x = this.getElementsByTagName("ul");
            x[0].style.display = "none";
        }
    }
}());