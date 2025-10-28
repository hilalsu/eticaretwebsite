import { UserRole } from '../types/roles';

export function checkAccess(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole);
}

// Kullanım örneği:
// if (!checkAccess(currentUser.role, [UserRole.Admin])) {
//   return redirect('/403');
// } 