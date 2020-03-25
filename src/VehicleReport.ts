export interface RawVehicleReport {
  VehicleMake: string;
  VehicleModel: string;
  YearOfBirth: string;
  Total: string;
  PASS: string;
  "PASS %": string;
  FAIL: string;
  "FAIL %": string;
  "Vehicle and Safety Equipment": string;
  "Vehicle and Safety Equipment %": string;
  "Lighting and Electrical": string;
  "Lighting and Electrical %": string;
  "Steering and Suspension": string;
  "Steering and Suspension %": string;
  "Braking Equipment": string;
  "Braking Equipment %": string;
  "Wheels and Tyres": string;
  "Wheels and Tyres %": string;
  "Engine, Noise and Exhaust": string;
  "Engine, Noise and Exhaust %": string;
  "Chassis and Body": string;
  "Chassis and Body %": string;
  "Side Slip Test": string;
  "Side Slip Test %": string;
  "Suspension Test": string;
  "Suspension Test %": string;
  "Light test": string;
  "Light test %": string;
  "Brake Test": string;
  "Brake Test %": string;
  Emmissions: string;
  "Emmissions %": string;
  OTHER: string;
  "OTHER %": string;
  Incompletable: string;
  "Incompletable %": string;
}

export interface VehicleReport {
  vehicleMake: string;
  vehicleModel: string;
  yearOfBirth: number;
  total: number;
  pass: number;
  passPercent: number;
  fail: number;
  failPercent: number;
  failReason: {
    vehicleAndSafetyEquipment: number;
    vehicleAndSafetyEquipmentPercent: number;
    lightingAndElectrical: number;
    lightingAndElectricalPercent: number;
    steeringAndSuspension: number;
    steeringAndSuspensionPercent: number;
    brakingEquipment: number;
    brakingEquipmentPercent: number;
    wheelsAndTyres: number;
    wheelsAndTyresPercent: number;
    engineNoiseAndExhaust: number;
    engineNoiseAndExhaustPercent: number;
    chassisAndBody: number;
    chassisAndBodyPercent: number;
    sideSlipTest: number;
    sideSlipTestPercent: number;
    suspensionTest: number;
    suspensionTestPercent: number;
    lightTest: number;
    lightTestPercent: number;
    brakeTest: number;
    brakeTestPercent: number;
    emmissions: number;
    emmissionsPercent: number;
    other: number;
    otherPercent: number;
    incompletable: number;
    incompletablePercent: number;
  };
}

export class VehicleReportFactory {
  static create(rawReport: RawVehicleReport): VehicleReport {
    return {
      vehicleMake: rawReport.VehicleMake,
      vehicleModel: rawReport.VehicleModel,
      yearOfBirth: parseFloat(rawReport.YearOfBirth),
      total: parseFloat(rawReport.Total),
      pass: parseFloat(rawReport.PASS),
      passPercent: parseFloat(rawReport["PASS %"]),
      fail: parseFloat(rawReport.FAIL),
      failPercent: parseFloat(rawReport["FAIL %"]),
      failReason: {
        vehicleAndSafetyEquipment: parseFloat(
          rawReport["Vehicle and Safety Equipment"]
        ),
        vehicleAndSafetyEquipmentPercent: parseFloat(
          rawReport["Vehicle and Safety Equipment %"]
        ),
        lightingAndElectrical: parseFloat(rawReport["Lighting and Electrical"]),
        lightingAndElectricalPercent: parseFloat(
          rawReport["Lighting and Electrical %"]
        ),
        steeringAndSuspension: parseFloat(rawReport["Steering and Suspension"]),
        steeringAndSuspensionPercent: parseFloat(
          rawReport["Steering and Suspension %"]
        ),
        brakingEquipment: parseFloat(rawReport["Braking Equipment"]),
        brakingEquipmentPercent: parseFloat(rawReport["Braking Equipment %"]),
        wheelsAndTyres: parseFloat(rawReport["Wheels and Tyres"]),
        wheelsAndTyresPercent: parseFloat(rawReport["Wheels and Tyres %"]),
        engineNoiseAndExhaust: parseFloat(
          rawReport["Engine, Noise and Exhaust"]
        ),
        engineNoiseAndExhaustPercent: parseFloat(
          rawReport["Engine, Noise and Exhaust %"]
        ),
        chassisAndBody: parseFloat(rawReport["Chassis and Body"]),
        chassisAndBodyPercent: parseFloat(rawReport["Chassis and Body %"]),
        sideSlipTest: parseFloat(rawReport["Side Slip Test"]),
        sideSlipTestPercent: parseFloat(rawReport["Side Slip Test %"]),
        suspensionTest: parseFloat(rawReport["Suspension Test"]),
        suspensionTestPercent: parseFloat(rawReport["Suspension Test %"]),
        lightTest: parseFloat(rawReport["Light test"]),
        lightTestPercent: parseFloat(rawReport["Light test %"]),
        brakeTest: parseFloat(rawReport["Brake Test"]),
        brakeTestPercent: parseFloat(rawReport["Brake Test %"]),
        emmissions: parseFloat(rawReport.Emmissions),
        emmissionsPercent: parseFloat(rawReport["Emmissions %"]),
        other: parseFloat(rawReport.OTHER),
        otherPercent: parseFloat(rawReport["OTHER %"]),
        incompletable: parseFloat(rawReport.Incompletable),
        incompletablePercent: parseFloat(rawReport["Incompletable %"])
      }
    };
  }
}
