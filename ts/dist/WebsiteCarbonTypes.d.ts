export interface Data {
    bytes: number;
    cleanerThan: number;
    gco2e: number;
    green: boolean;
    rating: string;
    statistics: Record<string, any>;
}
export interface DataLoadMatch {
    byte: number;
    green: number;
    legacy?: number;
}
