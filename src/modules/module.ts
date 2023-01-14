import StarkOSC from "../starkOSC";

export abstract class OSCModule {

    constructor(protected osc: StarkOSC) {
        this.subscribe();
    }

    abstract subscribe(): void;
    
}