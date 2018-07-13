<?php

namespace App\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProjectSnapshotRepository")
 * @ORM\Table("project_snapshot")
 */
class ProjectSnapshot extends AbstractSnapshot
{
    /**
     * @var Project
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Project", inversedBy="snapshots", cascade={"persist"})
     * @ORM\JoinColumn(name="project_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    protected $project;

    /**
     * @var AbstractSnapshot[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\AbstractSnapshot", mappedBy="snapshot", cascade={"persist"})
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
     * @return AbstractSnapshot[]|Collection
     */
    public function getSnapshots()
    {
        return $this->snapshots;
    }

    /**
     * @param AbstractSnapshot[]|Collection $snapshots
     */
    public function setSnapshots($snapshots): void
    {
        $this->snapshots = $snapshots;
    }
}
