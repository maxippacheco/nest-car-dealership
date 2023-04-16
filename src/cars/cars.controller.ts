import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

// it manages the business logic
@Controller('cars')
export class CarsController {

	// dependencies injection
	constructor(
		private readonly carsService: CarsService
	){}

	@Get()
	getAllCars(){
		return this.carsService.findAll()
	}

	// version : '4' => uuid version
	@Get(':id')
	getCarById( @Param('id', new ParseUUIDPipe({ version: '4' }) ) id: string ){
		return this.carsService.findOneById( id ) // o Number(id)
	}

	// createCarDto = body
	@Post()
	createCar( @Body() createCarDto: CreateCarDto ){
		return this.carsService.create( createCarDto ) 
	}

	@Patch(':id')
	updateCar( 
		@Param( 'id', ParseUUIDPipe ) id: string,
		@Body() updateCarDto: UpdateCarDto,
	){
		return this.carsService.update( id, updateCarDto ); 
	}

	@Delete(':id')
	deleteCar( @Param( 'id', ParseUUIDPipe ) id: string ){
		return this.carsService.delete( id )
	}
}
