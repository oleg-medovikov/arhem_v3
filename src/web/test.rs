use rocket::response::content::{RawHtml, RawCss, RawJavaScript};
use std::fs;
use rocket::get;
//use rocket::uri;
//use rocket::response::Redirect;

//use crate::system::admin_token::{AdminToken, ApiTokenError};


#[get("/editor_test")]
pub fn editor_test() -> RawHtml<String> {
    let content = fs::read_to_string("static/test.html").expect("Unable to read file");
    RawHtml(content)
}

#[get("/editor_test.css")]
pub fn editor_test_css() -> RawCss<String> {
    let content = fs::read_to_string("static/css/test.css").expect("Unable to read file");
    RawCss(content)
}

#[get("/goSamples.js")]
pub fn editor_test_js() -> RawJavaScript<String> {
    let content = fs::read_to_string("static/js/goSamples.js").expect("Unable to read file");
    RawJavaScript(content)
}

#[get("/go.js")]
pub fn editor_go_js() -> RawJavaScript<String> {
    let content = fs::read_to_string("static/js/go.js").expect("Unable to read file");
    RawJavaScript(content)
}
