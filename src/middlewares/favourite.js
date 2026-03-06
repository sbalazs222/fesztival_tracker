export function favourite(req, res, next) {
    const cookie = req.cookies.favourites || "";
    const favourites = cookie.split(";").filter(id => id !== "");
    req.favourites = favourites;
    next();
}