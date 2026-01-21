import sqlite3
import os
from pathlib import Path

# Database file path
DB_PATH = Path(__file__).parent.parent / "data" / "app.db"

# Ensure data directory exists
DB_PATH.parent.mkdir(parents=True, exist_ok=True)


def get_db_connection():
    """Create and return a database connection."""
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row  # Enable column access by name
    return conn


def init_db():
    """Initialize the database with schema and seed data."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create responses table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Check if table is empty
    cursor.execute("SELECT COUNT(*) FROM responses")
    count = cursor.fetchone()[0]
    
    # Seed data if empty
    if count == 0:
        seed_data = [
            ("The automation journey begins with a single script.",),
            ("Testing is not just finding bugs, it's ensuring quality.",),
            ("CI/CD pipelines turn code into reliable software.",),
            ("Docker containers make deployment predictable.",),
            ("Playwright enables bulletproof end-to-end testing.",),
            ("Every commit should be potentially shippable.",),
            ("Automation frees developers to solve harder problems.",),
            ("Quality gates prevent bad code from reaching production.",),
        ]
        
        cursor.executemany(
            "INSERT INTO responses (text) VALUES (?)",
            seed_data
        )
        
        conn.commit()
        print(f"✅ Database initialized with {len(seed_data)} responses")
    else:
        print(f"✅ Database already contains {count} responses")
    
    conn.close()


def get_random_response():
    """Get a random response from the database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT text FROM responses
        ORDER BY RANDOM()
        LIMIT 1
    """)
    
    result = cursor.fetchone()
    conn.close()
    
    return result[0] if result else "No responses available"


def get_next_response():
    """Get the next response in sequence with rotation."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create counter table if it doesn't exist
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS response_counter (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            current_index INTEGER DEFAULT 0
        )
    """)
    
    # Initialize counter if empty
    cursor.execute("SELECT current_index FROM response_counter WHERE id = 1")
    result = cursor.fetchone()
    
    if result is None:
        cursor.execute("INSERT INTO response_counter (id, current_index) VALUES (1, 0)")
        current_index = 0
    else:
        current_index = result[0]
    
    # Get total count
    cursor.execute("SELECT COUNT(*) FROM responses")
    total_count = cursor.fetchone()[0]
    
    if total_count == 0:
        conn.close()
        return "No responses available"
    
    # Get response at current index
    cursor.execute("""
        SELECT text FROM responses
        ORDER BY id
        LIMIT 1 OFFSET ?
    """, (current_index,))
    
    result = cursor.fetchone()
    response_text = result[0] if result else "No responses available"
    
    # Update counter with rotation
    next_index = (current_index + 1) % total_count
    cursor.execute("""
        UPDATE response_counter
        SET current_index = ?
        WHERE id = 1
    """, (next_index,))
    
    conn.commit()
    conn.close()
    
    return response_text
