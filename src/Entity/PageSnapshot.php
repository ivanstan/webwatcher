<?php

namespace App\Entity;

use App\Property\Id;
use App\Property\Timestamp;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Index;

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
    private $body;

    /**
     * @var array $headers
     * @ORM\Column(name="headers", type="json_array", nullable=true)
     */
    private $headers;

    /**
     * @var string $hash
     * @ORM\Column(name="hash", type="string", nullable=true)
     */
    private $hash;

    /**
     * @var string $image
     * @ORM\Column(name="image", type="string", nullable=true)
     */
    private $image;

    /**
     * @var integer $responseCode
     * @ORM\Column(name="response_code", type="integer")
     */
    private $responseCode;

    /**
     * @var float $responseTime
     * @ORM\Column(name="response_time", type="float", nullable=true)
     */
    private $responseTime;

    /**
     * @var Page
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Page", inversedBy="snapshots", cascade={"persist"})
     * @ORM\JoinColumn(name="page_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    private $page;

    /**
     * @var ProjectSnapshot
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ProjectSnapshot", inversedBy="snapshots", cascade={"persist"})
     * @ORM\JoinColumn(name="project_snapshot_id", referencedColumnName="id", onDelete="CASCADE", nullable=true)
     */
    private $projectSnapshot;

    public function getBody(): string
    {
        return \Mihaeu\HtmlFormatter::format($this->body);
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

    public function setHeaders(array $headers): void
    {
        $this->headers = $headers;
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
