<?php
declare(strict_types=1);

// WebsiteCarbon SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class WebsiteCarbonFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new WebsiteCarbonBaseFeature();
            case "test":
                return new WebsiteCarbonTestFeature();
            default:
                return new WebsiteCarbonBaseFeature();
        }
    }
}
