<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;

class UserAdministerType extends AbstractType
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username')
            ->add('email', EmailType::class, [
                'constraints' => [new Email()],
            ])
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
            ->add('enabled')
            ->add(
                'roles', ChoiceType::class, [
                    'choices' => [
                        'ADMIN' => 'ROLE_ADMIN',
                        'MANAGER' => 'ROLE_MANAGER',
                        'VIEWER' => 'ROLE_VIEWER',
                        'USER' => 'ROLE_USER',
                    ],
                    'expanded' => true,
                    'multiple' => true,
                ]
            )
            ->add('preference', UserPreferenceType::class, ['label' => false])
        ;

        $builder->addEventListener(FormEvents::POST_SUBMIT, function (FormEvent $event) use ($options) {
            $user = $event->getData();
            $form = $event->getForm();
            $password = $form->get('password')->getData();

            if ($form->isSubmitted() && $form->isValid() && $password) {
                $password = $this->encoder->encodePassword($user, $password);
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
