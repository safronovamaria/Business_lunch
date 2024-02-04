CREATE TABLE menu(
    id SERIAL PRIMARY KEY,
    day VARCHAR(255)
)

CREATE TABLE dish(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255),
    menu_id INTEGER,
    FOREIGN KEY (menu_id) REFERENCES menu (id)
)