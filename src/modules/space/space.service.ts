import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Space } from './space.schema';

@Injectable()
export class SpaceService {
  constructor(
    @InjectModel('Space')
    private _spaceModel: Model<Space>,
  ) {}

  async create(query): Promise<Space> {
    return await this._spaceModel.create(query);
  }

  async findOne(query): Promise<Space> {
    return await this._spaceModel.findOne(query);
  }

  async findByIdAndUpdate(id: string, query): Promise<Space> {
    return await this._spaceModel.findByIdAndUpdate(id, query);
  }

  async find(query): Promise<Space[]> {
    return await this._spaceModel.find(query);
  }
}
