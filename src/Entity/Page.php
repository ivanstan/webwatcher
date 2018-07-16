<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Constraint;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PageRepository")
 * @ORM\Table("page")
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
    protected $protocol;

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(string $path)
    {
        $this->path = $path;
    }

    public function getProtocol(): string
    {
        return $this->protocol;
    }

    public function setProtocol(string $protocol): void
    {
        $this->protocol = $protocol;
    }

    public function getUrl(): string
    {
        return $this->getProtocol() . '://' . $this->getProject()->getDomain() . $this->getPath();
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
