

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { WebsiteCarbonSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('DataEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WEBSITE_CARBON_TEST_LIVE=TRUE.
  afterEach(liveDelay('WEBSITE_CARBON_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WebsiteCarbonSDK.test()
    const ent = testsdk.Data()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WEBSITE_CARBON_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'data.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"adjustedBytes":{"a":true,"h":"Adjusted Bytes","n":"adjustedBytes","r":true,"sh":"The data transfer of the page load adjusted to take returning visitor caching into account.","t":"`$NUMBER`","key$":"adjustedBytes","index$":0},"co2":{"a":true,"h":"Co2","n":"co2","r":true,"sh":"Object containing data relating to CO2 emissions from each page load.","t":"`$OBJECT`","key$":"co2","index$":1},"energy":{"a":true,"h":"Energy","n":"energy","r":true,"sh":"The approximate amount of energy required for each page load in kWh","t":"`$NUMBER`","key$":"energy","index$":2}},"name":"data","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /data","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":12345678,"k":"query","n":"byte","or":"byte","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"green","or":"green","r":true,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"legacy","or":"legacy","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/data","q":{"exist":["byte","green","legacy"]},"r":{},"s":[{"lit":"data"}],"t":{"req":"`reqdata`","res":"`body.statistics`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"data","name__orig":"data","Name":"Data","name_":"data","name-":"data","NAME":"DATA","index$":0}, {"active":true,"entity":"data","key$":"BasicDataFlow","kind":"basic","name":"BasicDataFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"data_ref01","srcdatavar":"data_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-data_ref01"}}],"index$":0}]}, 'Data', {"GET /data":{"protocol":"http","operationId":"calculateEmissions","responses":{"200":{"description":"Successful response with carbon emissions calculation","content":{"application/json":{"schema":{"type":"object","required":["bytes","green","gco2e","rating","statistics","cleanerThan"],"properties":{"bytes":{"description":"Number of bytes you passed to the endpoint","key$":"bytes","type":"number"},"green":{"description":"The green hosting flag you passed to the endpoint","key$":"green","type":"boolean"},"gco2e":{"description":"The emissions in grams of CO2 equivalent","key$":"gco2e","type":"number"},"rating":{"description":"The Digital Carbon Rating","enum":["A+","A","B","C","D","E","F"],"key$":"rating","type":"string"},"statistics":{"description":"Statistics object containing detailed calculations. Note that the values in this object are mainly useful for considering different aspects of the emissions; the top level gco2e value is the most concise figure","key$":"statistics","properties":{"adjustedBytes":{"description":"The data transfer of the page load adjusted to take returning visitor caching into account. Note that all calculated emissions (gCO2e values) have factored in returning visitor caching","type":"number","key$":"adjustedBytes"},"co2":{"description":"Object containing data relating to CO2 emissions from each page load. Provides both renewable and grid scenarios for reference. The top level emissions have been calculated based on the green hosting status","properties":{"grid":{"description":"CO2 emissions if energy is from the national grid","properties":{"grams":{"description":"The approximate CO2 emissions from the page load in grams","type":"number"},"litres":{"description":"The CO2 in grams converted to litres","type":"number"}},"required":["grams","litres"],"type":"object","x-ref":"#/components/schemas/CO2Emissions"},"renewable":{"description":"CO2 emissions if energy is renewable","properties":{"grams":{"description":"The approximate CO2 emissions from the page load in grams","type":"number"},"litres":{"description":"The CO2 in grams converted to litres","type":"number"}},"required":["grams","litres"],"type":"object","x-ref":"#/components/schemas/CO2Emissions"}},"required":["grid","renewable"],"type":"object","x-ref":"#/components/schemas/CO2Data","key$":"co2"},"energy":{"description":"The approximate amount of energy required for each page load in kWh","type":"number","key$":"energy"}},"required":["adjustedBytes","energy","co2"],"type":"object","x-ref":"#/components/schemas/Statistics","index$":0},"cleanerThan":{"description":"A numeric value between 0 and 1 representing the percentage of pages that this result's emissions are lower than. This is in comparison to average transfer size of pages from HTTP Archive","key$":"cleanerThan","maximum":1,"minimum":0,"type":"number"}},"x-ref":"#/components/schemas/EmissionsResponse"},"example":{"bytes":12345678,"green":true,"gco2e":1.0506427318758333,"rating":"F","statistics":{"adjustedBytes":9320986.89,"energy":0.0026042536525055764,"co2":{"grid":{"grams":1.2865013043377547,"litres":0.7155520254726591},"renewable":{"grams":1.0506427318758333,"litres":0.5843674874693384}}},"cleanerThan":0.07}}}},"400":{"description":"Bad request - missing or invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"bytes","in":"query","description":"The number of bytes transferred by the page on load","required":true,"schema":{"type":"integer","minimum":0,"example":12345678},"index$":0},{"name":"green","in":"query","description":"Whether the site is using environmentally sustainable hosting. Use 1 for green hosting, 0 for non-green hosting","required":true,"schema":{"type":"integer","enum":[0,1],"example":1},"index$":1},{"name":"legacy","in":"query","description":"A flag to attempt to return the statistics object based on an outdated calculation model. Only affects the statistics object. Valid values are 2 (methodology up to 19 April 2022) or 3 (methodology up to July 2024)","required":false,"schema":{"type":"integer","enum":[2,3]},"index$":2}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let data_ref01_data = Object.values(setup.data.existing.data)[0] as any

    // LOAD
    const data_ref01_ent = client.Data()
    const data_ref01_match_dt0: any = {}
    const data_ref01_data_dt0 = (await data_ref01_ent.load(data_ref01_match_dt0)).data()
    assert(null != data_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/data/DataTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = WebsiteCarbonSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['data01','data02','data03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WEBSITE_CARBON_TEST_DATA_ENTID': idmap,
    'WEBSITE_CARBON_TEST_LIVE': 'FALSE',
    'WEBSITE_CARBON_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WEBSITE_CARBON_TEST_DATA_ENTID']

  const live = 'TRUE' === env.WEBSITE_CARBON_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WEBSITE_CARBON_TEST_DATA_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new WebsiteCarbonSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.WEBSITE_CARBON_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
