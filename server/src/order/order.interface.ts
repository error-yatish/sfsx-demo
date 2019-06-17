import { Document } from 'mongoose';

export interface Order extends Document {
    readonly trader: string;
    readonly ticker: string;
    readonly side: string;
    readonly price: number;
    readonly shares: number;
    readonly timestamp: number;
    readonly isExecuted: boolean;
}
