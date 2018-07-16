<?php

namespace App\Service\File;

use App\Entity\PageSnapshot;

class ImageFileManager extends FileManager
{
    public const IMAGE_FILE_FORMAT = 'Ymd-His';

    public function __construct(string $projectDir)
    {
        parent::__construct($projectDir);
    }

    public function getSnapshotImageDestination(PageSnapshot $snapshot, string $suffix = ''): string
    {
        $projectId = $snapshot->getPage()->getProject()->getId();
        $resourceId = $snapshot->getPage()->getId();
        $dateTime = new \DateTime();
        $dateTime->setTimestamp($snapshot->getTimestamp());

        $path = $this->getDataFolder() . '/project-' . $projectId . '/resource-' . $resourceId . '/' . $dateTime->format(self::IMAGE_FILE_FORMAT);

        if ($suffix) {
            $path .= '_' . $suffix;
        }

        $path .= '.png';

        return $path;
    }

    public function getSnapshotImagePath(PageSnapshot $snapshot): string
    {
        return ltrim(str_replace($this->getPublicFolder(), '', $this->getSnapshotImageDestination($snapshot)), '/');
    }
}
