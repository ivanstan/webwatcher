<?php

namespace App\Entity;

use App\Property\Id;
use App\Property\Timestamp;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Index;
use Mihaeu\HtmlFormatter;

/**
 * @ORM\Entity()
 * @ORM\Table("page_snapshot",
 *     indexes={
 *     @Index(columns={"body"}, flags={"fulltext"}),
 *     @Index(columns={"headers"}, flags={"fulltext"})
 * })
 */
class PageSnapshot
{
    use Id;
    use Timestamp;

    /**
     * @var string $body
     * @ORM\Column(name="body", type="text", nullable=true)
     */
    protected $body;

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
     * @var Page
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Page", inversedBy="snapshots", cascade={"persist"})
     * @ORM\JoinColumn(name="page_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    protected $page;

    /**
     * @var ProjectSnapshot
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ProjectSnapshot", inversedBy="snapshots", cascade={"persist"})
     * @ORM\JoinColumn(name="project_snapshot_id", referencedColumnName="id", onDelete="CASCADE", nullable=true)
     */
    protected $projectSnapshot;

    public function getBody(): string
    {
        return @HtmlFormatter::format($this->body);
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

    public function getResponseTime(): float
    {
        return $this->responseTime;
    }

    public function setResponseTime(float $responseTime): void
    {
        $this->responseTime = $responseTime;
    }

    public function getPage(): ?Page
    {
        return $this->page;
    }

    public function setPage(Page $page)
    {
        $this->page = $page;
    }

    public function getHash(): ?string
    {
        if ($this->hash) {
            return $this->hash;
        }

        return 'null';
    }

    public function getProjectSnapshot(): ?ProjectSnapshot
    {
        return $this->projectSnapshot;
    }

    public function setProjectSnapshot(?ProjectSnapshot $projectSnapshot): void
    {
        $this->projectSnapshot = $projectSnapshot;
    }

    public function __toString(): string
    {
        return $this->hash;
    }

    public function equals(PageSnapshot $snapshot): bool
    {
        return $this->hash === $snapshot->getHash() && $this->responseCode === $snapshot->getResponseCode();
    }
}
