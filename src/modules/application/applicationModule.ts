import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import StarkOSC from "../../starkOSC";
import { AbletonMessage } from "../abletonMessage";
import { OSCModule } from "../module";
import { Version } from "./version";

export class ApplicationModule extends OSCModule {

    constructor(osc: StarkOSC) {
        super(osc);
    }

    private _onStartup = new SimpleEventDispatcher<void>();
    public get onStartup(): ISimpleEvent<void> {
        return this._onStartup.asEvent();
    }

    private _onError = new SimpleEventDispatcher<string>();
    public get onError(): ISimpleEvent<string> {
        return this._onError.asEvent();
    }

    public async test(): Promise<'ok'> {
        const message = await this.osc.sendAndReceive('/live/test');
        return <'ok'>message.args[0];
    }

    public async version(): Promise<Version> {
        const message = await this.osc.sendAndReceive('/live/application/get/version');
        return new Version(
            <number>message.args[0],
            <number>message.args[1]
        );
    }

    subscribe(): void {
        this.osc.client.on('/live/startup', (message: AbletonMessage) => this._onStartup.dispatch());
        this.osc.client.on('/live/error', (message: AbletonMessage) => <string>message.args[0]);
    }
}