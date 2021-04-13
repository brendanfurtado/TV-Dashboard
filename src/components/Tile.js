import * as React from 'react';

import { TileLayout } from '@progress/kendo-react-layout';
import PieChart from './PieChart';
import PieChart2 from './PieChart2';
import TrendChart from './TrendChart';
import StackedChart from './StackedChart';
import TitleTable from './TitleTable';



class Tile extends React.Component{
    render() {
        const tiles = [
            {
                defaultPosition: { col: 1, colSpan: 1, rowSpan: 1, order: 1 },
                item: <PieChart data={this.props.viewer_pie}/>
            },
            {
                defaultPosition: { col: 2, colSpan: 2, rowSpan: 1, order: 5 },
                item: <StackedChart data={this.props.stacked_total} />
            },
             {
                defaultPosition: { col: 3, colSpan: 1, rowSpan: 1, order: 3 },
                 item: <TitleTable data={this.props.title_total}/>
            },
            {
                defaultPosition: { col: 1, colSpan: 1, rowSpan: 1, order: 2 },
                item: <TrendChart viewer_month={this.props.viewership_month_byGenre}/>
            },
            {
                defaultPosition: { col: 2, colSpan: 1, rowSpan: 1, order: 4 },
                item: <PieChart2 data={this.props.viewer_pie2}/>
            }
        ];
        return (
            <React.Fragment>
                <TileLayout
                    autoFlow={"column"}
                    columns={3}
                    rowHeight={400}
                    gap={{ rows: 5, columns: 5 }}
                    items={tiles}
                />
            </React.Fragment>
                
        );
    }
}


export default Tile; 