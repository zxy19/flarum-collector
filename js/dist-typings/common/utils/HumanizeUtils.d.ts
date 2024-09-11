/// <reference types="flarum/@types/translator-icu-rich" />
import ForumApplication from "flarum/forum/ForumApplication";
import AdminApplication from "flarum/admin/AdminApplication";
import { CALCULATE, ConditionData, RewardData } from "../types/data";
import ItemList from "flarum/common/utils/ItemList";
export default class HumanizeUtils {
    static instance?: HumanizeUtils;
    protected app: ForumApplication | AdminApplication;
    protected definitionLoaded: boolean;
    protected rawConditionDefinition: Record<string, {
        trans: string;
        key: string;
        manual: boolean;
        abs: boolean;
    }>;
    protected conditionTranslations: Record<string, string>;
    protected rewardTranslations: Record<string, string>;
    protected conditionsKeys: string[];
    protected rewardsKeys: string[];
    constructor(app: ForumApplication | AdminApplication);
    loadDefinition(): Promise<void>;
    protected _loadDefinition(data: {
        conditions: {
            trans: string;
            key: string;
            manual: boolean;
            abs: boolean;
        }[];
        rewards: {
            trans: string;
            key: string;
        }[];
    }): void;
    static getInstance(app: ForumApplication | AdminApplication): HumanizeUtils;
    getAllConditions(): ItemList<string>;
    getAllRewards(): ItemList<string>;
    getConditionName(key: string): string;
    getRewardName(key: string): string;
    getRewardValue(key: string, value: string): string;
    rewardSelection(type: string): Promise<string>;
    humanizeCondition(conditionData: ConditionData[] | ConditionData): any;
    humanizeReward(rewardData: RewardData[] | RewardData): any;
    getCalculate(calculate: CALCULATE): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    getRawConditionDefinition(key: string): {
        trans: string;
        key: string;
        manual: boolean;
        abs: boolean;
    } | false;
}
