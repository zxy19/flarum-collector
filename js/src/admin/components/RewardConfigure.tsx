import Component from "flarum/common/Component";
import { RewardData } from "../../common/types/data";
import Stream from "mithril/stream";
import app from "flarum/admin/app";
import HumanizeUtils from "../../common/utils/HumanizeUtils";
import { showIf } from "../../common/utils/NodeUtil";
import Button from "flarum/common/components/Button";
import Select from "flarum/common/components/Select";

export default class RewardConfigure extends Component<{ rewards: Stream<RewardData[]> }> {
    rewards: RewardData[] = [];
    REG_REWARDS: Record<string, string> = {}
    rewardGettingValue: Record<number, boolean> = {};
    oninit(vnode: any): void {
        super.oninit(vnode);
        const humanize = HumanizeUtils.getInstance(app);
        const reward = humanize.getAllRewards().toObject();
        Object.keys(reward).forEach(item => {
            this.REG_REWARDS[item] = reward[item].content;
        });

        this.REG_REWARDS['*'] = app.translator.trans('xypp-collector.admin.create-modal.new_item') + "";

        this.rewards = this.attrs.rewards();
        this.rewards.push({
            name: '*',
            value: '*'
        });
    }

    view(vnode: any) {
        return <table className='Table'>
            <thead>
                <tr>
                    <th>{app.translator.trans('xypp-collector.admin.create-modal.reward-name')}</th>
                    <th>{app.translator.trans('xypp-collector.admin.create-modal.reward-value')}</th>
                    <th>{app.translator.trans('xypp-collector.admin.create-modal.reward-get_value')}</th>
                    <th>{app.translator.trans('xypp-collector.admin.create-modal.reward-alter_name')}</th>
                </tr>
            </thead>
            <tbody>
                {this.rewards.map((item, index) => {
                    return (
                        <tr>
                            <td>
                                <Select className="FormControl" value={item.name} options={this.REG_REWARDS} onchange={((name: string) => {
                                    if (this.rewards.length == index + 1) {
                                        this.rewards.push({
                                            name: '*',
                                            value: '*'
                                        });
                                    }
                                    this.rewards[index].name = name;
                                }).bind(this)}>
                                </Select>
                            </td>
                            <td>
                                <input className="FormControl" type="text" value={item.value} onchange={((e: InputEvent) => {
                                    this.rewards[index].value = (e.target as HTMLInputElement).value;
                                }).bind(this)} />
                            </td>
                            <td>
                                <Button className="Button Button--primary" onclick={this.getValue.bind(this)} data-id={index}
                                    disabled={this.rewardGettingValue[index]} loading={this.rewardGettingValue[index]}>
                                    <i class="fas fa-eye"></i>
                                </Button>
                            </td>
                            <td>
                                <input className="FormControl" type="text" value={item.alter_name || ""} onchange={((e: InputEvent) => {
                                    this.rewards[index].alter_name = (e.target as HTMLInputElement).value || undefined;
                                }).bind(this)} />
                            </td>
                            <td>
                                {showIf(item.name != '*',
                                    <Button className="Button Button--danger" onclick={((e: any) => {
                                        this.rewards.splice(index, 1);
                                        m.redraw();
                                    }).bind(this)} data-id={index}>
                                        <i class="fas fa-trash"></i>
                                    </Button>)}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    }

    async getValue(e: MouseEvent) {
        const id = parseInt((e.currentTarget as HTMLInputElement).getAttribute('data-id') as string);
        this.rewardGettingValue[id] = true;
        m.redraw();
        const result = await HumanizeUtils.getInstance(app).rewardSelection(this.rewards[id].name);
        if (result) this.rewards[id].value = result;
        this.rewardGettingValue[id] = false;
        m.redraw();
    }
}