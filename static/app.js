// Top menu bar
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
var menuBar = document.getElementById("myTopnav");
var btns = menuBar.getElementsByClassName("btn");
console.group(btns);
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}

//populate dropdown buttons from flask api homepage
var extractedDataList = [];
get_data('ALB')
// Make a GET request to the Flask API
fetch('http://127.0.0.1:5000')
  .then(function(response) { 
    // Check if the response was successful
    if (response.ok) {
      // Extract the HTML content from the response
      return response.text();
    } else {
      throw new Error('Error: ' + response.status);
    }
  })
  .then(function(htmlContent) {
    // Use a regular expression to extract the text lines between the <a> tags
    var regex = /<a[^>]*>([^<]+)<\/a>/g;
    var match;
    while ((match = regex.exec(htmlContent)) !== null) {
      extractedDataList.push(match[1]);
    }

    // Perform any further operations with the extractedDataList
    function buttonFill(){

      for (let i=0; i < extractedDataList.length; i++){
          d3.select("#selCompany-1").append("option").text(extractedDataList[i])
      }
      for (let i=0; i < extractedDataList.length; i++){
        d3.select("#selCompany-2").append("option").text(extractedDataList[i])
    }

  };
  buttonFill();
  })
  .catch(function(error) {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  });

  const dropDown = d3.select('#selCompany-1');
  let options;
  const dropDown2 = d3.select('#selCompany-2');
  let options2;

function optionChanged(newPick) {
  return newPick;
};

dropDown.on("change", function() {
  let newPick = dropDown.property('value');
  newPick = optionChanged(newPick);
  get_data(newPick);
});

dropDown2.on("change", function() {
  let newPick = dropDown2.property('value');
  newPick = optionChanged(newPick);
  get_data2(newPick);
  console.log(newPick)
});


