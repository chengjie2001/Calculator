// 函数功能：计算器,计算按钮
// 函数参数：无
// 返回值：无
function JudgeButton() {
    document.getElementById("audio-box").innerHTML = "<audio src='music/cEquivalent.mp3' controls='controls' autoplay='autoplay' style='display:none;'></audio>";
    var str = document.getElementById("mainTextarea").value;
    str = Pretreatment(str);
    Answer = Result(str);
    if (Answer == false) {
        document.getElementById("mainTextarea").value = "0";
    } else if (Answer == "Error") {
        document.getElementById("mainTextarea").value = "分母为0";
    } else if (Answer == "数字后面请无直接加(") {
        document.getElementById("mainTextarea").value = "数字请勿直接加'('";
    } else {
        document.getElementById("mainTextarea").value = Answer;
        var flag = document.getElementById("mainTextarea").value;
        if (flag == "NaN") {
            document.getElementById("mainTextarea").value = "表达式错误";
        } else if (flag == "undefined") {
            document.getElementById("mainTextarea").value = "错误";
        }
    }

    var newdata = document.getElementById("secondTextarea").value;
    document.getElementById("secondTextarea").value = "";
    newdata += "=";
    newdata += Answer;
    document.getElementById("secondTextarea").value = newdata;

    if (document.getElementById("mainTextarea").value.length >= 8) {
        document.getElementById("mainTextarea").style = "font-size:2em";
    }
    if (document.getElementById("mainTextarea").value.length >= 13) {
        document.getElementById("mainTextarea").style = "font-size:1em";
    }
    //辅助框数据更新
    var str = document.getElementById("secondTextarea").value;
    Arraystr = str.split("=");
    if (Arraystr.length >= 2) {
        str = Arraystr[Arraystr.length - 2] + "=" + Arraystr[Arraystr.length - 1];
        document.getElementById("secondTextarea").value = str;
    }

}

//借助括号匹配解决括号问题
function Solution(stackInfix) {
    var stack = new Stack();

    let i = 0;
    for (i = 0; i < stackInfix.Length(); i++) {
        if (stackInfix.IndexOf(i) != ')') {//非右括号全部入栈
            stack.Push(stackInfix.IndexOf(i));
        } else {//遇到右括号找到左括号,中间的全部stackInfix.IndexOf(i)==')';
            //找到(之间）
            var str = "";
            let k = 0;
            for (k = i; k >= 0; k--) {
                if (stack.IndexOf(k) == '(') {
                    k++;
                    break;
                }
            }
            for (k; k < i; k++) {
                str += stack.IndexOf(k);
            }

            //清除()
            while (stack.Top() != "(") {
                stack.Pop();
            }
            stack.Pop();
            Answer = Result(str);
            stack.Push(Answer);
            stack.Print();
            break;
        }
    }
    i++;
    for (; i < stackInfix.Length(); i++) {
        stack.Push(stackInfix.IndexOf(i));
    }
    stack.Print();
    return stack;
}


//函数功能：利用正则表达式兼容更多相似的运算符、删除全部空格。
function Pretreatment(str) {
    //正则表达式替换不合法字符
    str = str.replace(/ /img, "");
    //预处理特殊字符
    str = str.replace(/（/img, "(");
    str = str.replace(/【/img, "(");
    str = str.replace(/{/img, "(");
    str = str.replace(/）/img, ")");
    str = str.replace(/】/img, ")");
    str = str.replace(/}/img, ")");
    str = str.replace(/!/img, "!");
    str = str.replace(/！/img, "!");
    //特殊符号符号处理
    str = str.replace(/÷/img, "/");
    str = str.replace(/×/img, "*");
    str = str.replace(/_/img, "-");
    str = str.replace(/——/img, "-");
    return str;
}

// 函数功能：计算器回计算按钮，点击按钮，计算结果
// 函数参数：需要计算的字符串
// 返回值：Answer
function Result(str) {
    //判断括号是否匹配
    var flag = IsMatching(str);
    if (flag == true) {
        //得到后缀表达式数组
        var PostArray = Changestr(str);
        if (PostArray == false) {
            return 0;
        } else if (PostArray == "数字后面请无直接加(") {
            return "数字后面请无直接加(";
        }
        //计算后缀表达式
        var Answer = Calculation(PostArray);
        //返回结果
        return Answer
    } else {
        //alert("括号不匹配，请重新输入");
        document.getElementById("mainTextarea").value = "括号不匹配";
        return false;
    }
}


