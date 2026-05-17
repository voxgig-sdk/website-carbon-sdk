package voxgigwebsitecarbonsdk

import (
	"github.com/voxgig-sdk/website-carbon-sdk/go/core"
	"github.com/voxgig-sdk/website-carbon-sdk/go/entity"
	"github.com/voxgig-sdk/website-carbon-sdk/go/feature"
	_ "github.com/voxgig-sdk/website-carbon-sdk/go/utility"
)

// Type aliases preserve external API.
type WebsiteCarbonSDK = core.WebsiteCarbonSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type WebsiteCarbonEntity = core.WebsiteCarbonEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type WebsiteCarbonError = core.WebsiteCarbonError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewDataEntityFunc = func(client *core.WebsiteCarbonSDK, entopts map[string]any) core.WebsiteCarbonEntity {
		return entity.NewDataEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewWebsiteCarbonSDK = core.NewWebsiteCarbonSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
