import React from 'react';
import ChartView from 'react-native-highcharts';

class Graph1Screen extends React.Component {
    // static navigationOptions = {
    //   title: 'Graph',
    // };
    render() {
    var Highcharts='Highcharts';
    // var conf={
    //         chart: {
    //             type: 'spline',
    //             animation: Highcharts.svg, // don't animate in old IE
    //             marginRight: 10,
    //             events: {
    //                 load: function () {

    //                     // set up the updating of the chart each second
    //                     var series = this.series[0];
    //                     setInterval(function () {
    //                         var x = (new Date()).getTime(), // current time
    //                             y = Math.random();
    //                         series.addPoint([x, y], true, true);
    //                     }, 1000);
    //                 }
    //             }
    //         },
    //         title: {
    //             text: 'Actual Temperatures'
    //         },
    //         xAxis: {
    //             type: 'datetime',
    //             tickPixelInterval: 150
    //         },
    //         yAxis: {
    //             title: {
    //                 text: 'Value'
    //             },
    //             plotLines: [{
    //                 value: 0,
    //                 width: 1,
    //                 color: '#808080'
    //             }]
    //         },
    //         tooltip: {
    //             formatter: function () {
    //                 return '<b>' + this.series.name + '</b><br/>' +
    //                     Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
    //                     Highcharts.numberFormat(this.y, 2);
    //             }
    //         },
    //         legend: {
    //             enabled: false
    //         },
    //         exporting: {
    //             enabled: false
    //         },
    //         series: [{
    //             name: 'Random data',
    //             data: (function () {
    //                 // generate an array of random data
    //                 var data = [],
    //                     time = (new Date()).getTime(),
    //                     i;

    //                 for (i = -19; i <= 0; i += 1) {
    //                     data.push({
    //                         x: time + i * 1000,
    //                         y: Math.random()
    //                     });
    //                 }
    //                 return data;
    //             }())
    //         }]
    //     };

    // const options = {
    //     global: {
    //         useUTC: false
    //     },
    //     lang: {
    //         decimalPoint: ',',
    //         thousandsSep: '.'
    //     }
    // };
{/* <ChartView style={{height:[ta_hauteur_en_px]}} config={humidity_conf}></ChartView> */}
    const humidity_conf = {
    title: {
        text: 'Humidity (%)'
    },
    yAxis: {
        title: {
        text: 'Humidity in %'
        }
    },
    xAxis: {
        title: {
        text: 'Time in hours'
        }
    },

    plotOptions: {
        series: {
        label: {
            connectorAllowed: false
        },
        pointStart: 1
        }
    },
    exporting: {
        enabled: true,
        filename: 'export'
    },
    series: [{
        name: 'Maximum',
        data: [80, 60, 30, 10, 5, 39, 17, 12, 28, 70, 50]
    },
    {
        name: 'Average',
        data: [65, 50, 18, 5, 29, 8, 6, 12, 15, 60, 35]
    },
    {
        name: 'Minimum',
        data: [50, 40, 10, 0, 0, 19, 7, 2, 8, 50, 20]
    },
    {
        name: 'Day Maximum',
        data: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
    },
    {
        name: 'Day Average',
        data: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
    },
    {
        name: 'Day Minimum',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }]
    };
    return (
    <ChartView style={{height:300}} config={humidity_conf} ></ChartView>
    );
}
}

export default Graph1Screen;