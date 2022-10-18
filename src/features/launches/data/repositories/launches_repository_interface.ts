import { LaunchModel } from "../models/launch_model";

export abstract class LaunchesRepositoryInterface {
  getNext: () => Promise<LaunchModel>;
  getLast: () => Promise<LaunchModel>;
  getUpcoming: () => Promise<Array<LaunchModel>>;
  getPast: () => Promise<Array<LaunchModel>>;
}
