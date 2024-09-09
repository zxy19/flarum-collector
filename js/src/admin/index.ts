import app from 'flarum/admin/app';
import { init } from '../common/integration';

app.initializers.add('xypp/collector', () => {
  init(app, "admin");
  app.extensionData
    .for('xypp-collector')
    .registerSetting({
      type: 'string',
      setting: 'xypp.collector.timezone',
      default: 'UTC',
      label: app.translator.trans('xypp-collector.admin.timezone'),
    })
});


import { addCondition, addReward, addRewardSelection, rewardValueConvert } from '../common/utils/AddFrontend';
import HumanizeUtils from '../common/utils/HumanizeUtils';
import Condition from '../common/models/Condition';
import RewardConfigure from './components/RewardConfigure';
import ConditionConfigure from './components/ConditionConfigure';
import { OPERATOR } from '../common/types/data';
export {
  addCondition,
  addReward,
  addRewardSelection,
  rewardValueConvert,
  HumanizeUtils,
  Condition,
  RewardConfigure,
  ConditionConfigure,
  OPERATOR
};