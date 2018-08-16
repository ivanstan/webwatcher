<?php

namespace App\Entity\Resource;

use App\Entity\Project;
use App\Entity\Snapshot\AbstractSnapshot;
use App\Property\Id;
use App\Property\Name;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table("resource")
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({
 *     PageResource::RESOURCE_TYPE = "App\Entity\Resource\PageResource",
 *     HttpResource::RESOURCE_TYPE = "App\Entity\Resource\HttpResource",
 * })
 */
abstract class AbstractResource
{
    use Name;
    use Id;

    /**
     * @var Project
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Project", inversedBy="resources", cascade={"persist"}, fetch="EAGER")
     * @ORM\JoinColumn(name="project_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    protected $project;

    /**
     * @var AbstractSnapshot[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\Snapshot\AbstractSnapshot", mappedBy="resource", cascade={"persist"})
     * @ORM\OrderBy({"timestamp" = "DESC"})
     */
    protected $snapshots;

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(Project $project)
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
    public function setSnapshots($snapshots)
    {
        $this->snapshots = $snapshots;
    }

    public function getNewestSnapshot(): ?AbstractSnapshot
    {
        if (isset($this->snapshots[0])) {
            return $this->snapshots[0];
        }

        return null;
    }
}
