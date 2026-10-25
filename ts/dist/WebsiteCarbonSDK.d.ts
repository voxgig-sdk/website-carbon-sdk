import { DataEntity } from './entity/DataEntity';
export type * from './WebsiteCarbonTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { WebsiteCarbonEntityBase } from './WebsiteCarbonEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class WebsiteCarbonSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Data(entopts?: Record<string, any>): DataEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): WebsiteCarbonSDK;
    tester(testopts?: any, sdkopts?: any): WebsiteCarbonSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof WebsiteCarbonSDK;
export { stdutil, config, BaseFeature, WebsiteCarbonEntityBase, WebsiteCarbonSDK, SDK, };
export type { DirectResult };
