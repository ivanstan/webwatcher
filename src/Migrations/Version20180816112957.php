<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180816112957 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE resource_http (id INT NOT NULL, path VARCHAR(255) NOT NULL, protocol ENUM(\'http\', \'https\'), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE snapshot_http (id INT NOT NULL, content LONGTEXT DEFAULT NULL, headers JSON DEFAULT NULL COMMENT \'(DC2Type:json_array)\', code INT NOT NULL, mime VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE resource_http ADD CONSTRAINT FK_9858AD08BF396750 FOREIGN KEY (id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE snapshot_http ADD CONSTRAINT FK_852898CFBF396750 FOREIGN KEY (id) REFERENCES snapshot (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE resource_page DROP path, DROP protocol');
        $this->addSql('ALTER TABLE selenium_authenticator CHANGE protocol protocol ENUM(\'http\', \'https\')');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE resource_http');
        $this->addSql('DROP TABLE snapshot_http');
        $this->addSql('ALTER TABLE resource_page ADD path VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, ADD protocol VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE selenium_authenticator CHANGE protocol protocol VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
    }
}
