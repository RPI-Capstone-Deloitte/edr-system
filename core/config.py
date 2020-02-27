import os

# Database Settings
DB_HOST = os.getenv("DB_HOST", "mongo")
DB_PORT = os.getenv("DB_PORT", "27017")
DB_USER = os.getenv("DB_USER", "test")
DB_PASSWORD = os.getenv("DB_PASSWORD", "test")
DB_NAME = os.getenv("DB_NAME", "edr")

# App Settings
APP_DEBUG_MODE = os.getenv("APP_DEBUG_MODE", True)
APP_HOST = "0.0.0.0"
