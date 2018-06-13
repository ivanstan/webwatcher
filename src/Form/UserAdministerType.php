<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
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
                'currentPassword',
                PasswordType::class,
                [
                    'required' => false,
                    'mapped' => false,
                    'constraints' => [
                        new UserPassword([
                            'groups' => 'profile_password',
                        ]),
                    ],
                ]
            )
            ->add(
                'newPassword',
                PasswordType::class,
                [
                    'required' => false,
                    'constraints' => new NotBlank([
                        'groups' => 'profile_password',
                        'message' => 'This value should not be blank.',
                    ]),
                    'mapped' => false,
                    'label' => 'New password',
                ]
            )
            ->add('roles')
            ->add('preference', UserPreferenceType::class)
        ;

        $builder->addEventListener(FormEvents::POST_SUBMIT, function (FormEvent $event) use ($options) {
            $user = $event->getData();
            $form = $event->getForm();
            $newPassword = $form->get('newPassword')->getData();

            if ($form->isSubmitted() && $form->isValid() && $newPassword) {
                $encoder  = $em = $options['security.encoder_factory'];
                $password = $encoder->encodePassword($newPassword, $user->getSalt());
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
