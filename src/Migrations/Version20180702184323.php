<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180702184323 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE page_snapshot_link (link_id INT NOT NULL, page_snapshot_id INT NOT NULL, INDEX IDX_B5267CB7ADA40271 (link_id), INDEX IDX_B5267CB76C85672C (page_snapshot_id), PRIMARY KEY(link_id, page_snapshot_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE page_snapshot_link ADD CONSTRAINT FK_B5267CB7ADA40271 FOREIGN KEY (link_id) REFERENCES link (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE page_snapshot_link ADD CONSTRAINT FK_B5267CB76C85672C FOREIGN KEY (page_snapshot_id) REFERENCES page_snapshot (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE page_snapshot_seo_link');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE page_snapshot_seo_link (page_snapshot_seo_id INT NOT NULL, link_id INT NOT NULL, INDEX IDX_6EF13ED1E1A0A078 (page_snapshot_seo_id), INDEX IDX_6EF13ED1ADA40271 (link_id), PRIMARY KEY(page_snapshot_seo_id, link_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE page_snapshot_seo_link ADD CONSTRAINT FK_6EF13ED1ADA40271 FOREIGN KEY (link_id) REFERENCES link (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE page_snapshot_seo_link ADD CONSTRAINT FK_6EF13ED1E1A0A078 FOREIGN KEY (page_snapshot_seo_id) REFERENCES page_snapshot_seo (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE page_snapshot_link');
    }
}
