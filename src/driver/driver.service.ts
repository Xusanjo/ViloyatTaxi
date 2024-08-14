import { Injectable } from '@nestjs/common';
import { DriverRepository } from './repository/driver.repository';
import { Driver } from '@prisma/client';

@Injectable()
export class DriverService {
  constructor(
    private readonly driverRepository: DriverRepository,
  ){}

  async create(createDriverDto: any) {
    const newDriver = await this.driverRepository.create(createDriverDto)
    return newDriver;
  }

  async getAllDrivers(): Promise<Driver[]> {
    return this.driverRepository.findAll();
  }
  
  async getDriverById(id: number): Promise<Driver | null> {
    return await this.driverRepository.findById(id);
  }

  async update(id: number, updateDriverDto: any) {
    const updateDriver = await this.driverRepository.update(id, updateDriverDto);
    return updateDriver;
  }

  async remove(id: number) {
    return await this.driverRepository.delete(id);
  }
}
