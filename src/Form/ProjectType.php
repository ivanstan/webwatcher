<?php

namespace App\Form;

use App\Entity\Project;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ProjectType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', null, ['required' => false])
            ->add('domain', null, [
                'help' => 'For instances running on docker use "host.docker.internal" as domain name to access your host machine\'s applications.',
                'attr' => ['placeholder' => 'example.org']
            ])
            ->add('driver', ChoiceType::class, [
                'choices' => [
                    'Selenium' => Project::DRIVER_TYPE_SELENIUM,
                    'Guzzle' => Project::DRIVER_TYPE_GUZZLE,
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Project::class,
        ]);
    }
}
