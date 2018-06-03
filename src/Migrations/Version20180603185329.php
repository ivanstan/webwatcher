<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180603185329 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE project_snapshot (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, timestamp BIGINT NOT NULL, INDEX IDX_11039EEE166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE project_snapshot ADD CONSTRAINT FK_11039EEE166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE page_snapshot ADD project_snapshot_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE page_snapshot ADD CONSTRAINT FK_ACD21215B3F6CEA5 FOREIGN KEY (project_snapshot_id) REFERENCES project_snapshot (id) ON DELETE CASCADE');
        $this->addSql('CREATE INDEX IDX_ACD21215B3F6CEA5 ON page_snapshot (project_snapshot_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE page_snapshot DROP FOREIGN KEY FK_ACD21215B3F6CEA5');
        $this->addSql('DROP TABLE project_snapshot');
        $this->addSql('DROP INDEX IDX_ACD21215B3F6CEA5 ON page_snapshot');
        $this->addSql('ALTER TABLE page_snapshot DROP project_snapshot_id');
    }
}
