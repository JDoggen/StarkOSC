import StarkOSC from "../../starkOSC";
import { OSCModule } from "../module";

export class ClipModule extends OSCModule {

    constructor(osc: StarkOSC) {
        super(osc);
    }

    /**
     * Start session playback
     */
    public startPlaying(): void {
        this.osc.send('/live/song/start_playing');
    }

    /**
     * Resume session playback
     */
    public continuePlaying(): void{
        this.osc.send('/live/song/continue_playing');
    }

    /**
     * Stop Playing
     */
    public stopPlaying(): void {
        this.osc.send('/live/song/stop_playing');
    }

    /**
     * Mimics a tap of the 'Tap Tempo' button
     */
    public tapTempo(): void {
        this.osc.send('/live/song/tap_tempo');
    }

    /**
     * Create a new audio track at the specified index, defaults end of the list
     * @param index 
     */
    public createAudioTrack(index: number = -1): void {
        this.osc.send('/live/song/create_audio_track', index);
    }

    /**
     * Create a new MIDI track at the specified index, defaults end of the list
     * @param index 
     */
    public createMidiTrack(index: number = -1): void {
        this.osc.send('/live/song/create_midi_track', index);
    }

    /**
     * Create a new return track
     */
    public createReturnTrack(): void {
        this.osc.send('/live/song/create_return_track');
    }

    /**
     * Create a new scene at the specified index
     * @param index 
     */
    public createScene(index: number = -1): void {
        this.osc.send('/live/song/create_scene', index);
    }

    /**
     * Jump to a specific cue point
     * @param point numeric index or name
     */
    public jumpToCuePoint(point: number | string): void {
        this.osc.send('/live/song/cue_point/jump', point);
    }

    /**
     * Delete a scene
     * @param index numeric index of scene
     */
    public deleteScene(index: number): void {
        this.osc.send('/live/song/delete_scene', index);
    }

    /**
     * Delete a return track
     * @param index numeric index of track
     */
    public deleteReturnTrack(index: number): void {
        this.osc.send('/live/song/delete_return_track', index);
    }

    /**
     * Delete a track
     * @param index numeric index of track
     */
    public deleteTrack(index: number): void {
        this.osc.send('/live/song/delete_track', index);
    }

    /**
     * Duplicate a scene
     * @param index numeric index of scene
     */
    public dupliateScene(index: number): void {
        this.osc.send('/live/song/duplice_scene', index);
    }

    /**
     * Duplicate a track
     * @param index numeric index of track
     */
    public duplicateTrack(index: number): void {
        this.osc.send('/live/song/duplicate_track', index);
    }

    /**
     * Jump song position by specified time
     * @param beats Amount of beats to skip
     */
    public jumpBy(beats: number): void {
        this.osc.send('/live/song/jump_by', beats);
    }

    /**
     * Jump to next cue marker
     */
    public jumpToNextCue(): void {
        this.osc.send('/live/song/jump_to_next_cue');
    }

    /**
     * Jump to previous cue marker
     */
    public jumpToPrevCue(): void {
        this.osc.send('/live/song/jump_to_prev_cue');
    }

    /**
     * Undo the last operation
     */
    public undo(): void {
        this.osc.send('/live/song/undo');
    }

    /**
     * Redo the last operation
     */
    public redo(): void {
        this.osc.send('/live/song/redo');
    }

    /**
     * Query a property
     * @param property Property name
     */
    public async get(property: 'arrangement_overdub' | 'back_to_arranger' | 'can_redo' | 'can_undo' | 'is_playing' | 'loop' | 'metronome'  ): Promise<boolean>
    public async get(property: 'clip_trigger_quantization' | 'current_song_time' | 'groove_amount' | 'loop_length' | 'loop_start' | 'midi_recording_quantization' | 'nudge_down' | 'nudge_up' | 'punch_in' | 'punch_out' | 'record_mode' | 'signature_denominator' | 'signature_numerator' | 'tempo'): Promise<number> 
    public async get(property: string): Promise<boolean | number | string> {
        const message = await this.osc.sendAndReceive(`/live/song/get/${property}`);
        return <boolean | number | string>message.args[0];
    }

    /**
     * Set a property
     * @param property property name 
     * @param value property value
     */
    public set(property: 'arrangement_overdub' | 'back_to_arranger' | 'loop' | 'metronome', value: boolean): void;
    public set(property: 'clip_trigger_quantization' | 'current_song_time' | 'groove_amount' | 'loop_length' | 'loop_start'| 'midi_recording_quantization' | 'nudge_down' | 'nudge_up' | 'punch_in' | 'punch_out' | 'record_mode' | 'signature_denominator' | 'signature_numerator' | 'record_mode' | 'tempo', value: number): void;
    public set(property: string, value: boolean | number): void {
        this.osc.send(`/live/song/set/${property}`, value);
    }

    subscribe(): void {
        
    }
}