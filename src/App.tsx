import React from 'react';
import logo from './logo.svg';
import './App.css';

import * as csv from "csvtojson";

function filterByKey(dataset: any, key: any, value: any) {
  return dataset.filter((obj: any) => obj[key] === value);
}

function filterByMake(dataset: any, make: any) {
  return filterByKey(dataset, "VehicleMake", make);
}

function groupByMake(dataset: any) {
  const byMake: any = {};
  for (const entry of dataset) {
    const make = entry.VehicleMake;
    if (entry.VehicleMake in byMake) {
      byMake[make].push(entry);
    } else {
      byMake[make] = [entry];
    }
  }
  return byMake;
}

const Main = (async function() {
  const request = await fetch("/data/2016-nct-data.csv");
  const data = await request.text();
  const json = await (csv as any)().fromString(data);

  const byMake = groupByMake(json);
  const popularMakes: any = {};
  const averageFailRate: any = [];
  const averagePassRate: any = [];
  for (const key in byMake) {
    const make: any = byMake[key];
    // console.log(make)
    if (make.some((car: any) => car.Total > 500)) {
      popularMakes[key] = make;
      const failRate = make.reduce((acc: any, v:any) => acc + parseFloat(v['FAIL %']), 0) / make.length;
      averageFailRate.push({make: key, failRate })
      const passRate = make.reduce((acc: any, v:any) => acc + parseFloat(v['PASS %']), 0) / make.length;
      averagePassRate.push({make: key, passRate })
    }
  }
  console.log(averageFailRate.sort((a: any, b: any) => (a.failRate > b.failRate) ? 1 : -1))
  console.log(averagePassRate.sort((a: any, b: any) => (a.passRate < b.passRate) ? 1 : -1))
  console.log(popularMakes);
})();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
