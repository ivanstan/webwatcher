<?php

namespace App\Twig;

use App\Entity\User;
use App\Entity\UserPreference;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Translation\TranslatorInterface;

class TimeExtension extends \Twig_Extension
{
    public static $units = [
        'y' => 'year',
        'm' => 'month',
        'd' => 'day',
        'h' => 'hour',
        'i' => 'minute',
        's' => 'second',
    ];

    private $translator;
    private $token;

    public function __construct(TranslatorInterface $translator = null, TokenStorageInterface $token)
    {
        $this->translator = $translator;
        $this->token = $token;
    }

    public function getFilters()
    {
        $filters = parent::getFilters();
        $filters[] = new \Twig_SimpleFilter('time_diff', [$this, 'diff'], ['needs_environment' => true]);
        $filters[] = new \Twig_SimpleFilter('datetime_format', [$this, 'dateTimeFormat'], ['needs_environment' => true]);

        return $filters;
    }

    public function getFunctions()
    {
        $functions = parent::getFunctions();
        $functions[] = new \Twig_SimpleFunction('datetime_format', [$this, 'dateTimeFormat'], ['needs_environment' => true]);

        return $functions;
    }

    public function diff(\Twig_Environment $env, $date, $now = null): string
    {
        $date = twig_date_converter($env, $date);
        $now = twig_date_converter($env, $now);

        $diff = $date->diff($now);

        foreach (self::$units as $attribute => $unit) {
            $count = $diff->$attribute;

            if (0 !== $count) {
                return $this->getPluralizedInterval($count, $diff->invert, $unit);
            }
        }

        return '';
    }

    public function dateTimeFormat(): string
    {
        if ($this->token->getToken()) {
            /** @var User $user */
            $user = $this->token->getToken()->getUser();

            if ($user instanceof User && $user->getPreference() && $user->getPreference()->getTimezone()) {
                return $user->getPreference()->getDateFormat() . ' ' . $user->getPreference()->getTimeFormat();
            }
        }

        return UserPreference::DEFAULT_DATE_FORMAT . ' ' . UserPreference::DEFAULT_TIME_FORMAT;
    }

    protected function getPluralizedInterval($count, $invert, $unit)
    {
        if ($this->translator) {
            $id = sprintf('diff.%s.%s', $invert ? 'in' : 'ago', $unit);

            return $this->translator->transChoice($id, $count, ['%count%' => $count], 'date');
        }

        if (1 !== $count) {
            $unit .= 's';
        }

        return $invert ? "in $count $unit" : "$count $unit ago";
    }
}
