import { IsString, MinLength } from "class-validator";

export class CreateCarDto {

	@IsString()
	readonly brand: string;

	//@IsString({ message: "Marca requerida" })
	@IsString()
	@MinLength(3)
	readonly model: string;

}