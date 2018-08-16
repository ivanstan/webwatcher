<?php

namespace App\Entity\Action;

use App\Property\Id;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="`action`")
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({
 *     TestAction::TYPE = "App\Entity\Action\TestAction",
 * })
 */
abstract class AbstractAction
{
    use Id;

    /**
     * @var ActionGroup
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Action\ActionGroup", inversedBy="actions", cascade={"persist"}, fetch="EAGER")
     * @ORM\JoinColumn(name="group_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    protected $group;

    public function getGroup(): ActionGroup
    {
        return $this->group;
    }

    public function setGroup(ActionGroup $group): void
    {
        $this->group = $group;
    }
}
