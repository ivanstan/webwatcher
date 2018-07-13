<?php

namespace App\Entity;

use App\Property\Id;
use App\Property\Timestamp;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\PersistentCollection;
use Mihaeu\HtmlFormatter;

/**
 * @ORM\Entity()
 * @ORM\Table("page_snapshot",
 *     indexes={
 *     @ORM\Index(columns={"body"}, flags={"fulltext"}),
 * })
 */
class PageSnapshot extends AbstractSnapshot
{
    private $linkIndex = [];

    public function __construct()
    {
        $this->links = new ArrayCollection();
    }

    /**
     * @var string $body
     * @ORM\Column(name="body", type="text", nullable=true)
     */
    protected $body;

    /**
     * @var string $har
     * @ORM\Column(name="har", type="json", nullable=true)
     */
    protected $har;

    /**
     * @var array $headers
     * @ORM\Column(name="headers", type="json_array", nullable=true)
     */
    protected $headers;

    /**
     * @var string $hash
     * @ORM\Column(name="hash", type="string", nullable=true)
     */
    protected $hash;

    /**
     * @var string $image
     * @ORM\Column(name="image", type="string", nullable=true)
     */
    protected $image;

    /**
     * @var integer $responseCode
     * @ORM\Column(name="response_code", type="integer")
     */
    protected $responseCode;

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
        $body = @HtmlFormatter::format($this->body);
        $body = preg_replace('/^[ \t]*[\r\n]+/m', '', $body);
        return $body;
    }

    public function setBody(string $body)
    {
        $this->hash = sha1($body);
        $this->body = $body;
    }

    public function getHeaders(): array
    {
        return $this->headers;
    }

    public function hasHeader(string $name): bool
    {
        return isset($this->headers[$name]);
    }

    public function setHeaders(array $headers): void
    {
        $this->headers = $headers;
    }

    public function getHeader(string $header) {
        return $this->headers[$header] ? $this->headers[$header] : null;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function setImage(string $image): void
    {
        $this->image = $image;
    }

    public function getResponseCode(): int
    {
        return $this->responseCode;
    }

    public function setResponseCode(int $responseCode)
    {
        $this->responseCode = $responseCode;
    }

    public function getResponseTime(): ?float
    {
        return $this->responseTime;
    }

    public function setResponseTime(float $responseTime): void
    {
        $this->responseTime = $responseTime;
    }

    public function getHash(): ?string
    {
        if ($this->hash) {
            return $this->hash;
        }

        return 'null';
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

    public function __toString(): string
    {
        return $this->hash;
    }

    public function equals(PageSnapshot $snapshot): bool
    {
        return $this->hash === $snapshot->getHash() && $this->responseCode === $snapshot->getResponseCode();
    }

    public function getHar(): ?string
    {
        return $this->har;
    }

    public function setHar(string $har): void
    {
        $this->har = $har;
    }
}
