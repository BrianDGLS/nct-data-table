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
    passFailRateByMake: [] as PassFailRate[]
  }

  componentWillMount() {
    nctDataService.getAllVehicleReports().then(reports => {
      const allVehicles = reports
      this.setState({ allVehicles })
      this.setNCTData()
    })
  }

  setNCTData() {
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
    const { passFailRateByMake } = this.state
    const {
      options: { minimumVehiclesTested, minimumVehicleYear }
    } = nctDataService
    const yearRange = [...new Array(20)].map((_, i) => 2012 - i)
    const passFailRateDescending = passFailRateByMake.sort((a, b) => {
      return a.passRate < b.passRate ? 1 : -1
    })
    return (
      <div className="App">
        <div className="row">
          <div className="col">
            <form>
              <div className="form-group">
                <label htmlFor="minimumVehicleYear">Minimum Vehicle Year</label>
                <select
                  id="minimumVehicleYear"
                  className="form-control"
                  value={minimumVehicleYear}
                  onChange={e => {
                    nctDataService.options.minimumVehicleYear = parseInt(e.target.value)
                    this.setNCTData()
                  }}
                >
                  {yearRange.map(year => (
                    <option value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="minimumVehiclesTested">Minimum Vehicles Tested</label>
                <select
                  id="minimumVehiclesTested"
                  className="form-control"
                  value={minimumVehiclesTested}
                  onChange={e => {
                    nctDataService.options.minimumVehiclesTested = parseInt(e.target.value)
                    this.setNCTData()
                  }}
                >
                  <option value="5000">5000</option>
                  <option value="2500">2500</option>
                  <option value="1000">1000</option>
                  <option value="500">500</option>
                  <option value="1">1</option>
                </select>
              </div>
            </form>
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th scope="col">Pos.</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Pass Rate</th>
                </tr>
              </thead>
              <tbody>
                {passFailRateDescending.map(({ make, passRate }, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{make}</td>
                    <td>{passRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col"></div>
        </div>
      </div>
    )
  }
}

export default App
