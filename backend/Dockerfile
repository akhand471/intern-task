FROM php:8.2-apache

# Enable Apache mod_rewrite for CI4 routing
RUN a2enmod rewrite

# Install OS dependencies and PHP extensions for PostgreSQL & Intl
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libicu-dev \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql pgsql intl zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Update Apache configuration to point to CI4's public directory
RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Install dependencies (ignoring dev)
RUN composer install --no-dev --optimize-autoloader

# Set permissions for the writable folders
RUN chown -R www-data:www-data /var/www/html/writable /var/www/html/public

EXPOSE 80
CMD ["apache2-foreground"]
