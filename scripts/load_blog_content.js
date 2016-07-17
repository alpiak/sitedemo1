if (typeof newbeef === "undefined") {
    var newbeef = {};
}
if (typeof newbeef.blogReader === "undefined") {
    newbeef.blogReader = {};
}

(function () {
    newbeef.blogReader.loadBlogContent = 
    function (id, callback) {
        var xmlhttp;
        var xmlDoc, title, paragraphs;
        var _event = window.event || arguments.callee.caller.arguments[0];
        var blogid = _event.target.parentNode.attributes.getNamedItem("blogid").value;

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = _stateChange;
        xmlhttp.open("GET", "/resources/blogs.xml?=" + Math.random(), true);
        xmlhttp.send();

        // in IE can't get element by id, build a custom function.
        function IEGetElementById(id) {
            var element;
            var allelements = this.getElementsByTagName("*");
			
            for (x in allelements) {
                if (allelements[x].getAttribute("id") == id || allelements[x].getAttributeNS("ns", "id") == id) {
                    element = allelements[x];
                    break;
                }
            }
            return element;
        }

        function _stateChange() {
            var element, txt = "";
			var i, len;
			
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                xmlDoc = xmlhttp.responseXML;
                element = xmlDoc.getElementById(blogid) || IEGetElementById.call(xmlDoc, blogid);
                try {
                    title = element.getElementsByTagName("TITLE")[0].firstChild.nodeValue;
                    author = element.getElementsByTagName("AUTHOR")[0].firstChild.nodeValue;
                    picture_url = element.getElementsByTagName("PICTURE")[0].firstChild.nodeValue;
                    postdate = element.getElementsByTagName("POSTDATE")[0].firstChild.nodeValue;
                    paragraphs = element.getElementsByTagName("BODY")[0].firstChild.nodeValue.split(/\n/);
                    txt = txt + "<h1>" + title + "</h1>";
                    txt = txt + "<h2>By " + author + " on " + postdate + "</h2>";
                    if (picture_url.search(/\S+/) + 1) {
                        txt = txt + '<img src="' + picture_url + '" alt="Title picture" title="Title picture" style="float: right; max-width: 50%"/>';
                    }
                    for (i = 0, len = paragraphs.length; i < len; i++) {
                        txt = txt + "<p>" + paragraphs[i] + "</p>";
                    }
                } catch (e) {
                    txt = "Error: " + e.message;
                }
                document.getElementById(id).innerHTML = txt;
                if (typeof callback === "function") {
                    if (picture_url.search(/\S+/) + 1) {
                        document.getElementById(id).getElementsByTagName("img")[0].onload = callback;
                    } else {
                        callback();
                    }
                }
            }
        }
    }
}());