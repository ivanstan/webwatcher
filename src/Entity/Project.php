<?php

namespace App\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 */
class Project
{
    /**
     * @var int
     *
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(name="id", type="integer")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", nullable=false)
     */
    private $name;

    /**
     * @var Page[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\Page", mappedBy="project", cascade={"persist"})
     */
    private $pages;

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }

    /**
     * @return Page[]|Collection
     */
    public function getPages()
    {
        return $this->pages;
    }

    /**
     * @param Page[]|Collection $pages
     */
    public function setPages($pages)
    {
        $this->pages = $pages;
    }

    public function __toString(): string
    {
        return $this->name;
    }
}
