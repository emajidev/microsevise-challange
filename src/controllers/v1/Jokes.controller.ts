import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { JokesService } from "../../services/Jokes.service";
import { ESource, IJoke } from "../../interfaces/jokes.interface";
import { OpenAPI } from "routing-controllers-openapi";
import { OptionalParam } from "../../pipes/optional-param";
import { Inject, Service } from "typedi";
import {
  DeleteJokesDoc,
  GetJokesDoc,
  PostCreateJokesDoc,
  UpdateJokesDoc,
} from "../../doc/endpoints-jokes";
import { UpdateJokeDTO } from "../../dtos/UpdateJokeDTO";

@Service()
@JsonController("jokes")
export class JokeController {
  constructor(@Inject() private readonly jokesService: JokesService) {}

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

  /**
   * crear nuevo chiste
   *
   * @param joke text del chiste
   * @returns Objeto con el ID y el chiste obtenido
   */
  @Post("/:joke")
  @OpenAPI(PostCreateJokesDoc)
  create(@Param("joke") joke: string) {
    return this.jokesService.create(joke);
  }

  /**
   * Actualizar chiste por id
   *
   * @param id id asignado al chiste
   * @returns Objeto con el ID y el chiste obtenido
   */
  @Put("/:id")
  @OpenAPI(UpdateJokesDoc)
  update(@Param("id") id: string, @Body() body: UpdateJokeDTO) {
    return this.jokesService.update(id, body);
  }

  /**
   * Eliminar chiste por id
   *
   * @param id id asignado al chiste
   * @returns mensaje de eliminacion exitosa
   */
  @Delete("/:delete")
  @OpenAPI(DeleteJokesDoc)
  delete(@Param("id") id: string) {
    return this.jokesService.delete(id);
  }
}
