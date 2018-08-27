<?php

namespace App\Tests;

use App\Controller\PageController;
use App\Entity\Page;
use PHPUnit\Framework\TestCase;

class PageTest extends TestCase
{
    private $controller;

    public function __construct()
    {
        parent::__construct();

        $this->controller = new PageController();
    }

    public function testNewPage()
    {
        $page = new Page();

        $page->setProtocol('https');
        $page->setName('New Page');
        $page->setPath('https://example.com/path?param=value#fragment');

        $page = $this->controller->pageSetup($page);

        $this->assertEquals('New Page', $page->getName());
        $this->assertEquals('https', $page->getProtocol());
        $this->assertEquals('/path?param=value#fragment', $page->getPath());
    }

    public function testNewPageNoName()
    {
        $page = new Page();

        $page->setProtocol('https');
        $page->setPath('http://example.com/path?param=value#fragment');

        $page = $this->controller->pageSetup($page);

        $this->assertEquals('/path', $page->getName());
        $this->assertEquals('http', $page->getProtocol());
        $this->assertEquals('/path?param=value#fragment', $page->getPath());
    }
}
