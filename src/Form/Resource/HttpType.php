<?php

namespace App\Form\Resource;

use App\Entity\Resource\PageResource;
use App\Entity\Resource\HttpResource;
use App\Property\Protocol;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class HttpType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        /** @var PageResource $page */
        $page = $builder->getData();

        $builder
            ->add('name', null, ['required' => true])
            ->add('path')
            ->add('protocol', ChoiceType::class, ['choices' => Protocol::enum()])
        ;

        if (count($page->getSnapshots()) > 0) {
            $builder->add('path', null, ['disabled' => true]);
        }
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => HttpResource::class,
        ]);
    }
}
