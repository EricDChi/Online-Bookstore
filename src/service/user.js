export function getMe() {
    let me = localStorage.getItem("me");
    if (me === null) {
        return null;
    }
    return me;
}

export function setMe() {
    localStorage.setItem("me", "admin");
}

export function logout() {
    localStorage.removeItem("me");
    window.location.href = "/login";
}