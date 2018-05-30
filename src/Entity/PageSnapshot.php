<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 */
class PageSnapshot
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
     * @var string $timestamp
     * @ORM\Column(name="timestamp", type="bigint", nullable=false)
     */
    private $timestamp;

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
     * @var Page
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Page", inversedBy="snapshots", cascade={"persist"})
     * @ORM\JoinColumn(name="page_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    private $page;

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function getTimestamp(): int
    {
        return $this->timestamp;
    }

    public function setTimestamp(int $timestamp)
    {
        $this->timestamp = $timestamp;
    }

    public function getBody(): string
    {
        return $this->body;
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
