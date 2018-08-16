<?php

namespace App\Form\Action;

use App\Entity\Action\TestAction;
use App\Form\Assert\AbstractAssertType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TestActionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('asserts', CollectionType::class, [
                'entry_type' => AbstractAssertType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'delete_empty' => true,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => TestAction::class,
        ]);
    }
}
