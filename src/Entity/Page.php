<?php

namespace App\Entity;

use App\Property\Id;
use App\Property\Name;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 * @ORM\Table("page")
 */
class Page
{
    use Name;
    use Id;

    /**
     * @var string
     *
     * @ORM\Column(name="path", type="string", nullable=true)
     * @Assert\Regex(
     *     pattern="/^\/+?/",
     *     match=true,
     *     message="Path must begin with '/'"
     * )
     */
    private $path;

    /**
     * @var Project
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Project", inversedBy="pages", cascade={"persist"})
     * @ORM\JoinColumn(name="project_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    private $project;

    /**
     * @var PageSnapshot[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\PageSnapshot", mappedBy="page", cascade={"persist"})
     * @ORM\OrderBy({"timestamp" = "DESC"})
     */
    private $snapshots;

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(string $path)
    {
        $this->path = $path;
    }

    public function getUrl(): string
    {
        return $this->project->getBaseUrl() . $this->getPath();
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(Project $project)
    {
        $this->project = $project;
    }

    /**
     * @return PageSnapshot[]|Collection
     */
    public function getSnapshots()
    {
        return $this->snapshots;
    }

    /**
     * @param PageSnapshot[]|Collection $snapshots
     */
    public function setSnapshots($snapshots)
    {
        $this->snapshots = $snapshots;
    }

    public function getAverageResponseTime()
    {
        $snapshots = $this->getSnapshots();

        if (empty($snapshots)) {
            return null;
        }

        $sum = 0;
        foreach ($snapshots as $snapshot) {
            $sum += $snapshot->getResponseTime();
        }

        return $sum / count($snapshots);
    }

    public function __toString(): string
    {
        return $this->path;
    }
}
