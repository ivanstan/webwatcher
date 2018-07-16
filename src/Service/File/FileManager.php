<?php

namespace App\Service\File;

class FileManager
{
    public const DATA_FOLDER_NAME = 'data';
    public const PUBLIC_FOLDER_NAME = 'public';

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

    public function save(string $destination, string $data)
    {
        $folder = pathinfo($destination, PATHINFO_DIRNAME);
        if (!is_dir($folder)) {
            mkdir($folder, 0777, true);
        }

        return file_put_contents($destination, $data);
    }
}
