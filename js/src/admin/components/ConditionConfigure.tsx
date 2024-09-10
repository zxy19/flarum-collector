import Component from "flarum/common/Component";
import { ConditionData, OPERATOR } from "../../common/types/data";
import Stream from "mithril/stream";
import app from "flarum/admin/app";
import HumanizeUtils from "../../common/utils/HumanizeUtils";
import { showIf } from "../../common/utils/NodeUtil";
import Button from "flarum/common/components/Button";
import Select from "flarum/common/components/Select";

export default class ConditionConfigure extends Component<{ conditions: Stream<ConditionData[]> }> {
    conditions: ConditionData[] = [];
    REG_OPERATOR: Record<string, string> = {
        '=': '=',
        '>': '>',
        '>=': '>=',
        '<': '<',
        '<=': '<=',
        '!=': '!='
    }
    REG_CONDITIONS: Record<string, string> = {}

    oninit(vnode: any): void {
        super.oninit(vnode);
        const humanize = HumanizeUtils.getInstance(app);
        const conditions = humanize.getAllConditions().toObject();
        Object.keys(conditions).forEach(item => {
            this.REG_CONDITIONS[item] = conditions[item].content;
        });

        this.REG_CONDITIONS['*'] = app.translator.trans('xypp-collector.admin.list.new_item') + "";

        this.conditions = this.attrs.conditions();
        this.conditions.push({
            name: '*',
            operator: OPERATOR.EQUAL,
            value: 0
        });
    }

    view(vnode: any) {
        return <table className='Table'>
            <thead>
                <tr>
                    <th>{app.translator.trans('xypp-collector.admin.list.condition-name')}</th>
                    <th>{app.translator.trans('xypp-collector.admin.list.condition-operator')}</th>
                    <th>{app.translator.trans('xypp-collector.admin.list.condition-value')}</th>
                    <th>{app.translator.trans('xypp-collector.admin.list.condition-span')}</th>
                    <th>{app.translator.trans('xypp-collector.admin.list.condition-alter_name')}</th>
                </tr>
            </thead>
            <tbody>
                {this.conditions.map((item, index) => {
                    return (
                        <tr>
                            <td>
                                <Select className="FormControl" value={item.name} options={this.REG_CONDITIONS} onchange={((name: string) => {
                                    if (this.conditions.length == index + 1) {
                                        this.conditions.push({
                                            name: '*',
                                            operator: OPERATOR.EQUAL,
                                            value: 0
                                        });
                                    }
                                    this.conditions[index].name = name;
                                    this.attrs.conditions(this.conditions);
                                }).bind(this)}>
                                </Select>
                            </td>
                            <td>
                                <Select className="FormControl" value={item.operator} options={this.REG_OPERATOR} onchange={((name: string) => {
                                    this.conditions[index].operator = name as OPERATOR;
                                    this.attrs.conditions(this.conditions);
                                }).bind(this)}>
                                </Select>
                            </td>
                            <td>
                                <input className="FormControl" type="text" value={item.value} onchange={((e: InputEvent) => {
                                    this.conditions[index].value = parseInt((e.target as HTMLInputElement).value);
                                    this.attrs.conditions(this.conditions);
                                }).bind(this)} />
                            </td>
                            <td>
                                <input className="FormControl" type="number" value={item.span} onchange={((e: InputEvent) => {
                                    this.conditions[index].span = (e.target as HTMLInputElement).value ? parseInt((e.target as HTMLInputElement).value) : undefined;
                                    this.attrs.conditions(this.conditions);
                                }).bind(this)} />
                            </td>
                            <td>
                                <input className="FormControl" type="text" value={item.alter_name || ""} onchange={((e: InputEvent) => {
                                    this.conditions[index].alter_name = (e.target as HTMLInputElement).value || undefined;
                                    this.attrs.conditions(this.conditions);
                                }).bind(this)} />
                            </td>
                            <td>
                                {showIf(item.name != '*',
                                    <Button className="Button Button--danger" onclick={((e: any) => {
                                        this.conditions.splice(index, 1);
                                        m.redraw();
                                        this.attrs.conditions(this.conditions);
                                    }).bind(this)} data-id={index}>
                                        <i class="fas fa-trash"></i>
                                    </Button>
                                )}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    }
}