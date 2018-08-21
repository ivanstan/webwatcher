<?php

namespace App\Entity;

use App\Service\HttpArchive\HttpArchive;
use Doctrine\ORM\Mapping as ORM;
use Mihaeu\HtmlFormatter;

/**
 * @ORM\Entity()
 * @ORM\Table("page_snapshot")
 */
class PageSnapshot extends AbstractSnapshot
{
    protected $details;

    /**
     * @var array $har
     * @ORM\Column(name="har", type="json", nullable=true)
     */
    protected $har;

    /**
     * @var array $headers
     * @ORM\Column(name="headers", type="json_array", nullable=true)
     */
    protected $headers;

    /**
     * @var string $image
     * @ORM\Column(name="image", type="string", nullable=true)
     */
    protected $image;

    /**
     * @var integer $status
     * @ORM\Column(name="status", type="integer", nullable=true)
     */
    protected $status;

    /**
     * @var float $time
     * @ORM\Column(name="time", type="float", nullable=true)
     */
    protected $time;

    public function getBody(): string
    {
        $details = $this->getDetails();

        $body = $details['response']['content']['text'] ?? '';
        $body = @HtmlFormatter::format($body);
        $body = preg_replace('/^[ \t]*[\r\n]+/m', '', $body);
        return $body;
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

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(?int $status)
    {
        $this->status = $status;
    }

    public function getTime(): ?float
    {
        return $this->time;
    }

    public function setTime(float $time): void
    {
        $this->time = $time;
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
