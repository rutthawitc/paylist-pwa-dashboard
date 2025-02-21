import { auth } from "@/auth";
import { createAuditLog } from "@/lib/audit-logger";

export async function GET() {
  const session = await auth();

  if (session?.user?.id) {
    // บันทึก audit log สำหรับการ logout
    await createAuditLog({
      userId: session.user.id,
      action: 'LOGOUT',
      resource: 'Users',
      details: {
        success: true
      }
    });
  }

  return Response.json({ success: true });
}
