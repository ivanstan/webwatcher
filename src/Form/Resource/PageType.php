<?php

namespace App\Form\Resource;

use App\Entity\Page;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PageType extends HttpType
{
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Page::class,
        ]);
    }
}
