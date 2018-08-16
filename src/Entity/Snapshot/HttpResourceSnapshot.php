<?php

namespace App\Entity\Snapshot;

use App\Entity\AbstractSnapshot;
use Doctrine\ORM\Mapping as ORM;
use Mihaeu\HtmlFormatter;

/**
 * @ORM\Entity()
 * @ORM\Table("snapshot_http")
 */
class HttpResourceSnapshot extends AbstractSnapshot
{
    /**
     * @var string $content
     * @ORM\Column(name="content", type="text", nullable=true)
     */
    protected $content;

    /**
     * @var array $headers
     * @ORM\Column(name="headers", type="json_array", nullable=true)
     */
    protected $headers;

    /**
     * @var integer $code
     * @ORM\Column(name="code", type="integer")
     */
    protected $code;

    /**
     * @var string $mine
     * @ORM\Column(name="mime", type="string")
     */
    protected $mime;

    public function getContent(): string
    {
        $body = @HtmlFormatter::format($this->content);
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

    public function getHeader(string $header)
    {
        return $this->headers[$header] ? $this->headers[$header] : null;
    }

    public function getResponseCode(): ?int
    {
        return $this->code;
    }

    public function setResponseCode(int $responseCode)
    {
        $this->code = $responseCode;
    }

}
