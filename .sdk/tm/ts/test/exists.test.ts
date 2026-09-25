
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WebsiteCarbonSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = WebsiteCarbonSDK.test()
    equal(testsdk instanceof WebsiteCarbonSDK, true,
      'WebsiteCarbonSDK.test() must return a client synchronously')
  })

})
