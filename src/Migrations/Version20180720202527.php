<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180720202527 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP INDEX IDX_ACD21215DBA80BB2 ON page_snapshot');
        $this->addSql('ALTER TABLE page_snapshot DROP body, DROP hash');
        $this->addSql('ALTER TABLE resource_page CHANGE path path VARCHAR(255) NOT NULL, CHANGE protocol protocol ENUM(\'http\', \'https\')');
        $this->addSql('ALTER TABLE user_preference CHANGE time_format time_format VARCHAR(255) DEFAULT \'H:i\' NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE page_snapshot ADD body LONGTEXT DEFAULT NULL COLLATE utf8mb4_unicode_ci, ADD hash VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('CREATE FULLTEXT INDEX IDX_ACD21215DBA80BB2 ON page_snapshot (body)');
        $this->addSql('ALTER TABLE resource_page CHANGE path path VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, CHANGE protocol protocol VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE user_preference CHANGE time_format time_format VARCHAR(255) DEFAULT \'H:i:s\' NOT NULL COLLATE utf8mb4_unicode_ci');
    }
}
