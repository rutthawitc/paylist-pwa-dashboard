/***
 * An array of routes that are publicly accessible
 * these routes will not require authentication
 * @type {string[]}
 */

export const publicRoutes = ['/'];

/***
 * An array of routes that are authenticated
 * these routes will require authentication
 * @type {string[]}
 */
export const authRoutes: string[] = ['/auth/login'];

/***
 * An array of routes of Admin Level that are authenticated
 * these routes will require authentication
 * @type {string[]}
 */
export const adminRoutes: string[] = [
  '/upload',
  '/recipient',
  '/members',
  '/dashboard',
  '/audit-logs', // เพิ่ม audit-logs route
  '/notifications', // เพิ่ม notifications route
];

/***
 * The prefix for API routes
 * Routes that start with this prefix will be handled by the API
 * @type {string}
 */
export const apiPrefix: string = '/api'; // แก้ไขให้ครอบคลุม API routes ทั้งหมด

/***
 * The default redirect after login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT: string = '/dashboard';
