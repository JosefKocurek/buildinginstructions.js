import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ManualViewer() {
  useEffect(() => {
    // Viewer runs in iframe to use buildinginstructions.js (global THREE/LDR)
    return () => {};
  }, []);

  return (
    <div className="manual-viewer">
      <iframe
        title="Interaktivní manuál"
        src="viewer.html"
        className="manual-viewer__iframe"
      />
      <Link to="/" className="manual-viewer__back dsh-button">
        ← Domů
      </Link>
    </div>
  );
}
