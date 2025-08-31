Email templates and inlining

This project uses server-side email templates for admin notifications (in `server_emails/`) and client-facing templates (in `public/emails/`).

To keep templates readable and maintainable, we use a CSS-to-inline-styles step at send-time. Steps to enable:

1. Install PHP dependencies with Composer in the project root:

   composer install

2. Ensure `vendor/autoload.php` is available. The PHP endpoints will auto-detect `\TijsVerkoyen\CssToInlineStyles\CssToInlineStyles` and inline styles when present.

3. Set `LOGO_URL` (or `BRAND_LOGO_URL`) in your server environment to the absolute HTTPS URL of your logo (used in email headers/favicons):

   LOGO_URL=https://example.com/assets/logo.png

Why this is safe
- Templates in `server_emails/` are not served by the static webserver and are used only server-side. Admin templates should remain outside `public/`.
- Client templates in `public/emails/` are intentionally public static assets; they contain no secrets.

If you prefer not to use Composer, the system will continue to work without inlining, but some email clients may render styles differently. Using the inliner improves compatibility across clients.
