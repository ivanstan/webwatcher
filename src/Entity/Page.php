<?php

namespace App\Entity;

use App\Entity\Authenticator\Authenticator;
use App\Entity\Authenticator\HttpBasicAuthenticator;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Constraint;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PageResourceRepository")
 * @ORM\Table("resource_page")
 */
class Page extends AbstractResource
{
    /**
     * @var string
     *
     * @ORM\Column(name="path", type="string", nullable=true)
     * @Constraint\Regex(
     *     pattern="/^\/+?/",
     *     match=true,
     *     message="Path must begin with '/'"
     * )
     */
    protected $path;

    /**
     * @var string
     *
     * @ORM\Column(name="protocol", type="string", nullable=false, options={"default":"https"}, columnDefinition="ENUM('http', 'https')")
     */
    protected $protocol = 'https';

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(string $path)
    {
        $this->path = $path;
    }

    public function getProtocol(): ?string
    {
        return $this->protocol;
    }

    public function setProtocol(string $protocol): void
    {
        $this->protocol = $protocol;
    }

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
}