// 函数功能：判断括号是否匹配
// 函数参数：输入的字符串
// 返回值：true or false
function IsMatching(str) {
    var stack = new Stack();
    for (let i = 0; i < str.length; i++) {
        //转换括号
        if (str[i] == '[' || str[i] == '{')
            str[i] = '(';
        if (str[i] == ']' || str[i] == '}')
            str[i] = ')';
        var data = str[i];
        if (data == '(') {//如果是左括号就入栈
            stack.Push(data);
        } else if (data == ')') {//右括号,
            if (stack.IsEmpty()) {//如果栈空，则不匹配
                return false;
            } else if (stack.Top() == '(') {//括号匹配则消去括号
                stack.Pop();
                continue;
            } else {//括号不匹配，右括号入栈
                stack.Push(data);
            }
        } else {
            continue;
        }
    }
    return stack.IsEmpty();
}

// 函数功能：通过后缀表达式 计算结果
// 函数参数：后缀表达式数组
// 返回值：结果值
function Calculation(Data) {
    var answer = 0;
    let stack = new Stack();//一个栈容器
    for (let i = 0; i < Data.length; i++) {
        data = Data[i];
        if (data == '+') {
            let temp = stack.Top();
            stack.Pop();
            temp += stack.Top();
            stack.Pop();
            stack.Push(temp);
        } else if (data == '-') {
            let temp = stack.Top();
            stack.Pop();
            temp = stack.Top() - temp;
            stack.Pop();
            stack.Push(temp);
        } else if (data == '*') {
            let temp = stack.Top();
            stack.Pop();
            temp *= stack.Top();
            stack.Pop();
            stack.Push(temp);
        } else if (data == '/') {
            let temp = stack.Top();
            stack.Pop();
            if (temp == 0) {
                //alert("分母不为0");
                return "Error";
            }
            temp = stack.Top() / temp;
            stack.Pop();
            stack.Push(temp);
        } else if (data == '^') {
            let index = stack.Top();
            stack.Pop();
            let bottom = stack.Top();
            stack.Pop();
            let temp = Math.pow(bottom, index);
            stack.Push(temp);
        } else if (data == '!') {
            var temp = stack.Top();
            stack.Pop();
            //alert(temp);
            var n = 1;
            for (var q = 1; q <= temp; q++) {
                n *= q;
            }
            stack.Push(n);
        } else {//数字进栈
            data = parseFloat(data);//
            stack.Push(data);
        }
    }
    answer = stack.Top();
    return answer;
}

