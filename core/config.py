import os

# Database Settings
MONGO_HOST = os.getenv("DB_HOST", "mongo")
MONGO_PORT = os.getenv("DB_PORT", "27017")
MONGO_USER = os.getenv("DB_USER", "test")
MONGO_PASSWORD = os.getenv("DB_PASSWORD", "test")
MONGO_NAME = os.getenv("DB_NAME", "edr")

# App Settings
APP_DEBUG_MODE = os.getenv("APP_DEBUG_MODE", True)
APP_HOST = "0.0.0.0"

# ELK Settings
ES_HOST = os.getenv("ES_HOST", "elastic")
WINLOGBEAT_INDEX = os.getenv("WINLOGBEAT_INDEX", "winlogbeat-*")
ATTCK_YAML = "attck.yaml"
