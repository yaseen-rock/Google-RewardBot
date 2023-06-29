import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { RollbarLogger } from 'nestjs-rollbar';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private _userModel: Model<User>,
    private _rollbarLogger: RollbarLogger,
  ) {}

  async create(query): Promise<User> {
    try {
      return await this._userModel.create(query);
    } catch (error) {
      this._rollbarLogger.error({
        name: 'userService-create',
        query: query,
        error: error,
      });
    }
  }

  async findOne(query): Promise<User> {
    try {
      return await this._userModel.findOne(query);
    } catch (error) {
      this._rollbarLogger.error({
        name: 'userService-findOne',
        query: query,
        error: error,
      });
    }
  }

  async findByIdAndUpdate(id: string, query): Promise<User> {
    try {
      return await this._userModel.findByIdAndUpdate(id, query);
    } catch (error) {
      this._rollbarLogger.error({
        name: 'userService-findByIdAndUpdate',
        query: query,
        error: error,
      });
    }
  }

  async find(query): Promise<User[]> {
    try {
      return await this._userModel.find(query);
    } catch (error) {
      this._rollbarLogger.error({
        name: 'userService-find',
        query: query,
        error: error,
      });
    }
  }
}
