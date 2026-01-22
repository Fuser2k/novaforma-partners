-- Article'ı yayınla (isDraft = false yap)
-- Bu scripti çalıştırmak için: npx prisma studio
-- veya direkt SQLite veritabanında çalıştırın

UPDATE Article 
SET isDraft = 0, 
    publishedAt = datetime('now'),
    publishDate = datetime('now')
WHERE slug = 'where-does-it-come-from';
