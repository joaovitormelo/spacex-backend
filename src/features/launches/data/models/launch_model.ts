import { Utils } from "../../../../core/utils/utils";

export class LaunchModel {
  flightNumber: number;
  name: string;
  date: string;

  constructor(flightNumber: number, name: string, date: string) {
    this.flightNumber = flightNumber;
    this.name = name;
    this.date = date;
  }

  static fromJson(json) {
    return new LaunchModel(
      json.flight_number,
      json.name,
      Utils.convertUtcDateToLocal(json.date_utc)
    );
  }

  toJson() {
    return {
      flight_number: this.flightNumber,
      name: this.name,
      date: this.date,
    };
  }
}
