import Model from 'flarum/common/Model';
import { CALCULATE, ConditionAccumulation } from '../types/data';
export default class Condition extends Model {
    name: () => string;
    value: () => number;
    accumulation: () => ConditionAccumulation | null;
    getSpan(span: number, calculate?: CALCULATE): number;
    getTotal(calculate?: CALCULATE): number;
}
