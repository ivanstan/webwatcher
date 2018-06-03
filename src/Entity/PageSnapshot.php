<?php

namespace App\Entity;

use App\Property\Id;
use App\Property\Timestamp;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table("page_snapshot")
 */
class PageSnapshot
{
    use Id;
    use Timestamp;

    /**
     * @var string $body
     * @ORM\Column(name="body", type="text")
     */
    private $body;

    /**
     * @var string $hash
     * @ORM\Column(name="hash", type="string")
     */
    private $hash;

    /**
     * @var string $image
     * @ORM\Column(name="image", type="string")
     */
    private $image;

    /**
     * @var integer $responseCode
     * @ORM\Column(name="response_code", type="integer")
     */
    private $responseCode;

    /**
     * @var float $responseTime
     * @ORM\Column(name="response_time", type="float", nullable=false)
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
     * @ORM\ManyToOne(targetEntity="App\Entity\ProjectSnapshot", inversedBy="pageSnapshots", cascade={"persist"})
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

    public function getImage(): string
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

    public function getPage(): Page
    {
        return $this->page;
    }

    public function setPage(Page $page)
    {
        $this->page = $page;
    }

    public function getHash(): string
    {
        return $this->hash;
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
