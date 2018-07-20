<?php

namespace App\Twig;

use App\Service\System\DateTimeService;
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
    private $timeDateService;

    public function __construct(TranslatorInterface $translator = null, DateTimeService $timeDateService)
    {
        $this->translator = $translator;
        $this->timeDateService = $timeDateService;
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
        return $this->timeDateService->getDateTimeFormat();
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