function get_data(stock){
d3.json(`http://127.0.0.1:5000/api/v1.0/${stock}`)
.then(data=>



// candlestick('GNENF')

// function candlestick() {
//  let data = get_data();
 {
    stockArray = []
    for (const i in data) {
        
        let dataArray = []
        dataArray.push(data[i].date)
        dataArray.push(data[i].open)
        dataArray.push(data[i].adj_close)
        dataArray.push(data[i].low)
        dataArray.push(data[i].high)
        stockArray.push(dataArray)
     }
    

var dom = document.getElementById('candle-1');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

const upColor = '#ec0000';
const upBorderColor = '#8A0000';
const downColor = '#00da3c';
const downBorderColor = '#008F28';
// Each item: open，close，lowest，highest
const data0 = splitData(stockArray);

let tickName = d3.select('#selCompany-1').node().value

console.log(tickName);
function splitData(rawData) {
  const categoryData = [];
  const values = [];
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
  }
  return {
    categoryData: categoryData,
    values: values
  };
}
function calculateMA(dayCount) {
  var result = [];
  for (var i = 0, len = data0.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += +data0.values[i - j][1];
    }
    result.push(sum / dayCount);
  }
  return result;
}
option = {
  title: {
    text: tickName,
    left: 0
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: [tickName, 'MA5', 'MA10', 'MA20', 'MA30']
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    data: data0.categoryData,
    boundaryGap: false,
    axisLine: { onZero: false },
    splitLine: { show: false },
    min: 'dataMin',
    max: 'dataMax'
  },
  yAxis: {
    scale: true,
    splitArea: {
      show: true
    }
  },
  dataZoom: [
    {
      type: 'inside',
      start: 50,
      end: 100
    },
    {
      show: true,
      type: 'slider',
      top: '90%',
      start: 50,
      end: 100
    }
  ],
  series: [
    {
      name: tickName,
      type: 'candlestick',
      data: data0.values,
      itemStyle: {
        color: upColor,
        color0: downColor,
        borderColor: upBorderColor,
        borderColor0: downBorderColor
      },
      markPoint: {
        label: {
          formatter: function (param) {
            return param != null ? Math.round(param.value) + '' : '';
          }
        },
        data: [
          {
            name: 'Mark',
            coord: ['2013/5/31', 2300],
            value: 2300,
            itemStyle: {
              color: 'rgb(41,60,85)'
            }
          },
          {
            name: 'highest value',
            type: 'max',
            valueDim: 'highest'
          },
          {
            name: 'lowest value',
            type: 'min',
            valueDim: 'lowest'
          },
          {
            name: 'average value on close',
            type: 'average',
            valueDim: 'close'
          }
        ],
        tooltip: {
          formatter: function (param) {
            return param.name + '<br>' + (param.data.coord || '');
          }
        }
      },
      markLine: {
        symbol: ['none', 'none'],
        data: [
          [
            {
              name: 'from lowest to highest',
              type: 'min',
              valueDim: 'lowest',
              symbol: 'circle',
              symbolSize: 10,
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: false
                }
              }
            },
            {
              type: 'max',
              valueDim: 'highest',
              symbol: 'circle',
              symbolSize: 10,
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: false
                }
              }
            }
          ],
          {
            name: 'min line on close',
            type: 'min',
            valueDim: 'close'
          },
          {
            name: 'max line on close',
            type: 'max',
            valueDim: 'close'
          }
        ]
      }
    },
    {
      name: 'MA5',
      type: 'line',
      data: calculateMA(5),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA10',
      type: 'line',
      data: calculateMA(10),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA20',
      type: 'line',
      data: calculateMA(20),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA30',
      type: 'line',
      data: calculateMA(30),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    }
  ]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);

}
)}
/////////////////////////////////////////////////////////////
get_line()
//line graph
function get_line(){
  d3.json(`http://127.0.0.1:5000/api/v1.0/UNION`)
  .then(data=>
    
// NEED TO ADD A NEW COLUMN TO CALCULATE GAIN FOR ALL COMPANIES, THIS VALUE NEEDS 
// TO BE CREATED IN THE SQL QUERY AND THEN ADDED TO THE FLASK. (IF YOU WANT TO MAKE
// THIS CHART MAKE MORE SENSE)
   {
    dateArray = []
    nameArray = []
    albArray = []
    gnenfArray = []
    lacArray = []
    lthmAArray = []
    malryArray = []
    nioArray = []
    pilbfArray = []
    sgmlArray = []
    sqmArray = []
    tslaArray = []

      for (x of data ){
      
        x.Ticker == 'ALB' ? albArray.push(x.adj_close):
        x.Ticker == 'GNENF' ? gnenfArray.push(x.adj_close):
        x.Ticker == 'LAC' ? lacArray.push(x.adj_close):
        x.Ticker == 'LTHM' ? lthmAArray.push(x.adj_close):
        x.Ticker == 'MALRY' ? malryArray.push(x.adj_close):
        x.Ticker == 'NIO' ? nioArray.push(x.adj_close):
        x.Ticker == 'PILBF' ? pilbfArray.push(x.adj_close):
        x.Ticker == 'SGML' ? sgmlArray.push(x.adj_close):
        x.Ticker == 'SQM' ? sqmArray.push(x.adj_close):
        x.Ticker == 'TSLA' ? tslaArray.push(x.adj_close): 
        x.date == 'ALB' ? dateArray.push(x.date):"Ticker"
      
    }
      let tickArray = []
      for (const i in data) {
        //dateArray.push(data[i].date)
        tickArray.push(data[i].Ticker)
      }
      


var dom = document.getElementById('line-1');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});


var app = {};

var option;

option = {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['ALB','GNENF','LAC','LTHM','MALRY','NIO','PILBF','SQML','SQM','TSLA']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: dateArray
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'ALB',
      type: 'line',
      stack: 'Total',
      data: albArray
    },
    {
      name: 'GNENF',
      type: 'line',
      stack: 'Total',
      data: gnenfArray
    },
    {
      name: 'LAC',
      type: 'line',
      stack: 'Total',
      data: lacArray
    },
    {
      name: 'LTHM',
      type: 'line',
      stack: 'Total',
      data: lthmAArray
    },
    {
      name: 'MALRY',
      type: 'line',
      stack: 'Total',
      data: malryArray
    },
    {
      name: 'NIO',
      type: 'line',
      stack: 'Total',
      data: nioArray
    },
    {
      name: 'PILBF',
      type: 'line',
      stack: 'Total',
      data: pilbfArray
    },
    {
      name: 'SQML',
      type: 'line',
      stack: 'Total',
      data: sgmlArray
    },
    {
      name: 'SQM',
      type: 'line',
      stack: 'Total',
      data: sqmArray
    },
    {
      name: 'TSLA',
      type: 'line',
      stack: 'Total',
      data:tslaArray
    }
  ]
};
      
if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);
})}