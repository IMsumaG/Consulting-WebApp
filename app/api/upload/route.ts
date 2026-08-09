import { fail, requireAdmin } from "@/lib/api";

export async function POST() {
  try {
    await requireAdmin();
    return fail(
      "File uploads are not wired yet. Please connect Cloudinary or your storage provider first.",
      501,
    );
  } catch (error) {
    return fail("Unable to upload file", 500, error instanceof Error ? error.message : undefined);
  }
}
