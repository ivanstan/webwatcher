<?php

namespace App\Form\Authenticator;

use App\Entity\Authenticator\SeleniumAuthenticator;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
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
            ->add('project')
            ->add('save', SubmitType::class, ['attr' => ['class' => 'btn btn-primary']])
            ->add('test', SubmitType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => SeleniumAuthenticator::class,
        ]);
    }
}
