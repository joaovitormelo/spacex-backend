import * as moment from "moment-timezone";

export class Utils {
  static convertUtcDateToLocal(utcDate: string) {
    return moment.utc(utcDate).local().format();
  }
}
