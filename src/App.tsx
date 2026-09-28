/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Cpu, Activity, FileJson, Server, Key, Lock, AlertTriangle, CheckCircle, ChevronRight, Terminal, RefreshCw, Play, Square, Info, Crosshair, Bug, Zap, Globe, ShieldCheck, Dna, Microscope, Atom } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Shared Components ---

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-lg ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = 'primary', className = "", disabled = false }: any) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white disabled:bg-blue-800 disabled:text-blue-300",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white disabled:bg-slate-800 disabled:text-slate-500",
    danger: "bg-red-600 hover:bg-red-500 text-white disabled:bg-red-900 disabled:text-red-300",
    outline: "border border-slate-600 hover:bg-slate-700 text-slate-200"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}>
      {children}
    </button>
  );
};

// --- Modules ---

const DashboardModule = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { title: 'System Status', value: 'OPTIMAL', icon: Activity, color: 'text-green-400' },
        { title: 'Quantum Readiness', value: '42%', icon: Shield, color: 'text-amber-400' },
        { title: 'Active Threats', value: '0', icon: AlertTriangle, color: 'text-slate-400' },
        { title: 'Monitored Assets', value: '1,204', icon: Server, color: 'text-blue-400' },
      ].map((stat, i) => (
        <Card key={i} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
              <h3 className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</h3>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="flex flex-col">
        <div className="p-5 border-b border-slate-700">
          <h3 className="font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Recent Activity
          </h3>
        </div>
        <div className="p-5 flex-1 space-y-4">
          {[
            { time: '10:42 AM', msg: 'Quantum Side-Channel Scanner initiated', type: 'info' },
            { time: '09:15 AM', msg: 'Legacy RSA-2048 key detected on 10.0.4.15', type: 'warn' },
            { time: '08:30 AM', msg: 'SBOM Generation completed successfully', type: 'success' },
            { time: 'Yesterday', msg: 'API Fuzzer detected rate-limit bypass on /api/v2/auth', type: 'error' },
          ].map((log, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-slate-500 font-mono text-sm whitespace-nowrap">{log.time}</span>
              <span className={`text-sm ${
                log.type === 'warn' ? 'text-amber-400' :
                log.type === 'error' ? 'text-red-400' :
                log.type === 'success' ? 'text-green-400' : 'text-slate-300'
              }`}>{log.msg}</span>
            </div>
          ))}
        </div>
      </Card>
      
      <Card>
        <div className="p-5 border-b border-slate-700">
          <h3 className="font-semibold flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-purple-400" />
            PQC Migration Timeline
          </h3>
        </div>
        <div className="p-5 space-y-6">
          <div className="relative border-l-2 border-slate-700 ml-3 space-y-6">
            {[
              { year: '2024', event: 'NIST Finalizes PQC Algorithms (FIPS 203, 204, 205)', status: 'done' },
              { year: '2025', event: 'Inventory all cryptographic assets (SBOM)', status: 'current' },
              { year: '2027', event: 'Begin transition to hybrid certificates', status: 'future' },
              { year: '2030', event: 'Deprecated legacy public-key (RSA/ECC) algorithms', status: 'future' },
            ].map((node, i) => (
              <div key={i} className="pl-6 relative">
                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                  node.status === 'done' ? 'bg-green-500' :
                  node.status === 'current' ? 'bg-blue-500 animate-pulse' : 'bg-slate-600'
                }`} />
                <h4 className="font-bold text-slate-200">{node.year}</h4>
                <p className="text-sm text-slate-400">{node.event}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const PQCKeyGenModule = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [algo, setAlgo] = useState('kyber-768');

  const algorithms = [
    { id: 'kyber-512', name: 'ML-KEM-512', desc: 'NIST Level 1 (AES-128 equivalent)' },
    { id: 'kyber-768', name: 'ML-KEM-768', desc: 'NIST Level 3 (AES-192 equivalent)' },
    { id: 'kyber-1024', name: 'ML-KEM-1024', desc: 'NIST Level 5 (AES-256 equivalent)' },
    { id: 'dilithium-3', name: 'ML-DSA-65', desc: 'NIST Level 3 Signature Scheme' },
    { id: 'sphincs+', name: 'SLH-DSA', desc: 'Stateless Hash-Based Signatures' },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setResult(null);
    setError(null);
    
    setTimeout(() => {
      try {
        // Simulate a potential failure for robustness testing, e.g., entropy depletion
        if (Math.random() > 0.8) {
          throw new Error("Entropy pool depleted. Failed to generate sufficient quantum randomness for a secure keypair. Please try again.");
        }

        setResult({
          algorithm: algorithms.find(a => a.id === algo)?.name,
          pubKey: `-----BEGIN PUBLIC KEY-----\nMIIB...[Quantum Safe Material]...${Math.random().toString(36).substring(2, 10).toUpperCase()}...\n-----END PUBLIC KEY-----`,
          privKey: `-----BEGIN PRIVATE KEY-----\nMIIC...[Strictly Confidential]...${Math.random().toString(36).substring(2, 10).toUpperCase()}...\n-----END PRIVATE KEY-----`,
          lifetime: '2050+'
        });
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred during key generation.");
      } finally {
        setIsGenerating(false);
      }
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Card>
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Key className="text-blue-400" />
            Simulated Quantum-Safe Keypair (PQC) Generator
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Generate post-quantum cryptographic material based on upcoming FIPS standards (ML-KEM / ML-DSA).
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Select Algorithm</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {algorithms.map(a => (
                <div 
                  key={a.id} 
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${algo === a.id ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 bg-slate-800 hover:border-slate-500'}`}
                  onClick={() => setAlgo(a.id)}
                >
                  <div className="font-semibold text-slate-200">{a.name}</div>
                  <div className="text-xs text-slate-400 mt-1">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
          
          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full md:w-auto">
            {isGenerating ? <RefreshCw className="animate-spin w-5 h-5" /> : <Shield className="w-5 h-5" />}
            {isGenerating ? 'Synthesizing Lattice...' : 'Generate PQC Keypair'}
          </Button>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3"
              >
                <AlertTriangle className="text-red-500 shrink-0" />
                <div>
                  <h4 className="font-medium text-red-400">Generation Failed</h4>
                  <p className="text-sm text-red-200/70">{error}</p>
                </div>
              </motion.div>
            )}
            
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 space-y-4"
              >
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                  <CheckCircle className="text-green-500 shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-400">Generation Successful</h4>
                    <p className="text-sm text-green-200/70">Algorithm: {result.algorithm} | Estimated Lifetime: {result.lifetime}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1 uppercase tracking-wider">Public Key</label>
                  <pre className="p-4 bg-slate-900 rounded-lg text-sm font-mono text-slate-300 overflow-x-auto border border-slate-700">
                    {result.pubKey}
                  </pre>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1 uppercase tracking-wider">Private Key</label>
                  <pre className="p-4 bg-slate-900 rounded-lg text-sm font-mono text-red-300/80 overflow-x-auto border border-red-900/30">
                    {result.privKey}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
};

