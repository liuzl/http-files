$(function () {
    var options = {
        grid: {
            borderColor: "#f3f3f3",
            borderWidth: 1,
            tickColor: "#f3f3f3"
        },
        series: {
            shadowSize: 0, // Drawing is faster without shadows
            color: "#3c8dbc"
        },
        lines: {
            fill: true, //Converts the line chart to area chart
            color: "#3c8dbc"
        },
        yaxis: {
            min: 0,
            //max: 100,
            show: true
        },
        xaxis: {
            show: true
        }

    };
  
    var cpuBuf = [], memBuf = [], totalPoints = 108;
    var run = function() {
        $('#interactive').everyTime('1s', 'monitor', function(){  
            $.ajax({  
                type: "get",  
                url: './vars.json',  
                dataType : "json",  
                success : function(result) {  
                    if (cpuBuf.length > totalPoints)  
                        cpuBuf = cpuBuf.slice(cpuBuf.length-totalPoints);  
                    if (memBuf.length > totalPoints)  
                        memBuf = memBuf.slice(memBuf.length-totalPoints);  
                    cpuBuf.push((result.memstats.PauseTotalNs % 100)*Math.random());  
                    memBuf.push(result.memstats.Alloc % 100 + Math.random() * 10 - 5);  
                  
                    var cpuArr = [], memArr = [];  
                    for (var i = 0; i<cpuBuf.length; i++){  
                        cpuArr.push([i, cpuBuf[i]]);  
                        memArr.push([i, memBuf[i]]);  
                    }  
                    var cpuData = [{data: cpuArr, color: '#0f0'},{data: memArr, color: '#00f'}];                  
                    $.plot($("#interactive"), cpuData, options); 
                }  
            });  
        }, 0, true);
    };

    var realtime = "on";
    run();

    //REALTIME TOGGLE
    $("#realtime .btn").click(function () {
        if ($(this).data("toggle") === "on") {
            realtime = "on";
            run();
        }
        else {
            realtime = "off";
            $('#interactive').stopTime();
        }
    });
});
