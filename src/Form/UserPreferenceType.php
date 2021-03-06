<?php

namespace App\Form;

use App\Entity\UserPreference;
use App\Utility\DateTimeFormatEnum;
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
            ->add('timezone', TimezoneType::class)
            ->add('dateFormat', ChoiceType::class, [
                'label' => 'Date Format',
                'choice_loader' => new CallbackChoiceLoader(function () {
                    return DateTimeFormatEnum::getDateFormats();
                }),
            ])
            ->add('timeFormat', ChoiceType::class, [
                'label' => 'Time Format',
                'choice_loader' => new CallbackChoiceLoader(function () {
                    return DateTimeFormatEnum::getTimeFormats();
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
