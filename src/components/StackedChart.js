import * as React from 'react';

import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
} from '@progress/kendo-react-charts';


 import { DropDownList } from '@progress/kendo-react-dropdowns';

import 'hammerjs';
const networks = ["CBS", "ABC", "SyFy"];
const shows1 = ["Forensic Files", "Star Trek Discovery", "Steelers Tonight!", "Twilight Zone"];
const shows2 = ["Crime Patrol", "The Dawg Pound"];
const shows3 = ["The Expanse"];
const series1 = [
    {
        name: "CBS",
        data: [3600, 1475, 1255, 900],
        colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"]

    },
];

const series2 = [
    {
        name: "ABC",
        data: [3850, 1037],
    },
];

const series3 = [
    {
        name: "SyFy",
        data: [1675],
    },
];

class StackedChart extends React.Component{

    onChange = e => {
        // console.log(e.target.value);

        if (e.target.value === "ABC") {
             this.setState({
                 selected: this.props.selected ? this.props.selected + e.target.value : e.target.value,
                 series: series2,
                 show: shows2,
            });
        }
        else if (e.target.value === "CBS") {
             this.setState({
                 selected: this.props.selected ? this.props.selected + e.target.value : e.target.value,
                 series: series1,
                 show: shows1,
            });
        }
        else {
            this.setState({
                 selected: this.props.selected ? this.props.selected + e.target.value : e.target.value,
                 series: series3,
                 show: shows3,
            });
        }
  }
    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data,
            selected: networks[0],
            series: series1,
            show: shows1,
        }
    }
    render() {
        return (
            <React.Fragment>


                <DropDownList data={networks} defaultValue="CBS" onChange={this.onChange} />

                <Chart style={{height: 350}}>
                <ChartTitle text="Total Viewers by Network Shows"></ChartTitle>
                <ChartCategoryAxis>
                    <ChartCategoryAxisItem categories={this.state.show} labels={{ color: '#0a0' }} />
                </ChartCategoryAxis>
        
                    
                <ChartSeries>
                    {this.state.series.map((item, idx) => (
                        <ChartSeriesItem
                  key={idx}
                  type="column"
                  tooltip={{ visible: true }}
                  data={item.data}
                  name={item.name}
                  gap={2}
                                />
                    ))}
                </ChartSeries>  
                </Chart>
                
                </React.Fragment>
        );
        
    }

}
export default StackedChart; 

