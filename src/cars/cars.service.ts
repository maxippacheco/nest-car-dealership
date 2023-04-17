import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid'

import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

//*.todos los servicios son providers pero no todos los providers son servicios
@Injectable()
export class CarsService {
	private cars: Car[] = [
		{
			id: uuid(),
			brand: 'Toyota',
			model: 'Corolla'
		},
		{
			id: uuid(),
			brand: 'Honda',
			model: 'Civic'
		},
		{
			id: uuid(),
			brand: 'Jeep',
			model: 'Cherokee'
		},
	];

	findAll(){
		return this.cars;
	}

	findOneById( id: string ){

		const car = this.cars.find( car => car.id === id );

		if( !car ) throw new NotFoundException(`Car with id ${ id } not found`);
		
		return car;
	}

	create( createCarDto: CreateCarDto ){

		const car = { id: uuid(), ...createCarDto };
		this.cars.push( car );

		return car;
	}

	update( id: string, updateCarDto: UpdateCarDto ){

		let carDB = this.findOneById( id ); //the findOneById() has validations

		// validate id that the client send us in the body
		if( updateCarDto.id && updateCarDto.id !== id) {
			throw new BadRequestException(`Car id is not valid`);
		}

		this.cars = this.cars.map( car => {
			if( car.id === id) {
				carDB = {
					...carDB,
					...updateCarDto,
					//to not update the id, that might be dangerous for our app security
					id,
				}
				return carDB;
			}

			return car;
		});

		return carDB; // updated car
	}

	delete( id: string ){

		//!my solution
		// const carDB = this.findOneById( id );
		//const idx = this.cars.indexOf(carDB);
		//this.cars.splice(idx, 1);
		this.cars = this.cars.filter( car => car.id !== id );

	}

	fillCarsWithSeedData( cars: Car[] ){
		this.cars = cars;
	}



}
