use rocket::routes;

mod editor;
mod test;

pub fn web_routes() -> Vec<rocket::Route> {
    routes![
        editor::editor_login,
        editor::editor_page,
        editor::editor_register,
        test::editor_test,
        test::editor_test_css,
        test::editor_test_js,
        test::editor_go_js,
    ]
}
