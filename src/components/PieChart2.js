import React from 'react';
import {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartTitle,
    ChartSeriesLabels,
} from '@progress/kendo-react-charts';
import '@progress/kendo-theme-default/dist/all.css';

const labelContent = (e) => (e.category);

class PieChart2 extends React.Component{


    render() {
        return (
        <React.Fragment>
                <Chart>
                    <ChartTitle text="Viewership by Genre"/>
                    <ChartLegend position="bottom" />
    
                    <ChartSeries>
                        <ChartSeriesItem type="donut" data={this.props.data} field="NumberofViewers" categoryField="ProgramGenre" >
                            <ChartSeriesLabels color="#fff" background="none" content={labelContent}/>
                        </ChartSeriesItem>
                </ChartSeries>
        </Chart>
        </React.Fragment>
        );
  }

}

export default PieChart2; 