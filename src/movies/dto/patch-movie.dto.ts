import { CreateMovieDto } from "./create-movie.dto";
import { PartialType } from "@nestjs/mapped-types";

export class PatchMovieDto extends PartialType(CreateMovieDto) {}
