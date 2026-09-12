export interface Data {
    adjustedBytes: number;
    co2: Record<string, any>;
    energy: number;
}
export interface DataLoadMatch {
    byte: number;
    green: number;
    legacy?: number;
}
