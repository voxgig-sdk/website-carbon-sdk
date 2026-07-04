
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://api.websitecarbon.com',

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
          "active": true,
          "name": "byte",
          "req": true,
          "type": "`$NUMBER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "cleaner_than",
          "req": true,
          "type": "`$NUMBER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "gco2e",
          "req": true,
          "type": "`$NUMBER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "green",
          "req": true,
          "type": "`$BOOLEAN`",
          "index$": 3
        },
        {
          "active": true,
          "name": "rating",
          "req": true,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "statistic",
          "req": true,
          "type": "`$OBJECT`",
          "index$": 5
        }
      ],
      "name": "data",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": 12345678,
                    "kind": "query",
                    "name": "byte",
                    "orig": "byte",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": 1,
                    "kind": "query",
                    "name": "green",
                    "orig": "green",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "legacy",
                    "orig": "legacy",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
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
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
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

