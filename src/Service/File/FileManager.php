<?php

namespace App\Service\File;

use App\Entity\Snapshot\AbstractSnapshot;
use App\Entity\Resource\PageResource;
use App\Entity\Project;
use ErrorException;

class FileManager
{
    public const DATA_FOLDER_NAME = 'data';
    public const PUBLIC_FOLDER_NAME = 'public';
    public const SNAPSHOT_FOLDER_FORMAT = 'YmdHis';

    protected $projectDir;

    public function __construct(string $projectDir)
    {
        $this->projectDir = $projectDir;
    }

    public function getDataFolder(): string
    {
        return $this->getPublicFolder() . '/' . self::DATA_FOLDER_NAME;
    }

    public function getPublicFolder(): string
    {
        return $this->projectDir . '/' . self::PUBLIC_FOLDER_NAME;
    }

    public function getProjectFolder(Project $project): string
    {
        return $this->getDataFolder() . '/project-' . $project->getId();
    }

    public function getResourceFolder(PageResource $page): string
    {
        return $this->getProjectFolder($page->getProject()) . '/resource-' . $page->getId();
    }

    public function getSnapshotFolder(AbstractSnapshot $snapshot)
    {
        $dateTime = (new \DateTime())->setTimestamp($snapshot->getTimestamp());

        return $this->getResourceFolder($snapshot->getResource()) . '/' . $dateTime->format(self::SNAPSHOT_FOLDER_FORMAT);
    }

    public function save(string $destination, string $data)
    {
        $folder = pathinfo($destination, PATHINFO_DIRNAME);
        if (!is_dir($folder)) {
            mkdir($folder, 0777, true);
        }

        return file_put_contents($destination, $data);
    }

    public function remove(string $directory): bool
    {
        try {
            $files = array_diff(scandir($directory), ['.', '..']);
        } catch (ErrorException $exception) {
            $files = [];
        }

        foreach ($files as $file) {
            if (is_dir("$directory/$file")) {
                call_user_func_array([$this, 'remove'], ["$directory/$file"]);
            } else {
                unlink("$directory/$file");
            }
        }

        try {
            return rmdir($directory);
        } catch (ErrorException $exception) {
            return false;
        }
    }
}
