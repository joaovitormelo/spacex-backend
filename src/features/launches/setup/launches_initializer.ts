import { LaunchesRouter } from "../presentation/api/launches_router";
import { GetNextUsecase } from "../usecases/get_next_usecase";
import { LaunchesRepository } from "../data/repositories/launches_repository";
import { GetLastUsecase } from "../usecases/get_last_usecase";
import { GetUpcomingUsecase } from "../usecases/get_upcoming_usecase";
import { GetPastUsecase } from "../usecases/get_past";

export class LaunchesInitializer {
  init(server) {
    const launchesRepository: LaunchesRepository = new LaunchesRepository();

    const getNextUsecase: GetNextUsecase = new GetNextUsecase(
      launchesRepository
    );
    const getLastUsecase: GetLastUsecase = new GetLastUsecase(
      launchesRepository
    );
    const getUpcomingUsecase: GetUpcomingUsecase = new GetUpcomingUsecase(
      launchesRepository
    );
    const getPastUsecase: GetPastUsecase = new GetPastUsecase(
      launchesRepository
    );

    const launchesRouter: LaunchesRouter = new LaunchesRouter(
      server,
      getNextUsecase,
      getLastUsecase,
      getUpcomingUsecase,
      getPastUsecase
    );
    launchesRouter.start();
  }
}
