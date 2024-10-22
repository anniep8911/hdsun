// 단위 구하는 함수 
function unitsOf(num) {
  let unit = 100000000000;
  let dev = (num / unit).toFixed(10).toString();
  let dan = dev.substring(dev.indexOf('.'), dev.search(/[1-9]/)).length;
  dan === 1 ? unit = 1 : Array(dan).fill(0.1).map(_ => unit = unit * 0.1);
  return unit;
}

// max올림처리 사이즈 구하는 함수
function maxResult(num, type = false) {
  let isNeg =  num>0? false:true;
  let res=0;
  num = Math.abs(num);
  let dev = unitsOf(num);
  Math.ceil(num / dev) % 2 && !type ? 
    res = (Math.ceil(num / dev) + 1) * dev : res = Math.ceil(num / dev) * dev;
   return isNeg? -res:res;
}

function times(hhmm,st) {
  let hr = hhmm.substring(0, 2);
  let mn = hhmm.substring(3, 5);
  hr = Number(hr);
  mn = Number(1 - ((60 - mn) / 60));
  let res = (hr-st) + mn;
  return res<0? 0 :res
}

let annotation = {
  init: {
    id: 'init',
    contents: ['', '', ''],
    type: 'line',
    xMin: function(_, info) {
      let id = info._context.id;
      let st = Number(info._context.chart.config._config.fullData.labels[0]);
      if (id !== undefined) {
        return times(annotation[id].contents[1],st)
      }
    },
    xMax: function(_, info) {
      let id = info._context.id;
      let st = Number(info._context.chart.config._config.fullData.labels[0]);
      if (id !== undefined) {
        return times(annotation[id].contents[1],st)
      }
    },
    yMin: function(ctx) {
      return ctx.chart.scales.y.min;
    },
    yMax: function(ctx) {
      return ctx.chart.scales.y.max;
    },
    borderColor: 'transparent',
    borderWidth: 5,
    label: {
      enabled: false,
      content: function(content) {
        let res = '';
        let id = content.id;
        annotation[id].contents[0] === '' ? res = annotation[id].contents[1] : res = annotation[id].contents;
        return res;
      },
      backgroundColor: 'rgba(0,0,0,0.8)',
      position: 'center',
      color: '#ffffff',
      textAlign: 'left'
    },
    enter: function(ctx, ct) {
      ctx.element.options.label.enabled = true;
    },
    leave: function(ctx, ct) {
      ctx.element.options.label.enabled = false;
      ct.chart.update();
    }
  }
};


