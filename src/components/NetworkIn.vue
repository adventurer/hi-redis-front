<template>
	
        <div class="card">
            <div id="main" ref="chart" style="height:400px;"></div>
        </div>

</template>


<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/legend');

export default {
	name: 'NetworkIn',
	props: {
		title: Array,
		msg: Array
	},
	created:function () {
    },
    mounted() {
    },
    methods:{
    },
    watch:{
        title:function(){
            // 基于准备好的dom，初始化echarts实例
            // var myChart = echarts.init(document.getElementById('main'));
            var myChart = echarts.init(this.$refs.chart);
            console.log(myChart)
            myChart.hideLoading();
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: ''
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: false
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    data:['network in:']
                },
                xAxis: {
                    type : 'category',
                    boundaryGap : false,
                    data: this.title
                },
                yAxis: {},
                series: [{
                    name:'network in:',
                    type:'line',
                    stack: 'network in:',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data: this.msg
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        msg:function(){

        }
    }
}
</script>

