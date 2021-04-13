import * as React from 'react';

import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle
} from '@progress/kendo-react-charts';

import 'hammerjs';

const categories = [];
const seriesData = [];
const valueAxisLabels = {
    padding: 3,
    font: 'bold 16px Arial, sans-serif'
};

const seriesLabels = {
    visible: true, // Note that visible defaults to false
    padding: 3,
    font: 'bold 16px Arial, sans-serif'
};

const header_style = {
    font: 'bold 16px Arial, sans-serif'
}

class TrendChart extends React.Component{

    state = {
        data: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.viewer_month,
        }
        
        for (var i = 0; i < this.state.data.length; i++){
            categories[i] = this.state.data[i].date;
            seriesData[i] = this.state.data[i].NumberofViewers;
        }
      
    }


    render() {
        return (
        <React.Fragment>
                <Chart>
                    <ChartTitle style={ header_style } text="Monthly Trend - Total Viewers"/>
                <ChartCategoryAxis>
                    <ChartCategoryAxisItem categories={categories} labels={{ color: '#0a0' }} />
                </ChartCategoryAxis>
                <ChartValueAxis>
                    <ChartValueAxisItem labels={valueAxisLabels} />
                </ChartValueAxis>
                <ChartSeries>
                        <ChartSeriesItem type="line" data={seriesData} labels={seriesLabels}/>
                </ChartSeries>
            </Chart>
        </React.Fragment>
        );
  }

}

export default TrendChart; 