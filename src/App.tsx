import React from 'react'
import './App.scss'
import { NCTDataService, PassFailRate } from './NCTDataService'
import { VehicleReport } from './VehicleReport'

const nctDataService = new NCTDataService('/data/2016-nct-data.csv')

class App extends React.Component {
  state = {
    allVehicles: [] as VehicleReport[],
    modernVehicles: [] as VehicleReport[],
    popularVehicles: [] as VehicleReport[],
    popularMakes: [] as string[],
    passFailRateByMake: [] as PassFailRate[],
    minimumVehicleYear: nctDataService.options.minimumVehicleYear,
    minimumVehiclesTested: nctDataService.options.minimumVehiclesTested
  }

  componentWillMount() {
    nctDataService.getAllVehicleReports().then(reports => {
      const allVehicles = reports
      this.setState({ allVehicles })
      this.setNCTData()
    })
  }

  setNCTData() {
    nctDataService.options.minimumVehicleYear = this.state.minimumVehicleYear
    nctDataService.options.minimumVehiclesTested = this.state.minimumVehiclesTested
    const modernVehicles = nctDataService.getAllModernVehicleReports(this.state.allVehicles)
    const popularVehicles = nctDataService.getAllPopularVehicleReports(modernVehicles)
    const popularMakes = nctDataService.getPopularMakes(popularVehicles)
    const passFailRateByMake = nctDataService.getMakesWithPassFailRate(popularVehicles)

    this.setState({
      modernVehicles,
      popularVehicles,
      popularMakes,
      passFailRateByMake
    })
  }

  render() {
    const { passFailRateByMake, minimumVehiclesTested, minimumVehicleYear } = this.state
    const passFailRateDescending = passFailRateByMake.sort((a, b) => {
      return a.passRate < b.passRate ? 1 : -1
    })
    return (
      <div className="App">
        <label htmlFor="minimumVehicleYear">Minimum Vehicle Year</label>
        <input
          id="minimumVehicleYear"
          type="number"
          value={minimumVehicleYear}
          onChange={e => {
            this.setState({
              minimumVehicleYear: e.target.value
            })
            this.setNCTData()
          }}
        />
        <label htmlFor="minimumVehiclesTested">Minimum Vehicles Tested</label>
        <input
          id="minimumVehiclesTested"
          type="number"
          value={minimumVehiclesTested}
          min="0"
          max="10000"
          onChange={e => {
            this.setState({
              minimumVehiclesTested: e.target.value
            })
            this.setNCTData()
          }}
        />
        <ul>
          {passFailRateDescending.map(({ make, passRate }, i) => (
            <li key={i}>
              {i + 1}: {make} - Pass Rate {passRate}%
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
