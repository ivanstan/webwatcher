<?php

namespace App\Form;

use App\Entity\Page;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PageType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        /** @var Page $page */
        $page = $builder->getData();

        $builder
            ->add('name', null, ['required' => true])
            ->add('path')
            ->add('protocol', ChoiceType::class, [
                'choices'  => [
                    'https' => 'https',
                    'http' => 'http',
                ],
            ])
        ;

        if (count($page->getSnapshots()) > 0) {
            $builder->add('path', null, ['disabled' => true]);
        }
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Page::class,
        ]);
    }
}
