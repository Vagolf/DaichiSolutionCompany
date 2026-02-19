-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2026 at 09:28 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `daichisolution`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_accounts`
--

CREATE TABLE `admin_accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_accounts`
--

INSERT INTO `admin_accounts` (`id`, `username`, `password_hash`, `is_active`, `created_at`) VALUES
(4, 'admin', '$2y$10$FOnzl.SqV9Y/m4iba6C0Su5/llPBEJzLezoWwUZZwgB1RJc6lRucm', 1, '2026-02-02 06:37:32');

-- --------------------------------------------------------

--
-- Table structure for table `careers`
--

CREATE TABLE `careers` (
  `id` int(11) NOT NULL,
  `slug` varchar(80) NOT NULL,
  `title` varchar(150) NOT NULL,
  `short_desc` text DEFAULT NULL,
  `poster_path` varchar(255) DEFAULT NULL,
  `poster_file` varchar(255) DEFAULT NULL,
  `responsibilities` text DEFAULT NULL,
  `qualifications` text DEFAULT NULL,
  `apply_email` varchar(150) DEFAULT 'recruite@daichisolution.com',
  `apply_form_url` varchar(255) DEFAULT NULL,
  `apply_notes` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `careers`
--

INSERT INTO `careers` (`id`, `slug`, `title`, `short_desc`, `poster_path`, `poster_file`, `responsibilities`, `qualifications`, `apply_email`, `apply_form_url`, `apply_notes`, `is_active`, `updated_at`, `created_at`) VALUES
(2, 'admin-support', 'Admin Support', 'ตอบคำถามลูกค้า รับเรื่อง บันทึกข้อมูล ส่งต่องาน และติดตามสถานะ พร้อมดูแลเอกสารและสรุปงานเป็นระบบ', 'images/career/admin-support-career.png', NULL, 'ตอบคำถามและให้ข้อมูลเบื้องต้นกับลูกค้า/สาขา ผ่านโทรศัพท์ แชต หรือช่องทางที่บริษัทกำหนด\r\nรับเรื่องจากลูกค้าและทีมภายใน แล้วบันทึกข้อมูลให้ครบถ้วน ก่อนส่งต่องานให้ทีมที่เกี่ยวข้อง (เช่น ทีมช่าง, Service Desk, ฝ่ายจัดส่ง ฯลฯ)\r\nติดตามสถานะงานที่ส่งต่อไปแล้ว คอยอัปเดตความคืบหน้าให้ลูกค้าหรือผู้เกี่ยวข้องทราบจนจบเคส\r\nจัดทำและดูแลเอกสารต่าง ๆ เช่น ฟอร์มรับงาน, ใบขออนุมัติ, รายงานสรุปงานประจำวัน/ประจำเดือน\r\nช่วยจัดตารางนัดหมาย ประสานงานระหว่างทีมช่าง ทีมขาย และลูกค้า เพื่อให้การทำงานเป็นไปตามกำหนด\r\nสรุปข้อมูลจากงานที่ดูแล เช่น จำนวนเคส, ประเภทงาน, ปัญหาที่เจอบ่อย เพื่อให้ทีมสามารถนำไปใช้ปรับปรุงการทำงานต่อได้', 'ไม่จำกัดเพศ รักงานบริการ ชอบการประสานงานกับทั้งลูกค้าและทีมภายใน\r\nวุฒิการศึกษา ระดับ ม.6 / ปวช. / ปวส. หรือปริญญาตรี สาขาบริหารธุรกิจ, การจัดการ, คอมพิวเตอร์ธุรกิจ หรือสาขาใกล้เคียง\r\nใช้คอมพิวเตอร์พื้นฐานได้คล่อง เช่น Microsoft Office (Word, Excel, Outlook) และสามารถเรียนรู้ระบบภายในของบริษัทได้\r\nมีทักษะการสื่อสารที่ดีทั้งการพูดและการเขียน สามารถสรุปข้อมูลให้เข้าใจง่าย เป็นลำดับ\r\nทำงานละเอียดรอบคอบ จัดการงานหลายอย่างพร้อมกันได้ดี และตรงต่อเวลา\r\nหากมีประสบการณ์ด้านงานเอกสาร, งานประสานงาน, Call Center หรือ Customer Service จะพิจารณาเป็นพิเศษ', 'recruite@daichisolution.com', 'https://forms.gle/emNUgANWfV9pbQDq5', 'Resume / CV\r\nข้อมูลติดต่อกลับให้ครบถ้วน (เบอร์โทร, Line ID, อีเมล)\r\nระบุชัดเจนว่าต้องการสมัครตำแหน่ง: Admin Support', 1, '2026-02-02 04:29:29', '2026-02-02 04:29:29'),
(3, 'minor-repair-service', 'Minor (Repair Service)', 'ออกหน้างานซ่อมและบริการอุปกรณ์ POS ตามใบงาน วางแผนเส้นทาง รายงานผลการซ่อม (ต้องมีมอเตอร์ไซค์/ใบขับขี่)', 'images/career/minor-repair-career.png', NULL, 'ออกหน้างานตามสาขาและร้านลูกค้า เพื่อซ่อมและบริการอุปกรณ์ POS เช่น เครื่อง POS, เครื่องพิมพ์ใบเสร็จ, ลิ้นชักเก็บเงิน และอุปกรณ์ต่อพ่วงต่าง ๆ\r\nรับงานจากศูนย์/Service Desk ตามใบงาน วางแผนเส้นทาง และเข้าหน้างานตามเวลาที่นัดหมาย\r\nตรวจเช็กอาการเบื้องต้น เปลี่ยนอะไหล่ที่จำเป็น ทดสอบการทำงานให้ครบ ก่อนส่งมอบให้ลูกค้าใช้งานจริง\r\nบันทึกผลการซ่อม รายงานอาการเสีย อะไหล่ที่ใช้ และสถานะงานลงในระบบหรือแบบฟอร์มที่บริษัทกำหนด\r\nดูแลอุปกรณ์ เครื่องมือ และอะไหล่ที่ได้รับมอบหมายให้พร้อมใช้งานอยู่เสมอ', 'ไม่จำกัดเพศ มีใจรักงานบริการ และชอบงานออกหน้างาน\r\nวุฒิการศึกษา ม.6 / ปวช. / ปวส. หรือสูงกว่า (ช่างไฟฟ้า, อิเล็กทรอนิกส์, คอมพิวเตอร์ หรือเกี่ยวข้อง — ถ้ามี)\r\nซ่อมบำรุงอุปกรณ์ไฟฟ้า/ไอทีเบื้องต้นได้ ใช้เครื่องมือช่างพื้นฐานคล่อง\r\nต้องมีมอเตอร์ไซค์ส่วนตัว และขับขี่ได้ พร้อมใบขับขี่ถูกต้องตามกฎหมาย\r\nหากมีประสบการณ์งานภาคสนาม ซ่อม POS หรือ IT Support จะพิจารณาเป็นพิเศษ', 'recruite@daichisolution.com', 'https://forms.gle/emNUgANWfV9pbQDq5', 'Resume / CV\r\nระบุชัดเจนว่าต้องการสมัครตำแหน่ง: Minor Technician\r\nข้อมูลติดต่อกลับ (เบอร์โทร, Line ID, อีเมล)\r\nพื้นที่ที่สะดวกออกหน้างาน / จังหวัดที่สะดวก\r\nระบุความพร้อม: “มีมอเตอร์ไซค์/ใบขับขี่”', 1, '2026-02-02 04:29:29', '2026-02-02 04:29:29'),
(4, 'it-service-desk', 'IT Service Desk', 'รับแจ้งปัญหา POS/IT วิเคราะห์เบื้องต้น แก้ไขผ่านรีโมต/แนะนำขั้นตอน และประสานงานจนปิดเคส', 'images/career/service-desk-career.png', NULL, 'รับแจ้งปัญหาระบบ POS และงานไอทีจากสาขา/ลูกค้า ผ่านโทรศัพท์ แชต ตามช่องทางที่กำหนด\r\nถามอาการ วิเคราะห์ปัญหาเบื้องต้น จัดหมวดหมู่และลำดับความเร่งด่วน ก่อนบันทึกข้อมูลลงระบบ\r\nแก้ไขปัญหาเบื้องต้น เช่น รีโมตเข้าไปตรวจสอบระบบ แนะนำขั้นตอนการใช้งาน หรือช่วย Reset/ตั้งค่าระบบให้กลับมาทำงานได้\r\nประสานงานต่อให้ทีมเทคนิคที่เกี่ยวข้อง เมื่อต้องแก้ไขเชิงลึก\r\nติดตามสถานะเคส แจ้งความคืบหน้าให้ผู้ใช้งานทราบ จนกระทั่งปิดงานเรียบร้อย\r\nสรุปและบันทึกข้อมูลปัญหาที่เกิดขึ้นบ่อย เพื่อใช้พัฒนาคู่มือ, Knowledge Base หรือใช้ร่วมกับทีมอื่นในการวางแผนปรับปรุงระบบ', 'ไม่จำกัดเพศ รักงานบริการ และสื่อสารกับผู้อื่นได้ดี\r\nวุฒิการศึกษา ระดับ ปวส. / ปริญญาตรี สาขาคอมพิวเตอร์ธุรกิจ, วิทยาการคอมพิวเตอร์, ระบบสารสนเทศ หรือสาขาใกล้เคียง\r\nใช้งานคอมพิวเตอร์ได้คล่อง เช่น Microsoft Office, ระบบ Ticket และเครื่องมือรีโมตต่าง ๆ\r\nมีพื้นฐานด้านไอทีเบื้องต้น เช่น การตั้งค่า Windows, Network พื้นฐาน, การติดตั้งโปรแกรม และการแก้ไขปัญหาง่าย ๆ\r\nมีทักษะการสื่อสารที่ดี อธิบายเรื่องเทคนิคให้คนทั่วไปเข้าใจได้ ใจเย็น แก้ปัญหาเป็นขั้นตอน\r\nหากเคยทำงานด้าน IT Support / Help Desk / Call Center มาก่อน จะพิจารณาเป็นพิเศษ', 'recruite@daichisolution.com', 'https://forms.gle/emNUgANWfV9pbQDq5', 'Resume / CV\r\nข้อมูลติดต่อกลับ (เบอร์โทร, Line ID, อีเมล)\r\nระบุว่าต้องการสมัครตำแหน่ง: IT Service Desk\r\nประสบการณ์ที่เกี่ยวข้อง (ถ้ามี): IT Support / Help Desk / Call Center', 1, '2026-02-02 04:29:29', '2026-02-02 04:29:29'),
(5, 'stock-spare-parts', 'Stock & Spare Parts', 'ดูแลสต็อกสินค้าและอะไหล่ รับเข้า–จ่ายออก จัดเตรียมอะไหล่ให้ทีมซ่อม และจัดส่ง/ตรวจนับสต็อก', 'images/career/stock-spare-career.png', NULL, 'ดูแลสต็อกสินค้าและอะไหล่ที่เกี่ยวข้องกับงาน POS/IT เช่น เครื่อง POS, อุปกรณ์ต่อพ่วง, อะไหล่เครื่อง, อุปกรณ์เน็ตเวิร์ก ฯลฯ\r\nรับเข้า–จ่ายออกสินค้าและอะไหล่ตามใบเบิก/ใบรับของ และบันทึกข้อมูลลงระบบสต็อกให้ถูกต้อง\r\nจัดเตรียมและเบิกอะไหล่ให้ทีมซ่อม/ทีมภาคสนาม ตามใบงานหรือแผนงานที่ได้รับ\r\nแพ็กสินค้า/อะไหล่ให้เรียบร้อย พร้อมจัดส่งไปยังสาขา หรือส่งอุปกรณ์ไปซ่อมยังศูนย์/ผู้ให้บริการภายนอก\r\nรับอุปกรณ์ที่ซ่อมเสร็จกลับเข้าระบบ ตรวจสอบสภาพ และอัปเดตสถานะให้ถูกต้อง (เช่น กลับเข้าสต็อก / รอทิ้ง / รออนุมัติ)\r\nช่วยตรวจนับสต็อกประจำเดือน/ประจำไตรมาส เพื่อลดความคลาดเคลื่อนของจำนวนสินค้า\r\nจัดโซนเก็บสินค้าและอะไหล่ให้เป็นระเบียบ ง่ายต่อการค้นหา และลดโอกาสของหายหรือเสียหาย', 'ไม่จำกัดเพศ สุภาพ และทำงานเป็นทีมได้ดี\r\nวุฒิการศึกษา ระดับ ม.6 / ปวช. / ปวส. หรือเทียบเท่า\r\nใช้คอมพิวเตอร์พื้นฐานได้ เช่น โปรแกรม Excel / ระบบสต็อก หรือพร้อมเรียนรู้ระบบของบริษัท\r\nทำงานละเอียดรอบคอบ ตัวเลขไม่มั่วง่าย ตรวจเช็กซ้ำได้โดยไม่รำคาญ\r\nสามารถยก/เคลื่อนย้ายกล่องสินค้าและอุปกรณ์น้ำหนักปานกลางได้ (มีทีมช่วยในงานหนัก)\r\nหากเคยทำงานคลังสินค้า, stock, logistic, spare parts หรือมีประสบการณ์ด้านเอกสารสต็อกมาก่อน จะพิจารณาเป็นพิเศษ', 'recruite@daichisolution.com', 'https://forms.gle/emNUgANWfV9pbQDq5', 'Resume / CV\r\nข้อมูลติดต่อกลับให้ครบถ้วน (เบอร์โทร, Line ID, อีเมล)\r\nระบุชัดเจนว่าต้องการสมัครตำแหน่ง: Stock & Spare Parts', 1, '2026-02-02 06:38:12', '2026-02-02 04:29:29'),
(6, 'tops-pos-install', 'Tops – POS Install', 'ติดตั้ง/ถอนการติดตั้งระบบ POS ตามสาขา ตรวจนับซีเรียลและอุปกรณ์ประกอบ ทำรายงานผลหลังจบงาน', 'images/career/tops-pos-career.png', 'tops-pos-install-20260202055056-b333bc54.png', 'เข้าหน้างานตามสาขาของ Tops เพื่อ ติดตั้งและเซ็ตอัประบบ POS และอุปกรณ์ที่เกี่ยวข้อง เช่น เครื่อง POS, เครื่องพิมพ์ใบเสร็จ, ลิ้นชักเก็บเงิน, สแกนเนอร์บาร์โค้ด ฯลฯ\r\nเก็บเครื่อง / ถอนการติดตั้ง เมื่อมีการปิดปรับปรุง ย้ายจุด หรือคืนอุปกรณ์จากสาขา\r\nตรวจเช็กสภาพอุปกรณ์ก่อนติดตั้งและก่อนส่งกลับศูนย์ เช่น สภาพภายนอก การเชื่อมต่อ และการทำงานพื้นฐาน\r\nตรวจนับ/บันทึกเลขซีเรียล และอุปกรณ์ประกอบ ให้ครบชุดก่อนแพ็กส่งไปสาขา หรือส่งกลับเข้าสต็อก\r\nทำงานตามใบงาน/แผนงานที่ได้รับมอบหมาย และส่งรายงานผลหลังจบงาน เช่น รูปหน้างาน/แบบฟอร์มตรวจเช็ก', 'ไม่จำกัดเพศ สุภาพ เรียบร้อย และทำงานหน้างานกับพนักงานสาขาได้ดี\r\nวุฒิการศึกษา ระดับ ม.6 / ปวช. / ปวส. หรือเทียบเท่า (สายคอมพิวเตอร์, ช่างไฟฟ้า, อิเล็กทรอนิกส์ หรือสาขาใกล้เคียง จะพิจารณาเป็นพิเศษ)\r\nพอมีพื้นฐานการใช้งานคอมพิวเตอร์/อุปกรณ์ไอที และเข้าใจการต่อสาย/เชื่อมต่อพื้นฐาน\r\nทำงานนอกสถานที่ และเดินทางไปตามสาขาได้\r\nถ้าขับรถยนต์ได้ และมีใบขับขี่ จะพิจารณาเป็นพิเศษ', 'recruite@daichisolution.com', 'https://forms.gle/emNUgANWfV9pbQDq5', 'Resume / CV\r\nข้อมูลติดต่อกลับ (เบอร์โทร, Line ID, อีเมล)\r\nระบุว่าต้องการสมัครตำแหน่ง: Tops – POS Install\r\nระบุความพร้อม: เดินทางไปตามสาขาได้ / (ขับรถยนต์ได้ + มีใบขับขี่ ถ้ามี)', 1, '2026-02-02 04:52:14', '2026-02-02 04:29:29');

-- --------------------------------------------------------

--
-- Table structure for table `product_serials`
--

CREATE TABLE `product_serials` (
  `id` int(11) NOT NULL,
  `serial` varchar(50) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `model` varchar(100) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `warranty_start` date DEFAULT NULL,
  `warranty_end` date DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_serials`
