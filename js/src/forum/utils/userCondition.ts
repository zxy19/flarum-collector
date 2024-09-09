import app from "flarum/forum/app";
import Condition from "../../common/models/Condition";

export async function getConditionMap(forceRefresh: boolean = false): Promise<Record<string, Condition>> {
    const conditions = await getConditions(forceRefresh);
    const conditionMap: Record<string, Condition> = {};
    conditions.forEach((item) => {
        conditionMap[item.name()] = item;
    });
    return conditionMap;
}
export async function getConditions(forceRefresh: boolean = false): Promise<Condition[]> {
    let conditions = app.store.all<Condition>("collector-condition");
    if (forceRefresh || conditions.length == 0) {
        conditions = await app.store.find<Condition[]>('collector-condition');
    }
    return conditions;
}