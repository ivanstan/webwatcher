<?php

namespace App\Entity;

use App\Entity\Authenticator\Authenticator;
use App\Entity\Authenticator\HttpBasicAuthenticator;
use App\Entity\Resource\HttpResource;
use App\Property\Path;
use App\Property\Protocol;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PageResourceRepository")
 * @ORM\Table("resource_page")
 */
class Page extends HttpResource
{
    public const RESOURCE_TYPE = 'page';

    public function getAverageResponseTime()
    {
        $snapshots = $this->getSnapshots();

        if (!count($snapshots)) {
            return null;
        }

        if (empty($snapshots)) {
            return null;
        }

        $sum = 0;
        foreach ($snapshots as $snapshot) {
            $sum += $snapshot->getResponseTime();
        }

        return $sum / count($snapshots);
    }

    public function getResponseTimeData()
    {
        $result = [];

        foreach ($this->getSnapshots() as $snapshot) {
            $dateTime = (new \DateTime())->setTimestamp($snapshot->getTimestamp())->format('d/m/Y H:i:s');

            $result[$dateTime] = number_format($snapshot->getResponseTime(), 2);
        }

        return array_reverse($result);
    }

    public function getType(): string
    {
        return self::RESOURCE_TYPE;
    }
}
