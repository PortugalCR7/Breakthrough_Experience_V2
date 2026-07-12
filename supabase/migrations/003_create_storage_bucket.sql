-- Migration: 003_create_storage_bucket
-- Creates a public storage bucket for CMS-uploaded images, with RLS for
-- public read / authenticated write, mirroring page_sections' policy shape.

insert into storage.buckets (id, name, public)
values ('cms-images', 'cms-images', true)
on conflict (id) do nothing;

-- Public (anon) can read any object in this bucket — images render on the public site
create policy "cms_images_public_select"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'cms-images');

-- Only authenticated role may upload/replace/delete objects in this bucket
create policy "cms_images_auth_insert"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'cms-images');

create policy "cms_images_auth_update"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'cms-images')
  with check (bucket_id = 'cms-images');

create policy "cms_images_auth_delete"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'cms-images');
