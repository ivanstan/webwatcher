<?php

namespace App\Form\Assert;

use App\Entity\Assert\AbstractAssert;
use App\Entity\Assert\HTTP\AssertHttpCode;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AbstractAssertType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event) {
            $assert = $event->getData();
            $form = $event->getForm();

            if ($assert instanceof AssertHttpCode) {
                $form->add('code', null, ['label' => 'Response Code']);
            }
        });
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => AbstractAssert::class,
        ]);
    }
}
