import supabase from './supabaseClient';

export class ImageUploadError extends Error {}

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const BUCKET = 'cms-images';

export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!supabase) {
    throw new ImageUploadError('Supabase is not configured — image upload is unavailable.');
  }
  if (!file.type.startsWith('image/')) {
    throw new ImageUploadError('Please choose an image file.');
  }
  if (file.size > MAX_BYTES) {
    throw new ImageUploadError('Image is too large (max 5MB).');
  }

  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: true,
    cacheControl: '3600',
  });
  if (error) {
    throw new ImageUploadError(error.message);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
