<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180713114237 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE element_exists_assert DROP FOREIGN KEY FK_2C308CDBBF396750');
        $this->addSql('ALTER TABLE response_code_assert DROP FOREIGN KEY FK_6EB00D86BF396750');
        $this->addSql('DROP TABLE assert');
        $this->addSql('DROP TABLE element_exists_assert');
        $this->addSql('DROP TABLE response_code_assert');
        $this->addSql('ALTER TABLE page_snapshot ADD har JSON DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE assert (id INT AUTO_INCREMENT NOT NULL, page_id INT NOT NULL, type VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, INDEX IDX_B1EF4FABC4663E4 (page_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE element_exists_assert (id INT NOT NULL, selector VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE response_code_assert (id INT NOT NULL, code INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE assert ADD CONSTRAINT FK_B1EF4FABC4663E4 FOREIGN KEY (page_id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE element_exists_assert ADD CONSTRAINT FK_2C308CDBBF396750 FOREIGN KEY (id) REFERENCES assert (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE response_code_assert ADD CONSTRAINT FK_6EB00D86BF396750 FOREIGN KEY (id) REFERENCES assert (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE page_snapshot DROP har');
    }
}
