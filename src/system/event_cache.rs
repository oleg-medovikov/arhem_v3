use rocket::{
    request::{FromRequest, Outcome},
    http::Status,
    Request,
    response::content::RawHtml,
    response::status::Custom
};
use sqlx::PgPool;

#[derive(Debug)]
pub struct EventCache {
    pub event_id: String,
    pub checksum: String,
}

#[derive(Debug)]
pub enum EventCacheError {
    Missing,
    Invalid,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for EventCache {
    type Error = EventCacheError;

    async fn from_request(req: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        let pool = req.rocket().state::<PgPool>().expect("Database pool not found");
        let event_id = req.param("event_id");
        let etag = req.headers().get_one("X-Custom-ETag").map(|header| header.to_string());

        match (event_id, etag) {
            (Some(event_id), Some(etag)) => {
                let query = r#"SELECT checksum FROM event_cache WHERE event_id = $1;"#;
                match sqlx::query_scalar::<_, String>(query)
                    .bind(&event_id)
                    .fetch_one(pool)
                    .await
                {
                    Ok(checksum) => {
                        if checksum == etag {
                            Outcome::Forward(Custom(Status::NotModified, RawHtml::<String>::new("".to_string())))
                        } else {
                            Outcome::Success(EventCache { event_id, checksum })
                        }
                    }
                    Err(_) => Outcome::Success(EventCache { event_id, checksum: "".to_string() }),
                }
            }
            (Some(event_id), None) => {
                // If ETag is missing, we can still proceed with the request
                Outcome::Success(EventCache {
                    event_id,
                    checksum: "".to_string(),
                })
            }
            _ => Outcome::Error((Status::Unauthorized, EventCacheError::Missing)),
        }
    }
}
