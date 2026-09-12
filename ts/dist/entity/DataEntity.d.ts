import { WebsiteCarbonEntityBase } from '../WebsiteCarbonEntityBase';
import type { WebsiteCarbonSDK } from '../WebsiteCarbonSDK';
import type { Control } from '../types';
import type { Data, DataLoadMatch } from '../WebsiteCarbonTypes';
declare class DataEntity extends WebsiteCarbonEntityBase<Data> {
    constructor(client: WebsiteCarbonSDK, entopts: any);
    make(this: DataEntity): DataEntity;
    load(this: any, reqmatch?: DataLoadMatch, ctrl?: Control): Promise<DataEntity>;
}
export { DataEntity };
