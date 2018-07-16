<?php

namespace App\Service\Selenium;

use Facebook\WebDriver\Cookie;
use Psr\Log\LoggerInterface;

class SeleniumScreenShotService
{
    private $logger;
    private $webDriver;
    private $cookies;

    public function __construct(LoggerInterface $logger, SeleniumWebDriver $webDriver)
    {
        $this->logger = $logger;
        $this->webDriver = $webDriver;
    }

    public function setCookies(array $cookies)
    {
        $this->cookies = $cookies;
    }

    public function getPageScreenShot(string $url): ?string
    {
        $driver = $this->webDriver->setup();

        $driver->get($url);

        if (!empty($this->cookies)) {
            /** @var Cookie $cookie */
            foreach ($this->cookies as $cookie) {
                $driver->manage()->addCookie($cookie->toArray());
            }

            $driver->get($url);
        }

//        $height = $driver->manage()->window()->getSize()->getHeight();
//        $width = $driver->manage()->window()->getSize()->getWidth();
//        $driver->manage()->window()->setSize(new WebDriverDimension($width, $height));

        return $driver->takeScreenshot();
    }
}