const validateTarget = (host: string) => {
  if (!host) return false;
  const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return domainRegex.test(host) || ipRegex.test(host);
};

const TLSScannerModule = () => {
  const [target, setTarget] = useState('example.com');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const isValid = target === '' || validateTarget(target);

  const handleScan = () => {
    if (!target || !isValid) return;
    setScanning(true);
    setResult(null);
    setError(null);
    
    setTimeout(() => {
      try {
        if (target.toLowerCase() === 'error.com' || Math.random() > 0.8) {
          throw new Error(`Failed to resolve host or connection timed out for '${target}'. Ensure the endpoint is reachable and not blocking scanning probes.`);
        }

        setResult({
          host: target,
          grade: 'C-',
          qScore: 23,
          recommendations: [
            {
              title: 'Rotate legacy leaf certificates',
              description: 'Replace RSA-2048 with ML-DSA-65 (Dilithium3) hybrid certificates.',
              snippet: 'openssl req -x509 -newkey mldsa65 -keyout key.pem -out cert.pem -days 365'
            },
            {
              title: 'Enforce strict TLS 1.3',
              description: 'Disable TLS 1.2 and prioritize post-quantum cipher suites.',
              snippet: 'ssl_protocols TLSv1.3;\nssl_prefer_server_ciphers on;'
            },
            {
              title: 'Update Key Exchange mechanisms',
              description: 'Implement X25519MLKEM768 (hybrid ECDHE + ML-KEM) for quantum-resistant forward secrecy.',
              snippet: 'ssl_ecdh_curve X25519MLKEM768;'
            }
          ]
        });
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred during the TLS scan.");
      } finally {
        setScanning(false);
      }
    }, 2000);
  };

  const handleExport = () => {
    if (!result) return;
    const jsonStr = JSON.stringify(result, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tls-scan-${result.host}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Card>
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Lock className="text-blue-400" />
              Quantum TLS/SSL Readiness Scanner
            </h2>
            <p className="text-slate-400 mt-2 text-sm">
              Analyze remote endpoints for legacy cryptographic primitives vulnerable to Shor's algorithm.
            </p>
          </div>
          {result && (
            <Button variant="outline" onClick={handleExport} className="shrink-0">
              <FileJson className="w-4 h-4" /> Export Report
            </Button>
          )}
        </div>
        <div className="p-6">
          <div>
            <div className="flex gap-3">
              <input 
                type="text" 
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Enter target host (e.g., api.internal.corp)"
                className={`flex-1 bg-slate-900 border rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-1 font-mono transition-colors ${
                  !isValid 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500'
                }`}
              />
              <Button onClick={handleScan} disabled={scanning || !target || !isValid}>
                {scanning ? <RefreshCw className="animate-spin" /> : <Terminal />}
                Scan Target
              </Button>
            </div>
            <AnimatePresence>
              {!isValid && target !== '' && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-sm mt-2"
                >
                  Please enter a valid domain name or IPv4 address.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 overflow-hidden"
              >
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                  <AlertTriangle className="text-red-500 shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-400">Scan Operation Failed</h4>
                    <p className="text-sm text-red-200/70">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
                    <div className="text-slate-400 text-xs font-mono uppercase mb-1">Target</div>
                    <div className="text-lg font-bold truncate" title={result.host}>{result.host}</div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
                    <div className="text-slate-400 text-xs font-mono uppercase mb-1">Legacy Grade</div>
                    <div className="text-3xl font-bold text-amber-500">{result.grade}</div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
                    <div className="text-slate-400 text-xs font-mono uppercase mb-1">Quantum Safety</div>
                    <div className="text-3xl font-bold text-red-500">{result.qScore}<span className="text-sm text-slate-500">/100</span></div>
                  </div>
                </div>

                <h3 className="font-medium text-slate-300 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Actionable Remediation
                </h3>
                <div className="space-y-4">
                  {result.recommendations.map((rec: any, i: number) => (
                    <div key={i} className="bg-slate-900 border border-slate-700/50 rounded-lg p-4">
                      <div className="flex gap-2 items-center mb-1">
                        <ChevronRight className="w-4 h-4 text-blue-400 shrink-0" />
                        <h4 className="font-semibold text-slate-200">{rec.title}</h4>
                      </div>
                      <p className="text-sm text-slate-400 mb-3 ml-6">{rec.description}</p>
                      <pre className="text-xs bg-black text-slate-300 p-3 rounded-md font-mono border border-slate-800 ml-6 overflow-x-auto whitespace-pre-wrap">
                        {rec.snippet}
                      </pre>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
};


const SBOMModule = () => (
  <div className="space-y-6 max-w-5xl">
    <Card>
      <div className="p-6 border-b border-slate-700 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileJson className="text-blue-400" />
            Cryptographic SBOM
          </h2>
          <p className="text-slate-400 mt-1 text-sm">Inventory of all cryptographic assets and dependencies.</p>
        </div>
        <Button variant="outline"><FileJson className="w-4 h-4"/> Export CycloneDX</Button>
      </div>
      
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 border-b border-slate-700 text-xs uppercase tracking-wider text-slate-500">
              <th className="p-4 font-medium">Component</th>
              <th className="p-4 font-medium">Version</th>
              <th className="p-4 font-medium">Algorithm</th>
              <th className="p-4 font-medium">Risk Level</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-700/50">
            {[
              { comp: 'openssl', ver: '1.1.1t', alg: 'rsa-2048', risk: 'HIGH', class: 'text-red-400 bg-red-400/10' },
              { comp: 'liboqs', ver: '0.8.0', alg: 'kyber-768', risk: 'LOW', class: 'text-green-400 bg-green-400/10' },
              { comp: 'bouncycastle', ver: '1.70', alg: 'ecc-p256', risk: 'MEDIUM', class: 'text-amber-400 bg-amber-400/10' },
              { comp: 'golang/crypto', ver: 'v0.9.0', alg: 'ed25519', risk: 'MEDIUM', class: 'text-amber-400 bg-amber-400/10' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                <td className="p-4 font-mono text-slate-300">{row.comp}</td>
                <td className="p-4 text-slate-400">{row.ver}</td>
                <td className="p-4 text-slate-300">{row.alg}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${row.class}`}>
                    {row.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);


const AdvancedToolsModule = () => {
  const [logs, setLogs] = useState<string[]>(['[SYSTEM] Core daemon manager initialized.', 'Type "help" for available commands.']);
  const [command, setCommand] = useState('');
  const [daemonToStart, setDaemonToStart] = useState<string | null>(null);
  const [daemons, setDaemons] = useState([
    { id: 'd1', name: 'quantum-sniffer.exe', desc: 'Promiscuous mode lattice capture', status: 'stopped', memory: '0MB' },
    { id: 'd2', name: 'entropy_pool_daemon', desc: 'Maintains PRNG seed generation', status: 'running', memory: '42MB' },
    { id: 'd3', name: 'lattice-tunnel.exe', desc: 'Covert C2 channel via LWE', status: 'stopped', memory: '0MB' },
  ]);

  const runCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    setLogs(prev => [...prev, `> ${command}`]);
    const cmd = command.trim();
    const cmdLower = cmd.toLowerCase();
    
    setTimeout(() => {
      let outputLines: string[] = [];
      const pid = Math.floor(Math.random() * 90000) + 10000;
      const exitCode = Math.random() > 0.8 ? 1 : 0;
      
      if (cmdLower.endsWith('.exe')) {
        outputLines = [
          `Executing ${cmd} in isolated Windows Subsystem sandbox...`,
          `[INFO] Child process started (PID: ${pid}, USER: sandbox_user)`,
          `[OK] PE Header parsed and binary integrity verified.`,
          `[+] Allocating 48MB isolated memory segment...`,
          `[WARN] Execution produced anomalous side-channel noise on memory bus.`,
          `[delay:800]`,
          `[STDERR] Exception 0xC0000005: Access violation reading location 0xFFFFFFFF`,
          `[STDERR] Failed to attach to win32 driver: Access denied.`,
          `[delay:400]`,
          `[INFO] Process ${pid} exited with code ${exitCode} after ${Math.floor(Math.random() * 2000 + 500)}ms.`
        ];
      } else if (cmdLower.startsWith('./') || cmdLower.endsWith('.sh')) {
        outputLines = [
          `Executing ${cmd} in POSIX shell...`,
          `[INFO] Spawned child process (PID: ${pid}, UID: 1001, GID: 1001)`,
          `[+] Loaded shared libraries (libc.so.6, libcrypto.so).`,
          `[delay:600]`,
          `[STDERR] Warning: POSIX capabilities CAP_SYS_ADMIN restricted.`,
          `[STDERR] Check /var/log/secure for audit trail details.`,
          `[delay:300]`,
          `[INFO] Process ${pid} exited with code ${exitCode} after ${Math.floor(Math.random() * 2000 + 500)}ms.`
        ];
      } else if (cmdLower === 'help') {
        outputLines = ['Available commands:', '  help          - Show this message', '  clear         - Clear terminal output', '  [file].exe    - Execute a Windows binary in Sandbox', '  ./[file].sh   - Execute a shell script'];
      } else if (cmdLower === 'clear') {
        setLogs([]);
        setCommand('');
        return;
      } else {
        outputLines = [`'${cmd}' is not recognized as an internal or external command, operable program or batch file.`];
      }

      // Helper to process lines with optional delays
      let currentDelay = 0;
      outputLines.forEach((line) => {
        if (line.startsWith('[delay:')) {
          currentDelay += parseInt(line.split(':')[1], 10);
        } else {
          setTimeout(() => {
            setLogs(prev => [...prev, line]);
          }, currentDelay);
        }
      });
    }, 200);

    setCommand('');
  };

  const toggleDaemon = (id: string, forceStart: boolean = false) => {
    const targetDaemon = daemons.find(d => d.id === id);
    if (!targetDaemon) return;

    const isRunning = targetDaemon.status === 'running';
    
    if (!isRunning && !forceStart) {
      setDaemonToStart(id);
      return;
    }

    const action = isRunning ? 'stop' : 'start';
    
    setLogs(prev => [...prev, `[INFO] Attempting to ${action} ${targetDaemon.name}...`]);

    setTimeout(() => {
      const willFail = Math.random() > 0.8;
      
      if (willFail) {
        const errorReason = isRunning ? "Process refused to terminate (SIGKILL required)." : "Port binding failed or insufficient entropy.";
        setLogs(prev => [...prev, `[ERROR] Failed to ${action} ${targetDaemon.name}. ${errorReason}`]);
        return;
      }
      
      setDaemons(currentDaemons => currentDaemons.map(d => {
        if (d.id === id) {
          if (isRunning) {
            setLogs(prev => [...prev, `[OK] Successfully stopped ${d.name}. Memory freed.`]);
            return { ...d, status: 'stopped', memory: '0MB' };
          } else {
            const newPid = Math.floor(Math.random() * 90000) + 10000;
            setLogs(prev => [...prev, `[OK] Successfully started ${d.name} (PID: ${newPid}).`]);
            return { ...d, status: 'running', memory: `${Math.floor(Math.random() * 100) + 20}MB` };
          }
        }
        return d;
      }));
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {daemonToStart && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full overflow-hidden shadow-2xl"
          >
            <div className="p-5 border-b border-slate-800">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-slate-200">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Confirm Action
              </h3>
            </div>
            <div className="p-5">
              <p className="text-slate-300">
                Are you sure you want to start <span className="font-mono text-blue-400">{daemons.find(d => d.id === daemonToStart)?.name}</span>?
              </p>
              <p className="text-xs text-slate-500 mt-2">
                This process will allocate memory and may produce side-channel noise.
              </p>
            </div>
            <div className="p-4 bg-slate-950 flex justify-end gap-3">
              <button className="px-4 py-2 rounded text-sm text-slate-300 hover:bg-slate-800 transition-colors" onClick={() => setDaemonToStart(null)}>Cancel</button>
              <button className="px-4 py-2 rounded text-sm bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-2" onClick={() => { toggleDaemon(daemonToStart, true); setDaemonToStart(null); }}><Play className="w-4 h-4" /> Start Daemon</button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daemons List */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="h-full flex flex-col">
            <div className="p-5 border-b border-slate-700">
              <h3 className="font-semibold flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-400" />
                Background Daemons
              </h3>
            </div>
            <div className="p-4 flex-1 space-y-3">
              {daemons.map(d => (
                <div key={d.id} className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${d.status === 'running' ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></div>
                      <span className="font-mono text-sm text-slate-200 truncate" title={d.name}>{d.name}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{d.desc}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs font-mono text-slate-400">MEM: {d.memory}</span>
                    <button 
                      onClick={() => toggleDaemon(d.id)}
                      className={`px-3 py-1 text-xs rounded transition-colors flex items-center gap-1 ${
                        d.status === 'running' 
                          ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' 
                          : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                      }`}
                    >
                      {d.status === 'running' ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" fill="currentColor" />}
                      {d.status === 'running' ? 'Stop' : 'Start'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Terminal Execution */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col min-h-[400px]">
            <div className="p-4 border-b border-slate-700 bg-slate-900 flex items-center gap-3">
              <Terminal className="w-5 h-5 text-slate-400" />
              <h3 className="font-semibold text-slate-200">Terminal Emulator vsat-01</h3>
            </div>
            <div className="flex-1 bg-black p-4 overflow-y-auto font-mono text-sm flex flex-col space-y-1">
              {logs.map((log, i) => (
                <div key={i} className={`${
                  log.startsWith('>') ? 'text-blue-400 mt-2' : 
                  log.includes('[OK]') ? 'text-green-400' :
                  log.includes('[WARN]') ? 'text-amber-400' :
                  log.includes('[ERROR]') || log.includes('[STDERR]') ? 'text-red-400' :
                  log.includes('[INFO]') ? 'text-blue-300' :
                  'text-slate-300'
                }`}>
                  {log}
                </div>
              ))}
              <div className="mt-2 text-slate-300">
                <form onSubmit={runCommand} className="flex">
                  <span className="mr-2 text-blue-400">{'>'}</span>
                  <input 
                    type="text" 
                    value={command}
                    onChange={e => setCommand(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-slate-200 font-mono focus:ring-0 p-0"
                    autoFocus
                    spellCheck="false"
                    autoComplete="off"
                  />
                </form>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

const APIFuzzerModule = () => {
  const [targetUrl, setTargetUrl] = useState('https://api.example.com/v1');
  const [isFuzzing, setIsFuzzing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const startFuzzing = () => {
    if (!targetUrl) return;
    setIsFuzzing(true);
    setLogs([`[*] INITIALIZING API FUZZER ON ${targetUrl}`, '[*] Loading payload wordlists...', '[*] Starting fuzzing engine...']);
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 2;
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        currentProgress = 100;
        setIsFuzzing(false);
        setLogs(prev => [...prev, `[SUCCESS] Fuzzing complete on ${targetUrl}.`, `[INFO] Found 3 potential vulnerabilities. Check reports.`]);
      }
      setProgress(currentProgress);
      
      if (currentProgress < 100) {
        const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
        const endpoints = ['/auth', '/users/1', '/config', '/admin', '/graph', '/api/v2/data', '/graphql', '/metrics'];
        const statuses = [200, 201, 400, 401, 403, 500, 404, 429, 502];
        const method = methods[Math.floor(Math.random() * methods.length)];
        const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const delayMs = Math.floor(Math.random() * 120) + 10;
        
        setLogs(prev => {
          const newLogs = [...prev, `[${new Date().toISOString().split('T')[1].split('.')[0]}] ${method} ${endpoint} => HTTP ${status} (${delayMs}ms)`];
          if (newLogs.length > 50) newLogs.shift();
          return newLogs; // Keep log size manageable
        });
      }
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Card>
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Cpu className="text-blue-400" />
            API Fuzzer (Dynamic Analysis)
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Fuzz API endpoints to detect vulnerabilities like broken access control, injection flaws, and memory corruption.
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex gap-3">
            <input 
              type="text" 
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="Target Base URL (e.g., https://api.corp.local/v1)"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
              disabled={isFuzzing}
            />
            <Button onClick={startFuzzing} disabled={isFuzzing || !targetUrl}>
              {isFuzzing ? <RefreshCw className="animate-spin w-5 h-5" /> : <Play className="w-5 h-5" fill="currentColor" />}
              {isFuzzing ? 'Fuzzing...' : 'Start Fuzzing'}
            </Button>
          </div>

          <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden flex flex-col h-[400px]">
            <div className="p-2 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>FUZZER_OUTPUT_STREAM</span>
              <span>{progress > 0 ? `${progress}%` : 'IDLE'}</span>
            </div>
            
            {(progress > 0 || isFuzzing) && (
              <div className="h-1 bg-slate-800 w-full shrink-0">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-1 flex flex-col-reverse">
              <div className="flex flex-col space-y-1">
                {logs.length === 0 ? (
                  <div className="text-slate-500 py-10 text-center">
                    Ready to commence payload injection.
                  </div>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className={`
                      ${log.includes('HTTP 5') ? 'text-red-400' : ''}
                      ${log.includes('HTTP 401') || log.includes('HTTP 403') ? 'text-amber-400' : ''}
                      ${log.includes('[SUCCESS]') || log.includes('HTTP 2') ? 'text-green-400' : ''}
                      ${!log.includes('HTTP') && !log.includes('[SUCCESS]') ? 'text-slate-300' : ''}
                    `}>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const PenTestModule = () => {
  const [target, setTarget] = useState('10.0.4.15');
  const [isActive, setIsActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [findings, setFindings] = useState<any[]>([]);
  const [phase, setPhase] = useState<string>('IDLE');

  const runCampaign = () => {
    if (!target) return;
    setIsActive(true);
    setLogs([`[*] Initializing Apex Red Team Module against ${target}...`]);
    setFindings([]);
    setPhase('RECONNAISSANCE');

    let step = 0;
    const steps = [
      { p: 'RECON', msg: `[+] Started Nmap SYN/Stealth Scan against ${target}`, delay: 800 },
      { p: 'RECON', msg: `[+] Discovered open port 22/tcp (ssh)`, delay: 600 },
      { p: 'RECON', msg: `[+] Discovered open port 80/tcp (http)`, delay: 400 },
      { p: 'RECON', msg: `[+] Discovered open port 443/tcp (https)`, delay: 500 },
      { p: 'RECON', msg: `[+] Discovered open port 3306/tcp (mysql)`, delay: 300 },
      { p: 'VULN', msg: `[*] Starting vulnerability enumeration...`, delay: 1000 },
      { p: 'VULN', msg: `[!] Vulnerability found: Outdated OpenSSL version (CVE-2023-XXXX).`, delay: 1200, finding: { id: 'CVE-2023-XXXX', name: 'OpenSSL Vulnerability', severity: 'High' } },
      { p: 'EXPLOIT', msg: `[*] Attempting simulated exploitation on 443/tcp...`, delay: 1500 },
      { p: 'EXPLOIT', msg: `[-] Exploit failed. WAF detected anomalous traffic.`, delay: 800 },
      { p: 'EXPLOIT', msg: `[*] Pivoting to secondary attack vector: MySQL misconfiguration...`, delay: 1000 },
      { p: 'EXPLOIT', msg: `[+] Authentication bypassed successfully using known backdoor payload.`, delay: 1200, finding: { id: 'MISCONF-01', name: 'MySQL Unauthenticated Backdoor', severity: 'Critical' } },
      { p: 'POST-EXP', msg: `[*] Initiating post-exploitation and privilege escalation...`, delay: 1000 },
      { p: 'POST-EXP', msg: `[+] Root shell obtained.`, delay: 900 },
      { p: 'DONE', msg: `[*] Campaign complete. Exporting artifacts.`, delay: 500 }
    ];

    const executeStep = () => {
      if (step >= steps.length) {
        setIsActive(false);
        setPhase('COMPLETE');
        return;
      }
      const current = steps[step];
      setPhase(current.p);
      setLogs(prev => [...prev, current.msg]);
      if (current.finding) {
        setFindings(prev => [...prev, current.finding]);
      }
      step++;
      setTimeout(executeStep, current.delay);
    };

    setTimeout(executeStep, 1000);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <Card>
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Crosshair className="text-red-500" />
            Active Penetration Testing (Simulated)
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Launch multi-phase penetration testing campaigns simulating real-world adversary tactics (Reconnaissance, Enumeration, Exploitation).
          </p>
        </div>
        <div className="p-6">
          <div className="flex gap-3 mb-6">
            <input 
              type="text" 
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Target IP or CIDR (e.g., 10.0.0.1/24)"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-mono"
              disabled={isActive}
            />
            <Button variant="danger" onClick={runCampaign} disabled={isActive || !target}>
              {isActive ? <RefreshCw className="animate-spin" /> : <Play fill="currentColor" />}
              {isActive ? `Running: Phase ${phase}` : 'Launch Campaign'}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-black rounded-lg border border-slate-700 overflow-hidden flex flex-col h-[400px]">
              <div className="p-2 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>ATTACK_VECTOR_TERMINAL</span>
                <span className={isActive ? 'text-red-400 animate-pulse' : ''}>{phase}</span>
              </div>
              <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-1 font-mono text-sm">
                {logs.length === 0 ? (
                  <div className="text-slate-600 italic">No active campaign. Awaiting target acquisition...</div>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className={`
                      ${log.includes('[-]') ? 'text-amber-400' : ''}
                      ${log.includes('[!]') || log.includes('Failed') ? 'text-red-400 font-bold' : ''}
                      ${log.includes('[+]') ? 'text-green-400' : ''}
                      ${log.startsWith('[*]') ? 'text-blue-300' : ''}
                    `}>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                <Bug className="w-5 h-5 text-amber-500" />
                Exploited Vulnerabilities
              </h3>
              {findings.length === 0 ? (
                <div className="text-sm text-slate-500 p-4 border border-dashed border-slate-700 rounded bg-slate-800/30 text-center">
                  No vulnerabilities discovered yet.
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {findings.map((finding, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-800 p-4 rounded-lg border border-red-500/30"
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-xs text-red-400 font-bold">{finding.id}</span>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                            finding.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {finding.severity}
                          </span>
                        </div>
                        <div className="text-sm text-slate-200 mt-2 font-medium">{finding.name}</div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const AegisUltimateModule = () => {
  const [logs, setLogs] = useState<string[]>([
    "🚀 INITIALIZING AEGIS ULTIMATE SECURITY FRAMEWORK",
    "⭐ Advanced Defensive & Offensive Capabilities",
    "================================================================================",
    "✅ AEGIS ULTIMATE SECURITY: OPERATIONAL",
    "⚔️ Advanced Countermeasures: LOADED",
    "🛡️ Comprehensive Protection: ACTIVE",
    "================================================================================",
    "Awaiting command input..."
  ]);
  const [frameworkId] = useState(`AEGIS-ULTRA-${Math.random().toString(16).substring(2, 10).toUpperCase()}`);
  const [status, setStatus] = useState({
    breachDetection: false,
    countermeasures: false,
    selfHealing: false,
  });
  const [processing, setProcessing] = useState(false);

  const appendLogs = (lines: {msg: string, delay: number}[], onComplete?: () => void) => {
    setProcessing(true);
    let currentDelay = 0;
    lines.forEach(({msg, delay}) => {
      currentDelay += delay;
      setTimeout(() => {
        setLogs(prev => [...prev, msg]);
      }, currentDelay);
    });
    setTimeout(() => {
      setProcessing(false);
      if (onComplete) onComplete();
    }, currentDelay);
  };

  const handleAction = (type: string) => {
    if (processing) return;
    if (type === 'breach') {
      appendLogs([
        {msg: '\n🔍 ACTIVATING ADVANCED BREACH DETECTION...', delay: 0},
        {msg: '   🔧 Deploying: Quantum Anomaly Detection', delay: 200},
        {msg: '   🔧 Deploying: Behavioral Deviation Analysis', delay: 200},
        {msg: '   🔧 Deploying: Memory Integrity Checking', delay: 200},
        {msg: '   🔧 Deploying: Network Traffic Analysis', delay: 200},
        {msg: '   🔧 Deploying: Process Behavior Monitoring', delay: 200},
        {msg: '✅ Advanced Breach Detection: ACTIVE', delay: 400},
        {msg: "🚨 Detected Threats: ['Zero-Day Exploit Attempt', 'Advanced Persistent Threat']", delay: 800},
        {msg: '\n🚀 INITIATING AUTOMATED BREACH RESPONSE...', delay: 400},
        {msg: '   🛡️ Responding to: Zero-Day Exploit Attempt', delay: 400},
        {msg: '   🔒 Zero-Day Response: Memory Isolation', delay: 300},
        {msg: '   🛡️ Responding to: Advanced Persistent Threat', delay: 400},
        {msg: '   🕵️ APT Response: Attacker Attribution', delay: 300},
        {msg: '✅ Automated Breach Response: COMPLETE', delay: 500},
      ], () => setStatus(s => ({...s, breachDetection: true})));
    } else if (type === 'counter') {
      appendLogs([
        {msg: '\n⚔️ ACTIVATING COUNTER-OFFENSIVE MEASURES - LEVEL: HIGH', delay: 0},
        {msg: '   🔥 Deploying: Controlled Counter-Attack', delay: 400},
        {msg: '   🔥 Deploying: Infrastructure Takeover', delay: 400},
        {msg: '   🔥 Deploying: Attacker System Compromise', delay: 400},
        {msg: '   🔥 Deploying: Strategic Disinformation', delay: 400},
        {msg: '✅ Counter-Offensive Measures: DEPLOYED', delay: 600},
      ], () => setStatus(s => ({...s, countermeasures: true})));
    } else if (type === 'healing') {
      appendLogs([
        {msg: '\n💫 ACTIVATING SELF-HEALING SECURITY SYSTEMS...', delay: 0},
        {msg: '   🔄 Activating: Automated Vulnerability Patching', delay: 300},
        {msg: '   🔄 Activating: Configuration Integrity Restoration', delay: 300},
        {msg: '   🔄 Activating: Malware Auto-Eradication', delay: 300},
        {msg: '   🔄 Activating: System State Recovery', delay: 300},
        {msg: '✅ Self-Healing Security: ACTIVE', delay: 400},
      ], () => setStatus(s => ({...s, selfHealing: true})));
    } else if (type === 'simulate') {
      appendLogs([
        {msg: '\n🎯 SIMULATING ATTACK & AUTOMATIC RECOVERY...', delay: 0},
        {msg: '   🔥 Simulating: ' + ['Ransomware Infection', 'Data Breach Attempt', 'System Compromise', 'Network Intrusion'][Math.floor(Math.random() * 4)], delay: 1000},
        ...(status.selfHealing ? [
          {msg: '   💫 Self-Healing Mechanisms Activated', delay: 800},
          {msg: '   🔄 Automatic Recovery in Progress...', delay: 1500},
          {msg: '   ✅ System Fully Restored', delay: 600},
        ] : [
          {msg: '   ❌ Self-Healing Disabled - Manual Intervention Required', delay: 800},
        ])
      ]);
    } else if (type === 'quantum') {
      appendLogs([
        {msg: '\n🔐 DEPLOYING QUANTUM-RESISTANT ENCRYPTION...', delay: 0},
        {msg: '   🔒 Implementing: CRYSTALS-Kyber', delay: 300},
        {msg: '   🔒 Implementing: NTRU', delay: 300},
        {msg: '   🔒 Implementing: Rainbow', delay: 300},
        {msg: '   🔒 Implementing: Falcon', delay: 300},
        {msg: '✅ Quantum-Resistant Encryption: ACTIVE', delay: 400},
      ]);
    } else if (type === 'clear') {
      setLogs([]);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <Card>
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-emerald-500" />
            AEGIS ULTIMATE SECURITY
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Advanced Defensive & Offensive Capabilities - Breach Response, Counter-Offensive, and Advanced Security
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-300 text-sm uppercase tracking-wider mb-4">Command Center</h3>
            {[
              { id: 'breach', label: 'Advanced Breach Detection', icon: AlertTriangle, color: 'text-amber-400' },
              { id: 'counter', label: 'Counter-Offensive Measures', icon: Crosshair, color: 'text-red-400' },
              { id: 'healing', label: 'Self-Healing Security', icon: Activity, color: 'text-emerald-400' },
              { id: 'simulate', label: 'Simulate Attack & Recovery', icon: Bug, color: 'text-orange-400' },
              { id: 'quantum', label: 'Quantum Protocols', icon: Zap, color: 'text-blue-400' },
            ].map(btn => (
              <Button 
                key={btn.id}
                variant="outline" 
                className="w-full justify-start text-left bg-slate-900 border-slate-700 hover:bg-slate-800"
                onClick={() => handleAction(btn.id)}
                disabled={processing}
              >
                <btn.icon className={`w-4 h-4 ${btn.color} shrink-0`} />
                {btn.label}
              </Button>
            ))}

            <div className="mt-8 bg-slate-900 p-4 rounded-lg border border-slate-700">
              <h4 className="font-medium text-slate-300 mb-3 text-sm">System Variables</h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Framework ID:</span>
                  <span className="text-slate-300">{frameworkId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Breach Det:</span>
                  <span className={status.breachDetection ? "text-emerald-400" : "text-slate-400"}>
                    {status.breachDetection ? "ACTIVE" : "INACTIVE"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Countermeasures:</span>
                  <span className={status.countermeasures ? "text-red-400" : "text-slate-400"}>
                    {status.countermeasures ? "ARMED" : "DISARMED"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Self-Healing:</span>
                  <span className={status.selfHealing ? "text-emerald-400" : "text-slate-400"}>
                    {status.selfHealing ? "ENABLED" : "DISABLED"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg border border-slate-700 overflow-hidden flex flex-col h-[500px]">
              <div className="p-3 border-b border-slate-800 bg-slate-900 flex justify-between items-center text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-500" />
                  <span className="text-slate-300">AEGIS_CONSOLE // bash</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleAction('clear')} className="text-slate-500 hover:text-slate-300 transition-colors">Clear</button>
                  <span className={processing ? "text-emerald-500 animate-pulse" : "text-slate-600"}>
                    {processing ? "PROCESSING..." : "IDLE"}
                  </span>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto flex flex-col font-mono text-sm leading-relaxed" 
                   ref={(el) => { if (el) el.scrollTop = el.scrollHeight; }}>
                {logs.map((log, i) => (
                  <div key={i} className={`whitespace-pre-wrap ${
                    log.includes('✅') ? 'text-emerald-400' :
                    log.includes('❌') || log.includes('🔥') || log.includes('🚨') || log.includes('💀') ? 'text-red-400' :
                    log.includes('🛡️') || log.includes('⚔️') || log.includes('🪐') ? 'text-amber-400' :
                    log.includes('🚀') ? 'text-blue-400' :
                    'text-slate-300'
                  }`}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const QuantumCancerResearchModule = () => {
  const [logs, setLogs] = useState<string[]>([
    "🧬 INITIALIZING QUANTUM ONCOLOGY ENGINE",
    "🔬 Connecting to Quantum Processors...",
    "================================================================================",
    "✅ Engine Ready. Awaiting genomic sequence or molecular target."
  ]);
  const [processing, setProcessing] = useState(false);
  const [phase, setPhase] = useState("IDLE");
  const [results, setResults] = useState<{ id: string; target: string; affinity: number; viability: number; toxicity: number }[]>([]);

  const runSimulation = () => {
    if (processing) return;
    setProcessing(true);
    setPhase("INITIALIZING_QUBITS");
    setResults([]);

    const simulationSteps = [
      { msg: "\n[⚡] Allocating 4096 logical qubits for molecular docking...", delay: 0, newPhase: "QUBIT_ALLOCATION" },
      { msg: "[🔍] Ingesting patient genomic sequence data (BRCA1/BRCA2 mutants)...", delay: 800, newPhase: "DATA_INGESTION" },
      { msg: "[⚛️] Preparing Hamiltonian for target protein folding pathways...", delay: 1200, newPhase: "HAMILTONIAN_PREP" },
      { msg: "[+] Executing VQE (Variational Quantum Eigensolver) algorithm...", delay: 1500, newPhase: "VQE_EXECUTION" },
      { msg: "    -> Iteration 100/1000: Energy convergence = -1402.453 Ha", delay: 1000, newPhase: "VQE_EXECUTION" },
      { msg: "    -> Iteration 500/1000: Energy convergence = -1438.912 Ha", delay: 800, newPhase: "VQE_EXECUTION" },
      { msg: "    -> Iteration 1000/1000: Optimal state reached.", delay: 800, newPhase: "VQE_EXECUTION" },
      { msg: "[🔬] Simulating ligand binding affinities across 10^12 candidates...", delay: 1500, newPhase: "LIGAND_SCREENING" },
      { msg: "[✅] Candidate pool reduced to top 3 viable inhibitors.", delay: 1200, newPhase: "ANALYSIS_COMPLETE" }
    ];

    let currentDelay = 0;
    simulationSteps.forEach(({ msg, delay, newPhase }) => {
      currentDelay += delay;
      setTimeout(() => {
        setLogs(prev => [...prev, msg]);
        setPhase(newPhase);
      }, currentDelay);
    });

    setTimeout(() => {
      setProcessing(false);
      setResults([
        { id: "MOL-Q81", target: "TP53_MUT", affinity: 98.4, viability: 94.2, toxicity: 2.1 },
        { id: "MOL-K29", target: "EGFR_EXON20", affinity: 95.1, viability: 89.7, toxicity: 4.8 },
        { id: "MOL-Z44", target: "KRAS_G12D", affinity: 92.8, viability: 91.5, toxicity: 3.5 }
      ]);
      setLogs(prev => [...prev, "\n[🏁] Quantum simulation complete. Results exported to analytics dashboard."]);
    }, currentDelay + 500);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <Card>
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Atom className="text-purple-500" />
            Quantum-Assisted Oncology Engine
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Leverage quantum superposition to simulate billions of molecular interactions simultaneously, discovering unprecedented targeted cancer therapies.
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-5">
              <h3 className="font-semibold text-slate-300 flex items-center gap-2 mb-4">
                <Dna className="w-5 h-5 text-purple-400" />
                Simulation Controls
              </h3>
              <Button 
                variant="primary" 
                className="w-full bg-purple-600 hover:bg-purple-500 text-white"
                onClick={runSimulation}
                disabled={processing}
              >
                {processing ? <RefreshCw className="animate-spin w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" fill="currentColor" />}
                {processing ? `Running (${phase})` : 'Start Molecular Simulation'}
              </Button>
            </div>

            {results.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-300 flex items-center gap-2">
                  <Microscope className="w-5 h-5 text-emerald-400" />
                  Discovered Candidates
                </h3>
                {results.map((result, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="bg-slate-900 border border-emerald-500/30 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-emerald-400 font-bold">{result.id}</span>
                      <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Target: {result.target}</span>
                    </div>
                    <div className="space-y-1 text-sm text-slate-400">
                      <div className="flex justify-between">
                        <span>Binding Affinity</span>
                        <span className="text-slate-200">{result.affinity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cell Viability</span>
                        <span className="text-slate-200">{result.viability}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Predicted Toxicity</span>
                        <span className={result.toxicity < 5 ? "text-emerald-400" : "text-amber-400"}>{result.toxicity}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg border border-slate-700 overflow-hidden flex flex-col h-[500px]">
              <div className="p-3 border-b border-slate-800 bg-slate-900 flex justify-between items-center text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-500" />
                  <span className="text-slate-300">QPU_INTERFACE // qasm_sim</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setLogs([])} className="text-slate-500 hover:text-slate-300 transition-colors">Clear</button>
                  <span className={processing ? "text-purple-500 animate-pulse" : "text-slate-600"}>
                    {processing ? phase : "IDLE"}
                  </span>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto flex flex-col font-mono text-sm leading-relaxed" 
                   ref={(el) => { if (el) el.scrollTop = el.scrollHeight; }}>
                {logs.map((log, i) => (
                  <div key={i} className={`whitespace-pre-wrap ${
                    log.includes('✅') || log.includes('🏁') ? 'text-emerald-400' :
                    log.includes('🔬') || log.includes('🧬') ? 'text-purple-400' :
                    log.includes('⚡') || log.includes('⚛️') ? 'text-blue-400' :
                    log.includes('->') ? 'text-slate-500' :
                    'text-slate-300'
                  }`}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'pqc', label: 'PQC Key Generator', icon: Key },
    { id: 'tls', label: 'TLS Scanner', icon: Lock },
    { id: 'sbom', label: 'SBOM Generator', icon: FileJson },
    { id: 'tools', label: 'Advanced Tools & Daemons', icon: Terminal },
    { id: 'fuzzer', label: 'API Fuzzer', icon: Cpu },
    { id: 'pentest', label: 'Penetration Testing', icon: Crosshair },
    { id: 'aegis', label: 'Aegis Ultimate', icon: ShieldCheck },
    { id: 'quantum_cancer', label: 'Quantum Oncology', icon: Atom },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900 text-slate-200 selection:bg-blue-500/30">
      
      {/* Sidebar */}
      <div className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col z-10 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
          <ShieldAlert className="w-6 h-6 text-blue-500" />
          <span className="font-bold tracking-wide text-sm truncate">VSAT BLUE TEAM</span>
        </div>
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-xs font-mono uppercase text-slate-600 tracking-wider">Modules</div>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-600/10 text-blue-400' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-500' : 'text-slate-500'}`} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 text-xs font-mono text-slate-600 border-t border-slate-800">
          v2.4.0-quantum-ready
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {navItems.find(i => i.id === activeTab)?.label}
              </h1>
              <p className="text-slate-400 mt-2">Quantum Security & Compliance Suite</p>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'dashboard' && <DashboardModule />}
                {activeTab === 'pqc' && <PQCKeyGenModule />}
                {activeTab === 'tls' && <TLSScannerModule />}
                {activeTab === 'sbom' && <SBOMModule />}
                {activeTab === 'tools' && <AdvancedToolsModule />}
                {activeTab === 'fuzzer' && <APIFuzzerModule />}
                {activeTab === 'pentest' && <PenTestModule />}
                {activeTab === 'aegis' && <AegisUltimateModule />}
                {activeTab === 'quantum_cancer' && <QuantumCancerResearchModule />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

    </div>
  );
}
