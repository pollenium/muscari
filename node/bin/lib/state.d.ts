import { Uint256, Address } from 'pollenium-buttercup';
export interface State {
    maker: Address;
    engineBalance: Uint256;
    nativeBalance: Uint256;
    allowance: Uint256;
}
export declare function fetchState(): Promise<State>;
export declare function logState(): Promise<void>;
