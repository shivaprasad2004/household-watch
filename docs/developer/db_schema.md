MySQL Database Schema for Household Watch
I'll convert the MongoDB schema to a MySQL relational schema while maintaining all the functionality and relationships.

Database Design Principles
Normalization: 3rd Normal Form to reduce data redundancy

Relationships: Proper foreign key constraints

Indexing: Optimized indexes for common query patterns

Data Types: Appropriate SQL data types for each field

Constraints: Data integrity through constraints and triggers

Database Schema
sql
-- Create database
CREATE DATABASE household_watch CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE household_watch;

-- Users table
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar TEXT,
    role ENUM('user', 'admin', 'superadmin') DEFAULT 'user',
    email_verified BOOLEAN DEFAULT FALSE,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    registration_ip VARCHAR(45),
    user_agent TEXT,
    referral_source VARCHAR(255),
    INDEX idx_email (email),
    INDEX idx_is_active (is_active),
    INDEX idx_created_at (created_at)
);

-- User preferences table
CREATE TABLE user_preferences (
    user_id BIGINT UNSIGNED PRIMARY KEY,
    theme ENUM('light', 'dark', 'auto') DEFAULT 'light',
    language CHAR(2) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'UTC',
    notifications_email BOOLEAN DEFAULT TRUE,
    notifications_push BOOLEAN DEFAULT TRUE,
    notifications_sms BOOLEAN DEFAULT FALSE,
    notifications_quiet_hours_enabled BOOLEAN DEFAULT FALSE,
    notifications_quiet_hours_start TIME DEFAULT '22:00:00',
    notifications_quiet_hours_end TIME DEFAULT '07:00:00',
    dashboard_layout ENUM('grid', 'list', 'cards') DEFAULT 'grid',
    dashboard_refresh_interval INT DEFAULT 30,
    dashboard_default_view VARCHAR(50) DEFAULT 'overview',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User security settings table
CREATE TABLE user_security (
    user_id BIGINT UNSIGNED PRIMARY KEY,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    last_password_change TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    failed_login_attempts INT DEFAULT 0,
    lockout_until TIMESTAMP NULL,
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Households table
CREATE TABLE households (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    timezone VARCHAR(50) DEFAULT 'UTC',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_is_active (is_active),
    INDEX idx_created_at (created_at)
);

-- Household address table
CREATE TABLE household_address (
    household_id BIGINT UNSIGNED PRIMARY KEY,
    street VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(20),
    country CHAR(2) DEFAULT 'US',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE,
    SPATIAL INDEX idx_coordinates (latitude, longitude)
);

-- Household settings table
CREATE TABLE household_settings (
    household_id BIGINT UNSIGNED PRIMARY KEY,
    privacy_allow_analytics BOOLEAN DEFAULT TRUE,
    privacy_share_with_family BOOLEAN DEFAULT TRUE,
    privacy_public_visibility BOOLEAN DEFAULT FALSE,
    security_require_two_factor BOOLEAN DEFAULT FALSE,
    security_allow_guest_access BOOLEAN DEFAULT TRUE,
    security_session_timeout INT DEFAULT 3600,
    security_max_failed_logins INT DEFAULT 5,
    notifications_global_enabled BOOLEAN DEFAULT TRUE,
    notifications_critical_only BOOLEAN DEFAULT FALSE,
    notifications_quiet_hours_enabled BOOLEAN DEFAULT TRUE,
    notifications_quiet_hours_start TIME DEFAULT '22:00:00',
    notifications_quiet_hours_end TIME DEFAULT '07:00:00',
    automation_enabled BOOLEAN DEFAULT TRUE,
    automation_learning_mode BOOLEAN DEFAULT TRUE,
    automation_auto_adjustments BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE
);

-- Household subscription table
CREATE TABLE household_subscription (
    household_id BIGINT UNSIGNED PRIMARY KEY,
    plan ENUM('free', 'basic', 'premium', 'enterprise') DEFAULT 'free',
    status ENUM('active', 'suspended', 'cancelled') DEFAULT 'active',
    billing_period ENUM('monthly', 'yearly') DEFAULT 'monthly',
    next_billing_date TIMESTAMP NULL,
    features JSON,
    FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE
);

-- Household members junction table
CREATE TABLE household_members (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    household_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    role ENUM('admin', 'member', 'guest', 'child') DEFAULT 'member',
    permissions_manage_devices BOOLEAN DEFAULT FALSE,
    permissions_view_analytics BOOLEAN DEFAULT TRUE,
    permissions_manage_members BOOLEAN DEFAULT FALSE,
    permissions_export_data BOOLEAN DEFAULT FALSE,
    areas JSON, -- Array of area IDs or ['*'] for all
    invited_by BIGINT UNSIGNED,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (invited_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_household_user (household_id, user_id),
    INDEX idx_household_id (household_id),
    INDEX idx_user_id (user_id),
    INDEX idx_is_active (is_active)
);

-- Rooms table
CREATE TABLE rooms (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    household_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    type ENUM('living_room', 'bedroom', 'kitchen', 'bathroom', 'garage', 'office', 'dining_room', 'outdoor') DEFAULT 'living_room',
    floor INT DEFAULT 1,
    area DECIMAL(10, 2), -- square feet
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE,
    INDEX idx_household_id (household_id),
    INDEX idx_type (type)
);

-- Devices table
CREATE TABLE devices (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    household_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    type ENUM('camera', 'sensor', 'smart_device', 'controller') NOT NULL,
    category ENUM('security', 'environmental', 'automation', 'entertainment') DEFAULT 'security',
    manufacturer VARCHAR(255),
    model VARCHAR(255),
    firmware_version VARCHAR(255),
    serial_number VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_household_id (household_id),
    INDEX idx_type (type),
    INDEX idx_category (category),
    INDEX idx_serial_number (serial_number),
    INDEX idx_is_active (is_active)
);

-- Device network table
CREATE TABLE device_network (
    device_id BIGINT UNSIGNED PRIMARY KEY,
    ip_address VARCHAR(45),
    mac_address VARCHAR(17) UNIQUE,
    port INT,
    protocol ENUM('http', 'https', 'rtsp', 'mqtt') DEFAULT 'http',
    connection_type ENUM('wifi', 'ethernet', 'cellular') DEFAULT 'wifi',
    signal_strength INT, -- dBm
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE,
    INDEX idx_ip_address (ip_address),
    INDEX idx_mac_address (mac_address)
);

-- Device location table
CREATE TABLE device_location (
    device_id BIGINT UNSIGNED PRIMARY KEY,
    room_id BIGINT UNSIGNED,
    position_x DECIMAL(10, 2), -- meters from reference point
    position_y DECIMAL(10, 2),
    position_z DECIMAL(10, 2), -- height
    mounting ENUM('ceiling', 'wall', 'table', 'floor') DEFAULT 'wall',
    azimuth INT, -- degrees from north
    elevation INT, -- degrees from horizontal
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL,
    INDEX idx_room_id (room_id)
);

-- Device capabilities table
CREATE TABLE device_capabilities (
    device_id BIGINT UNSIGNED PRIMARY KEY,
    video_resolution VARCHAR(20),
    video_frame_rate INT,
    video_compression VARCHAR(20),
    video_night_vision BOOLEAN DEFAULT FALSE,
    video_pan_tilt BOOLEAN DEFAULT FALSE,
    video_zoom_optical INT,
    video_zoom_digital INT,
    audio_recording BOOLEAN DEFAULT FALSE,
    audio_microphone BOOLEAN DEFAULT FALSE,
    audio_speaker BOOLEAN DEFAULT FALSE,
    audio_two_way BOOLEAN DEFAULT FALSE,
    sensor_motion BOOLEAN DEFAULT FALSE,
    sensor_temperature BOOLEAN DEFAULT FALSE,
    sensor_humidity BOOLEAN DEFAULT FALSE,
    sensor_light_level BOOLEAN DEFAULT FALSE,
    storage_local BOOLEAN DEFAULT FALSE,
    storage_cloud BOOLEAN DEFAULT FALSE,
    storage_capacity VARCHAR(20), -- e.g., "32GB"
    storage_retention INT, -- days
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

-- Device settings table
CREATE TABLE device_settings (
    device_id BIGINT UNSIGNED PRIMARY KEY,
    enabled BOOLEAN DEFAULT TRUE,
    recording_continuous BOOLEAN DEFAULT FALSE,
    recording_motion_triggered BOOLEAN DEFAULT TRUE,
    recording_quality ENUM('low', 'medium', 'high', 'ultra') DEFAULT 'high',
    recording_retention INT DEFAULT 30, -- days
    detection_motion_enabled BOOLEAN DEFAULT TRUE,
    detection_motion_sensitivity INT DEFAULT 7, -- 1-10 scale
    detection_sound_enabled BOOLEAN DEFAULT FALSE,
    detection_sound_threshold INT DEFAULT 5, -- 1-10 scale
    alerts_motion BOOLEAN DEFAULT TRUE,
    alerts_offline BOOLEAN DEFAULT TRUE,
    alerts_low_battery BOOLEAN DEFAULT TRUE,
    alerts_tampering BOOLEAN DEFAULT TRUE,
    privacy_recording_enabled BOOLEAN DEFAULT TRUE,
    privacy_face_blurring BOOLEAN DEFAULT FALSE,
    privacy_audio_recording BOOLEAN DEFAULT TRUE,
    privacy_share_with_family BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

-- Device status table
CREATE TABLE device_status (
    device_id BIGINT UNSIGNED PRIMARY KEY,
    online BOOLEAN DEFAULT FALSE,
    last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uptime BIGINT UNSIGNED, -- seconds since last restart
    battery_level INT, -- percentage
    signal_quality ENUM('poor', 'fair', 'good', 'excellent'),
    temperature DECIMAL(5, 2), -- device internal temperature (°C)
    cpu_usage INT, -- percentage
    memory_usage INT, -- percentage
    network_latency INT, -- milliseconds
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE,
    INDEX idx_online (online),
    INDEX idx_last_seen (last_seen)
);

-- Device authentication table
CREATE TABLE device_authentication (
    device_id BIGINT UNSIGNED PRIMARY KEY,
    username VARCHAR(255),
    password_hash VARCHAR(255),
    api_key VARCHAR(255),
    certificate TEXT,
    last_auth_success TIMESTAMP NULL,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

-- Device maintenance table
CREATE TABLE device_maintenance (
    device_id BIGINT UNSIGNED PRIMARY KEY,
    last_update TIMESTAMP NULL,
    update_schedule ENUM('auto', 'manual', 'scheduled') DEFAULT 'auto',
    next_maintenance_date TIMESTAMP NULL,
    warranty_expires TIMESTAMP NULL,
    support_contact VARCHAR(255),
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

-- Device tags table
CREATE TABLE device_tags (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    device_id BIGINT UNSIGNED NOT NULL,
    tag VARCHAR(255) NOT NULL,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE,
    UNIQUE KEY unique_device_tag (device_id, tag),
    INDEX idx_tag (tag)
);

-- Events table
CREATE TABLE events (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    household_id BIGINT UNSIGNED NOT NULL,
    device_id BIGINT UNSIGNED,
    type VARCHAR(50) NOT NULL,
    category ENUM('security', 'system', 'user_action', 'automation') DEFAULT 'security',
    severity ENUM('critical', 'high', 'medium', 'low', 'info') DEFAULT 'info',
    title VARCHAR(255) NOT NULL,
    message TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notified_at TIMESTAMP NULL,
    retention_period INT DEFAULT 90, -- days
    auto_delete BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE SET NULL,
    INDEX idx_household_id (household_id),
    INDEX idx_device_id (device_id),
    INDEX idx_timestamp (timestamp),
    INDEX idx_type (type),
    INDEX idx_category (category),
    INDEX idx_severity (severity),
    INDEX idx_is_active (is_active)
);

-- Event details table
CREATE TABLE event_details (
    event_id BIGINT UNSIGNED PRIMARY KEY,
    confidence DECIMAL(3, 2), -- 0-1
    duration DECIMAL(5, 2), -- seconds
    trigger_zone VARCHAR(255),
    object_type ENUM('person', 'vehicle', 'animal', 'unknown'),
    direction ENUM('entering', 'exiting', 'passing'),
    size ENUM('small', 'medium', 'large'),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Event location table
CREATE TABLE event_location (
    event_id BIGINT UNSIGNED PRIMARY KEY,
    room_id BIGINT UNSIGNED,
    room_name VARCHAR(255),
    coordinates_x DECIMAL(10, 2),
    coordinates_y DECIMAL(10, 2),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL
);

-- Event media table
CREATE TABLE event_media (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT UNSIGNED NOT NULL,
    type ENUM('image', 'video', 'audio') NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    size BIGINT UNSIGNED, -- bytes
    duration INT, -- seconds
    format VARCHAR(10),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    INDEX idx_event_id (event_id)
);

-- Event interactions table
CREATE TABLE event_interactions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    interaction_type ENUM('viewed', 'acknowledged') NOT NULL,
    interacted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    note TEXT,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_event_user_interaction (event_id, user_id, interaction_type),
    INDEX idx_event_id (event_id),
    INDEX idx_user_id (user_id)
);

-- Event triggered rules table
CREATE TABLE event_triggered_rules (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT UNSIGNED NOT NULL,
    rule_id BIGINT UNSIGNED, -- Foreign key to automation_rules table (if exists)
    rule_name VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    success BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    INDEX idx_event_id (event_id)
);

-- Notifications table
CREATE TABLE notifications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    event_id BIGINT UNSIGNED,
    household_id BIGINT UNSIGNED NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    priority ENUM('critical', 'high', 'medium', 'low') DEFAULT 'medium',
    status ENUM('pending', 'sent', 'delivered', 'read', 'dismissed') DEFAULT 'pending',
    dismissed_at TIMESTAMP NULL,
    scheduled_for TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rule_id BIGINT UNSIGNED, -- Foreign key to notification_rules table (if exists)
    group_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    retry_count INT DEFAULT 0,
    max_retries INT DEFAULT 3,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE SET NULL,
    FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_expires_at (expires_at)
);

-- Notification channels table
CREATE TABLE notification_channels (
    notification_id BIGINT UNSIGNED NOT NULL,
    channel ENUM('email', 'push', 'sms', 'inApp') NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    sent BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP NULL,
    delivered BOOLEAN DEFAULT FALSE,
    delivered_at TIMESTAMP NULL,
    opened BOOLEAN DEFAULT FALSE,
    clicked_at TIMESTAMP NULL,
    read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    PRIMARY KEY (notification_id, channel),
    FOREIGN KEY (notification_id) REFERENCES notifications(id) ON DELETE CASCADE,
    INDEX idx_channel (channel)
);

-- Notification actions table
CREATE TABLE notification_actions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    notification_id BIGINT UNSIGNED NOT NULL,
    label VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    target VARCHAR(255),
    FOREIGN KEY (notification_id) REFERENCES notifications(id) ON DELETE CASCADE,
    INDEX idx_notification_id (notification_id)
);

-- Device motion detection zones table
CREATE TABLE device_motion_zones (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    device_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    coordinates JSON NOT NULL, -- Array of coordinate pairs
    enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE,
    INDEX idx_device_id (device_id)
);

-- Device errors table
CREATE TABLE device_errors (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    device_id BIGINT UNSIGNED NOT NULL,
    error_code VARCHAR(50) NOT NULL,
    error_message TEXT,
    occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE,
    INDEX idx_device_id (device_id),
    INDEX idx_occurred_at (occurred_at)
);

-- User sessions table
CREATE TABLE user_sessions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
);

-- Analytics data table
CREATE TABLE analytics_data (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    household_id BIGINT UNSIGNED NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(12, 4) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    period ENUM('minute', 'hour', 'day', 'week', 'month') DEFAULT 'hour',
    dimensions JSON, -- Additional dimensions for the metric
    FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE,
    INDEX idx_household_id (household_id),
    INDEX idx_metric_name (metric_name),
    INDEX idx_recorded_at (recorded_at),
    INDEX idx_period (period)
);

-- System logs table
CREATE TABLE system_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    level ENUM('error', 'warn', 'info', 'debug') DEFAULT 'info',
    message TEXT NOT NULL,
    context JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_level (level),
    INDEX idx_created_at (created_at)
);

-- Create a view for device status overview
CREATE VIEW device_status_overview AS
SELECT 
    d.id,
    d.name,
    d.type,
    d.category,
    d.manufacturer,
    d.model,
    h.name as household_name,
    r.name as room_name,
    ds.online,
    ds.last_seen,
    ds.battery_level,
    ds.signal_quality,
    ds.updated_at as status_updated
FROM devices d
JOIN households h ON d.household_id = h.id
LEFT JOIN device_location dl ON d.id = dl.device_id
LEFT JOIN rooms r ON dl.room_id = r.id
LEFT JOIN device_status ds ON d.id = ds.device_id
WHERE d.is_active = TRUE;

-- Create a view for recent events
CREATE VIEW recent_events AS
SELECT 
    e.id,
    e.type,
    e.category,
    e.severity,
    e.title,
    e.message,
    e.timestamp,
    h.name as household_name,
    d.name as device_name,
    r.name as room_name,
    COUNT(DISTINCT ei.user_id) as acknowledged_by_count
FROM events e
JOIN households h ON e.household_id = h.id
LEFT JOIN devices d ON e.device_id = d.id
LEFT JOIN event_location el ON e.id = el.event_id
LEFT JOIN rooms r ON el.room_id = r.id
LEFT JOIN event_interactions ei ON e.id = ei.event_id AND ei.interaction_type = 'acknowledged'
WHERE e.is_active = TRUE
GROUP BY e.id;

-- Create events for data retention
DELIMITER //

CREATE EVENT IF NOT EXISTS cleanup_old_events
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    DELETE FROM events 
    WHERE auto_delete = TRUE 
    AND timestamp < DATE_SUB(NOW(), INTERVAL retention_period DAY);
END //

CREATE EVENT IF NOT EXISTS cleanup_old_notifications
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    DELETE FROM notifications 
    WHERE expires_at IS NOT NULL 
    AND expires_at < NOW();
END //

DELIMITER ;
Migration Considerations
Data Migration Strategy
Export MongoDB data to JSON format

Transform data to match MySQL schema

Import data using MySQL import tools

Verify data integrity with validation scripts

Application Changes
Update database drivers from MongoDB to MySQL

Rewrite queries to use SQL syntax

Update data access layers to use relational patterns

Implement connection pooling for MySQL

Performance Optimization
Proper indexing based on query patterns

Query optimization using EXPLAIN

Database normalization to reduce redundancy

Caching strategy with Redis for frequently accessed data

Backup and Recovery
Regular backups using mysqldump

Binary log replication for point-in-time recovery

Database clustering for high availability

Monitoring and alerting for database health