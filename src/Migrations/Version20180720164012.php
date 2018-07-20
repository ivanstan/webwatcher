<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180720164012 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user_preference ADD date_format VARCHAR(255) DEFAULT \'d/m/Y \' NOT NULL, ADD time_format VARCHAR(255) DEFAULT \'H:i:s\' NOT NULL, DROP date_time_format, CHANGE timezone timezone VARCHAR(255) DEFAULT \'UTC\' NOT NULL');
        $this->addSql('ALTER TABLE resource_page CHANGE protocol protocol ENUM(\'http\', \'https\')');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE resource_page CHANGE protocol protocol VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE user_preference ADD date_time_format VARCHAR(255) DEFAULT \'UTC\' NOT NULL COLLATE utf8mb4_unicode_ci, DROP date_format, DROP time_format, CHANGE timezone timezone VARCHAR(255) DEFAULT \'d/m/Y H:i:s\' NOT NULL COLLATE utf8mb4_unicode_ci');
    }
}