// 소비전력 설정영역 (차트 스타일 옵션)
const spendChart = {
  // 옵션 설정영역
  opts: {
    barPercent: 1,
    categoryPercentage: 1,
    minBarLength: 0,
    barThickness: 40,
    scales: {
      x: {
        stacked: true,
        display: true,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        stacked: true,
        display: true,
        min: function(context) {
          context = context.chart.config._config.fullData;
          return -Math.max(...context.charOptions.pos);
        },
        max: function(context) {
          context = context.chart.config._config.fullData;
          return Math.max(...context.charOptions.pos);
        },
        ticks: {
          display: false,
          stepSize: function(e) {
            let opts = e.scale.chart.config._config.fullData;
            return e.scale.max / opts.charOptions.divStep;
          },
        },
        grid: {
          display: true,
          drawBorder: false,
          borderDash: [2, 2],
          color: "#DEDFE0",
          drawBorder: false,
          drawTicks: false,
          lineWidth: ({
            tick
          }) => tick.value == 0 ? 0 : 1,
        },
      },
      'y-sub': {
        min: function(context) {
          context = context.chart.config._config.fullData;
          return -Math.max(...context.charOptions.pos);
        },
        max: function(context) {
          context = context.chart.config._config.fullData;
          return Math.max(...context.charOptions.pos);
        },
        ticks: {
          display: false,
          stepSize: function(e) {
            return e.scale.max / 2;
          },
        },
        grid: {
          display: true,
          drawBorder: false,
          borderDash: [0, 0],
          color: "#DEDFE0",
          drawBorder: false,
          drawTicks: false,
          lineWidth: ({
            tick
          }) => tick.value == 0 ? 1 : 0,
        },
      },
    },
    plugins: {
      tooltip: {
        usePointStyle: true,
        displayColors: false,
        callbacks: {
          label: function(context) {
            let opts = context.chart.config._config.fullData.charOptions;
            let mark = opts.lv ? opts.lv : 'kWh';
            let res = Math.max(...context.dataset.data) === 0 ?
              `${Math.min(...context.dataset.data)}${mark}` :
              `${Math.max(...context.dataset.data)}${mark}`;
            let sum = `${Math.max(...opts.pos)}${mark}`;
            return !context.dataIndex ? [`${opts.per}%`, sum] : res;
          },
          title: function(context) {
            let res = ''
            res = context[0].dataset.label;
            res === '#8C45A5' ? res = 'EVC' : res === '#DA8739' ? res = 'ESS' : '';
            !context[0].dataIndex ? res = '빌딩' : '';
            return res;
          }
        }
      },
      legend: {
        display: true,
        fullSize: true,
        position: "bottom",
        align: 'start',
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          generateLabels: function(chart) {
            let data = chart.data.datasets;
            let result = [];
            data.forEach(e => {
              !e.label.includes('#') ?
                result.push({
                  text: e.label,
                  fillStyle: e.backgroundColor,
                  lineWidth: 0
                }) :
                '';
            })
            return result;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  },
  // 옵션 설정영역 끝
  charOptions: {
    name: 'bar',
    chartName: 'mixedBarChart',
    divStep: 2
  }
};
// 자급율 설정영역  (차트 스타일 옵션)
const selfChart = {
  self: {
    backgroundColor: ['#4D6BD4', '#E4E9F1'],
    borderWidth: 0,
  },
  // 옵션 설정영역
  opts: {
    barPercent: 1,
    categoryPercentage: 1,
    minBarLength: 0,
    plugins: {
      legend: {
        // 라벨 없애기
        display: false,
      },
      tooltip: {
        // 마우스 오버시 데이터 없애기
        enabled: false
      },
    },
    interaction: {
      mode: 'null',
    },
    cutout: 65,
    reponsive: false,
    maintainAspectRatio: false
  },
  // 옵션 설정영역 끝
  charOptions: {
    name: 'doughnut',
    innerText: '80%'
  }
}
//chart 스타일 설정  :: 통계페이지용
// 믹스형식 차트 (사이트현황 / EVC현황 / 계량기현황 동시사용)
const mixedBarChart = {
  opts: {
    barPercent: 1,
    categoryPercentage: 1,
    minBarLength: 0,
    plugins: {
      title: {
        display: false,
        font: {
          size: 24
        },
        padding: {
          top: 0,
          bottom: -10
        }
      },
      legend: {
        display: false,
        align: 'end',
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
        },
      },
      // 바 차트 호버시 발생하는 라벨 스타일셋 영역
      tooltip: {
        enabled: true,
        usePointStyle: true,
        displayColors: false,
        boxWidth: 20,
        boxHeight: 500,
        callbacks: {
          label: function(context) {
            let datas = context.chart.config._config.fullData;
            let chBox = context.chart.canvas.parentElement;
            let lists = chBox.querySelectorAll('.labels li');
            let now = context.dataset;
            let lbs = datas.labels.map(m=>`${m}`);
            let idx = lbs.indexOf(context.label);
            let lv = datas.charOptions.lv;
            let nowStack = now.stack || now.cate;
            now.type === 'line' ? lv = datas.charOptions.lvRight : '';
            let rightLv = datas.charOptions.lvRight;
            let res = '';

            // 객체를 배열로 변환
            let datasetsArray = Object.values(datas);
            
            // 체크 해제된 라벨 수집 또는 필터링 없이 진행
            let filteredDatasets;
            
            if (lists.length > 0) {
              let expt = [];
              lists.forEach(e => {
                if (e.querySelector('input')!==null && !e.querySelector('input').checked) {
                    expt.push(e.querySelector('label').innerText);
                  }
                });
                

                // 체크된 항목들만 포함하도록 필터링
                filteredDatasets = datasetsArray.filter(d => !expt.includes(d.label) && d.data);
              } else {
                // 체크박스가 없으면 전체 데이터 사용
                filteredDatasets = datasetsArray.filter(d => d.data);
              }

            // 전체 합계 계산 (스택, 기타 조건 고려 없이 기본 합계)
            let total = 0;

  
            filteredDatasets.forEach(d => {
              if (d.type !== 'line' ) {
                    total += d.data[idx];
              }
            });
        
            // 기본 합계 표시 (스택 조건 적용 없이)
            if (now.type !== 'line') {
                if (now.data[idx] !== 0) {
                    res = `${total} ${lv}`;
           
                }
            }else{
              res = `${now.data[idx]} ${rightLv}`;
            }
        
            if (datas.charOptions.lvDetByStack && nowStack !== undefined) {
              let totalPos = 0;
              let totalNeg = 0;
      
              filteredDatasets.forEach(d => {
                  if (d.stack === nowStack || d.cate === nowStack) {
                      let value = d.data[idx];
                      if (value > 0) {
                          totalPos += value;
                      } else {
                          totalNeg += value;
                      }
                  }
              });
              res = `${totalPos + totalNeg} ${lv}`;
          }
      
        
            // 스택별 각 요소까지 나눠서 노출 (옵션 활성화된 경우)
            if (datas.charOptions.toolDet) {
                res = [];
                let res2='';
                let dtArr = [];
                filteredDatasets.forEach(d => {
                    if (d.data !== undefined && d.type !== 'line') {
                        if (nowStack === (d.stack || d.cate)) {
                            datas.charOptions.lvDet ?
                                dtArr.push(`${d.label}: ${d.data[idx]} ${lv}`) :
                                dtArr.push(`${d.label}: ${d.data[idx]}`);
                        }
                    }
                });
                res.push(...dtArr);
            }
            
            if(datas.charOptions.showSingle)res =[now.label,`${now.data[idx]} ${lv}`];
  
            return now.type==='line'?`${now.data[idx]} ${rightLv}`:res;

          },

          title: function(context) {
            let title = '';
            let datas = context[0].chart.config._config.fullData;
            let now = context[0].dataset;
            let lbs = datas.labels.map(m=>`${m}`);
            let idx = lbs.indexOf(context[0].label);
            let nowStack = now.stack || now.cate;
            let lv = datas.charOptions.lv;
            let time = datas.charOptions.times;
            time === undefined ? time = false : '';


            // 객체를 배열로 변환
            let datasetsArray = Object.values(datas);
        
            // 체크 해제된 라벨 수집 및 필터링
            let chBox = context[0].chart.canvas.parentElement;
            let lists = chBox.querySelectorAll('.labels li');
            let filteredDatasets;
        
            if (lists.length > 0) {
                let expt = [];
                lists.forEach(e => {
                    if (e.querySelector('input')!==null && !e.querySelector('input').checked) {
                        expt.push(e.querySelector('label').innerText);
                    }
                });
        
                // 체크된 항목들만 포함하도록 필터링
                filteredDatasets = datasetsArray.filter(d => !expt.includes(d.label) && d.data);
            } else {
                // 체크박스가 없으면 전체 데이터 사용
                filteredDatasets = datasetsArray.filter(d => d.data);
            }
        
            // 전체 합계 계산 (스택, 기타 조건 고려 없이 기본 합계)
            let total = 0;
            filteredDatasets.forEach(d => {
                if (d.type !== 'line') {
                    total += d.data[idx];
                }
            });

            // 스택별로 나눠서 +,- 노출 (옵션 활성화된 경우)
            if (datas.charOptions.toolDet || nowStack !== undefined) {

                let totalPos = 0;
                let totalNeg = 0;
        
                filteredDatasets.forEach(d => {
                    if (d.stack === nowStack || d.cate === nowStack) {
                        let value = d.data[idx];

                        if (value > 0) {
                            totalPos += value;
                        } else {
                            totalNeg += value;
                        }
                    }
                });
                title = `총 ${totalPos + totalNeg} ${lv}`;
            }
            
            // 시간 표시 옵션이 있는 경우
            if (time !== false && now.type !== 'line') {
                title = `${time[idx]}`;
            }
        
            return now.type==='line'? '' : title;
          }
        }
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          drawBorder: false,
          display: false
        }
      },
      y: {
        stacked: true,
        beginAtZero: false,
        grid: {
          drawBorder: false,
        },
        ticks: {
          beginAtZero: true,
          stepSize: function(context) {
            context = context.chart.config._config.fullData;
            let max = (Math.max(...context.charOptions.pos));
            let stepDev = context.charOptions.stepSize !== undefined ? context.charOptions.stepSize : 4;
            return maxResult(max) / stepDev;
          }
        },
        max: function(context) {
          context = context.chart.config._config.fullData;
          let max = (Math.max(...context.charOptions.pos));
          return maxResult(max);
        },
        min: function(context) {
          context = context.chart.config._config.fullData;
          let max = (Math.max(...context.charOptions.pos));
          let min = (Math.min(...context.charOptions.neg));
          let stackMin=[];
          let stackRes=0;

          if(context.charOptions.stacks!==undefined){
            for(let i in context.charOptions.stacks){
              let num = context.charOptions.stacks[i].neg;
              stackMin.push(...num);
            }
            stackRes = Math.min(...stackMin);
          }
          return min === 0 || max===0 ? maxResult(stackRes)===Infinity? 0 : maxResult(stackRes) : -maxResult(max);
        },
      },
      'y-right': {
        beginAtZero: true,
        display: function(context) {
          let opts = context.scale.chart.config._config.fullData.charOptions;
          return opts.yRight;
        },
        type: 'linear',
        position: 'right',
        grid: {
          drawBorder: false,
          display: false
        },
        min: 0,
        max: function(context) {
          context = context.chart.config._config.fullData;
          let max = context.charOptions.linePos.length ? (Math.max(...context.charOptions.linePos)) : 0;
          max > 0 ? max = maxResult(max, true) : 0;
          return max;
        },
        ticks: {
          stepSize: (context) => {
            let ticksLength = context.scale.chart.scales.y.ticks.length - 1;
            let result = Math.floor(context.scale.chart.scales['y-right'].max / ticksLength);
            return result;
          }
        }
      },
    },
    // 그래프바 사이즈
    barThickness: 14,
    animation: {
      duration: 0,
    },
    maintainAspectRatio: false
  },
  // 옵션 설정영역 끝
  charOptions: {
    name: 'bar',
    lv: 'kWh',
    chartName: 'mixedBarChart',
    yRight: false,
    toolDet: false
  },
}


// 믹스형식 차트 (PV현황, 건물현황,EHP현황, EV현황, 계량기현황)
let mixedChart = {
  // 옵션 설정영역
  opts: {
    barPercent: 1,
    categoryPercentage: 1,
    minBarLength: 0,
    plugins: {
      legend: {
        display: false
      },

      // 바 차트 호버시 발생하는 라벨 스타일셋 영역
      tooltip: {
        enabled: true,
        usePointStyle: true,
        displayColors: false,
        callbacks: {
          label: function(context) {
            let result = '';
            let opts = context.chart.config._config.fullData.charOptions;
            let now = context.dataset;
            context.dataset.removeNeg ? context.parsed.y = Math.abs(context.parsed.y) : '';
            context.dataset.mark ?
              result = context.parsed.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + context.dataset.mark :
              result = context.parsed.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + opts.lv;
            return now.type !== 'line' ? [now.label,result] : result;
          },
          title: function(context) {
            let title = '';
            let datas = context[0].chart.config._config.fullData;
            let time = datas.charOptions.times;
            let now = context[0].dataset;
            let lbs = datas.labels.map(m=>`${m}`);
            let idx = lbs.indexOf(context[0].label);
            time === undefined ? time = false : '';
             
            // 시간 표시 옵션이 있는 경우
            if (time !== false && now.type !== 'line') {
              title = `${time[idx]}`;
            }
            
            return title;
          }
        }
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        stacked: false,
        grid: {
          drawBorder: false
        },
        ticks: {
          stepSize: function(ctx) {
            let res = 0;
            mixedChart.charOptions.stepSize ?
              res = mixedChart.charOptions.stepSize :
              res = ctx.scale.max / 4;
            return res;
          }
        },
        max: function(ctx) {
          let datas = ctx.chart.config._config.data.datasets;
          let max = 0;
          for (let i in datas) {
            !datas[i].yAxisID ?
              datas[i].data.forEach(d => {
                max < d ? max = d : '';
              }) : ''
          }
          max = maxResult(max);
          return max;
        },
        min: function(ctx) {
          let datas = ctx.chart.config._config.data.datasets;
          let min = 0;
          let max = 0;
          for (let i in datas) {
            !datas[i].yAxisID ?
              datas[i].data.forEach(d => {
                min > d ? min = d : '';
                max < d ? max = d : '';
              }) : ''
          }
          max = maxResult(max);
          return min < 0 ? max * -1 : 0;
        },
      },
      'y-right': {
        type: 'linear',
        position: 'right',
        grid: {
          drawBorder: false,
          display: false
        },
        ticks: {
          callback: '',
          stepSize: function(ctx) {
            let res = 0;
            mixedChart.charOptions.stepSize ?
              res = mixedChart.charOptions.stepSize :
              res = ctx.scale.max / 4;
            return res;
          }
        },
        max: function(ctx) {
          let datas = ctx.chart.config._config.data.datasets;
          let max = 0;
          let dev = 100;
          for (let i in datas) {
            datas[i].yAxisID ?
              datas[i].data.forEach(d => {
                max < d ? max = d : '';
              }) :
              '';
          }
          max > 1000 ? dev = 1000 : '';
          return max > 0 ? Math.ceil(max / dev) * dev : 1;
        },
      },
    },
    // 그래프바 사이즈
    barThickness: 14,
    transitions: {
      show: {
        animation: {
          duration: 0,
        }
      },
      hide: {
        animation: {
          duration: 0,
        }
      }
    },
    maintainAspectRatio: false,
  },
  // 옵션 설정영역 끝
  charOptions: {
    name: 'bar'
  },
};

let mixedNegChart = {
  // 옵션 설정영역
  opts: {
    barPercent: 1,
    categoryPercentage: 1,
    minBarLength: 0,
    plugins: {
      legend: {
        display: false
      },
      // 바 차트 호버시 발생하는 라벨 스타일셋 영역
      tooltip: {
        usePointStyle: true,
        displayColors: false,
        callbacks: {
          label: function(context) {
            let result = '';
            let opts = context.chart.config._config.fullData.charOptions;
            let mark = context.dataset.mark ? context.dataset.mark : opts.lv;
            result = context.parsed.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + mark;
            return result;
          },
          title: function(context) {
            context[0].dataset.label = context[0].dataset.label.replaceAll(/[()kWh]/g, '');
            return context[0].dataset.tipLabel ? context[0].dataset.tipLabel : context[0].dataset.label;
          }
        }
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
        max: function(context) {
          let opts = context.chart.config._config.fullData.charOptions;
          let res = 0;
          res = Math.max(...opts.pos);
          res = maxResult(res);
          return res;
        },
        min: function(context) {
          let opts = context.chart.config._config.fullData.charOptions;
          let res = 0;
          res = Math.max(...opts.pos);
          res = maxResult(res);
          return res * -1;
        },
        ticks: {
          stepSize: 200,
        },
      },
      'y-right': {
        display: function(context) {
          let opts = context.scale.chart.config._config.fullData.charOptions;
          return opts.yRight;
        },
        type: 'linear',
        position: 'right',
        grid: {
          drawBorder: false,
          display: false
        },
        min: 0,
        max: function(context) {
          context = context.chart.config._config;
          let sum = 0;
          let dev = 100;
          for (let i in context.data.datasets) {
            context.data.datasets[i].yAxisID ? sum = context.data.datasets[i].data : '';
          }
          sum ? (
            sum = Math.max(...sum),
            sum = sum < 100 ? (sum / 100, dev = 100) : (sum / 1000, dev = 1000),
            sum = Math.ceil(sum)
          ) : '';
          return sum;
        },
        ticks: {
          stepSize: (context) => {
            let ticksLength = context.scale.chart.scales.y.ticks.length - 1;
            let result = Math.floor(context.scale.chart.scales['y-right'].max / ticksLength);
            return result;
          }
        }
      },
    },
    // 그래프바 사이즈
    barThickness: 14,
    transitions: {
      show: {
        animation: {
          duration: 0,
        }
      },
      hide: {
        animation: {
          duration: 0,
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  },
  // 옵션 설정영역 끝
  charOptions: {
    name: 'bar',
    chartName: 'mixedNegChart',
  },
}



let boxPlotChart = {
  // 옵션 설정영역
  opts: {
    barPercent: 1,
    categoryPercentage: 1,
    minBarLength: 0,
    interaction: {
      mode: 'null',
    },
    plugins: {
      legend: {
        display: false
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20
        },
        max: function(ctx) {
          let arr = [];
          let dev = Math.max(...arr) > 1000 ? 1000 : 100;
          boxPlotChart.frequency.data.forEach(e => {
            arr.push(...e);
          })
          let max = Math.max(...arr) * 1.25;
          return Math.ceil(max / dev) * dev;
        },
      }
    },
    // 그래프바 사이즈
    barThickness: 8,
    maintainAspectRatio: false,

  },
  charOptions: {
    name: 'boxplot'
  },
}
// 라인형식 차트
let lineChart = {
  // 옵션 설정영역
  opts: {
    layout: {
      padding: {
        left: 10
      }
    },
    interaction: {},
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      // 바 차트 호버시 발생하는 라벨 스타일셋 영역
      tooltip: {
        usePointStyle: true,
        displayColors: false,
        callbacks: {
          label: function(context) {
            let result = '';
            let mark = context.dataset.mark !== undefined ? context.dataset.mark : context.chart.charOptions.lv;
            result = context.parsed.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + mark;
            return result;
          },
          title: function(context) {
            return context[0].dataset.label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        offset: true,
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false
        },
        ticks: {
          stepSize: 100,
        },
        max: function(ctx) {
          let datas = ctx.chart.config._config.data.datasets;
          let max = 0;
          let dev = 10;
          for (let i in datas) {
            datas[i].data.forEach(d => {
              max < d ? max = d : '';
            })
          }
          max > 1000 ? dev = 1000 : '';
          return Math.ceil(max / dev) * dev;
        },
      }
    },
    maintainAspectRatio: false,
  },
  // 옵션 설정영역 끝
  charOptions: {
    name: 'line'
  },
};
// 라벨 체크 박스 체크 시 차트에서 삭제 포맷
const labelSH = (chart) => {
  let data = chart.config._config;
  data.fullData.charOptions.anno !== undefined ?
    data = chart.config._config.options.plugins.annotation.annotations : '';
  let input = document.querySelectorAll('input[name="chart-labels"]');
  input.forEach(e => {
    e.addEventListener('change', (f) => {
      let idx = f.currentTarget.parentElement.getAttribute('idx');
      let extra = f.currentTarget.parentElement.getAttribute('idx-extra');
      if (idx !== 'undefined') {
        (f.currentTarget.checked) ?
        (chart.show(idx), extra !== null ? chart.show(extra) : '') :
        (chart.hide(idx), extra !== null ? chart.hide(extra) : '')
      } else {
        f.currentTarget.classList[0] == 'active' ? f.currentTarget.classList.remove('active') : f.currentTarget.className += 'active';
        for (let i in data) {
          f.currentTarget.classList[0] == 'active' ?
            data[i].display = false :
            data[i].display = true
        }
        chart.update();
      }
    })
  })
}


// 라벨 만들기 함수 
const mkLabel = (dom, data, ct, inpType = 'checkbox') => {
  dom.parentElement.style.display = 'flex';
  dom.parentElement.style.flexWrap = 'wrap';
  dom.parentElement.style.justifyContent = 'right';
  dom.parentElement.style.alignItems = 'center';
  const lb = dom.parentElement.querySelector('ul.labels');
  const ttl = dom.parentElement.querySelector('h3');
  lb !== null ? lb.remove() : '';
  ttl !== null ? ttl.remove() : '';
  let h3 = document.createElement('h3');
  let ul = document.createElement('ul');
  h3.style.margin = `0 auto 0 0`;
  ul.style.marginBottom = '20px';
  h3.style.marginBottom = '20px';

  ul.className += 'labels';
  let labels = [];
  let labeCol = [];
  let labeType = [];
  let labeIdx = [];
  let extraIdx = [];
  let ids = [];
  let chType = data.charOptions.checked;
  let exTraLabel = undefined;
  for (let k in data) {
    data[k].copy !== undefined ? (exTraLabel = [data[k].label, data[k].copy]) : '';
  }
  for (let i in ct.legend.legendItems) {
    labeIdx.push(i);
    exTraLabel !== undefined ?
      ct.legend.legendItems[i].text === exTraLabel[0] ? (extraIdx.push(exTraLabel[1])) : '' : '';
  }

  for (let i in data) {
    (data[i].label !== undefined && data[i].hide !== true) ? (
      labels.push(data[i].label),
      data[i].backgroundColor ?
      labeCol.push(data[i].backgroundColor) : labeCol.push(data[i].borderColor),
      labeType.push(data[i].type),
      ids.push(`${i}-${dom.className}`)
    ) :
    '';
  }
  data.charOptions.anno ? (labels.push(data.charOptions.annoTitle), labeType.push('anno')) : '';

  labels.forEach((e, i) => {
    let li = document.createElement('li');
    let span = document.createElement('span');
    let chBox = document.createElement('input');
    let label = document.createElement('label');
    chBox.setAttribute('name', 'chart-labels');
    chBox.setAttribute('type', inpType);
    chBox.setAttribute('id', ids[i]);
    label.setAttribute('for', ids[i]);
    chBox.style.margin = 0;
    chBox.checked = true;
    label.innerText = e;
    li.setAttribute('idx', labeIdx[i]);
    exTraLabel !== undefined ? exTraLabel[0] === e ?
      li.setAttribute('idx-extra', extraIdx[0]) : '' : '';
    li.append(label);
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.columnGap = '5px';
    label.style.display = 'flex';
    label.style.alignItems = 'center';
    label.style.columnGap = '5px';
    labeType[i] == undefined ? (
        span.style.display = 'inline-block',
        span.style.width = '12px',
        span.style.height = '12px',
        span.style.backgroundColor = labeCol[i],
        span.style.borderRadius = '10px'
      ) :
      labeType[i] == 'line' ?
      (
        li.setAttribute('type', 'line'),
        span.className += 'line',
        label.style.display = 'flex',
        label.style.alignItems = 'center',
        span.style.backgroundColor = labeCol[i]
      ) :
      (
        li.setAttribute('type', 'anno'),
        span.className += 'anno',
        label.style.display = 'flex',
        label.style.alignItems = 'center',
        span.style.backgroundColor = labeCol[i]
      );
    ul.append(li)
    label.prepend(span),
      chType ? li.prepend(chBox) : ''
  })
  h3.innerText = data.charOptions.title;
  dom.parentElement.prepend(ul);
  dom.parentElement.prepend(h3);


  const fnLi = document.querySelectorAll('.labels li');

  fnLi.forEach(e => {
    (e.getAttribute('type') !== null) ? e.parentElement.append(e): '';
  })
  chType ? labelSH(ct) : '';
}


// 값 혼합 함수
const sum = (data) => {
  let res = [];
  for (let i in data) {
    res.push(...data[i].data)
  }
  return res;
}


// 차트그리기 함수
const mkChart = (dom, data) => {
  let domParent = dom;
  domParent.classList[0] === 'mixed-neg-chart' || domParent.classList[0] === 'mixed-bar-chart' ? domParent.parentElement.style.height = '300px' : '';
  dom = dom.getContext('2d');
  let datas = [];

  // 그리기 전 차트 라벨 유무 확인
  (data.charOptions.labelShow && domParent.classList[1]!=='custom') ? (
    data.opts.layout = {},
    data.opts.layout.padding = {},
    data.opts.layout.padding.bottom = 50
  ) : '';

  // 그리기 전 라벨단위 세팅 유무 확인 후 세팅
  data.charOptions.lv && data.charOptions.chartName !== 'mixedNegChart' ? data.opts.scales.y.ticks.callback = function(val, index) {
    return index === 0 ? [val, `(${data.charOptions.lv})`] : val;
  } : '';
  data.charOptions.lvRight && data.charOptions.chartName !== 'mixedNegChart' ? data.opts.scales['y-right'].ticks.callback = function(val, index) {
    return index === 0 ? [val, `(${data.charOptions.lvRight})`] : val;
  } : '';

  // 호버 시 컬러 설정이 따로 없을땐 컬러가 변하지 않게 고정
  for (let i in data) {
    !data[i].hoverBackgroundColor ? data[i].hoverBackgroundColor = data[i].backgroundColor : '';
    !(i === 'opts' || i === 'labels' || i === 'charOptions') ? (datas.push(data[i])) : '';
  }


  // 데이터 합계 
  datas = datas.filter(f => f !== undefined);

  let ttl = sum(datas);
  // +값만 추출
  let pos = ttl.filter(f => f > 0);

  // -값만 추출
  let neg = ttl.filter(f => f <= 0);

  let sts = '';

  if (data.charOptions.chartName === 'mixedBarChart') {
    let lbs = data.labels;
    let sumsPos = Array(lbs.length).fill(0);
    let sumsNeg = Array(lbs.length).fill(0);
    let lines = [];
    let stacks = {};

    for (let i in datas) {
      let st = datas[i].stack || datas[i].cate;
      st !== undefined ? stacks[st] = {
        pos: Array(lbs.length).fill(0),
        neg: Array(lbs.length).fill(0)
      } : '';
    }

    for (let i in datas) {
      sts = datas[i].cate || datas[i].stack;
      let stsExist = stacks[sts] !== undefined ? true : false;

      // 라인이 아닐때
      if (datas[i].type !== 'line') {
        if (Math.min(...datas[i].data) < 0) {
          datas[i].stack ? (
              sumsNeg.push(...datas[i].data),
              datas[i].data.forEach((e, j) => {
                stsExist ?
                  // 스택 있을때 스택 값 나눠서 추가
                  stacks[sts].neg[j] += e : 0
              })
            ) :
            datas[i].data.forEach((e, j) => {
              stsExist ? (
                  // 스택 있을때 스택 값 나눠서 추가
                  stacks[sts].neg[j] += e,
                  sumsNeg[j] += e
                ) :
                sumsNeg[j] += e;
            })
        } else {
          datas[i].stack ? (
              sumsPos.push(...datas[i].data),
              datas[i].data.forEach((e, j) => {
                stsExist ?
                  // 스택 있을때 스택 값 나눠서 추가
                  stacks[sts].pos[j] += e : 0
              })
            ) :
            datas[i].data.forEach((e, j) => {
              stsExist ? (
                  sumsPos[j] += e,
                  stacks[sts].pos[j] += e
                ) :
                sumsPos[j] += e;
            })
        }
      } else {
        lines.push(...datas[i].data)
      }
    }
    data.charOptions.linePos = lines;
    data.charOptions.pos = sumsPos;
    data.charOptions.neg = sumsNeg;
    let isEmpty = JSON.stringify(stacks).split(',').length;
    isEmpty > 1 ? data.charOptions.stacks = stacks : '';

  } else if (data.charOptions.chartName === 'mixedNegChart') {
    let lbs = data.labels;
    let sumsPos = Array(lbs.length).fill(0);
    for (let i in datas) {
      datas[i].data.filter(f => f > 0).forEach((e, i) => {
        sumsPos[i] += e;
      });
    }
    data.charOptions.pos = sumsPos;
  } else {
    data.charOptions.pos = pos;
    data.charOptions.neg = neg;
  }


  // 0값에서 스페이싱 차지 안하게 전처리
  for (let i in datas) {
    Math.min(...datas[i].data) < 0 ? data.charOptions.negExist = true : '';
    datas[i].skipNull ? datas[i].data = datas[i].data.map(m => m === 0 ? m = null : m) : '';
  }


  let ct = new Chart(dom, {
    type: data.charOptions.name,
    data: {
      labels: data.labels,
      datasets: datas,
    },
    // 딥카피 후 해당 요소의 charOption및 전체 데이터 sum필요시 사용!
    fullData: data,
    options: data.opts,
    // 도넛안 텍스트 플러그인입니다. default:false
    plugins: data.charOptions.innerText ? [{
      id: 'text',
      beforeDraw: function(chart) {
        let [width, height, ctx] = [chart.width, chart.height, chart.ctx];
        let fz = 28;
        ctx.font = fz + "px HyundaiSansHeadKROTFBold";
        ctx.restore();
        ctx.fillText(data.charOptions.innerText, (width - ctx.measureText(data.charOptions.innerText).width) / 2, (height + fz * 0.5) / 2);
        ctx.save();
      }
    }] : data.charOptions.chartName == 'mixedNegChart' && data.charOptions.lv ? [{
      id: 'label',
      beforeDraw: function(chart) {
        let [height, ctx] = [chart.height, chart.ctx];
        let fz = 12;
        ctx.font = fz + "px HyundaiSansHeadKROTFBold orange";
        ctx.fillStyle = '#555';
        ctx.restore();
        ctx.fillText(`(${data.charOptions.lv})`, 0, height - (data.charOptions.labelShow ? fz + 40 : fz));
        ctx.save();
      }
    }] : []
  });
  // 라벨 설정에 따른 상단 라벨/ 타이틀 보여주는 함수
  (data.charOptions.labelShow) ? mkLabel(domParent, data, ct, data.charOptions.labelType): '';
  // 차트 업데이트를 위한 리턴값
  ct.chartArea.top = 0;

  return ct;
}

// 딥카피용 차트 그리기 함수
const mkRepChart = (dom, data, max = true) => {
  let charts = [];
  let maxData = [];
  let mt = 0;
  dom.forEach((e, i) => {
    charts.push(mkChart(e, data[i]));
    max ? maxData.push(...data[i].charOptions.pos) : '';
  })

  max ? (
    maxData = Math.max(...maxData),
    mt = maxResult(maxData),

    data.forEach((e) => {
      e.opts.scales.y.max = mt;
      e.opts.scales.y.min = mt * -1;
    }),

    charts.forEach((e, i) => {
      e.destroy();
      charts[i] = mkChart(dom[i], data[i]);
    })
  ) : '';

  return charts;
}

// 오브젝트 중복사용용 딥_오브_딥카피 재귀함수
const deepCopy = (obj) => {
  if (typeof obj !== 'object' || typeof obj === null) {
    return obj;
  }
  const deepCopyObj = {};
  for (let key in obj) {
    deepCopyObj[key] = deepCopy(obj[key]);
  }
  return deepCopyObj;
}


// 에너지플로우 다이어그램용 함수
let enFlow = {
  meter: {
    color: 'red',
    flow: 'down',
    flowLong: true,
    edge: false,
    dir: 'st',
    longDir: 'st',
    longColor: 'red',
    top: 0,
    left: '184px',
  },
  pv: {
    color: 'red',
    flow: 'right',
    edge: true,
    dir: 'st',
  },
  ess: {
    color: 'red',
    flow: 'right',
    edge: true,
    dir: 'st',
  },
  evc: {
    color: 'red',
    flow: 'left',
    edge: true,
    dir: 'st',
  },
  ev: {
    color: 'red',
    flow: 'left',
    edge: false,
    dir: 'st',
    height: 135,
  },
  home: {
    color: 'red',
    flow: 'left',
    edge: true,
    dir: 'st',
    height: 120,
  },
  progStyleSet() {
    $('.energy-flow .art-wrap .prog.left ').css({
      top: '117px',
      left: '-11px',
    })
  },
  artStyleInit() {
    $('.energy-flow .diagram article .image').css({
      border: `1px solid #E4E4E4`,
      backgroundColor:'#F6F6F6'
    });
    $('.energy-flow .diagram article').css({
      position: 'absolute',
      width: '102px',
      padding: '5px',
      margin: 'auto',
      textAlign: 'center',
      boxSizing: 'content-box',
      border: 'none',
      backgroundColor: 'transparent'
    });
    $('.energy-flow>.diagram>.art-wrap').css({
      position: 'absolute',
      top: '140px',
      right: '0px',
      width: '358px',
      height: '234px',
      padding: '5px',
      border: '3px dashed #E2E2E2',
      borderRadius: '20px',
      zIndex: '1',
    });
    $('.energy-flow>.diagram>.art-wrap>article').css({
      display: 'flex',
      width: '170px',
      margin: 'auto',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
    });

    $('.energy-flow>.diagram>.art-wrap>.wrap-home').css({
      display: 'block',
      top: '0',
      left: '20px',
      bottom: '0',
      width: '78px',
      height: '130px',
    });
    $('.energy-flow>.diagram>.art-wrap>.wrap-home').css({
      width: '78px',
      height: '78px',
      flexShrink: '0',
    })
    $('.energy-flow .art-wrap article .image ').css({
      width: '78px',
      height: '78px',
      flexShrink: '0',
    })
    $('.energy-flow .art-wrap article .texts').css({
      fontSize: '20px',
      marginLeft: '16px',
      marginTop: '0',
    });

    $('.energy-flow .art-wrap .wrap-home .texts').css({
      marginLeft: 0
    })

    $('.energy-flow .art-wrap .wrap-app').css({
      top: '26px',
      right: '20px',
    });

    $('.energy-flow .art-wrap .wrap-ehp').css({
      right: '20px',
      bottom: '26px',
    })

    $('.energy-flow article.meter').css({
      top: '0',
      left: '184px',
    });

    $('.energy-flow article.pv').css({
      top: '222px',
      left: '0px',
    });

    $('.energy-flow article.ess').css({
      top: '398px',
      left: '0px',
    });

    $('.energy-flow article.evc').css({
      top: '398px',
      right: '249px',
    });

    $('.energy-flow article.ev').css({
      top: '398px',
      right: '20px',
    });
  },
  unactive(cls,longState) {
    if(longState!==false){
      $(`.energy-flow .diagram .${cls} .image a`).css({
        background:'white',
        opacity: 0.6,
        borderRadius:'30px',
        cursor:'auto'
      });
      $(`.energy-flow .diagram .${cls} .flow-data`).css({
        display: 'none'
      });
      $(`.energy-flow .diagram  .${cls} .prog`).css({
        background:'#E1E1E1'
      });
      $(`.energy-flow .diagram  .${cls} .prog>div`).css({
        display: 'none'
      });
      $(`.energy-flow .diagram .${cls} .image`).css({
        cursor: 'auto',
        filter:'grayscale(1)',
      });
      
      $(`.energy-flow .diagram .${cls} .texts p`).css({
        color: '#999'
      });
      $(`.energy-flow .diagram  .${cls} .prog.long>div`).css({
        display:'block'
      })
    }else{
      $(`.energy-flow .diagram  .${cls} .prog.long>div`).css({
        display:'none'
      })
    }


    // 강제세팅 중 :: 필요없을 시 버림처리 
    $(`.energy-flow .diagram .${cls} .texts p span`).text(0);
    // 버림처리 방법 예시
    // $(`.energy-flow .diagram .${cls} .texts p`).remove();
  },
  init() {
    $('.energy-flow .art-wrap').css({
      zIndex: 2
    });
    $('.energy-flow article').css({
      zIndex: 2
    });
    $('.energy-flow article .list_pop').css({
      display: 'none'
    });
  },
  progmk(now, art, long = false) {
    let prog = document.createElement('div');
    let bar = document.createElement(`div`);
    let fzCol = '';
    now !== undefined ?
      (
        now.edge ?
        prog.className = `prog ${now.flow} edge` :
        prog.className = `prog ${now.flow}`,
        long ? prog.className = `prog long down edge` : '',
        long ? bar.className = `${now.longColor} ${now.longDir}` : bar.className = `${now.color} ${now.dir}`,
        (now.height > 0) ? prog.className += ` short` : '',
        now.color === 'red' ? fzCol = '#D44D55' : now.color === 'blue' ? fzCol = '#4D5BD4' : fzCol = '#ccc',
        art.querySelector('.texts').querySelector('p').style.color = `${fzCol}`,
        art.querySelector('.texts').querySelector('p').style.justifyContent = `center`,
        (art.classList[0] === 'art-wrap') ?
        art.querySelectorAll('.texts').forEach(e => {
          e.querySelector('p').style.color = `${fzCol}`
          e.querySelector('h3').innerText == 'Home' ? e.querySelector('h3').style.marginTop = `5px` : ''
        }) :
        ''
      ) :
      '';
    prog.append(bar);
    art.append(prog);
  },
  close(dom) {
    let close = dom.parent().parent().children('.list_pop').children('.close_gr');
    let init = this.init;
    close.click(function() {
      init();
    })
  },
  show() {
    this.artStyleInit();
    this.init();
    $('.prog').remove();
    const porgBar = document.querySelectorAll('.energy-flow .diagram>article');
    const home = document.querySelector('.energy-flow .diagram>.art-wrap');
    porgBar.forEach(e => {
      this.progmk(this[e.classList.value], e);
      this[e.classList.value].flowLong === true ? this.progmk(this[e.classList.value], e, true) : '';
    })
    this.progmk(this.home, home);
    for(let i in this){
      this[i].state === false ? i==='home'? this.unactive('art-wrap'):this.unactive(i):'';
      this[i].longState === false? this.unactive(i,false):'';
    }
  },
  layPop(dom) {
    let nowFlow = dom.parent().parent();
    let nowFlow2 = dom.parent().parent().parent('.art-wrap');
    let listPop = dom.parent().parent().children('.list_pop');

    this.init();
    nowFlow.css({
      zIndex: 10
    });
    nowFlow2.css({
      zIndex: 10
    });
    listPop.css({
      display: 'flex'
    });

    this.close(dom);
  },
}


let timeChart = {
  options: {
    max: 24,
    min: 1,
    headerBg: '#E3E8EF',
    headerCol: '#000000',
    borderCol: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    heights: 40,
    cut: 0,
    labels: true,
  },
}

const mkTimeline = (data, dom) => {
  let wrap = document.createElement('div');
  let catShow = data.options.catShow === undefined ? true : data.options.catShow;
  data.options.catTag !== undefined ? catShow = false : '';

  wrap.className = 'wrap'

  let newClassName = `time-${(Math.random() + 1).toString(36).substring(7)}`;
  dom.className += ` ${newClassName}`;
  const catIndex = (cats, find) => {
    let res = 0;
    cats.forEach((e, i) => {
      e === find ? res = i : '';
    })
    return res;
  }

  const setStyle = (style, dom) => {
    for (let i in style) {
      dom.style[i] = style[i];
    }
  }

  // 분을 100% 기준으로 나누는 함수 : 위치 및 width값 때문!
  const resMin = (min) => {
    return min > 0 ? 1 - (60 - min) / 60 : 0;
  }

  const timeModule = (data, i, prDom, st, end, realTime) => {
    let wd = dom.querySelector(`.${newClassName} .time-content li span:nth-of-type(2)`).getBoundingClientRect().width;
    let wdExtra = dom.querySelector(`.${newClassName} .time-content li span:nth-of-type(1)`).getBoundingClientRect().width;
    let hg = document.querySelector(`.${newClassName} .time-content li`).offsetHeight;
    let times = document.createElement('span');
    let covers = document.createElement('span');
    let note = data[i].label;
    let hours = st > end ? data.options.max : Math.abs(st - end);
    hours === 0 && st === end ? hours = data.options.min : '';
    let leftSize = catShow ? wd * st : wd * (st - data.options.min);
    
    times.className = 'time-module';
    times.setAttribute('time-id', i);
    covers.className = 'time-cover';
    covers.setAttribute('time-id', i);
    covers.setAttribute('time-start', realTime[0]);
    covers.setAttribute('time-end', realTime[1]);
    let style = {
      display: 'block',
      width: `${wd*hours}px`,
      height: `${hg - data.options.cut}px`,
      position: 'absolute',
      backgroundColor: `${data[i].backgroundColor}`,
      background: `${data[i].background}`,
      top: 0,
      bottom: 0,
      left: `${wdExtra!==0 && (wd-wdExtra) < 0  ? leftSize +Math.abs(wd-wdExtra) : leftSize}px`,
      color: `${data[i].color?data[i].color:'#fff'}`,
      textAlign: 'center',
      lineHeight: `${hg - data.options.cut}px`,
      clipPath: data.options.shape && st < end ? data.options.shape : '',
      userSelect: 'none',
      cursor: data.options.click ? 'pointer' : '',
      margin: 'auto',
      zIndex: data.options.gridShow ? -1 : 10
    };
    setStyle(style, times);
    setStyle(style, covers);

    window.addEventListener('resize', function() {
      wd = document.querySelector(`.${newClassName} .time-content li span:nth-of-type(2)`).getBoundingClientRect().width;
      wdExtra = document.querySelector(`.${newClassName} .time-content li span:nth-of-type(1)`).getBoundingClientRect().width;
      hg = document.querySelector(`.${newClassName} .time-content li`).offsetHeight;
      leftSize = catShow ? wd * st : wd * (st - data.options.min);
      times.style.width = `${wd*hours}px`;
      times.style.height = `${hg - data.options.cut}px`;
      times.style.left = `${wdExtra!==0 && (wd-wdExtra) < 0  ? leftSize +Math.abs(wd-wdExtra) : leftSize}px`;
      covers.style.width = `${wd*hours}px`;
      covers.style.height = `${hg - data.options.cut}px`;
      covers.style.left =  `${wdExtra!==0 && (wd-wdExtra) < 0  ? leftSize +Math.abs(wd-wdExtra) : leftSize}px`;
    })

    covers.style.backgroundColor = 'transparent';
    covers.style.clipPath = '';
    covers.style.zIndex = 90;

    data[i].labelShow && data[i].labelShow !== undefined ?
      note === undefined || (times.style.width.replace('px','') < note.length*16)? times.innerText = '' :
      times.innerText = note : '';
      
    prDom.append(times);
    prDom.append(covers);
  }

  const makeTips = (li, txt) => {
    let toolBody = document.createElement('span');
    let tipTip = document.createElement('span');
    toolBody.className += ' tips';
    let tipSt = {
      display: 'block',
      backgroundColor: '#333',
      position: 'absolute',
      margin: 'auto',
      top: 0,
      bottom: 0,
      padding: '10px',
      width: 'fit-content',
      height: 'fit-content',
      color: '#fff',
      fontSize: '12px',
      opacity: 0,
      lineHeight: '13px',
      zIndex: '10'
    }
    let tip = {
      width: '10px',
      height: '10px',
      backgroundColor: '#333',
      position: 'absolute',
      left: '-9px',
      margin: 'auto',
      top: 0,
      bottom: 0,
      clipPath: 'polygon(0 50%, 100% 0, 100% 100%)'
    }
    toolBody.innerText = txt;
    setStyle(tipSt, toolBody);
    setStyle(tip, tipTip);
    toolBody.append(tipTip);
    li.append(toolBody);
    return toolBody
  }


  let title = data.options.title !== undefined ? data.options.title : '';
  let bdCol = data.options.borderCol;
  let borderWidth = data.options.borderWidth;
  let bdStyle = data.options.borderStyle ? data.options.borderStyle : 'solid';


  // 라벨 마커들 Show/hide
  if (data.options.labelShow !== undefined && data.options.labelShow) {
    const ul = document.createElement('ul');
    ul.className += ' time-labels';
    ul.style.width = '100%';
    ul.style.display = 'flex';
    ul.style.columnGap = '20px';
    ul.style.padding = '20px 0px 20px';
    for (let i in data) {
      if (data[i].label !== undefined) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        let spStyle = {
          display: 'block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: `${data[i].backgroundColor}`,
        }
        let liStyle = {
          display: 'flex',
          alignItems: 'center',
          columnGap: '5px'
        }
        setStyle(spStyle, span);
        li.innerText = data[i].label
        setStyle(liStyle, li);
        li.prepend(span);
        ul.append(li);
      }

    }
    wrap.append(ul);
    dom.append(wrap);
  }

  // 커스터마이징 라벨 추가 시
  if (data.options.catTag !== undefined) {
    data.options.catShow = false;
    let category = data.options.category = [];
    const ul = document.createElement('ul');
    let st = {
      fontSize: '14px',
      lineHeight: '14px',
      backgroundColor: '#fff',
      height: `${data.options.heights}px`,
    }
    data.options.catTag.forEach((e, i) => {
      // 기존 라벨 자동 업데이트 
      category.push(i + 1);
      let li = document.createElement('li');
      if (i === 0) {
        let li = document.createElement('li');
        li.className += ' custome-title'
        ul.append(li);
        setStyle(st, li);
      }
      li.innerHTML = e;
      ul.append(li);
      setStyle(st, li);
    })
    ul.className += 'custome-label'
    ul.style.display = 'flex';
    ul.style.flexDirection = 'column';
    ul.style.justifyContent = 'space-between';
    ul.style.backgroundColor = bdCol;
    ul.style.border = `1px solid ${bdCol}`;
    ul.style.borderRight = `none`;
    wrap.append(ul);
    dom.append(wrap);
    wrap.style.display = 'flex';
  }
  let ul = document.createElement('ul');
  ul.className += ' time-content'
  ul.style.position = 'relative';
  ul.style.borderBottom = `1px solid ${bdCol}`;
  data.options.catTag !== undefined ? ul.style.width = '100%' : '';
  let categories = [0];


  for (let i in data.options.category) {
    categories.push(data.options.category[i]);
  }

  categories.forEach((_, ix) => {
    // 판 까는 부분
    let li = document.createElement('li');
    let style = {
      width: '100%',
      borderTop: `${borderWidth}px ${bdStyle} ${bdCol}`,
      borderLeft: `${borderWidth}px ${bdStyle} ${bdCol}`,
      borderRight: `${borderWidth}px ${bdStyle} ${bdCol}`,
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: ix == 0 ? data.options.headerBg : '',
      color: ix == 0 ? data.options.headerCol : '',
      userSelect: 'none',
      position: 'relative',
      zIndex: data.options.gridShow ? 3 : 0,
    }

    setStyle(style, li);
    ul.append(li);
    
    Array(data.options.max - data.options.min + 2).fill(0).map((_, i) => i + data.options.min).forEach((e, _, a) => {
      let span = document.createElement('span');
      let hg = data.options.heights;
      let min = data.options.min;
      let length= a.length;
      min ===0? length =a.length-1:'';
      let style = {
        display: 'flex',
        width: `calc(100% / ${length - 1})`,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        height: `${hg? hg : 20}px`,
        lineHeight: `${hg? hg: 20}px`,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        borderRight: length !== e ? `${borderWidth}px ${bdStyle} ${bdCol}` : '',
        userSelect: 'none'
      }
      ix === 0 && e === data.options.min ?
      span.innerText = title :
      ix === 0 ? 
      span.innerText = e-1
      : e === data.options.min ?
      (span.innerText = categories[ix], span.className='cat')
       :
        '';

      ix === 0 && e === data.options.min ? span.style.minWidth = `64px` : '';
      ix === 0 ? e - 1 : e === data.options.min ? span.style.minWidth = '64px' : '';

      ix!==0 && span.classList[0] !== 'cat'?
      (
        data.options.devBy > 0 ?
          (
            Array(data.options.devBy).fill(0).forEach((_, i) => {
              let litpan = document.createElement('b');
              let listyle = {
                display: 'block',
                width: `calc(100% / ${data.options.devBy})`,
                height: `100%`,
                marginLeft: `0`,
                borderRight: i !== data.options.devBy - 1 ? data.options.devGrid : '',
              }
              setStyle(listyle, litpan);
              span.append(litpan);
            })
          )
       :'')
       : '';


      li.append(span);
      setStyle(style, span);

      data.options.catShow === false ?
        ix === 0 && e === data.options.min ?
        span.style.display = 'none' :
        ix === 0 ? e - 1 : e === data.options.min ?
        span.style.display = 'none' :
        '' : '';
    });
    ul.append(li);
  })
  wrap.append(ul);
  dom.append(wrap);

  for (let i in data) {
    if (i !== 'options') {
      // 타임 추가 부분
      data[i].category == undefined ? data[i].category = 1 : '';
      let cate = isFinite(data[i].category) ? data[i].category : catIndex(categories, data[i].category);

      let st = 0;
      let end = 0;
      let note = data[i].label;
      let hours = Math.abs(st - end) + 1;
      let left = data.options.max - st - hours;
      if (data[i].start !== undefined) {
        data[i].start.forEach((e, ix) => {
          data[i].category.length > 1 ? (
            cate = isFinite(data[i].category[ix]) ? data[i].category[ix] : catIndex(categories, data[i].category)
          ) : ''
          st = e.split(':')[0] * 1 + resMin(e.split(':')[1]);
          end = data[i].end[ix].split(':')[0] * 1 + resMin(data[i].end[ix].split(':')[1]);
          hours = Math.abs(st - end) + 1;
          left = end - st;
          let realTime = [e,data[i].end[ix]];

          left<0?
          timeModule(data, i, ul.querySelectorAll('li')[cate], st, data.options.max + 1, realTime)
          :timeModule(data, i, ul.querySelectorAll('li')[cate], st, end,realTime);
          (left < 0 && end >= 1) ? 
          timeModule(data, i, ul.querySelectorAll('li')[cate], data.options.min, end,realTime): '';
        })
      }
    }
  }
  // 라벨추가부분 
  const tm = document.querySelectorAll(`.${newClassName} .time-cover`);

  // 이벤트 콜백함수 설정
  data.options.click ? (
    // 콜백함수
    tm.forEach(e => {
      e.addEventListener('click', () => {
        data.options.click(ul, e)
      })
    })
  ) : '';
  data.options.hover ? (
    // 콜백함수
    tm.forEach(e => {
      e.addEventListener('mousemove', () => {
        data.options.hover(ul, e)
      })
    })
  ) : '';

  data.options.tips ? (
    // 콜백함수
    tm.forEach((e) => {
      const conatiner = document.querySelector(`.${newClassName} ul.time-content`);
      let [wd, leftPos, ttlWd, cntWd, tipwd,lft] = [0, 0, 0, 0,0];
      let idx = e.getAttribute('time-id'); 
      let st = e.getAttribute('time-start');
      let end = e.getAttribute('time-end');
      let note = data.options.tips(data[idx],st,end);
      let tips = makeTips(e.parentNode, note);

      e.addEventListener('mouseenter', (m) => {
        st = m.currentTarget.getAttribute('time-start');
        end = m.currentTarget.getAttribute('time-end');
        wd = m.currentTarget.clientWidth;
        leftPos = m.currentTarget.offsetLeft;
        lft = leftPos+wd +11;
        tipwd = tips.clientWidth;
        ttlWd = wd + leftPos + tipwd;
        cntWd = conatiner.clientWidth;
        e.parentNode.style.zIndex = 5;
        tips.style.opacity = 1;
        tips.style.left = `${lft}px`;
        if(lft+tipwd > cntWd){
          tips.style.left = `${leftPos-tipwd-11}px`;
          tips.querySelector('span').style.left = 'auto',
          tips.querySelector('span').style.right = '-9px',
          tips.querySelector('span').style.transform = 'rotate(180deg)'
        }
      }
    )
      e.addEventListener('mouseleave', () => {
        tips.style.opacity = 0;
        e.parentNode.style.zIndex = 1;
      })
    })
  ) : '';

  return wrap;
}
export {
  mkTimeline,
  mkChart,
  deepCopy,
  enFlow,
  spendChart,
  selfChart,
  mixedBarChart,
  mixedChart,
  mixedNegChart,
  boxPlotChart,
  lineChart,
  timeChart,
  annotation,
  maxResult,
  mkRepChart,
  times
};