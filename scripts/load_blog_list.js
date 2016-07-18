if (typeof newbeef === "undefined") {
    var newbeef = {};
}
if (typeof newbeef.blogReader === "undefined") {
    newbeef.blogReader = {};
}

(function () {
    newbeef.blogReader.loadBlogList =
    function (sort, callback) {
        var xmlhttp;
        var blogs, blogid, ul;
        var menulist = document.getElementById("menu-list");

        try {
            xmlhttp = new XMLHttpRequest();
        } catch (tryMS) {
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (otherMS) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (failed) {
                    xmlhttp = null;
                }
            }
        }

        if (xmlhttp === null) {
            menulist.innerHTML = "Unable to create the request";
            return;
        }

        xmlhttp.onreadystatechange = stateChange;
        xmlhttp.open("GET", "scripts/load_blog_list.php?t=" + Math.random() +
    "&sort=" + sort, true);
        xmlhttp.send();

        // loading message
        if (!document.getElementById("loading")) {
            menulist.innerHTML = "<div id=\"loading\" style = \"position: absolute; margin: auto; \
                            width: auto; height: 20px; line-height: 20px; text-align: center; \
                            top: 0; right: 0; bottom: 0; left: 0\">Loading...</div>";
        }

        function stateChange() {
            var readystate = xmlhttp.readyState;

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && xmlhttp.responseText) {
                menulist.removeChild(loading);
                txt = xmlhttp.responseText;
                menulist.innerHTML = txt;
                if (typeof callback === "function") {
                    callback();
                }
            }
        }
    }
}());