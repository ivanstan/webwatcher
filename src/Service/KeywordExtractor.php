<?php

namespace App\Service;

use StopWordFactory;
use TextAnalysis\Analysis\FreqDist;
use TextAnalysis\Analysis\Keywords\Rake;
use TextAnalysis\Documents\TokensDocument;
use TextAnalysis\Filters;
use TextAnalysis\Tokenizers\WhitespaceTokenizer;

class KeywordExtractor
{
    public const NGRAM_SIZE = 2;

    /**
     * @var \TextAnalysis\Interfaces\ITokenTransformation[]
     */
    private $tokenFilters = [];

    /**
     * @var \TextAnalysis\Interfaces\ITokenTransformation[]
     */
    private $contentFilters = [];

    private $stopWordsDir;

    public function __construct(string $projectDir)
    {
        $this->stopWordsDir = $projectDir . '/config/misc/stopwords';
    }

    public function filter(string $content): string
    {
        foreach ($this->contentFilters as $contentFilter) {
            $content = $contentFilter->transform($content);
        }

        return $content;
    }

    public function setContentFilters(): self
    {
        $lambdaFunc = function ($word) {
            return preg_replace('/[\x00-\x1F\x80-\xFF]/u', ' ', $word);
        };

        $this->contentFilters = [
            new Filters\StripTagsFilter(),
            new Filters\LowerCaseFilter(),
            new Filters\NumbersFilter(),
            new Filters\EmailFilter(),
            new Filters\UrlFilter(),
            new Filters\PossessiveNounFilter(),
            new Filters\QuotesFilter(),
            new Filters\PunctuationFilter(),
            new Filters\CharFilter(),
            new Filters\LambdaFilter($lambdaFunc),
            new Filters\WhitespaceFilter()
        ];

        return $this;
    }

    public function setTokenFilter(string $language): self
    {
        $file = $this->stopWordsDir . '/' . $language . '.list';

        if (!file_exists($file)) {
            return $this;
        }

        $stopWords = array_map('trim', file($file));

        $this->tokenFilters = [
            new Filters\StopWordsFilter($stopWords),
            new Filter\TokenLengthFilter(),
        ];

        return $this;
    }

    public function getKeywordScores(string $content): array
    {
        $tokens = (new WhitespaceTokenizer())->tokenize($content);
        $tokenDoc = new TokensDocument(array_map('strval', $tokens));
        unset($tokens);

        foreach ($this->tokenFilters as $filter) {
            $tokenDoc->applyTransformation($filter, false);
        }

        $size = count($tokenDoc->toArray());
        if ($size < self::NGRAM_SIZE) {
            return [];
        }

        $rake = new Rake($tokenDoc, self::NGRAM_SIZE);
        return $rake->getKeywordScores();
    }

    public function getOccurrenceNumber(string $content, $maxResults = 0): array
    {
        $content = $this->filter($content);

        $tokens = (new WhitespaceTokenizer())->tokenize($content);
        $tokenDoc = new TokensDocument(array_map('strval', $tokens));
        unset($tokens);

        foreach ($this->tokenFilters as $filter) {
            $tokenDoc->applyTransformation($filter);
        }

        try {
            $freqDist = new FreqDist($tokenDoc->toArray());
        } catch (\Exception $exception) {
            return [];
        }

        if ($maxResults) {
            return array_slice($freqDist->getKeyValuesByFrequency(), 0, $maxResults);
        }

        return $freqDist->getKeyValuesByFrequency();
    }
}
