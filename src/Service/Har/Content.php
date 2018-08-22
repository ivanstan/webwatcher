<?php

namespace App\Service\Har;

use App\Service\Har\Property\Comment;

class Content
{
    use Comment;

    private $size = 0;
    private $compression = 0;
    private $mimeType = '';
    private $text = '';

    /**
     * @return int
     */
    public function getSize(): int
    {
        return $this->size;
    }

    /**
     * @param int $size
     */
    public function setSize(int $size): void
    {
        $this->size = $size;
    }

    /**
     * @return int
     */
    public function getCompression(): int
    {
        return $this->compression;
    }

    /**
     * @param int $compression
     */
    public function setCompression(int $compression): void
    {
        $this->compression = $compression;
    }

    /**
     * @return string
     */
    public function getMimeType(): string
    {
        return $this->mimeType;
    }

    /**
     * @param string $mimeType
     */
    public function setMimeType(string $mimeType): void
    {
        $this->mimeType = $mimeType;
    }

    /**
     * @return string
     */
    public function getText(): string
    {
        return $this->text;
    }

    /**
     * @param string $text
     */
    public function setText(string $text): void
    {
        $this->text = $text;
    }
}
