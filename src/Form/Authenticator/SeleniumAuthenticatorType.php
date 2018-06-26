<?php

namespace App\Form\Authenticator;

use App\Entity\Authenticator\SeleniumAuthenticator;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SeleniumAuthenticatorType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('url')
            ->add('username')
            ->add('password')
            ->add('usernameSelector')
            ->add('passwordSelector')
            ->add('submitSelector')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => SeleniumAuthenticator::class,
        ]);
    }
}
