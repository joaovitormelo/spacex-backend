import { LaunchModel } from "../data/models/launch_model";
import { LaunchesRepositoryInterface } from "../data/repositories/launches_repository_interface";

export class GetNextUsecase {
  repository: LaunchesRepositoryInterface;

  constructor(repository: LaunchesRepositoryInterface) {
    this.repository = repository;
  }

  execute = async () => {
    return await this.repository.getNext();
  };
}
