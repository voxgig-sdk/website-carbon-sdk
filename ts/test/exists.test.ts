
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WebsiteCarbonSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await WebsiteCarbonSDK.test()
    equal(null !== testsdk, true)
  })

})
