import React from 'react';
import {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartTitle
} from '@progress/kendo-react-charts';
import '@progress/kendo-theme-default/dist/all.css';



class PieChart extends React.Component{


    render() {
        return (
        <React.Fragment>
                <Chart>
                    <ChartTitle text="Viewership by Network"/>
                <ChartLegend position="bottom" />
                <ChartSeries>
                        <ChartSeriesItem type="pie" data={this.props.data} field="NumberofViewers" categoryField="ProgramNetwork" labels={{
                            visible: true, content: function (props) {
                            let formatedNumber = Number(props.dataItem['NumberofViewers']).toLocaleString(undefined, { style: 'percent', });
                return `${props.dataItem['ProgramNetwork']}: ${formatedNumber}`;
                    }  }} />
                </ChartSeries>
        </Chart>
        </React.Fragment>
        );
  }

}

export default PieChart; 