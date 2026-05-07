import { useState } from "react";
import { Download, Printer, Heart } from "lucide-react";

const IMAGE_PATH = "/maes-ip-ocian.jpg";
const QR_TARGET_URL = typeof window !== "undefined"
  ? window.location.origin
  : "https://seu-projeto.vercel.app";

const QR_API_URL = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(QR_TARGET_URL)}&color=6d4c41&bgcolor=fdf6f0`;

export default function App() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(IMAGE_PATH);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "dia-das-maes-ip-ocian.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (error) {
      console.error("Erro ao baixar imagem:", error);
    }
  };

  const handlePrint = () => {
    const old = document.getElementById("print-frame");
    if (old) old.remove();

    const iframe = document.createElement("iframe");
    iframe.id = "print-frame";
    iframe.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:-1;opacity:0;";
    document.body.appendChild(iframe);

    const imageFullUrl = `${window.location.origin}${IMAGE_PATH}`;

    iframe.contentDocument.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body {
              width: 100%;
              height: 100%;
              background: white;
            }
            img {
              display: block;
              width: 100%;
              height: 100vh;
              max-height: 100vh;
              object-fit: contain;
              page-break-inside: avoid;
              break-inside: avoid;
            }
            @page {
              margin: 0;
              size: auto;
            }
          </style>
        </head>
        <body>
          <img src="${imageFullUrl}" />
        </body>
      </html>
    `);
    iframe.contentDocument.close();

    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }, 600);
    };
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: #fdf6f0;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
        }

        .petal {
          position: fixed;
          pointer-events: none;
          opacity: 0.12;
          animation: drift linear infinite;
        }

        @keyframes drift {
          0%   { transform: translateY(-10vh) rotate(0deg);   opacity: 0; }
          10%  { opacity: 0.12; }
          90%  { opacity: 0.08; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }

        .fade-in         { animation: fadeIn 1s ease both; }
        .fade-in-delay   { animation: fadeIn 1s ease 0.3s both; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .btn-download {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #bb6b74;
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(187,107,116,0.35);
        }
        .btn-download:hover {
          background: #a85860;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(187,107,116,0.45);
        }
        .btn-download:active { transform: scale(0.97); }

        .btn-print {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #9b7b6e;
          border: 1.5px solid #d9b8ae;
          padding: 13px 24px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-print:hover {
          border-color: #bb6b74;
          color: #bb6b74;
          background: rgba(187,107,116,0.06);
        }

        .qr-card {
          background: white;
          border: 1px solid #ead8cf;
          border-radius: 28px;
          padding: 32px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(109,76,65,0.1);
          position: relative;
          overflow: hidden;
        }

        .qr-card::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 140px; height: 140px;
          background: radial-gradient(circle, rgba(187,107,116,0.08) 0%, transparent 70%);
          border-radius: 50%;
        }

        .divider {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, #bb6b74, #e8a0a8);
          border-radius: 2px;
          margin: 0 auto;
        }

        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .qr-card { box-shadow: none; border: 1px solid #ddd; }
        }
      `}</style>

      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${10 + i * 13}%`,
            top: `-${10 + i * 5}%`,
            fontSize: `${14 + i * 4}px`,
            animationDuration: `${8 + i * 3}s`,
            animationDelay: `${i * 1.5}s`,
            color: '#bb6b74',
          }}
        >
          ✿
        </div>
      ))}

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '960px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center',
        }}>

          {/* LADO ESQUERDO */}
          <div style={{ textAlign: 'center' }} className="fade-in">

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(187,107,116,0.1)',
              border: '1px solid rgba(187,107,116,0.25)',
              padding: '6px 18px',
              borderRadius: '100px',
              marginBottom: '32px',
            }}>
              <span style={{ color: '#bb6b74', fontSize: '14px' }}>✦</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                fontWeight: '500',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#9b6b74',
              }}>
                Igreja Presbiteriana Ocian
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(56px, 8vw, 84px)',
              fontWeight: '400',
              lineHeight: 1.1,
              color: '#5c3d35',
              marginBottom: '4px',
              letterSpacing: '-0.01em',
            }}>
              Dia das
            </h1>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(56px, 8vw, 84px)',
              fontWeight: '400',
              fontStyle: 'italic',
              lineHeight: 1.15,
              color: '#bb6b74',
              marginBottom: '28px',
              letterSpacing: '-0.01em',
            }}>
              Mães
            </h1>

            <div className="divider" style={{ marginBottom: '28px' }} />

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '19px',
              fontStyle: 'italic',
              fontWeight: '400',
              color: '#9b7b70',
              lineHeight: 1.75,
              maxWidth: '360px',
              margin: '0 auto 36px',
            }}>
              Uma homenagem especial preparada com carinho para cada mãe da nossa comunidade.
            </p>

            <div className="no-print" style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '36px',
            }}>
              <button className="btn-download" onClick={handleDownload}>
                <Download size={17} />
                {downloaded ? "Baixado! ✓" : "Baixar imagem"}
              </button>
              <button className="btn-print" onClick={handlePrint}>
                <Printer size={17} />
                Imprimir
              </button>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#c4a09a',
            }}>
              <Heart size={13} fill="#c4a09a" />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: '400',
                letterSpacing: '0.06em',
              }}>
                UPH · IP Ocian · 2026
              </span>
              <Heart size={13} fill="#c4a09a" />
            </div>
          </div>

          {/* LADO DIREITO — QR Code */}
          <div className="fade-in-delay" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="qr-card" style={{ maxWidth: '340px', width: '100%' }}>

              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#c4a09a',
                marginBottom: '24px',
              }}>
                ✦ Escaneie com sua câmera ✦
              </div>

              <div style={{
                background: '#fdf6f0',
                borderRadius: '16px',
                padding: '20px',
                display: 'inline-block',
                border: '1px solid #ead8cf',
              }}>
                <img
                  src={QR_API_URL}
                  alt="QR Code para baixar a imagem"
                  width={220}
                  height={220}
                  style={{ display: 'block', borderRadius: '8px' }}
                />
              </div>

              <div style={{ margin: '24px 0 0' }}>
                <div className="divider" />
              </div>

              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '22px',
                fontWeight: '400',
                fontStyle: 'italic',
                color: '#7b5a52',
                marginTop: '20px',
                marginBottom: '8px',
              }}>
                Aponte a câmera
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: '400',
                color: '#b09088',
                lineHeight: 1.6,
              }}>
                para baixar ou imprimir a homenagem
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}