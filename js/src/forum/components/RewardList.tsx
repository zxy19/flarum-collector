import app from 'flarum/forum/app';
import Component from "flarum/common/Component";
import { RewardData } from "../../common/types/data";
import HumanizeUtils from '../../common/utils/HumanizeUtils';

export default class RewardList extends Component<{
    rewards: RewardData[]
}> {
    view(vnode: any) {
        const humanize = HumanizeUtils.getInstance(app);
        return <div className='quest-item-reward'>
            <div className='quest-item-reward-title'><i class="fas fa-gift"></i>{" "}{app.translator.trans("xypp-forum-quests.forum.reward.reward")}</div>
            {humanize.humanizeReward(this.attrs.rewards).map((e: any) => <div>{e}</div>)}
        </div>
    }
}