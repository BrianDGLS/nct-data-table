import csv from 'csvtojson'
import { VehicleReport, VehicleReportFactory, RawVehicleReport } from './VehicleReport'

export interface PassFailRate {
  make: string
  passRate: number
  failRate: number
}

export class NCTDataService {
  public options = {
    minimumVehiclesTested: 500,
    minimumVehicleYear: 2012
  }

  constructor(public dataFile: string) {}

  private _allVehicleReports!: VehicleReport[]
  public async getAllVehicleReports(): Promise<VehicleReport[]> {
    if (!this._allVehicleReports) {
      const request = await fetch(this.dataFile)
      const data = await request.text()
      const rawReports: RawVehicleReport[] = await csv().fromString(data)
      this._allVehicleReports = rawReports.map(VehicleReportFactory.create)
    }
    return this._allVehicleReports
  }

  public getAllModernVehicleReports(reports: VehicleReport[]): VehicleReport[] {
    return reports.filter(report => report.yearOfBirth >= this.options.minimumVehicleYear)
  }

  public getPopularMakes(reports: VehicleReport[]): string[] {
    return reports.reduce((acc: string[], report) => {
      const make = report.vehicleMake
      if (acc.indexOf(make) > -1) return acc

      const allEntries = reports.filter(report => report.vehicleMake === make)
      const totalTests = allEntries.reduce((acc, { total }) => acc + total, 0)

      return totalTests > this.options.minimumVehiclesTested ? [make, ...acc] : acc
    }, [])
  }

  public getAllPopularVehicleReports(reports: VehicleReport[]): VehicleReport[] {
    const makes: string[] = this.getPopularMakes(reports)
    return reports.filter(report => makes.indexOf(report.vehicleMake) > -1)
  }

  public getMakePassRate(reports: VehicleReport[], make: string): number {
    const reportsForBrand = reports.filter(report => report.vehicleMake === make)
    const net = reportsForBrand.reduce((acc, report) => acc + report.passPercent, 0)
    return parseFloat((net / reportsForBrand.length).toFixed(2))
  }

  public getMakeFailRate(reports: VehicleReport[], make: string): number {
    const reportsForBrand = reports.filter(report => report.vehicleMake === make)
    const net = reportsForBrand.reduce((acc, report) => acc + report.failPercent, 0)
    return parseFloat((net / reportsForBrand.length).toFixed(2))
  }

  public getMakesWithPassFailRate(reports: VehicleReport[]): PassFailRate[] {
    const makes: string[] = reports
      .map(report => report.vehicleMake)
      .filter((make, i, arr) => arr.indexOf(make) === i)
    return makes.map(make => {
      return {
        make,
        passRate: this.getMakePassRate(reports, make),
        failRate: this.getMakeFailRate(reports, make)
      }
    })
  }
}
