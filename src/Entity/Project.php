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
     * @ORM\Column(name="domain", type="string", nullable=false)
     * @Assert\Regex(
     *     pattern="/[a-zA-Z0-9.]+/",
     *     message="Domain name can contain only alphanumeric characters and dots."
     * )
     */
    protected $domain;

    /**
     * @var Page[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\AbstractResource", mappedBy="project", cascade={"persist"})
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
     * @ORM\OneToOne(targetEntity="App\Entity\Authenticator\AbstractAuthenticator", mappedBy="project", cascade={"persist"})
     */
    protected $authenticator;

    /**
     * @return AbstractResource[]|Collection
     */
    public function getPages()
    {
        return $this->pages;
    }

    /**
     * @param AbstractResource[]|Collection $pages
     */
    public function setPages($pages)
    {
        $this->pages = $pages;
    }

    /**
     * @param AbstractSnapshot[]|Collection $snapshots
     */
    public function setSnapshots($snapshots)
    {
        $this->snapshots = $snapshots;
    }

    /**
     * @return AbstractSnapshot[]|Collection
     */
    public function getSnapshots()
    {
        return $this->snapshots;
    }

    public function getDomain(): ?string
    {
        return $this->domain;
    }

    public function setDomain(?string $domain): void
    {
        $this->domain = $domain;
    }

    public function getAuthenticator()
    {
        return $this->authenticator;
    }

    public function setAuthenticator($authenticator): void
    {
        $this->authenticator = $authenticator;
    }

    public function getBaseUrl()
    {
        return 'http://' . $this->getDomain();
    }
}
