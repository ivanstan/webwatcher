<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180826190207 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE assert_html_element_exists (id INT NOT NULL, selector VARCHAR(255) NOT NULL, selector_type ENUM(\'xpath\', \'css\'), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE assert_html_element_exists ADD CONSTRAINT FK_3F6C6F5BBF396750 FOREIGN KEY (id) REFERENCES assert (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assert_http_code CHANGE code status INT NOT NULL');
        $this->addSql('ALTER TABLE resource_page CHANGE scheme scheme ENUM(\'http\', \'https\')');
        $this->addSql('ALTER TABLE authenticator_selenium CHANGE scheme scheme ENUM(\'http\', \'https\')');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE assert_html_element_exists');
        $this->addSql('ALTER TABLE assert_http_code CHANGE status code INT NOT NULL');
        $this->addSql('ALTER TABLE authenticator_selenium CHANGE scheme scheme VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE resource_page CHANGE scheme scheme VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
    }
}
