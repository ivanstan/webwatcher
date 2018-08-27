<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180826154700 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE resource_page CHANGE scheme scheme ENUM(\'http\', \'https\')');
        $this->addSql('ALTER TABLE test_result DROP INDEX IDX_84B3C63D1E5D0459, ADD UNIQUE INDEX UNIQ_84B3C63D1E5D0459 (test_id)');
        $this->addSql('ALTER TABLE authenticator_selenium CHANGE scheme scheme ENUM(\'http\', \'https\')');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE authenticator_selenium CHANGE scheme scheme VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE resource_page CHANGE scheme scheme VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE test_result DROP INDEX UNIQ_84B3C63D1E5D0459, ADD INDEX IDX_84B3C63D1E5D0459 (test_id)');
    }
}
