class stopwatch {
    constructor(id) {
        this.id = id;
        this.minutes = 0;
        this.seconds = 0;
        this.millSeconds = 0;
    }

    start() {
        var timer = this;
        this.runTimer = setInterval(() => {
            timer.millSeconds += 1;
            timer.seconds += Math.floor(timer.millSeconds / 100);
            timer.minutes += Math.floor(timer.seconds / 60);
            timer.seconds %= 60;
            timer.millSeconds %= 100;
            this.display();
        }, 10);
    }

    stop() {
        clearInterval(this.runTimer);
    }

    display() {
        $("#watch-" + this.id).text(this.toString());
    }

    toString() {
        var min, sec, millSec, time;
        min = (this.minutes < 10 ? '0' : '') + this.minutes.toString();
        sec = (this.seconds < 10 ? '0' : '') + this.seconds.toString();
        millSec = (this.millSeconds < 10 ? '0' : '') + this.millSeconds.toString();
        time = min + ':' + sec + '.' + millSec;
        return time;
    }

}

$(document).ready(function () {

    var i = 0, j = 0;
    var stopwatches = [];

    //create new clock
    $("#add-clock").click(function () {
        stopwatches.push(new stopwatch(i))
        console.log(stopwatches[i]);
        var table = "<tr><td>" + i + "</td>\
            <td id=\"watch-"+ i + "\">00:00</td>\
            <td><button type=\"button\" class=\"btn btn-danger\"><i class=\"fa fa-check\" style=\"font-size:18px\"></i></button></td></tr>";
        $("#time-table").append(table);
        stopwatches[i].start();
        i++;

    });

    //remove ROW
    $("tbody").on('click', '.btn', function () {
        var currentRow = $(this).closest('tr');
        var watchId = currentRow.find('td:eq(1)').attr("id");
        var id = watchId.split("-");
        id = parseInt(id[1]);
        var stopwatch = stopwatches[id];
        stopwatch.stop();
        // console.log(stopwatches[id]);
        var table = "<tr><td>" + j + "</td>\
            <td id=\"result-"+ j + "\">" + stopwatch.toString() + "</td>\
            </tr>";
        $("#result").append(table);
        $(this).closest('tr').remove();
        j++
    });

    //Average
    $("#avg").click(function () {
        var sum = 0;
        for (var k = 0; k < j; k++) {
            var str = $("#result-" + k).text();
            var tt = str.split(":");
            sum += parseInt(tt[0]) * 60 + parseFloat(tt[1]);
        }
        var avg = TimetoString(sum / j);
        // console.log(avg);
        $("#avg").text(avg);
    });
});


function TimetoString(second) {
    var min = Math.floor(second / 60);
    var sec = Math.round((second % 60) * 100) / 100;
    if (min == 0) min = '00';
    else if (min < 10) min = '0' + min;
    if (sec == 0) sec = '00';
    else if (sec < 10) sec = '0' + sec;
    return min + ":" + sec;
}
