-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(255) NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
    `last_login_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `display_name` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `display_name` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `permissions_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `user_id` BIGINT NOT NULL,
    `role_id` BIGINT NOT NULL,

    INDEX `user_roles_role_id_idx`(`role_id`),
    PRIMARY KEY (`user_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permissions` (
    `role_id` BIGINT NOT NULL,
    `permission_id` BIGINT NOT NULL,

    INDEX `role_permissions_permission_id_idx`(`permission_id`),
    PRIMARY KEY (`role_id`, `permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_tokens` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `token_hash` VARCHAR(255) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `revoked_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `refresh_tokens_token_hash_key`(`token_hash`),
    INDEX `refresh_tokens_user_id_idx`(`user_id`),
    INDEX `refresh_tokens_expires_at_idx`(`expires_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NULL,
    `module` VARCHAR(100) NOT NULL,
    `action` VARCHAR(100) NOT NULL,
    `target_type` VARCHAR(100) NULL,
    `target_id` BIGINT NULL,
    `old_data` JSON NULL,
    `new_data` JSON NULL,
    `ip_address` VARCHAR(50) NULL,
    `user_agent` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_logs_user_id_idx`(`user_id`),
    INDEX `audit_logs_module_idx`(`module`),
    INDEX `audit_logs_action_idx`(`action`),
    INDEX `audit_logs_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `original_name` VARCHAR(255) NOT NULL,
    `file_name` VARCHAR(255) NOT NULL,
    `mime_type` VARCHAR(100) NOT NULL,
    `file_size` BIGINT NOT NULL,
    `storage_path` VARCHAR(500) NOT NULL,
    `public_url` VARCHAR(500) NOT NULL,
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `alt_text_th` VARCHAR(255) NULL,
    `alt_text_en` VARCHAR(255) NULL,
    `uploaded_by` BIGINT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `media_uploaded_by_idx`(`uploaded_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pages` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `title_th` VARCHAR(255) NOT NULL,
    `title_en` VARCHAR(255) NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pages_code_key`(`code`),
    UNIQUE INDEX `pages_slug_key`(`slug`),
    INDEX `pages_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `page_sections` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `page_id` BIGINT NOT NULL,
    `section_key` VARCHAR(100) NOT NULL,
    `section_type` VARCHAR(100) NULL,
    `title_th` VARCHAR(255) NULL,
    `title_en` VARCHAR(255) NULL,
    `subtitle_th` VARCHAR(255) NULL,
    `subtitle_en` VARCHAR(255) NULL,
    `content_th` LONGTEXT NULL,
    `content_en` LONGTEXT NULL,
    `media_id` BIGINT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `page_sections_page_id_sort_order_idx`(`page_id`, `sort_order`),
    INDEX `page_sections_media_id_idx`(`media_id`),
    INDEX `page_sections_status_idx`(`status`),
    UNIQUE INDEX `page_sections_page_id_section_key_key`(`page_id`, `section_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menus` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `location` VARCHAR(50) NOT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'PUBLISHED',
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `menus_location_key`(`location`),
    INDEX `menus_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_items` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `menu_id` BIGINT NOT NULL,
    `parent_id` BIGINT NULL,
    `title_th` VARCHAR(255) NOT NULL,
    `title_en` VARCHAR(255) NULL,
    `url` VARCHAR(500) NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'PUBLISHED',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `menu_items_menu_id_sort_order_idx`(`menu_id`, `sort_order`),
    INDEX `menu_items_parent_id_idx`(`parent_id`),
    INDEX `menu_items_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `banners` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `page_code` VARCHAR(50) NOT NULL,
    `title_th` VARCHAR(255) NULL,
    `title_en` VARCHAR(255) NULL,
    `subtitle_th` VARCHAR(255) NULL,
    `subtitle_en` VARCHAR(255) NULL,
    `media_id` BIGINT NULL,
    `link_url` VARCHAR(500) NULL,
    `link_target` VARCHAR(20) NULL,
    `start_at` DATETIME(3) NULL,
    `end_at` DATETIME(3) NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `banners_page_code_status_idx`(`page_code`, `status`),
    INDEX `banners_media_id_idx`(`media_id`),
    INDEX `banners_sort_order_idx`(`sort_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_categories` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name_th` VARCHAR(255) NOT NULL,
    `name_en` VARCHAR(255) NULL,
    `slug` VARCHAR(100) NOT NULL,
    `icon_media_id` BIGINT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'PUBLISHED',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `business_categories_slug_key`(`slug`),
    INDEX `business_categories_icon_media_id_idx`(`icon_media_id`),
    INDEX `business_categories_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `businesses` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `category_id` BIGINT NOT NULL,
    `slug` VARCHAR(150) NOT NULL,
    `title_th` VARCHAR(255) NOT NULL,
    `title_en` VARCHAR(255) NULL,
    `subtitle_th` VARCHAR(255) NULL,
    `subtitle_en` VARCHAR(255) NULL,
    `description_th` LONGTEXT NULL,
    `description_en` LONGTEXT NULL,
    `video_url` VARCHAR(500) NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `published_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `businesses_slug_key`(`slug`),
    INDEX `businesses_category_id_idx`(`category_id`),
    INDEX `businesses_status_published_at_idx`(`status`, `published_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_media` (
    `business_id` BIGINT NOT NULL,
    `media_id` BIGINT NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `is_cover` BOOLEAN NOT NULL DEFAULT false,

    INDEX `business_media_media_id_idx`(`media_id`),
    PRIMARY KEY (`business_id`, `media_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `achievements` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title_th` VARCHAR(255) NOT NULL,
    `title_en` VARCHAR(255) NULL,
    `cover_media_id` BIGINT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `achievements_cover_media_id_idx`(`cover_media_id`),
    INDEX `achievements_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `achievement_items` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `achievement_id` BIGINT NOT NULL,
    `event_date` DATETIME(3) NULL,
    `title_th` VARCHAR(255) NULL,
    `title_en` VARCHAR(255) NULL,
    `detail_th` TEXT NULL,
    `detail_en` TEXT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `achievement_items_achievement_id_idx`(`achievement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `achievement_media` (
    `achievement_id` BIGINT NOT NULL,
    `media_id` BIGINT NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `achievement_media_media_id_idx`(`media_id`),
    PRIMARY KEY (`achievement_id`, `media_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news_events` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `type` ENUM('NEWS', 'EVENT') NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title_th` VARCHAR(255) NOT NULL,
    `title_en` VARCHAR(255) NULL,
    `summary_th` TEXT NULL,
    `summary_en` TEXT NULL,
    `content_th` LONGTEXT NULL,
    `content_en` LONGTEXT NULL,
    `event_date` DATETIME(3) NULL,
    `cover_media_id` BIGINT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `published_at` DATETIME(3) NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `news_events_slug_key`(`slug`),
    INDEX `news_events_type_idx`(`type`),
    INDEX `news_events_cover_media_id_idx`(`cover_media_id`),
    INDEX `news_events_status_published_at_idx`(`status`, `published_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news_event_media` (
    `news_event_id` BIGINT NOT NULL,
    `media_id` BIGINT NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `news_event_media_media_id_idx`(`media_id`),
    PRIMARY KEY (`news_event_id`, `media_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_categories` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name_th` VARCHAR(255) NOT NULL,
    `name_en` VARCHAR(255) NULL,
    `slug` VARCHAR(150) NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'PUBLISHED',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `project_categories_slug_key`(`slug`),
    INDEX `project_categories_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `category_id` BIGINT NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title_th` VARCHAR(255) NOT NULL,
    `title_en` VARCHAR(255) NULL,
    `segment_th` VARCHAR(255) NULL,
    `segment_en` VARCHAR(255) NULL,
    `project_owner_th` VARCHAR(255) NULL,
    `project_owner_en` VARCHAR(255) NULL,
    `project_value` DECIMAL(15, 2) NULL,
    `project_start_date` DATETIME(3) NULL,
    `project_completion_date` DATETIME(3) NULL,
    `cover_media_id` BIGINT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `published_at` DATETIME(3) NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `projects_slug_key`(`slug`),
    INDEX `projects_category_id_idx`(`category_id`),
    INDEX `projects_cover_media_id_idx`(`cover_media_id`),
    INDEX `projects_status_published_at_idx`(`status`, `published_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_media` (
    `project_id` BIGINT NOT NULL,
    `media_id` BIGINT NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `is_cover` BOOLEAN NOT NULL DEFAULT false,

    INDEX `project_media_media_id_idx`(`media_id`),
    PRIMARY KEY (`project_id`, `media_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_categories` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name_th` VARCHAR(255) NOT NULL,
    `name_en` VARCHAR(255) NULL,
    `slug` VARCHAR(150) NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'PUBLISHED',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `service_categories_slug_key`(`slug`),
    INDEX `service_categories_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `category_id` BIGINT NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title_th` VARCHAR(255) NOT NULL,
    `title_en` VARCHAR(255) NULL,
    `description_th` LONGTEXT NULL,
    `description_en` LONGTEXT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `services_slug_key`(`slug`),
    INDEX `services_category_id_idx`(`category_id`),
    INDEX `services_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_media` (
    `service_id` BIGINT NOT NULL,
    `media_id` BIGINT NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `is_cover` BOOLEAN NOT NULL DEFAULT false,

    INDEX `service_media_media_id_idx`(`media_id`),
    PRIMARY KEY (`service_id`, `media_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `career_posts` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `position_th` VARCHAR(255) NOT NULL,
    `position_en` VARCHAR(255) NULL,
    `description_th` LONGTEXT NULL,
    `description_en` LONGTEXT NULL,
    `requirements_th` LONGTEXT NULL,
    `requirements_en` LONGTEXT NULL,
    `location` VARCHAR(255) NULL,
    `employment_type` VARCHAR(100) NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `published_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `career_posts_slug_key`(`slug`),
    INDEX `career_posts_status_published_at_idx`(`status`, `published_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_settings` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `company_name_th` VARCHAR(255) NULL,
    `company_name_en` VARCHAR(255) NULL,
    `address_th` TEXT NULL,
    `address_en` TEXT NULL,
    `phone` VARCHAR(100) NULL,
    `email` VARCHAR(191) NULL,
    `map_url` VARCHAR(500) NULL,
    `facebook_url` VARCHAR(500) NULL,
    `line_url` VARCHAR(500) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_messages` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(100) NULL,
    `subject` VARCHAR(255) NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('NEW', 'READ', 'RESOLVED') NOT NULL DEFAULT 'NEW',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `contact_messages_status_idx`(`status`),
    INDEX `contact_messages_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `refresh_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_uploaded_by_fkey` FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `page_sections` ADD CONSTRAINT `page_sections_page_id_fkey` FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `page_sections` ADD CONSTRAINT `page_sections_media_id_fkey` FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu_items` ADD CONSTRAINT `menu_items_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `menus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu_items` ADD CONSTRAINT `menu_items_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `menu_items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `banners` ADD CONSTRAINT `banners_media_id_fkey` FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_categories` ADD CONSTRAINT `business_categories_icon_media_id_fkey` FOREIGN KEY (`icon_media_id`) REFERENCES `media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `businesses` ADD CONSTRAINT `businesses_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `business_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_media` ADD CONSTRAINT `business_media_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_media` ADD CONSTRAINT `business_media_media_id_fkey` FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `achievements` ADD CONSTRAINT `achievements_cover_media_id_fkey` FOREIGN KEY (`cover_media_id`) REFERENCES `media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `achievement_items` ADD CONSTRAINT `achievement_items_achievement_id_fkey` FOREIGN KEY (`achievement_id`) REFERENCES `achievements`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `achievement_media` ADD CONSTRAINT `achievement_media_achievement_id_fkey` FOREIGN KEY (`achievement_id`) REFERENCES `achievements`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `achievement_media` ADD CONSTRAINT `achievement_media_media_id_fkey` FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `news_events` ADD CONSTRAINT `news_events_cover_media_id_fkey` FOREIGN KEY (`cover_media_id`) REFERENCES `media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `news_event_media` ADD CONSTRAINT `news_event_media_news_event_id_fkey` FOREIGN KEY (`news_event_id`) REFERENCES `news_events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `news_event_media` ADD CONSTRAINT `news_event_media_media_id_fkey` FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `project_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_cover_media_id_fkey` FOREIGN KEY (`cover_media_id`) REFERENCES `media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_media` ADD CONSTRAINT `project_media_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_media` ADD CONSTRAINT `project_media_media_id_fkey` FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `service_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_media` ADD CONSTRAINT `service_media_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_media` ADD CONSTRAINT `service_media_media_id_fkey` FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
