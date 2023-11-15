// 计算器输入按钮，点击按钮，输入该字符
function buttonClickAdd(obj) {
    // 点击的效果
    document.getElementById("audio-box").innerHTML = "<audio src='music/cNumber.mp3' controls='controls' autoplay='autoplay' style='display:none;'></audio>";

    var mainInput = document.getElementById("mainTextarea");
    var str = mainInput.value;
    str += obj.value;
    mainInput.value = "";
    mainInput.value = str;

    // 输入过长，让光标向右移动，确保内容显示正确
    if (str.length >= 8) {
        mainInput.focus();
    }
    var secInput = document.getElementById("secondTextarea");
    str = secInput.value;
    str += obj.value;
    secInput.value = "";
    secInput.value = str;


}

// 计算器回退按钮，点击按钮，回退
function buttonClickBcak(obj) {
    document.getElementById("audio-box").innerHTML = "<audio src='music/cOperator.mp3' controls='controls' autoplay='autoplay' style='display:none;'></audio>";
// 	var mainInput = document.getElementById("mainTextarea");
// 	var str = mainInput.value;
// 	str = str.substr(0, str.length - 1);
// 	mainInput.value = str;
// 	mainInput.focus();
// 	window.event.keyCode = "39";
    document.getElementById("mainTextarea").value = "";
    document.getElementById("secondTextarea").value = "";
}

// 实时监听主输入框内容到辅助框 
function show(event) {
    document.getElementById("audio-box").innerHTML = "<audio src='music/cNumber.mp3' controls='controls' autoplay='autoplay' style='display:none;'></audio>";
    document.getElementById("secondTextarea").value = event.target.value;
    var str = document.getElementById("secondTextarea").value;
    // 输入过长，让光标向右移动，确保内容显示正确
    Arraystr = str.split("=");
    if (Arraystr.length >= 2) {
        str = Arraystr[Arraystr.length - 2] + "=" + Arraystr[Arraystr.length - 1];
        document.getElementById("secondTextarea").value = str;
    }

// 	if(document.getElementById("secondTextarea").value.length>=8){
// 		document.getElementById("secondTextarea").style="font-size:2em";
// 	}


}

// <!-- 判断是否为enter键 -->
document.getElementById("mainTextarea").onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) { // enter 键
        JudgeButton();
        if (document.getElementById("mainTextarea").value.length >= 8) {
            document.getElementById("mainTextarea").style = "font-size:2em";
        }
        if (document.getElementById("mainTextarea").value.length >= 13) {
            document.getElementById("mainTextarea").style = "font-size:1em";
        }
    }
};

// 颜色按钮
function ulshow() {
    document.getElementById("btn-dropmenu1").style = "display:block";
}

function ulhide() {
    document.getElementById("btn-dropmenu1").style = "display:none";
}

function listyle(data) {
    document.getElementById("audio-box").innerHTML = "<audio src='music/cNumber.mp3' controls='controls' autoplay='autoplay' style='display:none;'></audio>";
    var name = "Calculator-background-gradient-1 Calculator-size";
    name = name.replace(/\d/, data);
    document.getElementById("Calculator-bg").className = name;
}

