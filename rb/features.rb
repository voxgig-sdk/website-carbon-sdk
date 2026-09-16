# WebsiteCarbon SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module WebsiteCarbonFeatures
  def self.make_feature(name)
    case name
    when "base"
      WebsiteCarbonBaseFeature.new
    when "ratelimit"
      WebsiteCarbonRatelimitFeature.new
    when "retry"
      WebsiteCarbonRetryFeature.new
    when "test"
      WebsiteCarbonTestFeature.new
    when "timeout"
      WebsiteCarbonTimeoutFeature.new
    else
      WebsiteCarbonBaseFeature.new
    end
  end
end
