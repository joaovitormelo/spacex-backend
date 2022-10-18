import { LaunchModel } from "../models/launch_model";
import { Globals } from "../../../../core/config/globals";
import axios from "axios";
import { ConnectionError } from "../../../../core/errors/errors";
import { LaunchesRepositoryInterface } from "./launches_repository_interface";

export class LaunchesRepository implements LaunchesRepositoryInterface {
  getNext = async () => {
    const url = `${Globals.apiUrl}/launches/next`;
    var data;
    try {
      data = (await axios.get(url)).data;
    } catch (e) {
      console.error(e);
      throw new ConnectionError();
    }
    return LaunchModel.fromJson(data);
  };

  getLast = async () => {
    const url = `${Globals.apiUrl}/launches/latest`;
    var data;
    try {
      data = (await axios.get(url)).data;
    } catch (e) {
      console.error(e);
      throw new ConnectionError();
    }
    return LaunchModel.fromJson(data);
  };

  getUpcoming = async () => {
    const url = `${Globals.apiUrl}/launches/upcoming`;
    var data: Array<any>;
    try {
      data = (await axios.get(url)).data;
    } catch (e) {
      console.error(e);
      throw new ConnectionError();
    }
    return data.map((launch) => LaunchModel.fromJson(launch));
  };

  getPast = async () => {
    const url = `${Globals.apiUrl}/launches/past`;
    var data: Array<any>;
    try {
      data = (await axios.get(url)).data;
    } catch (e) {
      console.error(e);
      throw new ConnectionError();
    }
    return data.map((launch) => LaunchModel.fromJson(launch));
  };
}
