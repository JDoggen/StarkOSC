export interface AbletonMessage {
    address: string;
    args: (number | string | Blob | true | false)[];
    offset: number;
    types: string;
}