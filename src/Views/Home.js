import React from 'react';

import dataCSV from '../data/Software Engineering Programming Exercise.csv';

import data from '../data/data.json';
import Tile from '../components/Tile';
import DataTable from '../components/DataTable';


import '@progress/kendo-theme-default/dist/all.css';
import { aggregateBy } from '@progress/kendo-data-query';

import './Home.css';
import 'hammerjs';

class Home extends React.Component {
  
  state = {
    id: 'root',
  }
  
  constructor(props) {
    super(props);
    
    var jsonResult = this.csvJSON(dataCSV);
    // console.log(jsonResult)
    this.state = {
      jsonDataDemonstration: jsonResult
    };

    //Organize Data into groups for chart components

    var result = [];
    var result_genre = [];
    var result_month = [];

    //Viewership by program
    data.reduce(function(res, value) {
      if (!res[value.ProgramNetwork]) {
      res[value.ProgramNetwork] = { ProgramNetwork: value.ProgramNetwork, NumberofViewers: 0 };
      result.push(res[value.ProgramNetwork])
    }
    res[value.ProgramNetwork].NumberofViewers += value.NumberofViewers;
      return res;
      
    }, {});

    //Group by Program Genre
    data.reduce(function(res, value) {
      if (!res[value.ProgramGenre]) {
      res[value.ProgramGenre] = { ProgramGenre: value.ProgramGenre, NumberofViewers: 0 };
        result_genre.push(res[value.ProgramGenre]);
    }
    res[value.ProgramGenre].NumberofViewers += value.NumberofViewers;
      return res;
      
    }, {});

    //Group by Month
    data.reduce(function(res, value) {
      if (!res[value.date]) {
        res[value.date] = { date: value.date, NumberofViewers: 0 };
        result_month.push(res[value.date])
      }
    res[value.date].NumberofViewers += value.NumberofViewers;
      return res;
    }, {});

    //Group by TV Show
    var group_TV = [];
    data.reduce(function(res, value) {
      if (!res[value.ProgramTitle]) {
        res[value.ProgramTitle] = { ProgramTitle: value.ProgramTitle, NumberofViewers: 0 };
        group_TV.push(res[value.ProgramTitle])
      }
    res[value.ProgramTitle].NumberofViewers += value.NumberofViewers;
      return res;
    }, {});

    
    //Calculate proportions of group bys
    
    var viewer_series = [];
    const r = aggregateBy(result, [{ aggregate: "sum", field: "NumberofViewers"}]);
    for (var i = 0; i < result.length; i++) {
      var o = result[i];
      o.NumberofViewers = o.NumberofViewers / r.NumberofViewers.sum
      viewer_series[i] = o;
    }

    var viewer_genre = [];
    const r2 = aggregateBy(result_genre, [{ aggregate: "sum", field: "NumberofViewers"}]);
    for (var i = 0; i < result_genre.length; i++) {
      var o = result_genre[i];
      o.NumberofViewers = o.NumberofViewers / r2.NumberofViewers.sum
      viewer_genre[i] = o;
    }


    //Nested Group By for shows by tv network, will be shown on "Total Viewers by network shows" chart
    //Ideally this data is fed into StackedChart/MultiChart for
    //dynamic data adding, however that chart data is hard coded for 
    //time purposes
    var group_programNetwork_programTitle_total = {};
    var total = [];
    data.forEach(function (o) {
      group_programNetwork_programTitle_total[o.ProgramNetwork] = group_programNetwork_programTitle_total[o.ProgramNetwork] || {};
      group_programNetwork_programTitle_total[o.ProgramNetwork][o.ProgramTitle] = group_programNetwork_programTitle_total[o.ProgramNetwork][o.ProgramTitle] || { NumberofViewers: 0 };
      group_programNetwork_programTitle_total[o.ProgramNetwork][o.ProgramTitle].NumberofViewers += o.NumberofViewers;
    });
    
    total.push(group_programNetwork_programTitle_total);

   

    //Sort TV_totals by descending order
    (group_TV.sort(this.sort_by('NumberofViewers', true, parseInt)));

    
    this.state = {
      data: data,
      viewer_series: viewer_series,
      viewer_genre: viewer_genre,
      viewer_month: result_month,
      title_total: group_TV,
      stacked: total,
    };
  }

  //Function that would convert csv data to json
  csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

  //Sort function
  sort_by = (field, reverse, primer) => {

  const key = primer ?
    function(x) {
      return primer(x[field])
    } :
    function(x) {
      return x[field]
    };

  reverse = !reverse ? 1 : -1;

  return function(a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  }
}
  
  render() {
    return (
      <div id="root">
        <h1>Dashboard for Television Data</h1>
        <Tile stacked_total={this.state.stacked}
          title_total={this.state.title_total} viewership_month_byGenre={this.state.viewer_month} viewer_pie={this.state.viewer_series} viewer_pie2={this.state.viewer_genre} />
  
        <DataTable data={this.state.data}/>
       
      </div>
    );
  }
}

export default Home;
