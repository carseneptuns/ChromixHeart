USE `ecommerce_mini`;

-- Demo accounts use the password: ChromixTest123!
-- These fixed demo usernames are safe to import repeatedly.
INSERT INTO `tbl_login`
  (`username`, `password`, `nama_lengkap`, `alamat`, `role`)
VALUES
  ('chx_demo_customer', '$2b$10$ck1K9Us9k1/ML2qm3l799eq7C99s53kU2UMxkkGv/0Q8Vs/h9hNTW',
   'Demo Customer', 'Jl. Contoh No. 10, Malang', 'customer'),
  ('chx_demo_admin', '$2b$10$ck1K9Us9k1/ML2qm3l799eq7C99s53kU2UMxkkGv/0Q8Vs/h9hNTW',
   'Demo Admin', 'Jl. Contoh No. 1, Malang', 'admin')
ON DUPLICATE KEY UPDATE
  `password` = VALUES(`password`),
  `nama_lengkap` = VALUES(`nama_lengkap`),
  `alamat` = VALUES(`alamat`),
  `role` = VALUES(`role`);

-- The image filenames below already exist in server/uploads/products.
INSERT INTO `tbl_produk`
  (`kode_produk`, `nama_produk`, `kategori`, `harga`, `stok`, `gambar`, `deskripsi`)
SELECT
  seed.`kode_produk`, seed.`nama_produk`, seed.`kategori`,
  seed.`harga`, seed.`stok`, seed.`gambar`, seed.`deskripsi`
FROM (
  SELECT 'CHX-DEMO-001' AS `kode_produk`, 'Demo Nocturne Corset' AS `nama_produk`,
    'Clothes' AS `kategori`, 450000.00 AS `harga`, 20 AS `stok`,
    'corset.png' AS `gambar`, 'Demo product for testing the Clothes category.' AS `deskripsi`
  UNION ALL
  SELECT 'CHX-DEMO-002', 'Demo Velvet Skirt', 'Skirt', 275000.00, 19,
    'velvet.png', 'Demo product for testing the Skirt category.'
  UNION ALL
  SELECT 'CHX-DEMO-003', 'Demo Midnight Boots', 'Boots', 825000.00, 18,
    'midnight boots.png', 'Demo product for testing the Shoes category.'
  UNION ALL
  SELECT 'CHX-DEMO-004', 'Demo Silver Jewelry', 'Jewelry', 185000.00, 19,
    'jewelry.png', 'Demo product for testing the Jewellery category.'
  UNION ALL
  SELECT 'CHX-DEMO-005', 'Demo Raven Accessories', 'Accessories', 350000.00, 20,
    'raven.png', 'Demo product for testing the Accessories category.'
) AS seed
WHERE NOT EXISTS (
  SELECT 1
  FROM `tbl_produk` existing
  WHERE existing.`kode_produk` = seed.`kode_produk`
);

-- Starter cart for the demo customer. Remove items through the app when finished.
INSERT INTO `tbl_cart` (`user_id`, `produk_id`, `quantity`)
SELECT user_row.`id`, product_row.`id`, seed.`quantity`
FROM (
  SELECT 'CHX-DEMO-001' AS `kode_produk`, 1 AS `quantity`
  UNION ALL
  SELECT 'CHX-DEMO-004', 1
  UNION ALL
  SELECT 'CHX-DEMO-005', 1
) AS seed
JOIN `tbl_login` user_row
  ON user_row.`username` = 'chx_demo_customer'
JOIN `tbl_produk` product_row
  ON product_row.`kode_produk` = seed.`kode_produk`
WHERE NOT EXISTS (
  SELECT 1
  FROM `tbl_cart` existing
  WHERE existing.`user_id` = user_row.`id`
    AND existing.`produk_id` = product_row.`id`
);

-- Sample orders cover the admin status flow and customer order history.
-- Statuses: Paid -> Approve -> Ship -> Completed; Rejected is terminal.
-- Payment proof filenames below already exist in server/uploads.
INSERT INTO `tbl_transaksi`
  (`user_id`, `tanggal`, `total`, `status`, `payment_method`, `alamat`, `proof_payment`)
SELECT
  user_row.`id`,
  NOW() - INTERVAL seed.`days_ago` DAY,
  product_row.`harga` * seed.`quantity`,
  seed.`status`,
  seed.`payment_method`,
  seed.`alamat`,
  seed.`proof_payment`
