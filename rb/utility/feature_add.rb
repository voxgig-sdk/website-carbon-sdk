# WebsiteCarbon SDK utility: feature_add
module WebsiteCarbonUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
