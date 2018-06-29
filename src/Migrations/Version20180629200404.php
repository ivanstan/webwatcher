<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180629200404 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE page_snapshot_seo (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) DEFAULT NULL, content LONGTEXT DEFAULT NULL, h1 VARCHAR(255) DEFAULT NULL, keywords LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:simple_array)\', meta_keywords LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:simple_array)\', meta_description LONGTEXT DEFAULT NULL, language VARCHAR(255) DEFAULT NULL, FULLTEXT INDEX IDX_35116D272B36786B (title), FULLTEXT INDEX IDX_35116D27FEC530A9 (content), FULLTEXT INDEX IDX_35116D27BD23F36A (h1), FULLTEXT INDEX IDX_35116D27AA5FB55E (keywords), FULLTEXT INDEX IDX_35116D27E4124D15 (meta_keywords), FULLTEXT INDEX IDX_35116D27C52374D1 (meta_description), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE page_snapshot_seo_link (page_snapshot_seo_id INT NOT NULL, link_id INT NOT NULL, INDEX IDX_6EF13ED1E1A0A078 (page_snapshot_seo_id), INDEX IDX_6EF13ED1ADA40271 (link_id), PRIMARY KEY(page_snapshot_seo_id, link_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE link (id INT AUTO_INCREMENT NOT NULL, type ENUM(\'link_internal\', \'link_external\', \'stylesheet\', \'javascript\', \'image\', \'resource\'), url VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE assert (id INT AUTO_INCREMENT NOT NULL, page_id INT NOT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_B1EF4FABC4663E4 (page_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE response_code_assert (id INT NOT NULL, code VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE element_exists_assert (id INT NOT NULL, selector VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE http_basic_authenticator (id INT NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE page_snapshot_seo_link ADD CONSTRAINT FK_6EF13ED1E1A0A078 FOREIGN KEY (page_snapshot_seo_id) REFERENCES page_snapshot_seo (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE page_snapshot_seo_link ADD CONSTRAINT FK_6EF13ED1ADA40271 FOREIGN KEY (link_id) REFERENCES link (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assert ADD CONSTRAINT FK_B1EF4FABC4663E4 FOREIGN KEY (page_id) REFERENCES page (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE response_code_assert ADD CONSTRAINT FK_6EB00D86BF396750 FOREIGN KEY (id) REFERENCES assert (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE element_exists_assert ADD CONSTRAINT FK_2C308CDBBF396750 FOREIGN KEY (id) REFERENCES assert (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE http_basic_authenticator ADD CONSTRAINT FK_2AD57B9ABF396750 FOREIGN KEY (id) REFERENCES authenticator (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE page_snapshot ADD seo_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE page_snapshot ADD CONSTRAINT FK_ACD2121597E3DD86 FOREIGN KEY (seo_id) REFERENCES page_snapshot_seo (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_ACD2121597E3DD86 ON page_snapshot (seo_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE page_snapshot DROP FOREIGN KEY FK_ACD2121597E3DD86');
        $this->addSql('ALTER TABLE page_snapshot_seo_link DROP FOREIGN KEY FK_6EF13ED1E1A0A078');
        $this->addSql('ALTER TABLE page_snapshot_seo_link DROP FOREIGN KEY FK_6EF13ED1ADA40271');
        $this->addSql('ALTER TABLE response_code_assert DROP FOREIGN KEY FK_6EB00D86BF396750');
        $this->addSql('ALTER TABLE element_exists_assert DROP FOREIGN KEY FK_2C308CDBBF396750');
        $this->addSql('DROP TABLE page_snapshot_seo');
        $this->addSql('DROP TABLE page_snapshot_seo_link');
        $this->addSql('DROP TABLE link');
        $this->addSql('DROP TABLE assert');
        $this->addSql('DROP TABLE response_code_assert');
        $this->addSql('DROP TABLE element_exists_assert');
        $this->addSql('DROP TABLE http_basic_authenticator');
        $this->addSql('DROP INDEX UNIQ_ACD2121597E3DD86 ON page_snapshot');
        $this->addSql('ALTER TABLE page_snapshot DROP seo_id');
    }
}
