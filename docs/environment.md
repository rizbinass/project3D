# Environment Variables

## Public Variables

These variables are safe to expose to the browser and must use the `NEXT_PUBLIC_` prefix.

| Variable                         | Required          | Default                         | Purpose                                                               |
| -------------------------------- | ----------------- | ------------------------------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | Yes in production | `http://localhost:3000`         | Canonical URL for metadata, robots, sitemap, Open Graph, and JSON-LD. |
| `NEXT_PUBLIC_SITE_NAME`          | No                | `Interactive 3D Portfolio Room` | App name used by metadata and manifest.                               |
| `NEXT_PUBLIC_SITE_CREATOR`       | Yes in production | `Portfolio Owner`               | Creator name used by metadata and structured data.                    |
| `NEXT_PUBLIC_ANALYTICS_ID`       | No                | empty                           | Future analytics identifier.                                          |
| `NEXT_PUBLIC_ENABLE_ANALYTICS`   | No                | `false`                         | Enables analytics hooks when implemented.                             |
| `NEXT_PUBLIC_ENABLE_AUDIO`       | No                | `false`                         | Enables future audio systems.                                         |
| `NEXT_PUBLIC_ENABLE_DEBUG_PANEL` | No                | `false`                         | Shared debug flag for development tooling.                            |
| `NEXT_PUBLIC_ENABLE_ROOM_DEBUG`  | No                | `false`                         | Enables room-specific Leva/Stats diagnostics in development.          |

## Server Variables

These values must stay server-only.

| Variable                   | Required | Purpose                                               |
| -------------------------- | -------- | ----------------------------------------------------- |
| `CONTACT_EMAIL_TO`         | No       | Destination address for a future contact endpoint.    |
| `CONTACT_EMAIL_FROM`       | No       | Sender address for a future contact endpoint.         |
| `CONTACT_PROVIDER_API_KEY` | No       | Generic provider API key for future contact delivery. |
| `RESEND_API_KEY`           | No       | Resend API key if the contact endpoint uses Resend.   |
| `VERCEL_ANALYTICS_ID`      | No       | Future Vercel analytics integration.                  |

## Production Example

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Interactive 3D Portfolio Room
NEXT_PUBLIC_SITE_CREATOR=Your Name
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_AUDIO=false
NEXT_PUBLIC_ENABLE_DEBUG_PANEL=false
NEXT_PUBLIC_ENABLE_ROOM_DEBUG=false
```
