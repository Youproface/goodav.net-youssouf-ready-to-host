#!/bin/bash
echo "Configuring PHP to use MailHog..."

# Backup current config
sudo cp /opt/homebrew/etc/php/8.4/php.ini /opt/homebrew/etc/php/8.4/php.ini.mailhog.backup

# Update SMTP settings
sudo sed -i '' 's/^SMTP = .*/SMTP = localhost/' /opt/homebrew/etc/php/8.4/php.ini
sudo sed -i '' 's/^smtp_port = .*/smtp_port = 1025/' /opt/homebrew/etc/php/8.4/php.ini
sudo sed -i '' 's/^sendmail_path = .*/sendmail_path =/' /opt/homebrew/etc/php/8.4/php.ini

echo "PHP configured to use MailHog!"
echo "Restart your web server or PHP processes for changes to take effect."
echo "MailHog web interface: http://localhost:8025"
