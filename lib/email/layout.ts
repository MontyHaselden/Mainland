import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  SITE_URL,
} from "@/lib/seo/business";

type EmailLayoutOptions = {
  title: string;
  bodyHtml: string;
  siteUrl?: string;
};

export function getEmailLogoUrl(siteUrl: string = SITE_URL): string {
  return `${siteUrl.replace(/\/$/, "")}/logo/profile/mainland-mark-email-signature-160.png`;
}

export function emailLayout({
  title,
  bodyHtml,
  siteUrl = SITE_URL,
}: EmailLayoutOptions): string {
  const logoUrl = getEmailLogoUrl(siteUrl);
  const baseUrl = siteUrl.replace(/\/$/, "");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#eef1f4;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #d8dee6;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:28px 28px 20px;text-align:center;background:#1a2332;">
              <img src="${logoUrl}" width="72" height="72" alt="${BUSINESS_NAME}" style="display:block;margin:0 auto 12px;border-radius:12px;" />
              <p style="margin:0;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#7eb89a;">${BUSINESS_NAME}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;color:#1a2332;font-size:16px;line-height:1.6;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px;color:#5c6b7a;font-size:13px;line-height:1.5;border-top:1px solid #e8ecf0;">
              <p style="margin:20px 0 8px;">
                <a href="${baseUrl}" style="color:#2d6a4f;text-decoration:none;">${baseUrl.replace(/^https?:\/\//, "")}</a>
              </p>
              <p style="margin:0;">${BUSINESS_PHONE} · <a href="mailto:${BUSINESS_EMAIL}" style="color:#2d6a4f;text-decoration:none;">${BUSINESS_EMAIL}</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
