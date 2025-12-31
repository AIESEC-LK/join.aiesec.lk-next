import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import Image from "next/image";
import { TITLE, DESCRIPTION } from "./constants/site_constants";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="shortcut icon" type="image/png" href="/assets/favicon.png" />
        {/* External CDN links for icons */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${poppins.variable} font-poppins`}
        style={{
          backgroundImage: 'url("/assets/background.jpg")',
          backgroundSize: "auto 120%",
          backgroundColor: "white",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          minHeight: "100vh",
        }}
      >
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function (w, d, s, l, i) {
              w[l] = w[l] || []; w[l].push({
                'gtm.start': new Date().getTime(), event: 'gtm.js'
              }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                  'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-MFQGDFB');
          `}
        </Script>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MFQGDFB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* reCAPTCHA */}
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
        />

        {/* jQuery and Select2 */}
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"
          strategy="afterInteractive"
        />

        <div
          className="page-wrapper font-poppins"
          style={{ paddingTop: "80px" }}
        >
          <center>
            <Image
              src="/assets/aiesec.png"
              alt="AIESEC Logo"
              width={300}
              height={100}
              className="responsive"
              priority
            />
          </center>
          <br />
          <br />

          <div className="wrapper wrapper--w680">
            <div className="card card-4">
              <div
                className="card-body"
                style={{
                  paddingTop: "40px",
                }}
              >
                <center>
                  <h1
                    className="title"
                    style={{
                      color: "#037ef3",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    {TITLE}
                  </h1>
                </center>

                {children}
              </div>
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
        </div>
      </body>
    </html>
  );
}
