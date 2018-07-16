<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180716150421 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, path VARCHAR(255) NOT NULL, tags JSON DEFAULT NULL COMMENT \'(DC2Type:json_array)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE http_snapshot_image (image_id INT NOT NULL, snapshot_id INT NOT NULL, INDEX IDX_520E501E3DA5256D (image_id), INDEX IDX_520E501E7B39395E (snapshot_id), PRIMARY KEY(image_id, snapshot_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE http_snapshot_image ADD CONSTRAINT FK_520E501E3DA5256D FOREIGN KEY (image_id) REFERENCES image (id)');
        $this->addSql('ALTER TABLE http_snapshot_image ADD CONSTRAINT FK_520E501E7B39395E FOREIGN KEY (snapshot_id) REFERENCES page_snapshot (id)');
        $this->addSql('ALTER TABLE project CHANGE base_url domain VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE page_snapshot DROP image');
        $this->addSql('ALTER TABLE page ADD protocol ENUM(\'http\', \'https\')');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE http_snapshot_image DROP FOREIGN KEY FK_520E501E3DA5256D');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE http_snapshot_image');
        $this->addSql('ALTER TABLE page DROP protocol');
        $this->addSql('ALTER TABLE page_snapshot ADD image VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE project CHANGE domain base_url VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci');
    }
}
