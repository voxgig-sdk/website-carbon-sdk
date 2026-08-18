
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'WebsiteCarbon',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "co2",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "energy",
          "req": true,
          "type": "`$NUMBER`"
        }
      ],
      "name": "data",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 12345678,
                    "kind": "query",
                    "name": "byte",
                    "orig": "byte",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "green",
                    "orig": "green",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "legacy",
                    "orig": "legacy",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/data",
              "parts": [
                "data"
              ],
              "select": {
                "exist": [
                  "byte",
                  "green",
                  "legacy"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.statistics`"
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
  config
}

