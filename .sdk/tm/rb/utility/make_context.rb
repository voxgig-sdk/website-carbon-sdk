# WebsiteCarbon SDK utility: make_context
require_relative '../core/context'
module WebsiteCarbonUtilities
  MakeContext = ->(ctxmap, basectx) {
    WebsiteCarbonContext.new(ctxmap, basectx)
  }
end
