<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180720160217 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE resource_page (id INT NOT NULL, path VARCHAR(255) DEFAULT NULL, protocol ENUM(\'http\', \'https\'), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE authenticator_http_basic (id INT NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE resource_page ADD CONSTRAINT FK_1B2A169ABF396750 FOREIGN KEY (id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE authenticator_http_basic ADD CONSTRAINT FK_AF9945F6BF396750 FOREIGN KEY (id) REFERENCES authenticator (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE http_basic_authenticator');
        $this->addSql('DROP TABLE page');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE http_basic_authenticator (id INT NOT NULL, username VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, password VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE page (id INT NOT NULL, path VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, protocol VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE http_basic_authenticator ADD CONSTRAINT FK_2AD57B9ABF396750 FOREIGN KEY (id) REFERENCES authenticator (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE page ADD CONSTRAINT FK_140AB620BF396750 FOREIGN KEY (id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE resource_page');
        $this->addSql('DROP TABLE authenticator_http_basic');
    }
}
