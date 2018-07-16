<?php

namespace App\Service\Selenium;

use Facebook\WebDriver\Cookie;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverDimension;
use Symfony\Component\Templating\EngineInterface;

class WebScreenshotService
{
    private $cookies;

    /** @var RemoteWebDriver */
    private $driver;
    /** @var EngineInterface */
    private $template;

    public function __construct(SeleniumWebDriver $webDriver, EngineInterface $template)
    {
        $this->driver = $webDriver->setup();
        $this->template = $template;
    }

    public function setCookies(array $cookies)
    {
        $this->cookies = $cookies;
    }

    public function getPageScreenShot(string $url): ?string
    {
        $this->setupCookies($url);

        $this->driver->get($url);

        $this->setWindowDimensions();

        return $this->driver->takeScreenshot();
    }


    private function setupCookies(string $url): void
    {
        if (!empty($this->cookies)) {
            /** @var Cookie $cookie */
            foreach ($this->cookies as $cookie) {
                $this->driver->manage()->addCookie($cookie->toArray());
            }

            $this->driver->get($url);
        }
    }

    private function setWindowDimensions(): void
    {
        $documentDimensions = $this->getDocumentDimensions();
        $windowDimensions = $this->driver->manage()->window()->getSize();

        if (isset($documentDimensions['height']) && $documentDimensions['height'] > $windowDimensions->getHeight()) {
            $this->driver->manage()->window()->setSize(
                new WebDriverDimension($windowDimensions->getWidth(), $documentDimensions['height'])
            );
        }
    }

    private function getDocumentDimensions(): array
    {
        $script = $this->template->render('selenium/dimensions.html.twig');
        return $this->driver->executeScript($script);
    }
}
