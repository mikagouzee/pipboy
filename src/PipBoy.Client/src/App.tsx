import { usePipBoy } from './context/PipBoyContext.tsx';
import './App.css';

function App() {
  const { activeTab, nextTab, prevTab, goToTab } = usePipBoy();

  return (
    <div className="pipboy-container crt-flicker">
      <div className="pipboy-content" style={{ padding: '20px', height: '100%' }}>
        
        {/* Navigation Header */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--pip-green)', marginBottom: '20px' }}>
          {['STAT', 'INV', 'DATA', 'MAP', 'RADIO'].map(tab => (
            <div 
              key={tab}
              onClick={() => goToTab(tab)}
              style={{ 
                padding: '5px 15px',
                backgroundColor: activeTab === tab ? 'var(--pip-green)' : 'transparent',
                color: activeTab === tab ? 'var(--pip-bg)' : 'var(--pip-green)',
                fontWeight: 'bold',
                transition: 'all 0.2s ease'
              }}
            >
              {tab}
            </div>
          ))}
        </nav>

        {/* Main Viewport */}
        <main style={{ height: 'calc(100% - 150px)', border: '1px solid var(--pip-green-dim)', position: 'relative' }}>
          {/* We will swap components here later */}
          <div style={{ padding: '20px' }}>
             <h1>{activeTab}</h1>
             <p>SYSTEM READY...</p>
          </div>
        </main>

        {/* Footer with Small Utility Buttons (Hardware Simulation) */}
        <footer style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
          <button onClick={prevTab} className="pip-btn"> &lt; PREV </button>
          <div style={{ fontSize: '0.8rem' }}>HP 100/100 | AP 80/80</div>
          <button onClick={nextTab} className="pip-btn"> NEXT &gt; </button>
        </footer>
      </div>
    </div>
  );
}

export default App;