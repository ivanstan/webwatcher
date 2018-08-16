<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180816112437 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE page_snapshot DROP headers, DROP response_code');
        $this->addSql('ALTER TABLE resource CHANGE name name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE resource_page CHANGE protocol protocol ENUM(\'http\', \'https\')');
        $this->addSql('ALTER TABLE project CHANGE name name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE selenium_authenticator CHANGE protocol protocol ENUM(\'http\', \'https\')');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE page_snapshot ADD headers JSON DEFAULT NULL COMMENT \'(DC2Type:json_array)\', ADD response_code INT NOT NULL');
        $this->addSql('ALTER TABLE project CHANGE name name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE resource CHANGE name name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE resource_page CHANGE protocol protocol VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE selenium_authenticator CHANGE protocol protocol VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
    }
}
