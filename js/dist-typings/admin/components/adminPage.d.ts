/// <reference types="mithril" />
import ExtensionPage from "flarum/admin/components/ExtensionPage";
import Stream from "mithril/stream";
export default class adminPage extends ExtensionPage {
    loadingData: boolean;
    autoEmit?: Stream<string>;
    autoEmitObj: Record<string, Record<string, boolean>>;
    oncreate(vnode: any): void;
    content(vnode: any): JSX.Element;
    loadData(): Promise<void>;
    getControls(): JSX.Element[];
    checked(type: string, name: string): boolean;
    checkType(type: string, name: string): boolean;
    toggleRow(name: string): (e: MouseEvent) => void;
    toggleAll(type: string): (e: MouseEvent) => void;
    changeStateCbMaker(type: string, name: string): (e: boolean) => void;
}
