<?php
declare(strict_types=1);

// WebsiteCarbon SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

WebsiteCarbonUtility::setRegistrar(function (WebsiteCarbonUtility $u): void {
    $u->clean = [WebsiteCarbonClean::class, 'call'];
    $u->done = [WebsiteCarbonDone::class, 'call'];
    $u->make_error = [WebsiteCarbonMakeError::class, 'call'];
    $u->feature_add = [WebsiteCarbonFeatureAdd::class, 'call'];
    $u->feature_hook = [WebsiteCarbonFeatureHook::class, 'call'];
    $u->feature_init = [WebsiteCarbonFeatureInit::class, 'call'];
    $u->fetcher = [WebsiteCarbonFetcher::class, 'call'];
    $u->make_fetch_def = [WebsiteCarbonMakeFetchDef::class, 'call'];
    $u->make_context = [WebsiteCarbonMakeContext::class, 'call'];
    $u->make_options = [WebsiteCarbonMakeOptions::class, 'call'];
    $u->make_request = [WebsiteCarbonMakeRequest::class, 'call'];
    $u->make_response = [WebsiteCarbonMakeResponse::class, 'call'];
    $u->make_result = [WebsiteCarbonMakeResult::class, 'call'];
    $u->make_point = [WebsiteCarbonMakePoint::class, 'call'];
    $u->make_spec = [WebsiteCarbonMakeSpec::class, 'call'];
    $u->make_url = [WebsiteCarbonMakeUrl::class, 'call'];
    $u->param = [WebsiteCarbonParam::class, 'call'];
    $u->prepare_auth = [WebsiteCarbonPrepareAuth::class, 'call'];
    $u->prepare_body = [WebsiteCarbonPrepareBody::class, 'call'];
    $u->prepare_headers = [WebsiteCarbonPrepareHeaders::class, 'call'];
    $u->prepare_method = [WebsiteCarbonPrepareMethod::class, 'call'];
    $u->prepare_params = [WebsiteCarbonPrepareParams::class, 'call'];
    $u->prepare_path = [WebsiteCarbonPreparePath::class, 'call'];
    $u->prepare_query = [WebsiteCarbonPrepareQuery::class, 'call'];
    $u->result_basic = [WebsiteCarbonResultBasic::class, 'call'];
    $u->result_body = [WebsiteCarbonResultBody::class, 'call'];
    $u->result_headers = [WebsiteCarbonResultHeaders::class, 'call'];
    $u->transform_request = [WebsiteCarbonTransformRequest::class, 'call'];
    $u->transform_response = [WebsiteCarbonTransformResponse::class, 'call'];
});
