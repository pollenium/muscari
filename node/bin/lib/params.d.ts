import { Uu } from 'pollenium-uvaursi';
export declare const applicationId: Uu;
export declare const clientStruct: {
    signalingServerUrls: string[];
    sdpTimeout: number;
    connectionTimeout: number;
    missiveLatencyTolerance?: number;
    bootstrapOffersTimeout: number;
    maxFriendshipsCount: number;
    maxOfferAttemptsCount: number;
    maxOfferLastReceivedAgo: number;
    offerReuploadInterval: number;
};
