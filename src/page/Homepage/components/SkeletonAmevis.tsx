export function SkeletonLoader() {
  return (
    <>
      <div className="skeleton-loader">
        <div className="skeleton-logo">Amevi</div>
      </div>
      <style>{`
      .skeleton-loader {
        width: 100%;
        height: 350px;
        background: linear-gradient(110deg, 
          #1a1a1a 0%, 
          #1a1a1a 40%, 
          #2a2a2a 50%, 
          #1a1a1a 60%, 
          #1a1a1a 100%
        );
        background-size: 200% 100%;
        animation: shimmer 2s infinite linear;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @keyframes shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }

      .skeleton-logo {
        font-size: 48px;
        font-family: Georgia, serif;
        font-style: italic;
        letter-spacing: 3px;
        color: #D4AF37;
        opacity: 0.15;
        animation: pulse 2s ease-in-out infinite;
        position: relative;
        z-index: 1;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 0.15;
          transform: scale(1);
        }
        50% {
          opacity: 0.25;
          transform: scale(1.05);
        }
      }

      .skeleton-loader::before,
      .skeleton-loader::after {
        content: '';
        position: absolute;
        border: 1px solid #D4AF37;
        opacity: 0.1;
      }

      .skeleton-loader::before {
        width: 60%;
        height: 70%;
        top: 15%;
        left: 20%;
        border-radius: 4px;
      }

      .skeleton-loader::after {
        width: 40%;
        height: 50%;
        top: 25%;
        left: 30%;
        border-radius: 2px;
      }
    `}</style>
    </>
  )
} 