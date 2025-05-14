import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function uploadToSupabase(buffer, filePath) {
  const { data, error } = await supabase.storage
    .from('course-media')
    .upload(filePath, buffer, {
      contentType: 'application/pdf',
      upsert: true
    });

  if (error) throw new Error('Error al subir PDF: ' + error.message);

  return `${process.env.SUPABASE_URL}/storage/v1/object/public/course-media/${filePath}`;
}
