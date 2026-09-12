import { Context } from './Context';
declare class WebsiteCarbonError extends Error {
    isWebsiteCarbonError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { WebsiteCarbonError };
