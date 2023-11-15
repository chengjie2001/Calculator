function creatTab1() {
    var rows = document.getElementById('rows1').value;
    var cols = document.getElementById('cols1').value;
    var div1 = document.getElementById('div1');
    // alert(rows+'\n'+cols)
    var tab = '<p>提示：</p><table class="dm-table dm-table-deepblue">';
    tab += '<thead>';
    tab += '<tr>';
    for (var numcol = 0; numcol < cols; numcol++) {
        if (numcol == 0)
            tab += "<th>" + "配方" + "</th>";
        else {
            var str = '配方' + numcol;
            tab += "<th>" + "<input placeholder='配方' class='form-control' type='text'/>" + "</th>";
        }
    }
    tab += '</tr>';
    tab += '</thead><tbody>';
    for (var i = 1; i < rows; i++) {
        tab += '<tr>';
        for (var j = 0; j < cols; j++) {
            if (j == 0)
                tab += "<td class='no-padding' style='font-size: 75%;'>" + "样本" + i + "</td>";
            else
                tab += "<td >" + "<input type='text' class='form-control' />" + "</td>";
        }
        tab += '</tr>';
    }
    tab += '</tbody></table>';
    div1.innerHTML = tab
}

function creatRow1() {
    var div = document.getElementById('div1');
    //加行只需要加tbody的n列即可

    //得到行列数
    var tr = div.getElementsByTagName("tr");
    var th = div.getElementsByTagName("th");
    var rowlength = document.getElementById('rows1').value;
    var collength = document.getElementById('cols1').value;
    //非法输入判断
    if (rowlength <= 1 || collength <= 1) {
        if (rowlength == 0 && collength == 0)
            alert("请先创建表格");
        else
            alert("请正确地创建表格");
    } else {
        var table = div.getElementsByTagName("table")[0].insertRow(rowlength);
        for (var i = 0; i < collength; i++) {
            if (i == 0) {
                var temp = table.insertCell(i);
                var text = "<td" + "class='no-paddin' style='font-size: 75%;'" + ">" + "New" + rowlength + "</td>";
                temp.innerHTML = text;
            } else {
                var temp = table.insertCell(i);
                temp.innerHTML = "<td >" + "<input type='text' class='form-control' />" + "</td>";
            }
        }
        rowlength++;
        document.getElementById('rows1').value = rowlength;
    }
}

function creatCol1() {
    var div = document.getElementById('div1');
    //加列需要得到一共有多少行
    //得到行列数
    var tr = div.getElementsByTagName("tr");
    var th = div.getElementsByTagName("th");
    var rowlength = document.getElementById('rows1').value;
    var collength = document.getElementById('cols1').value;
    //非法输入判断
    if (rowlength <= 1 || collength <= 1) {
        if (rowlength == 0 && collength == 0)
            alert("请先创建表格");
        else
            alert("请正确地创建表格");
    } else {
        for (var i = 0; i < rowlength; i++) {
            if (i == 0) {
                //新的th结点创建
                var newth = document.createElement("th");
                var text = "<input placeholder=" + 'new' + collength + " + class='form-control' type='text'/>";
                newth.innerHTML = text;
                tr[i].appendChild(newth);
            } else {
                var temp = tr[i].insertCell(collength);
                temp.innerHTML = "<td >" + "<input type='text' class='form-control' />" + "</td>";
            }
        }
        collength++;
        document.getElementById('cols1').value = collength;
    }
}
