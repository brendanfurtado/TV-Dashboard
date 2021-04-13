import React from 'react';

import '@progress/kendo-theme-default/dist/all.css';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';

class DataTable extends React.Component{

    state = {
        filter: {
            logic: "and",
            filters: [
                { field: "Program Network", operator: "contains" }
            ]
        },
        data: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Raw Data</h1>
            <Grid
            style={{ height: '600px' }}
            data={filterBy([...this.props.data], this.state.filter)}
            filterable={true}

            filter={this.state.filter}
            onFilterChange={(e) => {
                        this.setState({
                            filter: e.filter
                        });
                    }}
            reorderable
                >
                <Column field="ProgramTitle" title="Title" width="250px" />
                <Column field="ProgramGenre" title="Genre" width="200px" />
                <Column field="ProgramNetwork" title="Network" width="200px"/>
                <Column field="ViewerHometown" title="Location" width="250px" />
                <Column field="NumberofViewers" filter="numeric" title="Number Viewers" />
            </Grid>  
            </React.Fragment>
            
        );
    }
}

export default DataTable;