<?php

namespace App\Form\Authenticator;

use App\Entity\Authenticator\Authenticator;
use App\Entity\Authenticator\SeleniumAuthenticator;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SeleniumAuthenticatorType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('protocol', ChoiceType::class, [
                'choices'  => [
                    'https' => 'https',
                    'http' => 'http',
                ],
            ])
            ->add('path', null, ['attr' => ['placeholder' => '/login']])
            ->add('username')
            ->add('password')
            ->add('usernameSelector', null, ['attr' => ['placeholder' => '#username']])
            ->add('passwordSelector', null, ['attr' => ['placeholder' => '#password']])
            ->add('submitSelector', null, ['attr' => ['placeholder' => '#submit']])
            ->add('save', SubmitType::class, ['attr' => ['class' => 'btn btn-primary']])
        ;

        $builder->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event) {
            /** @var Authenticator $authenticator */
            $authenticator = $event->getData();
            $form = $event->getForm();

            if ($authenticator && $authenticator->getId()) {
                $form->add('test', SubmitType::class);
            }
        });
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => SeleniumAuthenticator::class,
        ]);
    }
}
