

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { WebsiteCarbonSDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WebsiteCarbonSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Data().load({"byte":"x","green":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WEBSITE_CARBON_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'data.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bytes":{"a":true,"h":"Bytes","n":"bytes","r":true,"sh":"Number of bytes you passed to the endpoint","t":"`$NUMBER`","key$":"bytes","index$":0},"cleanerThan":{"a":true,"h":"Cleaner Than","n":"cleanerThan","r":true,"sh":"A numeric value between 0 and 1 representing the percentage of pages that this result's emissions are lower than.","t":"`$NUMBER`","key$":"cleanerThan","index$":1},"gco2e":{"a":true,"h":"Gco2e","n":"gco2e","r":true,"sh":"The emissions in grams of CO2 equivalent","t":"`$NUMBER`","key$":"gco2e","index$":2},"green":{"a":true,"h":"Green","n":"green","r":true,"sh":"The green hosting flag you passed to the endpoint","t":"`$BOOLEAN`","key$":"green","index$":3},"rating":{"a":true,"h":"Rating","n":"rating","r":true,"sh":"The Digital Carbon Rating","t":"`$STRING`","key$":"rating","index$":4},"statistics":{"a":true,"h":"Statistics","n":"statistics","r":true,"sh":"Statistics object containing detailed calculations.","t":"`$OBJECT`","key$":"statistics","index$":5}},"name":"data","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /data","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":12345678,"k":"query","n":"byte","or":"bytes","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"green","or":"green","r":true,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"legacy","or":"legacy","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/data","q":{"exist":["byte","green"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"data"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"data","name__orig":"data","Name":"Data","name_":"data","name-":"data","NAME":"DATA","index$":0}, {"active":true,"entity":"data","key$":"BasicDataFlow","kind":"basic","name":"BasicDataFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"data_ref01","srcdatavar":"data_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-data_ref01"}}],"index$":0}]}, 'Data', {"GET /data":{"protocol":"http","parameters":[{"name":"bytes","in":"query","description":"The number of bytes transferred by the page on load","required":true,"schema":{"type":"integer","minimum":0,"example":12345678},"index$":0},{"name":"green","in":"query","description":"Whether the site is using environmentally sustainable hosting. Use 1 for green hosting, 0 for non-green hosting","required":true,"schema":{"type":"integer","enum":[0,1],"example":1},"index$":1},{"name":"legacy","in":"query","description":"A flag to attempt to return the statistics object based on an outdated calculation model. Only affects the statistics object. Valid values are 2 (methodology up to 19 April 2022) or 3 (methodology up to July 2024)","required":false,"schema":{"type":"integer","enum":[2,3]},"index$":2}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
