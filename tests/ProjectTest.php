<?php

namespace App\Tests;

use App\Controller\ProjectController;
use App\Entity\Page;
use App\Entity\Project;
use PHPUnit\Framework\TestCase;

class ProjectTest extends TestCase
{
    private $controller;

    public function __construct()
    {
        parent::__construct();

        $this->controller = new ProjectController();
    }

    public function testNewProject()
    {
        $project = new Project();
        $project->setDomain('example.com');
        $project->setName('New Project');
        $project = $this->controller->projectSetup($project);

        $this->assertEquals('New Project', $project->getName());
        $this->assertEquals('example.com', $project->getDomain());

        $pages = $project->getPages();
        $this->assertEquals(1, count($pages), 'Assert resource is created.');

        /** @var Page $page */
        $page = $pages[0];

        $this->assertEquals('Home', $page->getName());
        $this->assertEquals('/', $page->getPath());
        $this->assertEquals('https', $page->getProtocol());
    }

    public function testNewProjectNoName()
    {
        $project = new Project();
        $project->setDomain('example.com');
        $project = $this->controller->projectSetup($project);

        $this->assertEquals('example.com', $project->getName());
        $this->assertEquals('example.com', $project->getDomain());
    }

    public function testNewProjectFullUrl()
    {
        $project = new Project();
        $project->setDomain('http://example.com/page?param=value#fragment');
        $project->setName('New Project');
        $project = $this->controller->projectSetup($project);

        $this->assertEquals('New Project', $project->getName());
        $this->assertEquals('example.com', $project->getDomain());

        $pages = $project->getPages();
        $this->assertEquals(1, count($pages), 'Assert resource is created.');

        /** @var Page $page */
        $page = $pages[0];

        $this->assertEquals('/page', $page->getPath());
        $this->assertEquals('http', $page->getProtocol());
    }

    public function testNewProjectFullUrlNoName()
    {
        $project = new Project();
        $project->setDomain('https://www.example.com/page?param=value#fragment');
        $project = $this->controller->projectSetup($project);

        $this->assertEquals('www.example.com', $project->getName());
        $this->assertEquals('www.example.com', $project->getDomain());
    }
}
