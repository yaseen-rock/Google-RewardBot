import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewardsLog, RewardsLogDocument } from './rewardsLog.model';

@Injectable()
export class RewardsLogService {
  constructor(
    @InjectModel(RewardsLog.name)
    private rewardsLogModel: Model<RewardsLogDocument>,
  ) {}

  async create(rewardsLog: RewardsLog): Promise<RewardsLog> {
    const createdRewardsLog = new this.rewardsLogModel(rewardsLog);
    return createdRewardsLog.save();
  }

  async findAll(): Promise<RewardsLog[]> {
    return this.rewardsLogModel.find().exec();
  }
}
