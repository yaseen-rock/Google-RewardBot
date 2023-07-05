import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RollbarLogger } from 'nestjs-rollbar';
import { Feedback } from './feedback.schema';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel('Feedback')
    private _feedbackModel: Model<Feedback>,
    private _rollbarLogger: RollbarLogger,
  ) {}

  async create(query): Promise<Feedback> {
    try {
      return await this._feedbackModel.create(query);
    } catch (error) {
      this._rollbarLogger.error({
        name: 'feedbackService-create',
        query: query,
        error: error,
      });
    }
  }

  async findOne(query): Promise<Feedback> {
    try {
      return await this._feedbackModel.findOne(query);
    } catch (error) {
      this._rollbarLogger.error({
        name: 'feedbackService-findOne',
        query: query,
        error: error,
      });
    }
  }

  async findByIdAndUpdate(id: string, query): Promise<Feedback> {
    try {
      return await this._feedbackModel.findByIdAndUpdate(id, query);
    } catch (error) {
      this._rollbarLogger.error({
        name: 'feedbackService-findByIdAndUpdate',
        query: query,
        error: error,
      });
    }
  }

  async find(query): Promise<Feedback[]> {
    try {
      return await this._feedbackModel.find(query);
    } catch (error) {
      this._rollbarLogger.error({
        name: 'feedbackService-find',
        query: query,
        error: error,
      });
    }
  }
}
