<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180610170602 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user_preference DROP FOREIGN KEY FK_FA0E76BF3FE997DE');
        $this->addSql('DROP INDEX UNIQ_FA0E76BF3FE997DE ON user_preference');
        $this->addSql('ALTER TABLE user_preference ADD timezone VARCHAR(255) DEFAULT NULL, DROP timezone_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user_preference ADD timezone_id INT DEFAULT NULL, DROP timezone');
        $this->addSql('ALTER TABLE user_preference ADD CONSTRAINT FK_FA0E76BF3FE997DE FOREIGN KEY (timezone_id) REFERENCES timezone (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_FA0E76BF3FE997DE ON user_preference (timezone_id)');
    }
}
