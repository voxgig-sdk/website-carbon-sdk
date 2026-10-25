# WebsiteCarbon SDK utility: prepare_body
require_relative 'media'
module WebsiteCarbonUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return WebsiteCarbonUtilities.raw_body(ctx.reqdata) if WebsiteCarbonUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
