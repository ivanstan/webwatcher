<?php

namespace App\Entity;

use App\Entity\Authenticator\AbstractAuthenticator;
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
    public const TYPE = 'page';

    use Path;
    use Protocol;

    public function getUrl(): string
    {
        $build = [
            'scheme' => $this->getProtocol(),
            'host' => $this->getProject()->getDomain(),
            'path' => $this->getPath(),
        ];

        /** @var AbstractAuthenticator $authenticator */
        $authenticator = $this->getProject()->getAuthenticator();

        if ($authenticator && $authenticator instanceof HttpBasicAuthenticator) {
            $build['user'] = $authenticator->getUsername();
            $build['pass'] = $authenticator->getPassword();
        }

        return \GuzzleHttp\Psr7\Uri::fromParts($build);
    }
}
