import { getCookie } from "./cookie";

export function checkAvailableLogin() {
  var token = getCookie("token");
  // Phải có api check xem token còn dùng được không
  if (token == null) {
    return false;
  } else {
    return true;
  }
}

export function checkRoleAdminAndEmployee() {
  const infoUser = getCookie("user");
  if (infoUser?.role === 'admin' || infoUser?.role === 'employee') {
    return true;
  } else {
    return false;
  }
}