import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Space } from './space.schema';
import { RollbarLogger } from 'nestjs-rollbar';

@Injectable()
export class SpaceService {
  constructor(
    @InjectModel('Space')
    private _spaceModel: Model<Space>,
    private _rollbarLogger: RollbarLogger,
  ) {}

  async create(query): Promise<Space> {
    try {
      return await this._spaceModel.create(query);
    } catch (error) {
      this._rollbarLogger.error({
        name: 'spaceService-create',
        query: query,
        error: error,
      });
    }
  }

  async findOne(query): Promise<Space> {
    try {
      return await this._spaceModel.findOne(query);
    } catch (error) {
      this._rollbarLogger.error({
        name: 'spaceService-findOne',
        query: query,
        error: error,
      });
    }
  }

  async findByIdAndUpdate(id: string, query): Promise<Space> {
    try {
      return await this._spaceModel.findByIdAndUpdate(id, query);
    } catch (error) {
      this._rollbarLogger.error({
        name: 'spaceService-findByIdAndUpdate',
        query: query,
        error: error,
      });
    }
  }

  async find(query): Promise<Space[]> {
    try {
      return await this._spaceModel.find(query);
    } catch (error) {
      this._rollbarLogger.error({
        name: 'spaceService-find',
        query: query,
        error: error,
      });
    }
  }
}
