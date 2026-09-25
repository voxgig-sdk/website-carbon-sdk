
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'WebsiteCarbon',
        slug: "website-carbon",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
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
 retry:     {
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
 test:     {
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
 timeout:     {
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

  }


  options = {
    base: "https://api.websitecarbon.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        data: {
        },
  
    }
  }


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
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

