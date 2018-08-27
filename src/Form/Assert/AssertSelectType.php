<?php

namespace App\Form\Assert;

use App\Service\Assert\AssertService;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;

class AssertSelectType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('type', ChoiceType::class, [
            'mapped' => false,
            'label' => 'Assert type',
            'choices' => AssertService::getList($options['data'])
        ]);
    }
}