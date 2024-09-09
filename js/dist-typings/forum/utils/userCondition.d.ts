import Condition from "../../common/models/Condition";
export declare function getConditionMap(forceRefresh?: boolean): Promise<Record<string, Condition>>;
export declare function getConditions(forceRefresh?: boolean): Promise<Condition[]>;
