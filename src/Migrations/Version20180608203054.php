<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180608203054 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE date_time_format (id INT AUTO_INCREMENT NOT NULL, format VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_preference (id INT AUTO_INCREMENT NOT NULL, timezone_id INT DEFAULT NULL, date_time_format_id INT DEFAULT NULL, UNIQUE INDEX UNIQ_FA0E76BF3FE997DE (timezone_id), UNIQUE INDEX UNIQ_FA0E76BF4B243A98 (date_time_format_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE timezone (id INT AUTO_INCREMENT NOT NULL, country_code VARCHAR(2) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_preference ADD CONSTRAINT FK_FA0E76BF3FE997DE FOREIGN KEY (timezone_id) REFERENCES timezone (id)');
        $this->addSql('ALTER TABLE user_preference ADD CONSTRAINT FK_FA0E76BF4B243A98 FOREIGN KEY (date_time_format_id) REFERENCES timezone (id)');
        $this->addSql('ALTER TABLE user ADD preference_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649D81022C0 FOREIGN KEY (preference_id) REFERENCES user_preference (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649D81022C0 ON user (preference_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649D81022C0');
        $this->addSql('ALTER TABLE user_preference DROP FOREIGN KEY FK_FA0E76BF3FE997DE');
        $this->addSql('ALTER TABLE user_preference DROP FOREIGN KEY FK_FA0E76BF4B243A98');
        $this->addSql('DROP TABLE date_time_format');
        $this->addSql('DROP TABLE user_preference');
        $this->addSql('DROP TABLE timezone');
        $this->addSql('DROP INDEX UNIQ_8D93D649D81022C0 ON user');
        $this->addSql('ALTER TABLE user DROP preference_id');
    }
}
