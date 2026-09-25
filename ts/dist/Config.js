"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'WebsiteCarbon',
        slug: "website-carbon",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.websitecarbon.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            data: {},
        }
    };
    entity = {
        "data": {
            "fields": [
                {
                    "name": "adjustedBytes",
                    "title": "Adjusted Bytes",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "The data transfer of the page load adjusted to take returning visitor caching into account."
                },
                {
                    "name": "co2",
                    "title": "Co2",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "Object containing data relating to CO2 emissions from each page load."
                },
                {
                    "name": "energy",
                    "title": "Energy",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "The approximate amount of energy required for each page load in kWh"
                }
            ],
            "name": "data",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/data",
                            "segments": [
                                {
                                    "lit": "data"
                                }
                            ],
                            "parts": [
                                "data"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.statistics`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "byte",
                                        "orig": "byte",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": 12345678
                                    },
                                    {
                                        "name": "green",
                                        "orig": "green",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": 1
                                    },
                                    {
                                        "name": "legacy",
                                        "orig": "legacy",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "byte",
                                    "green",
                                    "legacy"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map