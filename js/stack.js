function Stack() {
    let Data = []; //定义一个数组

    //判断栈是否为空
    this.IsEmpty = function () {
        if (Data.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    // 入栈函数
    this.Push = function (value) {
        Data.push(value);
    }

    // 出栈函数
    this.Pop = function () {
        //栈空无法出栈
        if (Data.length == 0) {
            return false;
        } else {
            return Data.pop();
        }
    }

    //得到栈顶元素不出栈
    this.Top = function () {
        return Data[Data.length - 1];
    }

    //得到栈的长度
    this.Size = function () {
        return Data.length;
    }

    //得到栈的长度
    this.Length = function () {
        return Data.length;
    }

    //清空栈
    this.Clear = function () {
        Data = [];
    }
    //打印栈
    this.Print = function () {
        console.log(Data.toString());
    }
    //得到第value个值，value取值0到size
    this.IndexOf = function (value) {
        return Data[value];
    }
}
