<?php

namespace App\Form\Assert;

use App\Entity\Assert\AssertHtmlElementExists;
use App\Entity\Assert\AssertHttpCode;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AssertHtmlElementExistsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('selector');
        $builder->add('selectorType', ChoiceType::class, [
            'choices' => AssertHtmlElementExists::getSelectorTypes(),
        ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => AssertHtmlElementExists::class,
        ]);
    }
}
