FROM php:8.3-fpm

# Cài đặt các thư viện hệ thống
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl

# Cài đặt PHP extensions (pdo_mysql để nối DB, gd cho ảnh, bcmath cho tính toán)
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Cài đặt Composer mới nhất
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Sửa cấu hình PHP-FPM để lắng nghe trên tất cả network interfaces
#RUN sed -i 's/^;listen = 127.0.0.1:9000/listen = 0.0.0.0:9000/' /usr/local/etc/php-fpm.d/www.conf

# Thiết lập thư mục làm việc mặc định
WORKDIR /var/www/html