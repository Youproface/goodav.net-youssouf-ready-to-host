# Deploying Your GoodAV Web App to GoDaddy (Frontend + Backend)

## 1. Prepare Your Files
- Make sure your `dist/` folder (from `npm run build`) contains your production frontend.
- Ensure your PHP backend files (from `public/` and any needed scripts) are ready and cleaned up.
- Your main folders/files to upload:
  - All contents of `dist/` (React/Vite build)
  - All PHP files and assets from `public/`
  - Any required databases (e.g., `.db` files) if using SQLite
  - `.env` (with production values, if needed)
  - `.htaccess` (see below for recommended config)

## 2. Login to GoDaddy cPanel
- Go to your GoDaddy account and open cPanel for your hosting plan.

## 3. Upload Files
- Open the **File Manager** in cPanel.
- Navigate to the `public_html/` directory (this is your web root).
- Upload:
  - All files from your local `dist/` folder into `public_html/`.
  - All PHP backend files (from `public/`) into `public_html/`.
  - Any required assets, databases, `.env`, and `.htaccess` file.
- If prompted, overwrite existing files.

## 4. Set Up Environment Variables
- If your PHP uses a `.env` file, upload it to `public_html/`.
- Double-check that all production values (DB credentials, email, etc.) are correct.

## 5. Set Up Database (if needed)
- Use cPanel’s **MySQL Database Wizard** to create a new database and user.
- Import your local database if needed (phpMyAdmin > Import).
- Update your PHP scripts to use the new DB credentials.
- For SQLite, upload the `.db` file to `public_html/` or a secure location.

## 6. Configure Email Sending
- GoDaddy shared hosting does not support PHP `mail()` reliably. Use SMTP with PHPMailer or similar.
- Get your GoDaddy SMTP settings (from cPanel or GoDaddy docs):
  - SMTP Host: `smtp.secureserver.net`
  - SMTP Port: 465 (SSL) or 587 (TLS)
  - SMTP Username/Password: Your GoDaddy email credentials
- Update your PHP mail scripts to use SMTP (not `mail()`).

## 7. Test Your Site
- Visit your domain in a browser.
- Test all frontend and backend features (forms, bookings, emails, etc.).
- Check for errors in cPanel’s **Error Log** if something fails.

## 8. (Optional) Set Up HTTPS
- Use GoDaddy’s SSL tools to enable HTTPS for your domain.

---

## Recommended .htaccess for GoodAV (React/Vite + PHP)

```
<IfModule mod_rewrite.c>
    Options -MultiViews -Indexes
    RewriteEngine On

    # =============================================
    # 1. Primary Redirects (Force HTTPS + WWW)
    # =============================================
    RewriteCond %{HTTPS} off [OR]
    RewriteCond %{HTTP_HOST} !^www\.goodav\.net$ [NC]
    RewriteRule ^ https://www.goodav.net%{REQUEST_URI} [R=301,L]

    # =============================================
    # 2. Security Headers
    # =============================================
    <IfModule mod_headers.c>
        Header always set X-Content-Type-Options "nosniff"
        Header always set X-Frame-Options "SAMEORIGIN"
        Header always set X-XSS-Protection "1; mode=block"
        Header always set Referrer-Policy "strict-origin-when-cross-origin"
        Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
        Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
    </IfModule>

    # =============================================
    # 3. RSS Feed Handling
    # =============================================
    RewriteRule ^feed\.xml$ feed.php [L,T=application/rss+xml]
    <Files feed.php>
        Header set Content-Type "application/rss+xml; charset=UTF-8"
    </Files>
    # =============================================
    # 4. Clean URL Handling
    # =============================================
    # Redirect .html extensions to clean URLs
    RewriteCond %{THE_REQUEST} /([^.]+)\.html [NC]
    RewriteRule ^([^.]+)\.html$ /$1 [R=301,L,NE]

    # Internal .html extension addition
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME}.html -f
    RewriteRule ^([^/]+)/?$ $1.html [L]
    # =============================================
    # 5. Static Files Protection
    # =============================================
    RewriteCond %{REQUEST_URI} !\.(mp4|css|js|jpg|jpeg|png|gif|woff|woff2|ttf|eot|svg|ico|pdf|zip|xml|json|webp|avi|mov|ogg|otf|txt|html|php)$ [NC]
    RewriteRule ^ - [L]

    # =============================================
    # 6. Trailing Slash Removal (except directories)
    # =============================================
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} ^(.+)/$
    RewriteRule ^ %1 [R=301,L]

    # =============================================
    # 11. React/Vite SPA Fallback
    # =============================================
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [L]
</IfModule>

# =============================================
# 7. Cache Control for Static Assets
# =============================================
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access 1 year"
    ExpiresByType image/jpeg "access 1 year"
    ExpiresByType image/gif "access 1 year"
    ExpiresByType image/png "access 1 year"
    ExpiresByType image/webp "access 1 year"
    ExpiresByType image/x-icon "access 1 year"
    ExpiresByType text/css "access 1 month"
    ExpiresByType text/html "access 1 week"
    ExpiresByType application/javascript "access 1 month"
    ExpiresByType application/pdf "access 1 month"
    ExpiresByType font/woff "access 1 year"
    ExpiresByType font/woff2 "access 1 year"
    ExpiresByType font/ttf "access 1 year"
    ExpiresByType font/otf "access 1 year"
    ExpiresDefault "access 1 month"
</IfModule>

# =============================================
# 8. File Access Restrictions
# =============================================
<FilesMatch "\.(htaccess|htpasswd|ini|log|sh|sql|bak|old|config)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# =============================================
# 9. Custom Error Documents
# =============================================
ErrorDocument 400 /400.html
ErrorDocument 401 /401.html
ErrorDocument 403 /403.html
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html
ErrorDocument 502 /502.html
ErrorDocument 503 /503.html

# =============================================
# 10. Compression
# =============================================
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE image/svg+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE font/ttf
    AddOutputFilterByType DEFLATE font/otf
    AddOutputFilterByType DEFLATE font/woff
    AddOutputFilterByType DEFLATE font/woff2
    AddOutputFilterByType DEFLATE application/x-font-ttf
    AddOutputFilterByType DEFLATE application/vnd.ms-fontobject
</IfModule>
```

---

If you need a sample PHPMailer SMTP config or run into any GoDaddy-specific issues, let me know!
