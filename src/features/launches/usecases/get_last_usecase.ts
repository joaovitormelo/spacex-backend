import { LaunchesRepositoryInterface } from "../data/repositories/launches_repository_interface";

export class GetLastUsecase {
  repository: LaunchesRepositoryInterface;

  constructor(repository: LaunchesRepositoryInterface) {
    this.repository = repository;
  }

  execute = async () => {
    return await this.repository.getLast();
  };
}
