<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180827112204 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE resource_page CHANGE scheme scheme ENUM(\'http\', \'https\')');
        $this->addSql('ALTER TABLE test_result DROP INDEX UNIQ_84B3C63D7B39395E, ADD INDEX IDX_84B3C63D7B39395E (snapshot_id)');
        $this->addSql('ALTER TABLE assert_html_element_exists CHANGE selector_type selector_type ENUM(\'xpath\', \'css\')');
        $this->addSql('ALTER TABLE authenticator_selenium CHANGE scheme scheme ENUM(\'http\', \'https\')');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE assert_html_element_exists CHANGE selector_type selector_type VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE authenticator_selenium CHANGE scheme scheme VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE resource_page CHANGE scheme scheme VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE test_result DROP INDEX IDX_84B3C63D7B39395E, ADD UNIQUE INDEX UNIQ_84B3C63D7B39395E (snapshot_id)');
    }
}