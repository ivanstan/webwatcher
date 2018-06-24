<?php

namespace App\Service\Factory;

use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriver;

class WebDriverFactory
{
    private $seleniumHubUrl;

    public function __construct(string $seleniumHubUrl)
    {
        $this->seleniumHubUrl = $seleniumHubUrl;
    }

    public function create(): WebDriver
    {
        return RemoteWebDriver::create($this->seleniumHubUrl, DesiredCapabilities::chrome());
    }
}
