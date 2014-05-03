var agpower = function (arr, val) {
    if (arr[0] > val) return 0
    else return agpower(arr.slice(1), val - arr[0]) + 1;
}

var assemb = function (orig_arr) {
    if (orig_arr.length == 1) {
        //        console.log(orig_arr, "arr");
        return [orig_arr]
    } else {
        var outputarr = [];
        for (var i = 0; i < orig_arr.length; i++) {
            //            console.log(orig_arr.length, "arr.length");
            //            console.log(i, "i");
            var item = orig_arr[i];
            var arr = orig_arr.concat();
            //            console.log(item, "item");
            var newarr = arr.splice(i + 1);
            //            console.log(newarr, "newarr");
            arr.pop();
            //            console.log(arr, "arr");
            subarr = arr.concat(newarr);
            //            console.log(subarr, "subarr");
            subarr = assemb(subarr);
            //            console.log(subarr, "subarr");
            for (var j = 0; j < subarr.length; j++) {
                outputarr.push([item].concat(subarr[j]));
                //                console.log(j, "j");
                //                console.log(outputarr, "outputarr");
            };
            //            console.log(i, "i");
        }
        //        console.log(outputarr, "outputarr");
        return outputarr;
    }
}

var count_power = function (arr) {
    // ide_arr=[0,1,2,3,4];
    var ide_arr = [];
    for (var i = 0; i < arr.length; i++) {
        ide_arr.push(i);
    }
    //index_ass_arr: all the assemble of [0,1,2,3,4];
    var index_ass_arr = assemb(ide_arr);
    // ass_arr : all the assemble of [36,16,16,16,16];
    var ass_arr = assemb(arr);
    console.log(ass_arr, "ass_arr");
    var count_arr = [];
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    console.log(sum, "sum");
    for (var i = 0; i < index_ass_arr.length; i++) {
        //        console.log(index_ass_arr[i], "index_ass_arr[i]");
        //        console.log(ass_arr[i], "ass_arr[i]");

        ag_index = agpower(ass_arr[i], sum / 2);
        //        console.log(ag_index, "ag_index");
        //        console.log("誰是風雲人物?", index_ass_arr[i][ag_index]);
        count_arr.push(index_ass_arr[i][ag_index]);
    }
    console.log(count_arr, "count_arr");

    var result_arr = [];
    for (var i = 0; i < arr.length; i++) {
        result_arr.push(0);
    }
    for (var i = 0; i < count_arr.length; i++) {
        result_arr[count_arr[i]]++;
    }
    for (var i = 0; i < result_arr.length; i++) {
        result_arr[i] = (Math.floor(result_arr[i] * 1000 / ass_arr.length) / 10).toString() + " %";

    }

    return result_arr;

}


$(function () {
    //輸出按鈕
    $('#output-btn').click(function () {
        var arr = [];
        $('.agpower-input').each(function () {
            //console.log(this);
            arr.push(Number($(this).val()))
        });

        var result_arr = count_power(arr);
        $('.agresult-div').each(function (i) {
            $(this).text(result_arr[i]);
        })
    });

    $('#kill-arger-btn').click(function () {
        $('#many-arger-div').children().last().remove();
        if ($('#many-arger-div').length == 0) console.log();
    });

    $('#add-arger-btn').click(function () {
        index = $('#many-arger-div').children().length;
        $('#many-arger-div').append('<div id="imarger_' + index + '" class="span2"><div class="agname"><input type="text" class="span2" name="" id="agname_' + index + '" value="新阿哥"></div><div class="agpower-div"><input type="text" class="span2 agpower-input" name="" id="agpower_' + index + '" value="0"></div><div class="agresult-div"></div></div>');
    });


});