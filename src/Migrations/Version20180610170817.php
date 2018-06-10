<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180610170817 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user_preference DROP FOREIGN KEY FK_FA0E76BF4B243A98');
        $this->addSql('DROP TABLE timezone');
        $this->addSql('ALTER TABLE user_preference DROP FOREIGN KEY FK_FA0E76BF4B243A98');
        $this->addSql('ALTER TABLE user_preference ADD CONSTRAINT FK_FA0E76BF4B243A98 FOREIGN KEY (date_time_format_id) REFERENCES date_time_format (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE timezone (id INT AUTO_INCREMENT NOT NULL, country_code VARCHAR(2) NOT NULL COLLATE utf8mb4_unicode_ci, name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_preference DROP FOREIGN KEY FK_FA0E76BF4B243A98');
        $this->addSql('ALTER TABLE user_preference ADD CONSTRAINT FK_FA0E76BF4B243A98 FOREIGN KEY (date_time_format_id) REFERENCES timezone (id)');
    }
}
