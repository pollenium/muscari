import { Address } from 'pollenium-buttercup';
import { Uish } from 'pollenium-uvaursi';
export interface BopPair {
    agree: Address;
    disagree: Address;
}
export declare function fetchBopPair(overseerUish: Uish): Promise<BopPair>;
