CREATE DATABASE IF NOT EXISTS `ecommerce_mini`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `ecommerce_mini`;

CREATE TABLE IF NOT EXISTS `tbl_login` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `nama_lengkap` VARCHAR(150) DEFAULT NULL,
  `alamat` TEXT DEFAULT NULL,
  `role` VARCHAR(20) NOT NULL DEFAULT 'customer',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tbl_login_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `tbl_produk` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `kode_produk` VARCHAR(100) DEFAULT NULL,
  `nama_produk` VARCHAR(255) NOT NULL,
  `kategori` VARCHAR(100) DEFAULT NULL,
  `harga` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `stok` INT UNSIGNED NOT NULL DEFAULT 0,
  `gambar` VARCHAR(255) NOT NULL DEFAULT '',
  `deskripsi` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_tbl_produk_kategori` (`kategori`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `tbl_cart` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `produk_id` INT UNSIGNED NOT NULL,
  `quantity` INT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tbl_cart_user_produk` (`user_id`, `produk_id`),
  KEY `idx_tbl_cart_produk` (`produk_id`),
  CONSTRAINT `fk_tbl_cart_user`
    FOREIGN KEY (`user_id`) REFERENCES `tbl_login` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tbl_cart_produk`
    FOREIGN KEY (`produk_id`) REFERENCES `tbl_produk` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `tbl_transaksi` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `tanggal` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `status` VARCHAR(30) NOT NULL DEFAULT 'Pending',
  `payment_method` VARCHAR(100) DEFAULT NULL,
  `alamat` TEXT DEFAULT NULL,
  `proof_payment` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_tbl_transaksi_user` (`user_id`),
  KEY `idx_tbl_transaksi_status` (`status`),
  CONSTRAINT `fk_tbl_transaksi_user`
    FOREIGN KEY (`user_id`) REFERENCES `tbl_login` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `detail_transaksi` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `transaksi_id` INT UNSIGNED NOT NULL,
  `produk_id` INT UNSIGNED NOT NULL,
  `quantity` INT UNSIGNED NOT NULL,
  `harga` DECIMAL(15,2) NOT NULL,
  `subtotal` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_detail_transaksi_transaksi` (`transaksi_id`),
  KEY `idx_detail_transaksi_produk` (`produk_id`),
  CONSTRAINT `fk_detail_transaksi_transaksi`
    FOREIGN KEY (`transaksi_id`) REFERENCES `tbl_transaksi` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_detail_transaksi_produk`
    FOREIGN KEY (`produk_id`) REFERENCES `tbl_produk` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` INT UNSIGNED NOT NULL,
  `customer_name` VARCHAR(150) NOT NULL,
  `payment_method` VARCHAR(100) NOT NULL,
  `total` DECIMAL(15,2) NOT NULL,
  `status` VARCHAR(30) NOT NULL DEFAULT 'Paid',
  `alamat` TEXT DEFAULT NULL,
  `proof_payment` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_orders_customer` (`customer_id`),
  KEY `idx_orders_created_at` (`created_at`),
  CONSTRAINT `fk_orders_customer`
    FOREIGN KEY (`customer_id`) REFERENCES `tbl_login` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