--

INSERT INTO `product_serials` (`id`, `serial`, `product_name`, `model`, `purchase_date`, `warranty_start`, `warranty_end`, `notes`, `created_at`) VALUES
(1, 'DCS-PS-250001A', 'POS Terminal', 'DWISE-POS-X1', '2025-12-10', '2025-12-10', '2026-12-09', 'Demo data - In warranty', '2026-01-09 07:21:03'),
(2, 'DCS-PS-250002A', 'POS Terminal', 'DWISE-POS-X1', '2025-11-05', '2025-11-05', '2026-11-04', 'Installed at branch A', '2026-01-09 07:21:03'),
(3, 'DCS-PS-250003A', 'POS Terminal', 'DWISE-POS-X2', '2024-12-20', '2024-12-20', '2025-12-19', 'Expired warranty', '2026-01-09 07:21:03'),
(4, 'DCS-PS-250004A', 'POS Terminal', 'DWISE-POS-X2', '2025-06-15', '2025-06-15', '2026-06-14', 'In warranty', '2026-01-09 07:21:03'),
(5, 'DCS-PS-250005A', 'POS Terminal', 'DWISE-POS-X3', '2025-01-12', '2025-01-12', '2026-01-11', 'Near expiry', '2026-01-09 07:21:03'),
(6, 'DCS-SCN-250006B', 'Barcode Scanner', 'Zebra-DS2208', '2025-09-01', '2025-09-01', '2026-08-31', 'In warranty', '2026-01-09 07:21:03'),
(7, 'DCS-SCN-250007B', 'Barcode Scanner', 'Honeywell-7190g', '2024-08-10', '2024-08-10', '2025-08-09', 'Expired warranty', '2026-01-09 07:21:03'),
(8, 'DCS-SCN-250008B', 'Barcode Scanner', 'Youjie-HF600', '2025-10-22', '2025-10-22', '2026-10-21', 'In warranty', '2026-01-09 07:21:03'),
(9, 'DCS-SCN-250009B', 'Barcode Scanner', 'Zebra-DS2208', '2025-02-18', '2025-02-18', '2026-02-17', 'In warranty', '2026-01-09 07:21:03'),
(10, 'DCS-SCN-250010B', 'Barcode Scanner', 'Honeywell-7190g', '2023-12-01', '2023-12-01', '2024-11-30', 'Expired warranty', '2026-01-09 07:21:03'),
(11, 'DCS-PRN-250011C', 'Receipt Printer', 'Epson-TM-T82X', '2025-07-05', '2025-07-05', '2026-07-04', 'In warranty', '2026-01-09 07:21:03'),
(12, 'DCS-PRN-250012C', 'Receipt Printer', 'Epson-TM-T82X', '2024-04-12', '2024-04-12', '2025-04-11', 'Expired warranty', '2026-01-09 07:21:03'),
(13, 'DCS-PRN-250013C8', 'Receipt Printer', 'XPrinter-XP-58IIH', '2025-12-25', '2025-12-25', '2026-12-24', 'test', '2026-01-09 07:21:03'),
(14, 'DCS-PRN-250014C', 'Receipt Printer', 'XPrinter-XP-80C', '2025-03-09', '2025-03-09', '2026-03-08', 'In warranty', '2026-01-09 07:21:03'),
(15, 'DCS-PRN-250015C', 'Receipt Printer', 'Epson-TM-T20III', '2024-10-30', '2024-10-30', '2025-10-29', 'Expired warranty', '2026-01-09 07:21:03'),
(16, 'DCS-CDR-250016D', 'Cash Drawer', 'SENOR-V-GCD4242', '2025-08-14', '2025-08-14', '2026-08-13', 'In warranty', '2026-01-09 07:21:03'),
(17, 'DCS-CDR-250017D', 'Cash Drawer', 'SENOR-V-GCD4242', '2024-02-20', '2024-02-20', '2025-02-19', 'Expired warranty', '2026-01-09 07:21:03'),
(18, 'DCS-FPR-250018E', 'Fingerprint Reader', 'DigitalPersona-4500', '2025-05-28', '2025-05-28', '2026-05-27', 'In warranty', '2026-01-09 07:21:03'),
(19, 'DCS-NET-250019F', 'Network Switch', 'TPLink-TL-SG1016', '2025-01-05', '2025-01-05', '2028-01-04', '3-year warranty example', '2026-01-09 07:21:03'),
(20, 'DCS-UPS-250020G', 'UPS', 'APC-BVX700', '2024-07-17', '2024-07-17', '2026-07-16', 'In warranty', '2026-01-09 07:21:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_accounts`
--
ALTER TABLE `admin_accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `careers`
--
ALTER TABLE `careers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `product_serials`
--
ALTER TABLE `product_serials`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `serial` (`serial`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_accounts`
--
ALTER TABLE `admin_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `careers`
--
ALTER TABLE `careers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product_serials`
--
ALTER TABLE `product_serials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
