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

/////////////////////////////////////////////////////////////////

// Bar Chart 

get_bar()
//line graph
function get_bar(){
  d3.json(`http://127.0.0.1:5000/api/v1.0/Stock_2`)
  .then(data=>
{
    albArray = []
    albDate = new Set([])
    gnenfArray = []
    gnenfDate = new Set([])
    lacArray = []
    lacDate = new Set([])
    lthmArray = []
    lthmDate = new Set([])
    malryArray = []
    malryDate = new Set([])
    nioArray = []
    nioDate = new Set([])
    pilbfArray = []
    pilbfDate = new Set([])
    sgmlArray = []
    sgmlDate = new Set([])
    sqmArray = []
    sqmDate = new Set([])
    tslaArray = []
    tslaDate = new Set([])

      for (x of data ){
      
        x.ticker == 'ALB' ? albArray.push(x.adj_close): albDate.add(x.years);
        x.ticker == 'GNENF' ? gnenfArray.push(x.adj_close): gnenfDate.add(x.years);
        x.ticker == 'LAC' ? lacArray.push(x.adj_close): lacDate.add(x.years);
        x.ticker == 'LTHM' ? lthmArray.push(x.adj_close): lthmDate.add(x.years);
        x.ticker == 'MALRY' ? malryArray.push(x.adj_close): malryDate.add(x.years);
        x.ticker == 'NIO' ? nioArray.push(x.adj_close): nioDate.add(x.years);
        x.ticker == 'PILBF' ? pilbfArray.push(x.adj_close): pilbfDate.add(x.years);
        x.ticker == 'SGMML' ? sgmlArray.push(x.adj_close): sgmlDate.add(x.years);
        x.ticker == 'SQM' ? sqmArray.push(x.adj_close): sqmDate.add(x.years);
        x.ticker == 'TSLA' ? tslaArray.push(x.adj_close): tslaDate.add(x.years);
       
        console.log("data does not exist")
      
    }

console.log(tslaArray)
console.log(data)
var dom = document.getElementById('comparison');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  xAxis: {
    data: ['GNENF', 'LAC', "LTHM", 'ALB','MALRY','NIO','PILBF','SGML','SQM','TSLA']
  },
  yAxis: {},
  dataGroupId: '',
  animationDurationUpdate: 800,
  series: {
    type: 'bar',
    id: 'sales',
    data: [
      {
        value: 23,
        groupId: 'GNENF'
      },
      {
        value: 41,
        groupId: 'LAC'
      },
      {
        value: 35,
        groupId: 'LTHM'
      },
      {
        value: 350,
        groupId: 'ALB'
      },
      {
        value: 67,
        groupId: 'MALRY'
      },
      {
        value: 63,
        groupId: 'NIO'
      },
      {
        value: 4,
        groupId: 'PILBF'
      },
      {
        value: 42,
        groupId: 'SGML'
      },
      {
        value: 102,
        groupId: 'SQM'
      },
      {
        value: 409,
        groupId: 'TSLA'
      },
    ],
    universalTransition: {
      enabled: true,
      divideShape: 'clone'
    }
  }
};
const drilldownData = [
  {
    dataGroupId: 'GNENF',
    data: [
      ['2019', gnenfArray[0]],
      ['2020', gnenfArray[1]],
      ['2021', gnenfArray[2]],
      ['2022', gnenfArray[3]],
      ['2023', gnenfArray[4]]
    ]
  },
  {
    dataGroupId: 'LAC',
    data: [
      ['2010', lacArray[0]],
      ['2011', lacArray[1]],
      ['2012', lacArray[2]],
      ['2013', lacArray[3]],
      ['2014', lacArray[4]],
      ['2015', lacArray[5]],
      ['2016', lacArray[6]],
      ['2017', lacArray[7]],
      ['2018', lacArray[8]],
      ['2019', lacArray[9]],     
      ['2020', lacArray[10]],
      ['2021', lacArray[11]],
      ['2022', lacArray[12]],
      ['2023', lacArray[13]]
     
    ]
  },
  {
    dataGroupId: 'LTHM',
    data: [
      ['2018', lthmArray[0]],
      ['2019', lthmArray[1]],     
      ['2020', lthmArray[2]],
      ['2021', lthmArray[3]],
      ['2022', lthmArray[4]],
      ['2023', lthmArray[5]]
    ]
  },
  {
    dataGroupId: 'ALB',
    data: [
      [albDate[5], albArray[0]],
      [albDate[6], albArray[1]],
      [albDate[7], albArray[2]],
      [albDate[8], albArray[3]],
      [albDate[9], albArray[4]],
      [albDate[10], albArray[5]],
      [albDate[11], albArray[6]],
      [albDate[12], albArray[7]],
      [albDate[13], albArray[8]],
      [albDate[1], albArray[9]],
      [albDate[2], albArray[10]],
      [albDate[3], albArray[11]],
      [albDate[4], albArray[12]],
      [albDate[5], albArray[13]]
    ]
  },
  {
    dataGroupId: 'MALRY',
    data: [

      ['2022', malryArray[0]],
      ['2023', malryArray[1]]
    ]
  },
  {
    dataGroupId: 'NIO',
    data: [
      ['2018', nioArray[0]],
      ['2019', nioArray[1]],     
      ['2020', nioArray[2]],
      ['2021', nioArray[3]],
      ['2022', nioArray[4]],
      ['2023', nioArray[5]]
    ]
  },
  {
    dataGroupId: 'PILBF',
    data: [
      ['2016', pilbfArray[0]],
      ['2017', pilbfArray[1]],
      ['2018', pilbfArray[2]],
      ['2019', pilbfArray[3]],     
      ['2020', pilbfArray[4]],
      ['2021', pilbfArray[5]],
      ['2022', pilbfArray[6]],
      ['2023', pilbfArray[7]]
    ]
  },
  {
    dataGroupId: 'SGML',
    data: [
      ['2018', sgmlArray[0]],
      ['2019', sgmlArray[1]],
      ['2020', sgmlArray[2]],
      ['2021', sgmlArray[3]],
      ['2022', sgmlArray[4]],
      ['2023', sgmlArray[5]]
    ]
  },
  {
    dataGroupId: 'SQM',
    data: [
      ['2010', sqmArray[0]],
      ['2011', sqmArray[1]],
      ['2012', sqmArray[2]],
      ['2013', sqmArray[3]],
      ['2014', sqmArray[4]],
      ['2015', sqmArray[5]],
      ['2016', sqmArray[6]],
      ['2017', sqmArray[7]],
      ['2018', sqmArray[8]],
      ['2019', sqmArray[9]],     
      ['2020', sqmArray[10]],
      ['2021', sqmArray[11]],
      ['2022', sqmArray[12]],
      ['2023', sqmArray[13]]
    ]
  },
  {
    dataGroupId: 'TSLA',
    data: [
      ['2010', tslaArray[0]],
      ['2011', tslaArray[1]],
      ['2012', tslaArray[2]],
      ['2013', tslaArray[3]],
      ['2014', tslaArray[4]],
      ['2015', tslaArray[5]],
      ['2016', tslaArray[6]],
      ['2017', tslaArray[7]],
      ['2018', tslaArray[8]],
      ['2019', tslaArray[9]],     
      ['2020', tslaArray[10]],
      ['2021', tslaArray[11]],
      ['2022', tslaArray[12]],
      ['2023', tslaArray[13]]
    ]
  }
];
myChart.on('click', function (event) {
  if (event.data) {
    var subData = drilldownData.find(function (data) {
      return data.dataGroupId === event.data.groupId;
    });
    if (!subData) {
      return;
    }
    myChart.setOption({
      xAxis: {
        data: subData.data.map(function (item) {
          return item[0];
        })
      },
      series: {
        type: 'bar',
        id: 'sales',
        dataGroupId: subData.dataGroupId,
        data: subData.data.map(function (item) {
          return item[1];
        }),
        universalTransition: {
          enabled: true,
          divideShape: 'clone'
        }
      },
      graphic: [
        {
          type: 'text',
          left: 50,
          top: 20,
          style: {
            text: 'Back',
            fontSize: 18
          },
          onclick: function () {
            myChart.setOption(option);
          }
        }
      ]
    });
  }
});

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);

 })
}