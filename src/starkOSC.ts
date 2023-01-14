import osc from 'osc-js';
import { delay } from './methods/delay';
import { AbletonMessage } from './modules/abletonMessage';
import { ApplicationModule } from './modules/application/applicationModule';
import { ClipModule } from './modules/clip/clipModule';
import { ClipSlotModule } from './modules/clipslot/clipSlotModule';
import { DeviceModule } from './modules/device/deviceModule';
import { SongModule } from './modules/song/songModule';
import { TrackModule } from './modules/track/trackModule';

export default class StarkOSC {
    
    private _client?: osc;
    private messageTimeout!: number;

    // #region Modules
    private _applicationModule?: ApplicationModule;
    private _clip?: ClipModule;
    private _clipSlot?: ClipSlotModule;
    private _device?: DeviceModule;
    private _songModule?: SongModule;
    private _track?: TrackModule;

    public get application(): ApplicationModule {
        return this._applicationModule!;
    }

    public get clip(): ClipModule {
        return this._clip!;
    }

    public get clipSlot(): ClipSlotModule {
        return this._clipSlot!;
    }

    public get device(): DeviceModule {
        return this._device!;
    }

    public get song(): SongModule {
        return this._songModule!;
    }

    public get track(): TrackModule {
        return this._track!;
    }
    // #endregion

    public async init(options?: {
        discardLateMessages?: boolean;
        plugin?: osc.Plugin;
        messageTimeout: number
    }): Promise<void> {
        this.messageTimeout = this.messageTimeout ?? 30_000;
        console.info('Setting up websocket...');
        this._client = new osc(options);
        this.client.open();
        this.initModules();
        do {
            await delay(1000);
            console.info('Connecting...');
        } while(this.client.status() === osc.STATUS.IS_CONNECTING)
        console.info('Connected!');
    }

    public get client(): osc {
        if(!this._client) throw new Error('Client is not configured. Run init first.');
        return this._client;
    }

    public send(path: string | string[], ...args: (number | string | Blob | true | false | null)[]): void {
        const message = new osc.Message(path, ...args)
        this.client.send(message);
    }

    public sendAndReceive(path: string, ...args: (number | string | Blob | true | false | null)[]): Promise<AbletonMessage> {
        return new Promise((resolve, reject) => {
            const cb = (message: AbletonMessage) => {
                resolve(message);
                this.client.off(path, subscription);
            }
            const subscription = this.client.on(path, cb);
            this.send(path, ...args);
            setTimeout(() => reject(`Message timeout reached. Query path: ${path}`), this.messageTimeout);
        });
    }

    private initModules(): void {
        this._applicationModule = new ApplicationModule(this);
        this._clip = new ClipModule(this);
        this._clipSlot = new ClipSlotModule(this);
        this._songModule= new SongModule(this);
        this._track = new TrackModule(this);
    }
    
    

}