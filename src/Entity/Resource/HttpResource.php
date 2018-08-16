<?php

namespace App\Entity\Resource;

use App\Entity\AbstractResource;
use App\Entity\Authenticator\Authenticator;
use App\Entity\Authenticator\HttpBasicAuthenticator;
use App\Property\Path;
use App\Property\Protocol;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table("resource_http")
 */
class HttpResource extends AbstractResource
{
    public const RESOURCE_TYPE = 'http';

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

    public function getType(): string
    {
        return self::RESOURCE_TYPE;
    }
}
