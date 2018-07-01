<?php

namespace App\Entity;

use App\Property\Id;
use App\Property\Timestamp;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProjectSnapshotRepository")
 * @ORM\Table("project_snapshot")
 */
class ProjectSnapshot
{
    use Id;
    use Timestamp;

    /**
     * @var Project
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Project", inversedBy="snapshots", cascade={"persist"})
     * @ORM\JoinColumn(name="project_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    protected $project;

    /**
     * @var PageSnapshot[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\PageSnapshot", mappedBy="projectSnapshot", cascade={"persist"})
     * @ORM\OrderBy({"timestamp" = "DESC"})
     */
    protected $snapshots;

    public function getProject(): Project
    {
        return $this->project;
    }

    public function setProject(Project $project): void
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
    public function setSnapshots($snapshots): void
    {
        $this->snapshots = $snapshots;
    }
}
