<?php

namespace App\Entity;

use App\Property\Id;
use App\Property\Name;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 * @ORM\Table("project")
 */
class Project
{
    use Id;
    use Name;

    /**
     * @var string
     *
     * @ORM\Column(name="base_url", type="string", nullable=false)
     * @Assert\Url()
     */
    private $baseUrl;

    /**
     * @var Page[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\Page", mappedBy="project", cascade={"persist"})
     * @ORM\OrderBy({"path" = "ASC"})
     */
    private $pages;

    /**
     * @var Page[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\ProjectSnapshot", mappedBy="project", cascade={"persist"})
     * @ORM\OrderBy({"timestamp" = "DESC"})
     */
    private $snapshots;

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

    /**
     * @param ProjectSnapshot[]|Collection $snapshots
     */
    public function setSnapshots($snapshots)
    {
        $this->snapshots = $snapshots;
    }

    /**
     * @return ProjectSnapshot[]|Collection
     */
    public function getSnapshots()
    {
        return $this->snapshots;
    }

    public function getBaseUrl(): ?string
    {
        if (strpos($this->baseUrl, -1) === '/') {
            return substr($this->baseUrl, 0, -1);
        }

        return $this->baseUrl;
    }

    public function setBaseUrl(?string $baseUrl): void
    {
        $this->baseUrl = $baseUrl;
    }

    public function __toString(): string
    {
        return $this->name;
    }
}
