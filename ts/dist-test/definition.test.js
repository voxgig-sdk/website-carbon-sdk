"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "data",
        "accessor": "Data",
        "op": "load",
        "method": "GET",
        "path": "/data",
        "args": [],
        "select": {
            "byte": "v1",
            "green": 1,
            "legacy": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "bytes",
            "green",
            "legacy"
        ],
        "queryArgs": [
            {
                "name": "byte",
                "wire": "bytes"
            },
            {
                "name": "green",
                "wire": "green"
            },
            {
                "name": "legacy",
                "wire": "legacy"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "bytes": 12345678,
            "green": true,
            "gco2e": 1.0506427318758333,
            "rating": "F",
            "statistics": {
                "adjustedBytes": 9320986.89,
                "energy": 0.0026042536525055764,
                "co2": {
                    "grid": {
                        "grams": 1.2865013043377547,
                        "litres": 0.7155520254726591
                    },
                    "renewable": {
                        "grams": 1.0506427318758333,
                        "litres": 0.5843674874693384
                    }
                }
            },
            "cleanerThan": 0.07
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map