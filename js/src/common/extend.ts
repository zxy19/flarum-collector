import Extend from 'flarum/common/extenders';
import Condition from './models/Condition';
export default [
    new Extend.Store()
        .add('condition', Condition)
];