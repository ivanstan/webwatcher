<?php

namespace App\Entity;

use App\Property\Id;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PageSnapshotSeoRepository")
 * @ORM\Table("page_snapshot_seo",
 *     indexes={
 *     @ORM\Index(columns={"title"}, flags={"fulltext"}),
 *     @ORM\Index(columns={"content"}, flags={"fulltext"}),
 *     @ORM\Index(columns={"h1"}, flags={"fulltext"}),
 *     @ORM\Index(columns={"keywords"}, flags={"fulltext"}),
 *     @ORM\Index(columns={"meta_keywords"}, flags={"fulltext"}),
 *     @ORM\Index(columns={"meta_description"}, flags={"fulltext"}),
 * })
 */
class PageSnapshotSeo
{
    use Id;

    /**
     * @var string $title
     * @ORM\Column(name="title", type="string", nullable=true)
     */
    protected $title;

    /**
     * @var string $content
     * @ORM\Column(name="content", type="text", nullable=true)
     */
    protected $content;

    /**
     * @var string $h1
     * @ORM\Column(name="h1", type="string", nullable=true)
     */
    protected $h1;

    /**
     * @var array $keywords
     * @ORM\Column(name="keywords", type="simple_array", nullable=true)
     */
    protected $keywords;

    /**
     * @var array $metaKeywords
     * @ORM\Column(name="meta_keywords", type="simple_array", nullable=true)
     */
    protected $metaKeywords;

    /**
     * @var string $description
     * @ORM\Column(name="meta_description", type="text", nullable=true)
     */
    protected $metaDescription;

    /**
     * @var string $language
     * @ORM\Column(name="language", type="string", nullable=true)
     */
    protected $language;

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): void
    {
        $this->content = $content;
    }

    public function getH1(): ?string
    {
        return $this->h1;
    }

    public function setH1(?string $h1): void
    {
        $this->h1 = $h1;
    }

    public function getKeywords(): array
    {
        return $this->keywords;
    }

    public function setKeywords(array $keywords): void
    {
        $this->keywords = $keywords;
    }

    public function getMetaKeywords(): array
    {
        return $this->metaKeywords;
    }

    public function setMetaKeywords(array $metaKeywords): void
    {
        $this->metaKeywords = $metaKeywords;
    }

    public function getMetaDescription(): ?string
    {
        return $this->metaDescription;
    }

    public function setMetaDescription(?string $metaDescription): void
    {
        $this->metaDescription = $metaDescription;
    }

    public function getLanguage(): ?string
    {
        return $this->language;
    }

    public function setLanguage(?string $language): void
    {
        $this->language = $language;
    }
}
