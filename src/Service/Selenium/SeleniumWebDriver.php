<?php

namespace App\Service\Selenium;

use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriver;

class SeleniumWebDriver
{
    private $seleniumHubUrl;

    /** @var WebDriver */
    private $driver;

    public function __construct(string $seleniumHubUrl)
    {
        $this->seleniumHubUrl = $seleniumHubUrl;
    }

    public function getInstance(): WebDriver
    {
        if ($this->driver === null) {
            $this->driver = RemoteWebDriver::create($this->seleniumHubUrl, DesiredCapabilities::chrome());
        }

        return $this->driver;
    }

    public function __destruct()
    {
        $this->driver->quit();
        unset($this->driver);
    }
}
