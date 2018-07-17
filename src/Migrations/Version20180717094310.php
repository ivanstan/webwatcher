<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180717094310 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, owner INT DEFAULT NULL, domain VARCHAR(255) NOT NULL, name VARCHAR(255) DEFAULT NULL, INDEX IDX_2FB3D0EECF60E67C (owner), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE authenticator (id INT AUTO_INCREMENT NOT NULL, project_id INT DEFAULT NULL, type VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_5AE4308F166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE snapshot (id INT AUTO_INCREMENT NOT NULL, page_id INT DEFAULT NULL, project_snapshot_id INT DEFAULT NULL, timestamp BIGINT DEFAULT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_2C4D1535C4663E4 (page_id), INDEX IDX_2C4D1535B3F6CEA5 (project_snapshot_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE page_snapshot (id INT NOT NULL, seo_id INT DEFAULT NULL, body LONGTEXT DEFAULT NULL, har JSON DEFAULT NULL, headers JSON DEFAULT NULL COMMENT \'(DC2Type:json_array)\', hash VARCHAR(255) DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, response_code INT NOT NULL, response_time DOUBLE PRECISION DEFAULT NULL, UNIQUE INDEX UNIQ_ACD2121597E3DD86 (seo_id), FULLTEXT INDEX IDX_ACD21215DBA80BB2 (body), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project_snapshot (id INT NOT NULL, project_id INT NOT NULL, INDEX IDX_11039EEE166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE resource (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, name VARCHAR(255) DEFAULT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_BC91F416166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE page (id INT NOT NULL, path VARCHAR(255) DEFAULT NULL, protocol ENUM(\'http\', \'https\'), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, preference_id INT DEFAULT NULL, username VARCHAR(180) NOT NULL, username_canonical VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, email_canonical VARCHAR(180) NOT NULL, enabled TINYINT(1) NOT NULL, salt VARCHAR(255) DEFAULT NULL, password VARCHAR(255) NOT NULL, last_login DATETIME DEFAULT NULL, confirmation_token VARCHAR(180) DEFAULT NULL, password_requested_at DATETIME DEFAULT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', UNIQUE INDEX UNIQ_8D93D64992FC23A8 (username_canonical), UNIQUE INDEX UNIQ_8D93D649A0D96FBF (email_canonical), UNIQUE INDEX UNIQ_8D93D649C05FB297 (confirmation_token), UNIQUE INDEX UNIQ_8D93D649D81022C0 (preference_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE page_snapshot_seo (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) DEFAULT NULL, content LONGTEXT DEFAULT NULL, h1 VARCHAR(255) DEFAULT NULL, keywords LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:simple_array)\', meta_keywords LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:simple_array)\', meta_description LONGTEXT DEFAULT NULL, language VARCHAR(255) DEFAULT NULL, FULLTEXT INDEX IDX_35116D272B36786B (title), FULLTEXT INDEX IDX_35116D27FEC530A9 (content), FULLTEXT INDEX IDX_35116D27BD23F36A (h1), FULLTEXT INDEX IDX_35116D27AA5FB55E (keywords), FULLTEXT INDEX IDX_35116D27E4124D15 (meta_keywords), FULLTEXT INDEX IDX_35116D27C52374D1 (meta_description), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE link (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(255) NOT NULL, url LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE page_snapshot_link (link_id INT NOT NULL, page_snapshot_id INT NOT NULL, INDEX IDX_B5267CB7ADA40271 (link_id), INDEX IDX_B5267CB76C85672C (page_snapshot_id), PRIMARY KEY(link_id, page_snapshot_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_preference (id INT AUTO_INCREMENT NOT NULL, timezone VARCHAR(255) DEFAULT \'d/m/Y H:i:s\' NOT NULL, date_time_format VARCHAR(255) DEFAULT \'UTC\' NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE http_basic_authenticator (id INT NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE selenium_authenticator (id INT NOT NULL, url VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, username_selector VARCHAR(255) NOT NULL, password_selector VARCHAR(255) NOT NULL, submit_selector VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, path VARCHAR(255) NOT NULL, tags JSON DEFAULT NULL COMMENT \'(DC2Type:json_array)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE http_snapshot_image (image_id INT NOT NULL, snapshot_id INT NOT NULL, INDEX IDX_520E501E3DA5256D (image_id), INDEX IDX_520E501E7B39395E (snapshot_id), PRIMARY KEY(image_id, snapshot_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EECF60E67C FOREIGN KEY (owner) REFERENCES user (id)');
        $this->addSql('ALTER TABLE authenticator ADD CONSTRAINT FK_5AE4308F166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE snapshot ADD CONSTRAINT FK_2C4D1535C4663E4 FOREIGN KEY (page_id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE snapshot ADD CONSTRAINT FK_2C4D1535B3F6CEA5 FOREIGN KEY (project_snapshot_id) REFERENCES project_snapshot (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE page_snapshot ADD CONSTRAINT FK_ACD2121597E3DD86 FOREIGN KEY (seo_id) REFERENCES page_snapshot_seo (id)');
        $this->addSql('ALTER TABLE page_snapshot ADD CONSTRAINT FK_ACD21215BF396750 FOREIGN KEY (id) REFERENCES snapshot (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_snapshot ADD CONSTRAINT FK_11039EEE166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_snapshot ADD CONSTRAINT FK_11039EEEBF396750 FOREIGN KEY (id) REFERENCES snapshot (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F416166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE page ADD CONSTRAINT FK_140AB620BF396750 FOREIGN KEY (id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649D81022C0 FOREIGN KEY (preference_id) REFERENCES user_preference (id)');
        $this->addSql('ALTER TABLE page_snapshot_link ADD CONSTRAINT FK_B5267CB7ADA40271 FOREIGN KEY (link_id) REFERENCES link (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE page_snapshot_link ADD CONSTRAINT FK_B5267CB76C85672C FOREIGN KEY (page_snapshot_id) REFERENCES page_snapshot (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE http_basic_authenticator ADD CONSTRAINT FK_2AD57B9ABF396750 FOREIGN KEY (id) REFERENCES authenticator (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE selenium_authenticator ADD CONSTRAINT FK_EEFC8B15BF396750 FOREIGN KEY (id) REFERENCES authenticator (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE http_snapshot_image ADD CONSTRAINT FK_520E501E3DA5256D FOREIGN KEY (image_id) REFERENCES image (id)');
        $this->addSql('ALTER TABLE http_snapshot_image ADD CONSTRAINT FK_520E501E7B39395E FOREIGN KEY (snapshot_id) REFERENCES page_snapshot (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE authenticator DROP FOREIGN KEY FK_5AE4308F166D1F9C');
        $this->addSql('ALTER TABLE project_snapshot DROP FOREIGN KEY FK_11039EEE166D1F9C');
        $this->addSql('ALTER TABLE resource DROP FOREIGN KEY FK_BC91F416166D1F9C');
        $this->addSql('ALTER TABLE http_basic_authenticator DROP FOREIGN KEY FK_2AD57B9ABF396750');
        $this->addSql('ALTER TABLE selenium_authenticator DROP FOREIGN KEY FK_EEFC8B15BF396750');
        $this->addSql('ALTER TABLE page_snapshot DROP FOREIGN KEY FK_ACD21215BF396750');
        $this->addSql('ALTER TABLE project_snapshot DROP FOREIGN KEY FK_11039EEEBF396750');
        $this->addSql('ALTER TABLE page_snapshot_link DROP FOREIGN KEY FK_B5267CB76C85672C');
        $this->addSql('ALTER TABLE http_snapshot_image DROP FOREIGN KEY FK_520E501E7B39395E');
        $this->addSql('ALTER TABLE snapshot DROP FOREIGN KEY FK_2C4D1535B3F6CEA5');
        $this->addSql('ALTER TABLE snapshot DROP FOREIGN KEY FK_2C4D1535C4663E4');
        $this->addSql('ALTER TABLE page DROP FOREIGN KEY FK_140AB620BF396750');
        $this->addSql('ALTER TABLE project DROP FOREIGN KEY FK_2FB3D0EECF60E67C');
        $this->addSql('ALTER TABLE page_snapshot DROP FOREIGN KEY FK_ACD2121597E3DD86');
        $this->addSql('ALTER TABLE page_snapshot_link DROP FOREIGN KEY FK_B5267CB7ADA40271');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649D81022C0');
        $this->addSql('ALTER TABLE http_snapshot_image DROP FOREIGN KEY FK_520E501E3DA5256D');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE authenticator');
        $this->addSql('DROP TABLE snapshot');
        $this->addSql('DROP TABLE page_snapshot');
        $this->addSql('DROP TABLE project_snapshot');
        $this->addSql('DROP TABLE resource');
        $this->addSql('DROP TABLE page');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE page_snapshot_seo');
        $this->addSql('DROP TABLE link');
        $this->addSql('DROP TABLE page_snapshot_link');
        $this->addSql('DROP TABLE user_preference');
        $this->addSql('DROP TABLE http_basic_authenticator');
        $this->addSql('DROP TABLE selenium_authenticator');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE http_snapshot_image');
    }
}
