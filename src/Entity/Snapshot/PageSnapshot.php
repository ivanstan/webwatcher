<?php

namespace App\Entity\Snapshot;

use App\Entity\Snapshot\HttpResourceSnapshot;
use App\Service\HttpArchive\HttpArchive;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\PersistentCollection;
use Mihaeu\HtmlFormatter;

/**
 * @ORM\Entity()
 * @ORM\Table("page_snapshot")
 */
class PageSnapshot extends HttpResourceSnapshot
{
    protected $details;

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
        if ($this->details === null && $this->getHar()) {
            $archive = HttpArchive::fromArray($this->getHar());

            $this->details =  $archive->getEntry($this->getResource()->getUrl());
        }

        return $this->details;
    }
}
