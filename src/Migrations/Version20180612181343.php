<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180612181343 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE user_preference (id INT AUTO_INCREMENT NOT NULL, timezone VARCHAR(255) DEFAULT \'d/m/Y H:i:s\' NOT NULL, date_time_format VARCHAR(255) DEFAULT \'UTC\' NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, preference_id INT DEFAULT NULL, username VARCHAR(180) NOT NULL, username_canonical VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, email_canonical VARCHAR(180) NOT NULL, enabled TINYINT(1) NOT NULL, salt VARCHAR(255) DEFAULT NULL, password VARCHAR(255) NOT NULL, last_login DATETIME DEFAULT NULL, confirmation_token VARCHAR(180) DEFAULT NULL, password_requested_at DATETIME DEFAULT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', UNIQUE INDEX UNIQ_8D93D64992FC23A8 (username_canonical), UNIQUE INDEX UNIQ_8D93D649A0D96FBF (email_canonical), UNIQUE INDEX UNIQ_8D93D649C05FB297 (confirmation_token), UNIQUE INDEX UNIQ_8D93D649D81022C0 (preference_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project_snapshot (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, timestamp BIGINT NOT NULL, INDEX IDX_11039EEE166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, base_url VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE page_snapshot (id INT AUTO_INCREMENT NOT NULL, page_id INT NOT NULL, project_snapshot_id INT DEFAULT NULL, body LONGTEXT DEFAULT NULL, headers LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json_array)\', hash VARCHAR(255) DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, response_code INT NOT NULL, response_time DOUBLE PRECISION DEFAULT NULL, timestamp BIGINT NOT NULL, INDEX IDX_ACD21215C4663E4 (page_id), INDEX IDX_ACD21215B3F6CEA5 (project_snapshot_id), FULLTEXT INDEX IDX_ACD21215DBA80BB2 (body), FULLTEXT INDEX IDX_ACD21215F7034F85 (headers), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE page (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, path VARCHAR(255) DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_140AB620166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649D81022C0 FOREIGN KEY (preference_id) REFERENCES user_preference (id)');
        $this->addSql('ALTER TABLE project_snapshot ADD CONSTRAINT FK_11039EEE166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE page_snapshot ADD CONSTRAINT FK_ACD21215C4663E4 FOREIGN KEY (page_id) REFERENCES page (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE page_snapshot ADD CONSTRAINT FK_ACD21215B3F6CEA5 FOREIGN KEY (project_snapshot_id) REFERENCES project_snapshot (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE page ADD CONSTRAINT FK_140AB620166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649D81022C0');
        $this->addSql('ALTER TABLE page_snapshot DROP FOREIGN KEY FK_ACD21215B3F6CEA5');
        $this->addSql('ALTER TABLE project_snapshot DROP FOREIGN KEY FK_11039EEE166D1F9C');
        $this->addSql('ALTER TABLE page DROP FOREIGN KEY FK_140AB620166D1F9C');
        $this->addSql('ALTER TABLE page_snapshot DROP FOREIGN KEY FK_ACD21215C4663E4');
        $this->addSql('DROP TABLE user_preference');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE project_snapshot');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE page_snapshot');
        $this->addSql('DROP TABLE page');
    }
}
