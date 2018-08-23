<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180823104747 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE test_result (id INT AUTO_INCREMENT NOT NULL, test_id INT NOT NULL, snapshot_id INT NOT NULL, comment LONGTEXT DEFAULT NULL, timestamp BIGINT DEFAULT NULL, INDEX IDX_84B3C63D1E5D0459 (test_id), INDEX IDX_84B3C63D7B39395E (snapshot_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE assert_result (id INT AUTO_INCREMENT NOT NULL, test_result_id INT NOT NULL, assert_id INT NOT NULL, pass TINYINT(1) DEFAULT NULL, comment LONGTEXT DEFAULT NULL, INDEX IDX_5EB1604C853A2189 (test_result_id), INDEX IDX_5EB1604CF438DB23 (assert_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE test_result ADD CONSTRAINT FK_84B3C63D1E5D0459 FOREIGN KEY (test_id) REFERENCES action_test (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE test_result ADD CONSTRAINT FK_84B3C63D7B39395E FOREIGN KEY (snapshot_id) REFERENCES snapshot (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assert_result ADD CONSTRAINT FK_5EB1604C853A2189 FOREIGN KEY (test_result_id) REFERENCES test_result (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assert_result ADD CONSTRAINT FK_5EB1604CF438DB23 FOREIGN KEY (assert_id) REFERENCES assert (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project DROP driver');
        $this->addSql('ALTER TABLE resource_page CHANGE scheme scheme ENUM(\'http\', \'https\')');
        $this->addSql('ALTER TABLE authenticator_selenium CHANGE scheme scheme ENUM(\'http\', \'https\')');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE assert_result DROP FOREIGN KEY FK_5EB1604C853A2189');
        $this->addSql('DROP TABLE test_result');
        $this->addSql('DROP TABLE assert_result');
        $this->addSql('ALTER TABLE authenticator_selenium CHANGE scheme scheme VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE project ADD driver VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE resource_page CHANGE scheme scheme VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
    }
}
