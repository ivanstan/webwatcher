<?php

namespace App\Service\File;

use App\Entity\PageSnapshot;

class ImageFileManager extends FileManager
{
    public function __construct(string $projectDir)
    {
        parent::__construct($projectDir);
    }

    public function getSnapshotImageDestination(PageSnapshot $snapshot, string $name): string
    {
        return $this->getSnapshotFolder($snapshot) . '/' . $name . '.png';
    }

    public function getSnapshotImagePath(PageSnapshot $snapshot, string $name): string
    {
        return ltrim(str_replace($this->getPublicFolder(), '', $this->getSnapshotImageDestination($snapshot, $name)), '/');
    }
}