FROM (
  SELECT 'CHX-DEMO-001' AS `kode_produk`, 1 AS `quantity`, 1 AS `days_ago`,
    'Paid' AS `status`, 'Cash On Delivery' AS `payment_method`,
    'Jl. Contoh No. 10, Malang [DEMO-PAID]' AS `alamat`, NULL AS `proof_payment`
  UNION ALL
  SELECT 'CHX-DEMO-004', 1, 2, 'Approve', 'QRIS',
    'Jl. Contoh No. 10, Malang [DEMO-APPROVE]', '1784602472394.png'
  UNION ALL
  SELECT 'CHX-DEMO-003', 2, 3, 'Ship', 'Bank Transfer',
    'Jl. Contoh No. 10, Malang [DEMO-SHIP]', '1784602587879.png'
  UNION ALL
  SELECT 'CHX-DEMO-002', 1, 4, 'Completed', 'QRIS',
    'Jl. Contoh No. 10, Malang [DEMO-COMPLETED]', '1784605665346.jpeg'
  UNION ALL
  SELECT 'CHX-DEMO-005', 1, 5, 'Rejected', 'Cash On Delivery',
    'Jl. Contoh No. 10, Malang [DEMO-REJECTED]', NULL
) AS seed
JOIN `tbl_login` user_row
  ON user_row.`username` = 'chx_demo_customer'
JOIN `tbl_produk` product_row
  ON product_row.`kode_produk` = seed.`kode_produk`
WHERE NOT EXISTS (
  SELECT 1
  FROM `tbl_transaksi` existing
  WHERE existing.`user_id` = user_row.`id`
    AND existing.`alamat` = seed.`alamat`
);

INSERT INTO `detail_transaksi`
  (`transaksi_id`, `produk_id`, `quantity`, `harga`, `subtotal`)
SELECT
  transaction_row.`id`,
  product_row.`id`,
  seed.`quantity`,
  product_row.`harga`,
  product_row.`harga` * seed.`quantity`
FROM (
  SELECT 'CHX-DEMO-001' AS `kode_produk`, 1 AS `quantity`,
    'Jl. Contoh No. 10, Malang [DEMO-PAID]' AS `alamat`
  UNION ALL
  SELECT 'CHX-DEMO-004', 1, 'Jl. Contoh No. 10, Malang [DEMO-APPROVE]'
  UNION ALL
  SELECT 'CHX-DEMO-003', 2, 'Jl. Contoh No. 10, Malang [DEMO-SHIP]'
  UNION ALL
  SELECT 'CHX-DEMO-002', 1, 'Jl. Contoh No. 10, Malang [DEMO-COMPLETED]'
  UNION ALL
  SELECT 'CHX-DEMO-005', 1, 'Jl. Contoh No. 10, Malang [DEMO-REJECTED]'
) AS seed
JOIN `tbl_login` user_row
  ON user_row.`username` = 'chx_demo_customer'
JOIN `tbl_transaksi` transaction_row
  ON transaction_row.`user_id` = user_row.`id`
  AND transaction_row.`alamat` = seed.`alamat`
JOIN `tbl_produk` product_row
  ON product_row.`kode_produk` = seed.`kode_produk`
WHERE NOT EXISTS (
  SELECT 1
  FROM `detail_transaksi` existing
  WHERE existing.`transaksi_id` = transaction_row.`id`
    AND existing.`produk_id` = product_row.`id`
);

INSERT INTO `orders`
  (`customer_id`, `customer_name`, `payment_method`, `total`, `status`,
   `alamat`, `proof_payment`)
SELECT
  user_row.`id`,
  user_row.`nama_lengkap`,
  transaction_row.`payment_method`,
  transaction_row.`total`,
  transaction_row.`status`,
  transaction_row.`alamat`,
  transaction_row.`proof_payment`
FROM `tbl_transaksi` transaction_row
JOIN `tbl_login` user_row
  ON user_row.`id` = transaction_row.`user_id`
WHERE user_row.`username` = 'chx_demo_customer'
  AND transaction_row.`alamat` LIKE '%[DEMO-%'
  AND NOT EXISTS (
    SELECT 1
    FROM `orders` existing
    WHERE existing.`customer_id` = user_row.`id`
      AND existing.`alamat` = transaction_row.`alamat`
  );
