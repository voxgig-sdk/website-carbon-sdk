
import { Context } from './Context'


class WebsiteCarbonError extends Error {

  isWebsiteCarbonError = true

  sdk = 'WebsiteCarbon'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  WebsiteCarbonError
}

