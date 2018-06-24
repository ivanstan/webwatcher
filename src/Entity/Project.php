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
    protected $baseUrl;

    /**
     * @var Page[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\Page", mappedBy="project", cascade={"persist"})
     * @ORM\OrderBy({"path" = "ASC"})
     */
    protected $pages;

    /**
     * @var Page[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\ProjectSnapshot", mappedBy="project", cascade={"persist"})
     * @ORM\OrderBy({"timestamp" = "DESC"})
     */
    protected $snapshots;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="pages", cascade={"persist"})
     * @ORM\JoinColumn(name="owner", referencedColumnName="id", nullable=true)
     */
    protected $owner;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Authenticator\Authenticator", mappedBy="project", cascade={"persist"})
     */
    protected $authenticator;

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
        if (substr($this->baseUrl, -1) === '/') {
            return substr($this->baseUrl, 0, -1);
        }

        return $this->baseUrl;
    }

    public function setBaseUrl(?string $baseUrl): void
    {
        $this->baseUrl = $baseUrl;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): void
    {
        $this->owner = $owner;
    }

    public function getAuthenticator()
    {
        return $this->authenticator;
    }

    public function setAuthenticator($authenticator): void
    {
        $this->authenticator = $authenticator;
    }

    public function __toString(): string
    {
        return $this->name;
    }
}
