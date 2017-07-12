$(function () {
    /*
     * Flot Interactive Chart
     * -----------------------
     */
    // We use an inline data source in the example, usually data would
    // be fetched from a server

    var isoDateFormatter = function(x) { return ISODateString(new Date(x*1000)); };
    var byteSizeFormatter = function(y) { return Humanize.fileSize(y); };

    var data = [], totalPoints = 100;
    data.fill(0);

    function getData() {

        if (data.length >= totalPoints)
            data = data.slice(1);

        $.get("./vars.json", function(result) {
            //console.log(result.memstats.Alloc);
            //console.log(data.memstats.PauseTotalNs);
            //y = result.memstats.Alloc % 100 + Math.random() * 10 - 5;
            y = byteSizeFormatter(result.memstats.Alloc);
            data.push(y);
            console.log(y);
        });


        // Zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]]);
        }

        return res;
    }

    var interactive_plot = $.plot("#interactive", [getData()], {
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
            max: 100,
            show: true
        },
        xaxis: {
            show: true
        }
    });

    var updateInterval = 1000; //Fetch data ever x milliseconds
    var realtime = "on"; //If == to on then fetch data every x seconds. else stop fetching
    function update() {
        interactive_plot.setData([getData()]);

        // Since the axes don't change, we don't need to call plot.setupGrid()
        interactive_plot.draw();
        if (realtime === "on")
            setTimeout(update, updateInterval);
    }

    //INITIALIZE REALTIME DATA FETCHING
    if (realtime === "on") {
        update();
    }
    //REALTIME TOGGLE
    $("#realtime .btn").click(function () {
        if ($(this).data("toggle") === "on") {
            realtime = "on";
        }
        else {
            realtime = "off";
        }
        update();
    });
});