// 函数功能： 将mainInput框的字符串切割成中缀表达式，随后转换为后缀表达式。
// 函数参数： str为目标字符串
// 返回值：   后缀表达式数组
function Changestr(str) {
    //得到文本字符串
    str += '='; // 增加字符串结束符号
    // 建立中缀栈容器
    let stackInfix = new Stack();
    // 中缀表达式: 遍历字符串将字符串分割成数字和字符，在该容器，从0到size是中缀表达式的值。
    let num = ''; //用来保存多个字符，最后把其转换为浮点型数字
    for (let i = 0; i < str.length; i++) {
        //console.log(str[i]);
        if (str[i] == '+' || str[i] == '-' || str[i] == '*' || str[i] == '/' || str[i] == '^')//计算符号入栈
        {
            stackInfix.Push(str[i]);
        } else if (str[i] == '(' || str[i] == '[' || str[i] == '{' || str[i] == ')' || str[i] == ']' || str[i] == '}')//括号入栈
        {
            stackInfix.Push(str[i]);
        } else if (str[i] <= '9' && str[i] >= '0' || str[i] == '.' || str[i] == '!')//数字入栈
        {
            if (str[i] == '!') {//这个东西很头疼,
                stackInfix.Push(num);
                if (str[i - 1] == ')') {//如果存在括号
                    stackInfix.Pop();//清楚空元素
                    stackInfix.Push("!");
                    continue;
                }
                var numlevel = 1;
                for (let l = 1; l <= num; l++) {//计算num阶乘入栈
                    numlevel *= l;
                }
                stackInfix.Pop();
                stackInfix.Push(numlevel);
                num = "";
                continue;
                stackInfix.Push(num);
                stackInfix.Push("!");
                num = "";
                continue;
            }
            if (str[i + 1] == '(' || str[i + 1] == '[' || str[i + 1] == '{') {
                return "数字后面请无直接加(";
            }
            num += str[i];
            if (str[i + 1] == '^')//如果要算次方,就将数字入栈、^入栈
            {
                // if(str[i+2]== '('){
                // 	alert("Bingo,恭喜你发现BUG，关于表达式：^(无限括号匹配)，还未解决，欢迎大佬指点一下，我已经不行了。。。。。。");
                // 	return false;
                // }
                let digit = parseFloat(num);
                stackInfix.Push(digit);
                stackInfix.Push('^');
                num = "";
                i++;
                continue;
            } else if (str[i + 1] == '+' || str[i + 1] == '-' || str[i + 1] == '*' || str[i + 1] == '/' ||
                str[i + 1] == '(' || str[i + 1] == '[' || str[i + 1] == '{' || str[i + 1] == ')' || str[i + 1] == ']' || str[i + 1] ==
                '}' ||
                str[i + 1] == '=') {
                let digit = parseFloat(num);
                stackInfix.Push(digit);
                num = "";
            }
        } else if (str[i] == '=') {
            var instr = "";
            for (var ii = 0; ii < stackInfix.Length(); ii++) {
                instr += stackInfix.IndexOf(ii);
            }
            console.log("中缀表达式为:" + instr);
        } else {
            if (flag == 1) {
                break;
            }
            var flag = 1;
            alert("请输入正确数据");
            return 0;
        }
    }
    stackInfix.Print();

    stackInfix = Solution(stackInfix);
    console.log("********")
    stackInfix.Print();
    //建立后缀表达式
    let stackPostfix = new Stack();
    let Post = [];
    for (let j = 0; j < stackInfix.Length(); j++) {
        var data = stackInfix.IndexOf(j); //得到下标为j的数据；

        //转换括号，方便后续操作
        if (data == '[' || data == '{') {
            data = '(';
        } else if (data == ']' || data == '}') {
            data = ')';
        }

        // 数字直接入栈、非数字进栈
        if (data == '+' || data == '-' || data == '*' || data == '/' || data == '(' || data == ')' || data == '.' || data == '^' || data == '!') {
            //目前优先级大于栈顶，就入栈，运算级别相当，出栈顶再入栈
            if (stackPostfix.IsEmpty())//比如(2)+5，为了使该等式成立
            { //初始为空，直接入栈
                stackPostfix.Push(data);
            } else //不空
            {
                if (data == '(' || data == ')') //如果为括号
                {
                    while (!stackPostfix.IsEmpty() && (stackPostfix.Top() == '^')) //栈不空，只有栈顶为^，优先级大于^（先出现的优先级大）
                    {
                        Post.push(stackPostfix.Top())
                        stackPostfix.Pop();
                    }
                    if (data == '(') {
                        stackPostfix.Push(data);
                    } else {
                        while (stackPostfix.Top() != '(') {
                            Post.push(stackPostfix.Top())
                            stackPostfix.Pop();
                        }
                        stackPostfix.Pop();
                    }
                } else if (data == '!')//如果是阶乘
                {
                    while (!stackPostfix.IsEmpty() && (stackPostfix.Top() == '!')) //栈不空，只有栈顶为!，优先级大于!（先出现的优先级大）
                    {
                        Post.push(stackPostfix.Top())
                        stackPostfix.Pop();
                    }
                    stackPostfix.Push(data);
                } else if (data == '+' || data == '-') //如果为加减
                {
                    while (!stackPostfix.IsEmpty() && (stackPostfix.Top() == '^')) //栈不空，只有栈顶为^，优先级大于^（先出现的优先级大）
                    {
                        Post.push(stackPostfix.Top())
                        stackPostfix.Pop();
                    }
                    while (!stackPostfix.IsEmpty() && (stackPostfix.Top() == '+' || stackPostfix.Top() == '-' ||
                        stackPostfix.Top() == '*' || stackPostfix.Top() == '/' || stackPostfix.Top() == '^')) //栈不空,栈顶优先级大于+-
                    {
                        Post.push(stackPostfix.Top())
                        stackPostfix.Pop();
                    }
                    stackPostfix.Push(data);
                } else if (data == '^') //如果为次方,全部入栈
                {
                    while (!stackPostfix.IsEmpty() && (stackPostfix.Top() == '!')) //栈不空，只有栈顶为!，优先级大于^（先出现的优先级大）
                    {
                        Post.push(stackPostfix.Top())
                        stackPostfix.Pop();
                    }
                    stackPostfix.Push(data);
                } else if (data == '*' || data == '/') //如果为乘除
                {
                    while (!stackPostfix.IsEmpty() && (stackPostfix.Top() == '^')) //栈不空，只有栈顶为^，优先级大于^（先出现的优先级大）
                    {
                        Post.push(stackPostfix.Top())
                        stackPostfix.Pop();
                    }
                    while (!stackPostfix.IsEmpty() && (stackPostfix.Top() == '*' || stackPostfix.Top() == '/' || stackPostfix.Top() == '^')) //栈不空，只有栈顶为*/^时优先级大于*/（先出现的优先级大）
                    {
                        Post.push(stackPostfix.Top())
                        stackPostfix.Pop();
                    }
                    stackPostfix.Push(data);
                }

            }
        } else {
            Post.push(data);
        }
    }

    while (!stackPostfix.IsEmpty()) {
        Post.push(stackPostfix.Top());
        stackPostfix.Pop();
    }

    var postarray = "";
    for (let i = 0; i < Post.length; i++) {
        //console.log(Post);
        postarray += Post[i];
    }
    // 	//得到数组、如果此数组能够包含1+(20^3)^3*100
    // 	//定义新数组先从数组中提取出1，+，随后得到20^3^3，最后+100。
    // 	var FinalPost = [];
    // 	for(let i = 0; i < Post.length; i++)
    // 	{
    // 		if(Post[i+1]=='+'||Post[i+1]=='-'||Post[i+1]=='*'||Post[i+1]=='/')//如果下一位是加减乘除，则将该位放进数组
    // 		{
    // 			FinalPost.push(Post[i]);
    // 		}
    // 	}
    console.log("后缀表达式为：" + postarray);
    return Post;
}


