<?php

namespace App\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 */
class Page
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
     * @ORM\Column(name="url", type="string", nullable=false)
     * @Assert\Url()
     */
    private $url;

    /**
     * @var Project
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Project", inversedBy="pages", cascade={"persist"})
     * @ORM\JoinColumn(name="project_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    private $project;

    /**
     * @var PageSnapshot[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\PageSnapshot", mappedBy="page", cascade={"persist"})
     */
    private $snapshots;

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url)
    {
        $this->url = $url;
    }

    public function getProject(): Project
    {
        return $this->project;
    }

    public function setProject(Project $project)
    {
        $this->project = $project;
    }

    /**
     * @return PageSnapshot[]|Collection
     */
    public function getSnapshots()
    {
        return $this->snapshots;
    }

    /**
     * @param PageSnapshot[]|Collection $snapshots
     */
    public function setSnapshots($snapshots)
    {
        $this->snapshots = $snapshots;
    }

    public function __toString(): string
    {
        return $this->url;
    }
}
