/// <reference types="mithril" />
import Component from "flarum/common/Component";
import { ConditionData, OPERATOR } from "../../common/types/data";
import Condition from "../../common/models/Condition";
export default class ConditionList extends Component<{
    conditions: ConditionData[];
    conditionMap?: Record<string, Condition>;
}> {
    view(vnode: any): JSX.Element;
    progress(condition: ConditionData): "" | JSX.Element;
    conditionOp(value1: number, op: OPERATOR, value2: number): boolean;
}
