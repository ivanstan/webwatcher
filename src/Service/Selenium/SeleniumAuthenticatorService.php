<?php

namespace App\Service\Selenium;

use App\Entity\Authenticator\AuthenticatorInterface;
use Facebook\WebDriver\Cookie;
use Facebook\WebDriver\WebDriverBy;
use Facebook\WebDriver\WebDriverElement;

class SeleniumAuthenticatorService {

    private $driver;

    /** @var WebDriverElement */
    private $submit;

    // ToDo this should not be in constructor, its called way too often.
    public function __construct(SeleniumWebDriver $webDriver)
    {
        $this->driver = $webDriver->setup();
    }

    /**
     * @param \App\Entity\Authenticator\SeleniumAuthenticator $authenticator
     */
    public function prepare(AuthenticatorInterface $authenticator): string
    {
        $this->driver->get($authenticator->getUrl());

        return $this->driver->takeScreenshot();
    }

    /**
     * @param \App\Entity\Authenticator\SeleniumAuthenticator $authenticator
     * @return Cookie[]
     */
    public function getCookies(AuthenticatorInterface $authenticator)
    {
        $username = $this->driver->findElement(WebDriverBy::cssSelector($authenticator->getUsernameSelector()));
        $username->sendKeys($authenticator->getUsername());

        $password = $this->driver->findElement(WebDriverBy::cssSelector($authenticator->getPasswordSelector()));
        $password->sendKeys($authenticator->getPassword());

        $this->submit = $this->driver->findElement(WebDriverBy::cssSelector($authenticator->getSubmitSelector()));


        $this->submit->click();

        $cookies = $this->driver->manage()->getCookies();

        return $cookies;
    }
}
