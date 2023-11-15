window.onload =
    window.onscroll = function () {
//顶部悬浮		
        var oDiv = document.getElementById("topNavbar");
        var s = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (s > 0) {
            oDiv.style = "position:fixed;top:0;width:100%;z-index:1030;transition: height .5s;background-color:white";
        } else {
            oDiv.style = " "
        }

//右侧悬浮导航栏
        var oside = document.getElementById("sidenav")
        var s = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (s > 370) {
            oside.style = "position:fixed;top:50px;right:100px;"
        } else {
            oside.style = " "
        }
    }

function sideActiveStyle(obj) {
    // 	var href = location.href;
    // 	var strs = href.split("/");
    // 	var fullname = strs[strs.length-1]; 
    // 	strs = fullname.split("#");
    // 	name = strs[strs.length-1];
    var astyle = document.getElementById("sidenav").getElementsByTagName("a");
    for (var i = 0; i < astyle.length; i++) {
        astyle[i].style = "";
    }
    var text = "background-color: rgba(150,150,200,0.5)"
    obj.style = text;
}


//点击展开效果 
function displayul(obj) {
    var parent = document.getElementById("sidenav")
    var mainul = parent.getElementsByTagName("ul")[0];
    var child = mainul.getElementsByTagName("ul");
    for (var i = 0; i < child.length; i++) {
        child[i].style.display = "none";
    }
    var subul = obj.getElementsByTagName("ul")[0];
    subul.style.display = "block";
}


