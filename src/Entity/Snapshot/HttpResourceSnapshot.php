<?php

namespace App\Entity\Snapshot;

use App\Property\Headers;
use Doctrine\ORM\Mapping as ORM;
use Mihaeu\HtmlFormatter;

/**
 * @ORM\Entity()
 * @ORM\Table("snapshot_http")
 */
class HttpResourceSnapshot extends AbstractSnapshot
{
    use Headers;

    /**
     * @var string $content
     * @ORM\Column(name="content", type="text", nullable=true)
     */
    protected $content;

    /**
     * @var integer $status
     * @ORM\Column(name="status", type="integer", nullable=true)
     */
    protected $status;

    /**
     * @var string $mine
     * @ORM\Column(name="mime", type="string", nullable=true)
     */
    protected $mime;

    public function getContent(): string
    {
        $body = @HtmlFormatter::format($this->content);
        $body = preg_replace('/^[ \t]*[\r\n]+/m', '', $body);

        return $body;
    }

    public function setContent(string $content): void
    {
        $this->content = $content;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status)
    {
        $this->status = $status;
    }

}
