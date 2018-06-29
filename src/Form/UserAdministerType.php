<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;

class UserAdministerType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username')
            ->add('email', EmailType::class, [
                'constraints' => [new Email()],
            ])
            ->add('enabled')
            ->add(
                'password',
                PasswordType::class,
                [
                    'required' => false,
                    'constraints' => new NotBlank([
                        'groups' => 'profile_password',
                        'message' => 'This value should not be blank.',
                    ]),
                    'mapped' => false,
                    'label' => 'Password',
                ]
            )
            ->add(
                'roles', ChoiceType::class, [
                    'choices' => [
                        'ROLE_ADMIN' => 'ROLE_ADMIN',
                        'ROLE_MANAGER' => 'ROLE_MANAGER',
                        'ROLE_VIEWER' => 'ROLE_VIEWER',
                        'ROLE_USER' => 'ROLE_USER',
                    ],
                    'expanded' => true,
                    'multiple' => true,
                ]
            )
            ->add('preference', UserPreferenceType::class)
        ;

        $builder->addEventListener(FormEvents::POST_SUBMIT, function (FormEvent $event) use ($options) {
            $user = $event->getData();
            $form = $event->getForm();
            $password = $form->get('password')->getData();

            if ($form->isSubmitted() && $form->isValid() && $password) {
                $encoder  = $em = $options['security.encoder_factory'];
                $password = $encoder->encodePassword($password, $user->getSalt());
                $user->setPassword($password);
                $user->setPlainPassword(null);

                $event->setData($user);
            }
        });
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