// // 函数功能：计算器,计算按钮
// // 函数参数：无
// // 返回值：无
// function JudgeButton(){
// 	document.getElementById("audio-box").innerHTML="<audio src='music/cEquivalent.mp3' controls='controls' autoplay='autoplay' style='display:none;'></audio>";
// 	var str = document.getElementById("mainTextarea").value;
// 	str = Pretreatment(str);
// 	Answer = Result(str);
// 	if(Answer == false){
// 		document.getElementById("mainTextarea").value="0";
// 	}
// 	else if(Answer == "Error"){
// 		document.getElementById("mainTextarea").value="分母为0";
// 	}
// 	else if(Answer=="数字后面请无直接加("){
// 		document.getElementById("mainTextarea").value="数字请勿直接加'('";
// 	}
// 	else{
// 		document.getElementById("mainTextarea").value = Answer;	
// 		var flag = document.getElementById("mainTextarea").value;
// 		if(flag=="NaN"){
// 			document.getElementById("mainTextarea").value="表达式错误";
// 		}
// 		else if(flag == "undefined"){
// 			document.getElementById("mainTextarea").value="错误";
// 		}
// 	}
// 	
// 	var newdata= document.getElementById("secondTextarea").value;
// 	document.getElementById("secondTextarea").value="";
// 	newdata += "="; 
// 	newdata += Answer;
// 	document.getElementById("secondTextarea").value = newdata;
// 	
// 	if(document.getElementById("mainTextarea").value.length>=8){
// 		document.getElementById("mainTextarea").style="font-size:2em";
// 	}
// 	if(document.getElementById("mainTextarea").value.length>=13){
// 		document.getElementById("mainTextarea").style="font-size:1em";
// 	}
// 	//辅助框数据更新
// 	var str = document.getElementById("secondTextarea").value;
// 	Arraystr = str.split("=");
// 	if(Arraystr.length>=2){
// 		str = Arraystr[Arraystr.length-2] + "=" + Arraystr[Arraystr.length-1];
// 		document.getElementById("secondTextarea").value = str;
// 	}
// 	
// }
// 
// //函数功能：利用正则表达式兼容更多相似的运算符、删除全部空格。
// function Pretreatment(str){
// 	//正则表达式替换不合法字符
// 	str = str.replace(/ /img, "");
// 	//预处理特殊字符
// 	str = str.replace(/（/img, "(");
// 	str = str.replace(/【/img, "(");
// 	str = str.replace(/{/img, "(");
// 	str = str.replace(/）/img, ")");
// 	str = str.replace(/】/img, ")");
// 	str = str.replace(/}/img, ")");
// 	str = str.replace(/!/img, "!");
// 	str = str.replace(/！/img, "!");
// 	//特殊符号符号处理
// 	str = str.replace(/÷/img, "/");
// 	str = str.replace(/×/img, "*");
// 	str = str.replace(/_/img, "-");
// 	str = str.replace(/——/img, "-");
// 	return str;
// }
// 
// // 函数功能：计算器回计算按钮，点击按钮，计算结果
// // 函数参数：需要计算的字符串
// // 返回值：无
// function Result(str){
// 	//判断括号是否匹配
// 	var flag = IsMatching(str);
// 	if(flag==true){
// 		//得到后缀表达式数组
// 		var PostArray = Changestr(str);
// 		if(PostArray==false){
// 			return 0;
// 		}
// 		else if(PostArray =="数字后面请无直接加("){
// 			return "数字后面请无直接加(";
// 		}
// 		//计算后缀表达式
// 		var Answer = Calculation(PostArray);
// 		//返回结果
// 		return Answer
// 	}
// 	else{
// 		//alert("括号不匹配，请重新输入");
// 		document.getElementById("mainTextarea").value="括号不匹配";
// 		return false;
// 	}
// }
// 
// 
// // 函数功能：判断括号是否匹配
// // 函数参数：输入的字符串
// // 返回值：true or false
// function IsMatching(str){
// 	var stack = new Stack();
//  	for(let i=0;i<str.length;i++){
// 		//转换括号
//  		if(str[i]=='['||str[i]=='{')
// 			str[i] = '(';
// 		if(str[i]==']'||str[i]=='}')
// 			str[i] = ')';
// 		var data = str[i];
// 		if(data == '('){//如果是左括号就入栈
// 			stack.Push(data);
// 		}
// 		else if(data == ')'){//右括号,
// 			if(stack.IsEmpty()){//如果栈空，则不匹配
// 				return false;
// 			}
// 			else if(stack.Top() == '('){//括号匹配则消去括号
// 				stack.Pop();
// 				continue;
// 			}
// 			else{//括号不匹配，右括号入栈
// 				stack.Push(data);
// 			}
// 		}
// 		else{
// 			continue;
// 		}
//  	}
// 	return stack.IsEmpty();
// }
// 
// // 函数功能：通过后缀表达式 计算结果
// // 函数参数：后缀表达式数组
// // 返回值：结果值
// function Calculation(Data){
// 	var answer = 0;
// 	let stack = new Stack();//一个栈容器
// 	for(let i = 0;i<Data.length;i++){
// 		data = Data[i];
// 		if(data == '+' ){
// 			let temp = stack.Top();
// 			stack.Pop();
// 			temp += stack.Top();
// 			stack.Pop();
// 			stack.Push(temp);
// 		}
// 		else if(data == '-' ){
// 			let temp = stack.Top();
// 			stack.Pop();
// 			temp =  stack.Top() - temp;
// 			stack.Pop();
// 			stack.Push(temp);
// 		}
// 		else if(data == '*' ){
// 			let temp = stack.Top();
// 			stack.Pop();
// 			temp *= stack.Top();
// 			stack.Pop();
// 			stack.Push(temp);
// 		}
// 		else if(data == '/' ){
// 			let temp = stack.Top();
// 			stack.Pop();
// 			if(temp == 0){
// 				//alert("分母不为0");
// 				return "Error";
// 			}
// 			temp =  stack.Top() / temp;
// 			stack.Pop();
// 			stack.Push(temp);
// 		}
// 		else if(data == '^'){
// 			let index = stack.Top();
// 			stack.Pop();
// 			let bottom = stack.Top();
// 			stack.Pop();
// 			let temp = Math.pow(bottom,index);
// 			stack.Push(temp);
// 		}
// 		else if(data == '!')
// 		{
// 			var temp = stack.Top();
// 			stack.Pop();
// 			//alert(temp);
// 			var n = 1;
// 			for(var q=1;q<=temp;q++){
// 				n *= q;
// 			}
// 			stack.Push(n);
// 		}
// 		else{//数字进栈
// 			data = parseFloat(data);//
// 			stack.Push(data);
// 		}
// 	}
// 	answer = stack.Top();
// 	return answer;
// }
// 
// // 函数功能： 将mainInput框的字符串切割成中缀表达式，随后转换为后缀表达式。
// // 函数参数： str为目标字符串
// // 返回值：   后缀表达式数组
// function Changestr(str) {
// 	//得到文本字符串
// 	str += '='; // 增加字符串结束符号
// 	// 建立中缀栈容器
// 	let stackInfix = new Stack();
// 	// 中缀表达式: 遍历字符串将字符串分割成数字和字符，在该容器，从0到size是中缀表达式的值。
// 	let num = ''; //用来保存多个字符，最后把其转换为浮点型数字
// 	for (let i = 0; i < str.length; i++)
// 	{
// 		//console.log(str[i]);
// 		if (str[i] == '+' || str[i] == '-' || str[i] == '*' || str[i] == '/'||str[i]=='^')//计算符号入栈
// 		{ 
// 			stackInfix.Push(str[i]);
// 		}
// 		else if (str[i] == '(' || str[i] == '[' || str[i] == '{' || str[i] == ')' || str[i] == ']' || str[i] == '}')//括号入栈
// 		{ 
// 			stackInfix.Push(str[i]);
// 		}
// 		else if (str[i] <= '9' && str[i] >= '0' || str[i] == '.'||str[i] == '!')//数字入栈
// 		{ 
// 			if(str[i] == '!'){//这个东西很头疼,
// 				stackInfix.Push(num);
// 				if(str[i-1]==')'){//如果存在括号
// 					 stackInfix.Pop();//清楚空元素
// 					stackInfix.Push("!");
// 					continue;
// 				}
// 				var numlevel = 1;
// 				for(let l= 1;l<=num;l++){//计算num阶乘入栈
// 					numlevel *=l;
// 				}
// 				stackInfix.Pop();
// 				stackInfix.Push(numlevel);
// 				num="";
// 				continue;
// 				stackInfix.Push(num);
// 				stackInfix.Push("!");
// 				num = "";
// 				continue;
// 			}
// 			if(str[i+1]=='('||str[i+1]=='['||str[i+1]=='{'){
// 				return "数字后面请无直接加(";
// 			}
// 			num += str[i];
// 			if(str[i+1]== '^')//如果要算次方,就将数字入栈、^入栈
// 			{
// 				if(str[i+2]== '('){
// 					alert("Bingo,恭喜你发现BUG，关于表达式：^(无限括号匹配)，还未解决，欢迎大佬指点一下，我已经不行了。。。。。。");
// 					return false;
// 				}
// 				let digit = parseFloat(num);
// 				stackInfix.Push(digit);
// 				stackInfix.Push('^');
// 				num = "";
// 				i++;
// 				continue;
// 			}
// 			else if (str[i + 1] == '+' || str[i + 1] == '-' || str[i + 1] == '*' || str[i + 1] == '/' ||
// 				str[i + 1] == '(' || str[i + 1] == '[' || str[i + 1] == '{' || str[i + 1] == ')' || str[i + 1] == ']' || str[i + 1] ==
// 				'}' ||
// 				str[i + 1] == '=') 
// 			{
// 				let digit = parseFloat(num);
// 				stackInfix.Push(digit);
// 				num = "";
// 			}
// 		}
// 		else if (str[i] == '=')
// 		{
// 			var instr = "";
// 			for(var ii=0;ii<stackInfix.Length();ii++){
// 				instr += stackInfix.IndexOf(ii);
// 			}
// 			console.log("中缀表达式为:"+instr);
// 		} 
// 		else  {
// 			if(flag == 1)
// 			{
// 				break;
// 			}
// 			var flag = 1;
// 			alert("请输入正确数据");
// 			return 0;
// 		}
// 	}
// 	stackInfix.Print();
// 	//建立后缀表达式
// 	let stackPostfix = new Stack();
// 	let Post = [];
// 	for (let j = 0; j < stackInfix.Length(); j++) 
// 	{
// 		var data = stackInfix.IndexOf(j); //得到下标为j的数据；
// 		
// 		//转换括号，方便后续操作
// 		if (data == '[' || data == '{')
// 		{
// 			data = '(';
// 		}
// 		else if (data == ']' || data == '}')
// 		{
// 			data = ')';
// 		}	
// 
// 		// 数字直接入栈、非数字进栈
// 		if (data == '+' || data == '-' || data == '*' || data == '/' || data == '(' || data == ')' ||data=='.'|| data=='^' || data=='!') 
// 		{
// 			//目前优先级大于栈顶，就入栈，运算级别相当，出栈顶再入栈
// 			if (stackPostfix.IsEmpty())//比如(2)+5，为了使该等式成立
// 			{ //初始为空，直接入栈
// 				stackPostfix.Push(data);
// 			} 
// 			else //不空
// 			{ 
// 				if (data == '(' || data == ')') //如果为括号
// 				{
// 					while (!stackPostfix.IsEmpty() && (stackPostfix.Top() == '^')) //栈不空，只有栈顶为^，优先级大于^（先出现的优先级大）
// 					{
// 						Post.push( stackPostfix.Top() )
// 						stackPostfix.Pop();
// 					}
// 					if (data == '(')
// 					{
// 						stackPostfix.Push(data);
// 					} 
// 					else 
// 					{
// 						while (stackPostfix.Top() != '(')
// 						{
// 							Post.push( stackPostfix.Top()   )
// 							stackPostfix.Pop();
// 						}
// 						stackPostfix.Pop();
// 					}
// 				}
// 				else if(data == '!')//如果是阶乘
// 				{
// 					stackPostfix.Push(data);
// 				}
// 				else if (data == '+' || data == '-') //如果为加减
// 				{
// 					while (!stackPostfix.IsEmpty() && (stackPostfix.Top() == '^')) //栈不空，只有栈顶为^，优先级大于^（先出现的优先级大）
// 					{
// 						Post.push( stackPostfix.Top() )
// 						stackPostfix.Pop();
// 					}
// 					while (!stackPostfix.IsEmpty() && (stackPostfix.Top() == '+' || stackPostfix.Top() == '-' ||
// 							stackPostfix.Top() == '*' || stackPostfix.Top() == '/'|| stackPostfix.Top() == '^')) //栈不空,栈顶优先级大于+-
// 					{
// 						Post.push( stackPostfix.Top() )
// 						stackPostfix.Pop();
// 					}
// 					stackPostfix.Push(data);
// 				} 
// 				else if (data == '^') //如果为次方,全部入栈
// 				{
// 					stackPostfix.Push(data);
// 				}
// 				else if (data == '*' || data == '/') //如果为乘除
// 				{
// 					while (!stackPostfix.IsEmpty() && (stackPostfix.Top() == '^')) //栈不空，只有栈顶为^，优先级大于^（先出现的优先级大）
// 					{
// 						Post.push( stackPostfix.Top() )
// 						stackPostfix.Pop();
// 					}
// 					while (!stackPostfix.IsEmpty() && (stackPostfix.Top() == '*' || stackPostfix.Top() == '/'||stackPostfix.Top() == '^')) //栈不空，只有栈顶为*/^时优先级大于*/（先出现的优先级大）
// 					{
// 						Post.push( stackPostfix.Top() )
// 						stackPostfix.Pop();
// 					}
// 					stackPostfix.Push(data);
// 				} 
// 				
// 			}
// 		} 
// 		else
// 		{
// 			 Post.push(data);
// 		}
// 	}
// 	
// 	while(!stackPostfix.IsEmpty())
//     {
//         Post.push( stackPostfix.Top() );
//         stackPostfix.Pop();
//     }
// 	
// 	var postarray = "";
// 	for (let i = 0; i < Post.length; i++) {
// 		//console.log(Post);
// 		postarray += Post[i];
// 	}
// // 	//得到数组、如果此数组能够包含1+(20^3)^3*100
// // 	//定义新数组先从数组中提取出1，+，随后得到20^3^3，最后+100。
// // 	var FinalPost = [];
// // 	for(let i = 0; i < Post.length; i++)
// // 	{
// // 		if(Post[i+1]=='+'||Post[i+1]=='-'||Post[i+1]=='*'||Post[i+1]=='/')//如果下一位是加减乘除，则将该位放进数组
// // 		{
// // 			FinalPost.push(Post[i]);
// // 		}
// // 	}
// 	console.log("后缀表达式为："+postarray);
// 	return Post;
// }
// 
// 