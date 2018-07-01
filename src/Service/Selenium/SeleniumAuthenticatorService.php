<?php

namespace App\Service\Selenium;

use App\Entity\Authenticator\AuthenticatorInterface;
use Facebook\WebDriver\Cookie;
use Facebook\WebDriver\WebDriverBy;

class SeleniumAuthenticatorService {

    private $webDriver;

    public function __construct(SeleniumWebDriver $webDriver)
    {
        $this->webDriver = $webDriver;
    }

    /**
     * @param \App\Entity\Authenticator\SeleniumAuthenticator $authenticator
     * @return Cookie[]
     */
    public function resolve(AuthenticatorInterface $authenticator) {

        $driver = $this->webDriver->getInstance();

        $driver->get($authenticator->getUrl());

        $username = $driver->findElement(WebDriverBy::cssSelector($authenticator->getUsernameSelector()));
        $username->sendKeys($authenticator->getUsername());

        $password = $driver->findElement(WebDriverBy::cssSelector($authenticator->getPasswordSelector()));
        $password->sendKeys($authenticator->getPassword());

        $submit = $driver->findElement(WebDriverBy::cssSelector($authenticator->getSubmitSelector()));

        $submit->click();

        $cookies = $driver->manage()->getCookies();

        return $cookies;
    }
}
