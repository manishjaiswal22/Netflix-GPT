export const LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const BG_URL =
  "https://i.pinimg.com/originals/3b/88/8a/3b888ae33caddd009ea0262a6dace304.jpg";

export const USER_IMG = "https://imgs.search.brave.com/JLUb0ohmQyQgb9ctAxINfXQ8-XWijk5a_NqRYYg3BT8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9wcm9maWxl/LWljb24tc3ZnLWRv/d25sb2FkLXBuZy0y/MTg0MTM5LnBuZz9m/PXdlYnAmdz0xMjg"

export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_KEY
    }
};