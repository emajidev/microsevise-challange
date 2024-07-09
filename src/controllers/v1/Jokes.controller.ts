import {
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { JokesService } from "../../services/Jokes.service";
import { ESource } from "../../interfaces/jokes.interface";
import { OpenAPI } from "routing-controllers-openapi";
import { OptionalParam } from "../../pipes/optional-param";
import { Inject, Service } from "typedi";
import {
  DeleteJokesDoc,
  GetJokesDoc,
  PostCreateJokesDoc,
  UpdateJokesDoc,
} from "../../doc/endpoints-jokes";

@Service()
@JsonController("jokes")
export class JokeController {
  constructor(@Inject() private jokesService: JokesService) {}

  /**
   * Obtener un chiste desde Chuck o Dad.
   *
   * @param source Fuente del chiste (Chuck o Dad)
   * @returns Objeto con el ID y el chiste obtenido
   */
  @Get("/:source?")
  @OpenAPI(GetJokesDoc)
  get(@OptionalParam("source") source?: ESource): Promise<any> {
    return this.jokesService.getJoke(source);
  }

  @Post("/:joke")
  @OpenAPI(PostCreateJokesDoc)
  create(@Param("joke") joke: string) {
    return this.jokesService.create(joke);
  }

  @Put("/:id")
  @OpenAPI(UpdateJokesDoc)
  update(@Param("id") id: string) {
    return this.jokesService.update(id);
  }

  @Delete("/:delete")
  @OpenAPI(DeleteJokesDoc)
  delete(@Param("id") id: string) {
    return this.jokesService.delete(id);
  }
}
