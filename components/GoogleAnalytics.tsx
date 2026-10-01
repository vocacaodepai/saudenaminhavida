"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";

/**
 * Google Analytics 4 com Modo de Consentimento v2. O gtag só entra na página
 * depois de o visitante escolher no aviso de cookies; quem recusa fica com
 * analytics_storage negado (medição sem cookies).
 */
export function GoogleAnalytics({ id }: { id: string | undefined }) {
  const consent = useConsent();
  if (!id || !consent) return null;
  const granted = consent.ads ? "granted" : "denied";
  const init = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'${granted}',ad_user_data:'${granted}',ad_personalization:'${granted}',analytics_storage:'${granted}'});
gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`;
  return (
    <>
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {init}
      </Script>
    </>
  );
}
