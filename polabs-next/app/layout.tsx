import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "POLABS | 병원컨설팅의 한계를 넘다 피오랩스",
    template: "%s | POLABS 피오랩스",
  },
  description: "착수금 없이 성과로만 수수료를 받는 병원 컨설팅. 개원부터 개편까지, 피오랩스가 병원 매출 성장을 설계합니다.",
  keywords: ["병원 컨설팅", "개원 컨설팅", "개편 컨설팅", "피오랩스", "POLABS", "병원 마케팅", "의원 컨설팅", "병원 매출", "개원 비용", "병원 개편", "브랜드 컨설팅"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://polabs.co.kr",
    siteName: "POLABS 피오랩스",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  metadataBase: new URL("https://polabs.co.kr"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="google-site-verification" content="da5c3s4RVz4f6uofK7YPZ09B7AtM77XweMkqLxXgTeI" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18058674113"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18058674113');
        `}} />
        <link rel="icon" type="image/png" href="/images/polabs-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css" />
      </head>
      <body style={{ fontFamily: "'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
