<?php

namespace App\Form\Resource;

use App\Entity\Resource\PageResource;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PageType extends HttpType
{
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => PageResource::class,
        ]);
    }
}
