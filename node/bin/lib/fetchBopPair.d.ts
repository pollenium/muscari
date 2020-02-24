import { Address } from 'pollenium-buttercup';
export interface BopPair {
    agree: Address;
    disagree: Address;
}
export declare function fetchBopPair(overseerSlug: string): Promise<BopPair>;
