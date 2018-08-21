<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180821132856 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, domain VARCHAR(255) NOT NULL, name VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE authenticator (id INT AUTO_INCREMENT NOT NULL, project_id INT DEFAULT NULL, type VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_5AE4308F166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE snapshot (id INT AUTO_INCREMENT NOT NULL, page_id INT DEFAULT NULL, project_snapshot_id INT DEFAULT NULL, timestamp BIGINT DEFAULT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_2C4D1535C4663E4 (page_id), INDEX IDX_2C4D1535B3F6CEA5 (project_snapshot_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE snapshot_page (id INT NOT NULL, har JSON DEFAULT NULL, headers JSON DEFAULT NULL COMMENT \'(DC2Type:json_array)\', image VARCHAR(255) DEFAULT NULL, status INT DEFAULT NULL, time DOUBLE PRECISION DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE snapshot_project (id INT NOT NULL, project_id INT NOT NULL, INDEX IDX_14C70454166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE resource (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, name VARCHAR(255) DEFAULT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_BC91F416166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE resource_page (id INT NOT NULL, path VARCHAR(255) NOT NULL, scheme ENUM(\'http\', \'https\'), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, preference_id INT DEFAULT NULL, username VARCHAR(180) NOT NULL, username_canonical VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, email_canonical VARCHAR(180) NOT NULL, enabled TINYINT(1) NOT NULL, salt VARCHAR(255) DEFAULT NULL, password VARCHAR(255) NOT NULL, last_login DATETIME DEFAULT NULL, confirmation_token VARCHAR(180) DEFAULT NULL, password_requested_at DATETIME DEFAULT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', UNIQUE INDEX UNIQ_8D93D64992FC23A8 (username_canonical), UNIQUE INDEX UNIQ_8D93D649A0D96FBF (email_canonical), UNIQUE INDEX UNIQ_8D93D649C05FB297 (confirmation_token), UNIQUE INDEX UNIQ_8D93D649D81022C0 (preference_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_preference (id INT AUTO_INCREMENT NOT NULL, timezone VARCHAR(255) DEFAULT \'UTC\' NOT NULL, date_format VARCHAR(255) DEFAULT \'d/m/Y \' NOT NULL, time_format VARCHAR(255) DEFAULT \'H:i\' NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE authenticator_http_basic (id INT NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE authenticator_selenium (id INT NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, username_selector VARCHAR(255) NOT NULL, password_selector VARCHAR(255) NOT NULL, submit_selector VARCHAR(255) NOT NULL, path VARCHAR(255) NOT NULL, scheme ENUM(\'http\', \'https\'), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE authenticator ADD CONSTRAINT FK_5AE4308F166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE snapshot ADD CONSTRAINT FK_2C4D1535C4663E4 FOREIGN KEY (page_id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE snapshot ADD CONSTRAINT FK_2C4D1535B3F6CEA5 FOREIGN KEY (project_snapshot_id) REFERENCES snapshot_project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE snapshot_page ADD CONSTRAINT FK_65A235DBF396750 FOREIGN KEY (id) REFERENCES snapshot (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE snapshot_project ADD CONSTRAINT FK_14C70454166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE snapshot_project ADD CONSTRAINT FK_14C70454BF396750 FOREIGN KEY (id) REFERENCES snapshot (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F416166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE resource_page ADD CONSTRAINT FK_1B2A169ABF396750 FOREIGN KEY (id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649D81022C0 FOREIGN KEY (preference_id) REFERENCES user_preference (id)');
        $this->addSql('ALTER TABLE authenticator_http_basic ADD CONSTRAINT FK_AF9945F6BF396750 FOREIGN KEY (id) REFERENCES authenticator (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE authenticator_selenium ADD CONSTRAINT FK_5388D9BBF396750 FOREIGN KEY (id) REFERENCES authenticator (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE authenticator DROP FOREIGN KEY FK_5AE4308F166D1F9C');
        $this->addSql('ALTER TABLE snapshot_project DROP FOREIGN KEY FK_14C70454166D1F9C');
        $this->addSql('ALTER TABLE resource DROP FOREIGN KEY FK_BC91F416166D1F9C');
        $this->addSql('ALTER TABLE authenticator_http_basic DROP FOREIGN KEY FK_AF9945F6BF396750');
        $this->addSql('ALTER TABLE authenticator_selenium DROP FOREIGN KEY FK_5388D9BBF396750');
        $this->addSql('ALTER TABLE snapshot_page DROP FOREIGN KEY FK_65A235DBF396750');
        $this->addSql('ALTER TABLE snapshot_project DROP FOREIGN KEY FK_14C70454BF396750');
        $this->addSql('ALTER TABLE snapshot DROP FOREIGN KEY FK_2C4D1535B3F6CEA5');
        $this->addSql('ALTER TABLE snapshot DROP FOREIGN KEY FK_2C4D1535C4663E4');
        $this->addSql('ALTER TABLE resource_page DROP FOREIGN KEY FK_1B2A169ABF396750');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649D81022C0');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE authenticator');
        $this->addSql('DROP TABLE snapshot');
        $this->addSql('DROP TABLE snapshot_page');
        $this->addSql('DROP TABLE snapshot_project');
        $this->addSql('DROP TABLE resource');
        $this->addSql('DROP TABLE resource_page');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_preference');
        $this->addSql('DROP TABLE authenticator_http_basic');
        $this->addSql('DROP TABLE authenticator_selenium');
    }
}
