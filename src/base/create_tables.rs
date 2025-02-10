use sqlx::{Executor, PgPool};
use std::fs;
use std::path::Path;

pub async fn create_tables(pool: &PgPool) -> Result<(), sqlx::Error> {
    let sql_files = vec![
        "users_table.sql",
        "users_log_text_table.sql",
        "users_log_table.sql",
        "locations_table.sql",
        "events_table.sql",
        "event_cache_table.sql",
        "event_steps_table.sql",
        "event_x_steps_table.sql",
        "event_links_table.sql",
        "event_options_table.sql",
        "event_links_x_options_table.sql",
    ];

    for file_name in sql_files {
        let file_path = format!("src/base/sql/{}", file_name);
        println!("Выполняем SQL file: {}", &file_name );
        let sql = fs::read_to_string(Path::new(&file_path))
            .unwrap_or_else(|_| panic!("Не смог прочитать SQL file: {}", file_path));
        pool.execute(&*sql).await?;
    }

    Ok(())
}
