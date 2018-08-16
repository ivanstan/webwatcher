<?php

namespace App\Entity;

use App\Service\HttpArchive\HttpArchive;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\PersistentCollection;
use Mihaeu\HtmlFormatter;

/**
 * @ORM\Entity()
 * @ORM\Table("page_snapshot")
 */
class PageSnapshot extends AbstractSnapshot
{
    protected $details;

    protected $linkIndex = [];

    public function __construct()
    {
        $this->links = new ArrayCollection();
    }

    /**
     * @var array $har
     * @ORM\Column(name="har", type="json", nullable=true)
     */
    protected $har;

    /**
     * @var string $image
     * @ORM\Column(name="image", type="string", nullable=true)
     */
    protected $image;

    /**
     * @var float $responseTime
     * @ORM\Column(name="response_time", type="float", nullable=true)
     */
    protected $responseTime;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\PageSnapshotSeo", cascade={"persist"})
     * @ORM\JoinColumn(name="seo_id", referencedColumnName="id")
     */
    protected $seo;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Link", mappedBy="snapshots", cascade={"persist", "merge"})
     * @ORM\OrderBy({"url"="DESC"})
     * @ORM\JoinTable(name="page_snapshot_link")
     */
    protected $links;

    public function getBody(): string
    {
        $details = $this->getDetails();

        $body = $details['response']['content']['text'] ?? '';
        $body = @HtmlFormatter::format($body);
        $body = preg_replace('/^[ \t]*[\r\n]+/m', '', $body);
        return $body;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function setImage(string $image): void
    {
        $this->image = $image;
    }

    public function getResponseTime(): ?float
    {
        return $this->responseTime;
    }

    public function setResponseTime(float $responseTime): void
    {
        $this->responseTime = $responseTime;
    }

    public function getSeo(): ?PageSnapshotSeo
    {
        return $this->seo;
    }

    public function setSeo(?PageSnapshotSeo $seo): void
    {
        $this->seo = $seo;
    }

    /**
     * @return ArrayCollection|PersistentCollection|null
     */
    public function getLinks()
    {
        return $this->links;
    }

    public function setLinks(?ArrayCollection $links): void
    {
        $this->links = $links;

        /** @var Link $link */
        foreach ($this->links as $link) {
            $this->linkIndex[$link->getUrl()] = $link;
        }
    }

    public function addLink(Link $link): void
    {
        $this->links->add($link);
        $this->linkIndex[$link->getUrl()] = $link;
    }

    public function linkExists(string $url)
    {
        return isset($this->linkIndex[$url]);
    }

    public function getHar(): ?array
    {
        return $this->har;
    }

    public function setHar(array $har): void
    {
        $this->har = $har;
    }

    public function getDetails()
    {
        if ($this->details === null) {
            $archive = HttpArchive::fromArray($this->getHar());

            $this->details =  $archive->getEntry($this->getPage()->getUrl());
        }

        return $this->details;
    }
}
