import ExtensionPage from "flarum/admin/components/ExtensionPage";
import app from 'flarum/admin/app';
import Button from "flarum/common/components/Button";
import { showIf } from "../../common/utils/NodeUtil";
import LoadingIndicator from "flarum/common/components/LoadingIndicator";
import HumanizeUtils from "../../common/utils/HumanizeUtils";
import Checkbox from "flarum/common/components/Checkbox";
import LinkButton from "flarum/common/components/LinkButton";
import Tooltip from "flarum/common/components/Tooltip";
import Stream from "mithril/stream";
import type Tag from "@flarum-tags/common/models/Tag";

export default class adminPage extends ExtensionPage {
    loadingData: boolean = false;
    autoEmit?: Stream<string>
    autoEmitObj: Record<string, Record<string, boolean>> = {};
    invalidTags?: Stream<string>;
    invalidTagsObj: Record<string, boolean> = {};
    oncreate(vnode: any): void {
        this.autoEmit = this.setting('xypp.collector.emit_control', "{}");
        this.autoEmitObj = JSON.parse(this.autoEmit!());
        this.invalidTags = this.setting('xypp.collector.invalid_tags', "{}");
        this.invalidTagsObj = JSON.parse(this.invalidTags!());
        super.oncreate(vnode);
        this.loadData();
    }
    content(vnode: any) {
        return <div className="xypp-collector-adminPage-container container">

            <div className="Form-group">
                <h2>{app.translator.trans('xypp-collector.admin.emit_control.title')}</h2>
                <table className="Table">
                    <thead>
                        <tr>
                            <th>{app.translator.trans('xypp-collector.admin.emit_control.name')}</th>
                            <th>
                                <LinkButton onclick={this.toggleAll("event")}>
                                    {app.translator.trans('xypp-collector.admin.emit_control.event')}
                                </LinkButton>
                            </th>
                            <th>
                                <LinkButton onclick={this.toggleAll("update")}>
                                    {app.translator.trans('xypp-collector.admin.emit_control.update')}
                                </LinkButton>
                            </th>
                            <th>
                                <LinkButton onclick={this.toggleAll("manual")}>
                                    {app.translator.trans('xypp-collector.admin.emit_control.manual')}
                                </LinkButton>
                            </th>
                            <th>
                                <LinkButton onclick={this.toggleAll("abs")}>
                                    {app.translator.trans('xypp-collector.admin.emit_control.abs')}
                                </LinkButton>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getControls()}
                    </tbody>
                </table>
            </div>
            {showIf(this.loadingData, <LoadingIndicator />)}
            {this.submitButton()}
            <div className="Form-group valid-tags">
                <h3>{app.translator.trans("xypp-collector.admin.valid_tag")}</h3>
                <div className="xypp-collector-valid-tags-check">
                    {this.getValidTags()}
                </div>
            </div>
            {
                this.buildSettingComponent({
                    setting: "xypp.collector.max_keep",
                    label: app.translator.trans('xypp-collector.admin.max_keep'),
                    type: "number",
                    min: 1
                })
            }
            {this.submitButton()}
        </div >
    }

    async loadData() {
        this.loadingData = true;
        m.redraw();
        await HumanizeUtils.getInstance(app).loadDefinition();
        this.loadingData = false;
        m.redraw();
    }

    getControls() {
        if (this.loadingData) return [];
        const conditions = HumanizeUtils.getInstance(app).getAllConditions().toObject();
        return Object.keys(conditions).map(key => <tr className="emit-control-row">
            <td className="emit-control-label">
                <LinkButton onclick={this.toggleRow(key)}>
                    {conditions[key].content}
                </LinkButton>
            </td>
            <td className="emit-control-event">
                <Checkbox onchange={this.changeStateCbMaker("event", key)}
                    state={this.checked("event", key)}
                    disabled={!this.checkType("event", key)}
                />
            </td>
            <td className="emit-control-update">
                <Checkbox onchange={this.changeStateCbMaker("update", key)}
                    state={this.checked("update", key)}
                    disabled={!this.checkType("update", key)}
                />
            </td>
            <td className="emit-control-manual">
                <Checkbox onchange={this.changeStateCbMaker("manual", key)}
                    state={this.checked("manual", key)}
                    disabled={!this.checkType("manual", key)}
                />
            </td>
            <td className="emit-control-abs">
                <Checkbox onchange={this.changeStateCbMaker("abs", key)}
                    state={this.checked("abs", key)}
                />
                {showIf(this.checkType("abs", key), "",
                    <span>
                        <Tooltip text={app.translator.trans("xypp-collector.admin.limited_accumulation_support")}>
                            <i class="fas fa-exclamation-triangle"></i>
                        </Tooltip>
                    </span>
                )}
            </td>
        </tr>
        );
    }
    checked(type: string, name: string): boolean {
        if (!this.checkType(type, name) && type != "abs") return false;
        if (!this.autoEmitObj[type]) return true;
        return this.autoEmitObj[type][name] !== true;
    }
    checkType(type: string, name: string): boolean {
        const def = HumanizeUtils.getInstance(app).getRawConditionDefinition(name);
        if (type === "event") return !(def && def.manual);
        if (type === "update") return def && def.update;
        if (type === "manual") return def && def.manual;
        if (type === "abs") return def && def.abs;
        return false
    }
    toggleRow(name: string) {
        return ((e: MouseEvent) => {
            e.preventDefault();
            const types = ["event", "update", "manual"].filter(type => this.checkType(type, name));

            const target = types.find(type => {
                return this.autoEmitObj[type] && this.autoEmitObj[type][name]
            }) === undefined;

            types.forEach(type => {
                if (target) this.autoEmitObj[type][name] = true;
                else if (this.autoEmitObj[type][name]) delete this.autoEmitObj[type][name];
            });
        }).bind(this);
    }
    toggleAll(type: string) {
        return ((e: MouseEvent) => {
            e.preventDefault();
            const all = Object.keys(HumanizeUtils.getInstance(app).getAllConditions().toObject()).filter(key => this.checkType(type, key));
            if (!this.autoEmitObj[type]) this.autoEmitObj[type] = {};
            let target = true;
            if (Object.keys(this.autoEmitObj[type]).length == 0) target = false;
            all.forEach(key => {
                if (target) this.autoEmitObj[type][key] = true;
                else if (this.autoEmitObj[type][key]) delete this.autoEmitObj[type][key];
            });
            this.autoEmit!(JSON.stringify(this.autoEmit));
        }).bind(this)
    }
    changeStateCbMaker(type: string, name: string) {
        return ((e: boolean) => {
            if (!this.autoEmitObj[type]) this.autoEmitObj[type] = {};
            if (!e) this.autoEmitObj[type][name] = true;
            else if (this.autoEmitObj[type][name]) delete this.autoEmitObj[type][name];
            this.autoEmit!(JSON.stringify(this.autoEmitObj));
        }).bind(this);
    }

    getValidTags() {
        return app.store.all<Tag>("tags").map(tag => {
            return <Checkbox onchange={this.changeValidTagsStateCbMaker(tag)} state={!this.invalidTagsObj[tag.id() || 0]}>
                {tag.name()}
            </Checkbox>
        })
    }

    changeValidTagsStateCbMaker(tag: Tag) {
        return ((e: boolean) => {
            if (!e) this.invalidTagsObj[tag.id() || 0] = true;
            else if (this.invalidTagsObj[tag.id() || 0]) delete this.invalidTagsObj[tag.id() || 0];
            this.invalidTags!(JSON.stringify(this.invalidTagsObj));
        }).bind(this);
    }
}