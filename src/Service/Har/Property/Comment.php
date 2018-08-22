<?php

namespace App\Service\Har\Property;

trait Comment
{
    private $comment = '';

    public function getComment(): string
    {
        return $this->comment;
    }

    public function setComment(string $comment): void
    {
        $this->comment = $comment;
    }
}
