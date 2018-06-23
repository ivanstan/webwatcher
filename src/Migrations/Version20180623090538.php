<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180623090538 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user_preference CHANGE timezone timezone VARCHAR(255) DEFAULT \'d/m/Y H:i:s\' NOT NULL');
        $this->addSql('ALTER TABLE project ADD owner INT DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EECF60E67C FOREIGN KEY (owner) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_2FB3D0EECF60E67C ON project (owner)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE project DROP FOREIGN KEY FK_2FB3D0EECF60E67C');
        $this->addSql('DROP INDEX IDX_2FB3D0EECF60E67C ON project');
        $this->addSql('ALTER TABLE project DROP owner');
        $this->addSql('ALTER TABLE user_preference CHANGE timezone timezone VARCHAR(255) DEFAULT \'d/m/Y h:m:s\' NOT NULL COLLATE utf8mb4_unicode_ci');
    }
}
