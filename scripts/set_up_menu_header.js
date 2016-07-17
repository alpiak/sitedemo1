(function (loadBlogContent, loadBlogList) {
    var i;
    var lis, li;
    var sort;

    lis = document.getElementById("menu-header").
    getElementsByTagName("li");
    for (var i = 0, len = lis.length; i < len; i++) {
        lis[i].onclick = function () {
            sort = this.firstChild.nodeValue;
            loadBlogList(sort, function () {
                var items, liclassname;
                var strindex, strlen, substr1, substr2;

                newbeef.blogReader.setLayout();
                lis = document.getElementById("menu-list").getElementsByTagName("li");
                for (i = 0, len = lis.length; i < len; i++) {
                    lis[i].onclick = function () { // control the behavior of the menu when a menu item is clicked.
                        strlen = "menu-item-highlighted".length;
                        for (i = 0; i < len; i++) {
                            liclassname = lis[i].className;
                            strindex = liclassname.search(/menu-item-highlighted/);
                            if (strindex + 1) {
                                substr1 = liclassname.substring(0, strindex);
                                substr2 = liclassname.substring(strindex + strlen);
                                lis[i].className = substr1.concat(substr2);
                            }
                        }
                        this.className = this.className.concat(" menu-item-highlighted");
                        loadBlogContent("content-textbox", newbeef.blogReader.setLayout);
                    }
                }
            });
        }
    }
}(newbeef.blogReader.loadBlogContent, newbeef.blogReader.loadBlogList));