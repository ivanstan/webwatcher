<?php

namespace App\Service\Selenium;

use App\Entity\Authenticator\SeleniumAuthenticator;
use App\Service\Factory\WebDriverFactory;
use Facebook\WebDriver\Cookie;
use Facebook\WebDriver\WebDriverBy;

class SeleniumAuthenticatorService {

    private $factory;

    public function __construct(WebDriverFactory $factory)
    {
        $this->factory = $factory;
    }

    /**
     * @param \App\Entity\Authenticator\SeleniumAuthenticator $authenticator
     * @return Cookie[]
     */
    public function resolve(SeleniumAuthenticator $authenticator) {

        $driver = $this->factory->create();

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
