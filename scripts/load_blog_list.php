<?php
switch ($_GET['sort']) {
    case "Title":
        $sort = "TITLE";
        break;
    case "Date":
        $sort = "POSTDATE";
        break;
    case "Comments":
        $sort = NULL; // not yet achieved
        break;
    case "Views":
        $sort = NULL; // not yet achieved
        break;
    default:
        $sort = "TITLE";
}

if ($sort) { 
    $xmlDoc = new DOMDocument();
    $xmlDoc->load("../resources/blogs.xml");
    $blogs = $xmlDoc->getElementsByTagName("BLOG");
	
    foreach($blogs as $blog){
        $key = $blog->getElementsByTagName($sort)->item(0)->firstChild->nodeValue;
        $blogsarray[$key] = $blog;
    }
    ksort($blogsarray);
    $txt="";
    foreach($blogsarray as $blog){
        $blogid = $blog->attributes->getNamedItem("id")->value;
        $txt.='<li class="blog-list-item" blogid="'.$blogid.'">';
        //try{
        $title=$blog->getElementsByTagName("TITLE")->item(0)->firstChild->nodeValue;
        $txt.='<div class="title">'.$title."</div>";
        //} catch(er){
        //	txt=txt+'<div class="title"></div>';
        //  }
        //try{
        $author=$blog->getElementsByTagName("AUTHOR")->item(0)->firstChild->nodeValue;
        $postdate=$blog->getElementsByTagName("POSTDATE")->item(0)->firstChild->nodeValue;
        $txt.='<div class="author">by '.$author."on ".$postdate."</div>";
        //} catch(er){
        //	txt=txt+'<div class="author"></div>';
        //}
        $txt.="</li>";
    }
    echo $txt;
} else {
    echo NULL; // exit for the features not yet achieved
}
?>
