<?php

namespace App\Service\Selenium;

use App\Service\BrowserMob\BrowserMobApi;
use App\Service\BrowserMob\Proxy;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\Remote\WebDriverBrowserType;
use Facebook\WebDriver\Remote\WebDriverCapabilityType;
use Facebook\WebDriver\WebDriverPlatform;

class Engine
{
    private $seleniumHubUrl;

    /** @var RemoteWebDriver */
    private $driver;
    /** @var BrowserMobApi */
    private $browserMob;
    /** @var Proxy */
    private $proxy;

    public function __construct(string $seleniumHubUrl, BrowserMobApi $browserMob)
    {
        $this->seleniumHubUrl = $seleniumHubUrl;
        $this->browserMob = $browserMob;
    }

    public function getDriver(): RemoteWebDriver
    {
        if ($this->driver) {
            return $this->driver;
        }

        $this->proxy = $this->browserMob->get();

        $capabilities = $this->getDefaultCapabilities();
        if ($this->proxy) {
            $capabilities[WebDriverCapabilityType::PROXY] = [
                'proxyType' => 'manual',
                'httpProxy' => $this->proxy->getUrl(),
                'sslProxy' => $this->proxy->getUrl(),
            ];
        }

        $this->driver = RemoteWebDriver::create($this->seleniumHubUrl, $capabilities);

        return $this->driver;
    }

    public function getProxy(): Proxy
    {
        return $this->proxy;
    }

    public function getSeleniumUrl(): string
    {
        return $this->seleniumHubUrl;
    }

    public function getDefaultCapabilities(): array
    {
        return [
            WebDriverCapabilityType::BROWSER_NAME => WebDriverBrowserType::CHROME,
            WebDriverCapabilityType::PLATFORM => WebDriverPlatform::ANY,
        ];
    }

    public function __destruct()
    {
        $this->driver->quit();
        unset($this->driver);
    }
}
