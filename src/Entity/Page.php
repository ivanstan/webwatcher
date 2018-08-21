<?php

namespace App\Entity;

use App\Entity\Authenticator\Authenticator;
use App\Entity\Authenticator\HttpBasicAuthenticator;
use App\Property\Path;
use App\Property\Protocol;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table("resource_page")
 */
class Page extends AbstractResource
{
    use Path;
    use Protocol;

    public function getUrl(): string
    {
        $build = [
            'scheme' => $this->getProtocol(),
            'host' => $this->getProject()->getDomain(),
            'path' => $this->getPath(),
        ];

        /** @var Authenticator $authenticator */
        $authenticator = $this->getProject()->getAuthenticator();

        if ($authenticator && $authenticator instanceof HttpBasicAuthenticator) {
            $build['user'] = $authenticator->getUsername();
            $build['pass'] = $authenticator->getPassword();
        }

        return \GuzzleHttp\Psr7\Uri::fromParts($build);
    }

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
            $sum += $snapshot->getTime();
        }

        return $sum / count($snapshots);
    }

    public function getResponseTimeData()
    {
        $result = [];

        foreach ($this->getSnapshots() as $snapshot) {
            $dateTime = (new \DateTime())->setTimestamp($snapshot->getTimestamp())->format('d/m/Y H:i:s');

            $result[$dateTime] = number_format($snapshot->getTime(), 2);
        }

        return array_reverse($result);
    }
}
