<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180813120757 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE assert (id INT AUTO_INCREMENT NOT NULL, test_id INT NOT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_B1EF4FAB1E5D0459 (test_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE assert_http_code (id INT NOT NULL, code INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `action` (id INT AUTO_INCREMENT NOT NULL, group_id INT NOT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_47CC8C92FE54D947 (group_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE action_test (id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE action_group (id INT AUTO_INCREMENT NOT NULL, resource_id INT NOT NULL, INDEX IDX_8A0E887989329D25 (resource_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE assert ADD CONSTRAINT FK_B1EF4FAB1E5D0459 FOREIGN KEY (test_id) REFERENCES action_test (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assert_http_code ADD CONSTRAINT FK_1742092BBF396750 FOREIGN KEY (id) REFERENCES assert (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `action` ADD CONSTRAINT FK_47CC8C92FE54D947 FOREIGN KEY (group_id) REFERENCES action_group (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE action_test ADD CONSTRAINT FK_AE9EC502BF396750 FOREIGN KEY (id) REFERENCES `action` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE action_group ADD CONSTRAINT FK_8A0E887989329D25 FOREIGN KEY (resource_id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project CHANGE name name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE resource CHANGE name name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE resource_page CHANGE protocol protocol ENUM(\'http\', \'https\')');
        $this->addSql('ALTER TABLE selenium_authenticator CHANGE protocol protocol ENUM(\'http\', \'https\')');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE assert_http_code DROP FOREIGN KEY FK_1742092BBF396750');
        $this->addSql('ALTER TABLE action_test DROP FOREIGN KEY FK_AE9EC502BF396750');
        $this->addSql('ALTER TABLE assert DROP FOREIGN KEY FK_B1EF4FAB1E5D0459');
        $this->addSql('ALTER TABLE `action` DROP FOREIGN KEY FK_47CC8C92FE54D947');
        $this->addSql('DROP TABLE assert');
        $this->addSql('DROP TABLE assert_http_code');
        $this->addSql('DROP TABLE `action`');
        $this->addSql('DROP TABLE action_test');
        $this->addSql('DROP TABLE action_group');
        $this->addSql('ALTER TABLE project CHANGE name name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE resource CHANGE name name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE resource_page CHANGE protocol protocol VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE selenium_authenticator CHANGE protocol protocol VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
    }
}
