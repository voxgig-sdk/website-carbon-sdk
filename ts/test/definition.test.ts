import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
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
    "query": [
      "bytes",
      "green",
      "legacy"
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
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
