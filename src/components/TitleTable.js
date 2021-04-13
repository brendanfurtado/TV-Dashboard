import React from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';


class TitleTable extends React.Component{

     constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        }
     }
    
    render() {
        return (
            <React.Fragment>
                <h3>Views by Show Title</h3>
            <Grid
                style={{ height: '300px' }}
                data={this.props.data}>
                <Column field="ProgramTitle" title="Title" width="200px" />
                <Column field="NumberofViewers" filter="numeric" title="Number Viewers" />
            </Grid>  
            </React.Fragment>
            
        );
    }
}

export default TitleTable;