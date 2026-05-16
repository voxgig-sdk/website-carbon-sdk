# WebsiteCarbon SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module WebsiteCarbonFeatures
  def self.make_feature(name)
    case name
    when "base"
      WebsiteCarbonBaseFeature.new
    when "test"
      WebsiteCarbonTestFeature.new
    else
      WebsiteCarbonBaseFeature.new
    end
  end
end
