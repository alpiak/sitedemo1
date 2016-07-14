if (typeof newbeef === "undefined") {
    var newbeef = {};
}
if (typeof newbeef.blogGallery === "undefined") {
    newbeef.blogGallery = {};
}

(function () {
    newbeef.blogGallery.loadBlogGallery =
    function (id, callback) {
        var xmlhttp, xmlDoc;
        var blogs, picture_url, title, author, postdate, updatedate;
        var txt = "";
        var i, len;

        function onStateChange() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                xmlDoc = xmlhttp.responseXML;
                blogs = xmlDoc.documentElement.getElementsByTagName("BLOG");
                for (i = 0, len = blogs.length; i < len; i++) {
                    try {
                        picture_url = blogs[i].getElementsByTagName("PICTURE")[0].firstChild.nodeValue;
                        title = blogs[i].getElementsByTagName("TITLE")[0].firstChild.nodeValue;
                        author = blogs[i].getElementsByTagName("AUTHOR")[0].firstChild.nodeValue;
                        postdate = blogs[i].getElementsByTagName("POSTDATE")[0].firstChild.nodeValue;
                        updatedate = blogs[i].getElementsByTagName("UPDATEDATE")[0].firstChild.nodeValue;
                        txt += "<div class=\"blog-gallery-block\" style=\"animation-play-state: paused\"><a href=\"#\">";
                        if (picture_url.search(/\S+/) + 1) {
                            txt += "<img class=\"blog-gallery-photo\" src=\"" +
                picture_url + "\" alt=\"Blog photo\" title=\"Blog photo\">";
                        } else {
                            txt += "<img class=\"blog-gallery-photo\" src=\"/images/blog_gallery_default.jpg\" alt=\"Blog photo\" title=\"Blog photo\">";
                        }
                        txt += "<p class=\"blog-gallery-title\">" + title + "</p>";
                        txt += "<p class=\"blog-gallery-author\">by " + author + "</p>";
                        txt += "<p class=\"blog-gallery-date\">" +
                    (function () {
                        if (updatedate.search(/\S+/) + 1) {
                            return updatedate;
                        } else {
                            return postdate;
                        }
                    })() +
                "</p></a></div>";
                    } catch (err) {
                        txt += "<div class=\"blog-gallery-block\" style=\"animation-play-state: paused\">" + err.message + "</div>";
                    }
                }
            }
            document.getElementById(id).innerHTML = txt;
            if (callback) {
                callback();
            }
        }

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new AcitveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = onStateChange;
        xmlhttp.open("GET", "/resources/blogs.xml?=" + Math.random(), "true");
        xmlhttp.send();
    }
}());