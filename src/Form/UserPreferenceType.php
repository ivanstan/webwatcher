<?php

namespace App\Form;

use App\Entity\UserPreference;
use App\Util\DateTimeFormatEnum;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\ChoiceList\Loader\CallbackChoiceLoader;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TimezoneType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserPreferenceType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('timezone', TimezoneType::class, [
                'data' => UserPreference::DEFAULT_TIMEZONE,
            ])
            ->add('datetimeFormat', ChoiceType::class, [
                'data' => UserPreference::DEFAULT_DATETIME_FORMAT,
                'choice_loader' => new CallbackChoiceLoader(function () {
                    return DateTimeFormatEnum::getFormats();
                }),
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => UserPreference::class,
        ]);
    }
}
