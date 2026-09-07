'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ArchitectureMode = 'system' | 'clean' | 'offline';

interface ArchNode {
  id: string;
  title: string;
  shortLabel: string;
  layer: string;
  category: string;
  x: number;
  y: number;
  labelPos?: 'above' | 'below';
  color: string;
  badge: string;
  shortDesc: string;
  tech: string[];
  patterns: string[];
  projectUsed: string;
  metrics: string;
  responsibilities: string[];
}

interface ArchEdge {
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
}

// ─── 1. SYSTEM DESIGN (END-TO-END DISTRIBUTED ARCHITECTURE - HORIZONTAL PIPELINE) ───
const systemNodes: ArchNode[] = [
  {
    id: 'client',
    title: 'Flutter Multiplatform Client',
    shortLabel: 'Flutter Client',
    layer: 'Presentation & Client Layer',
    category: 'Client',
    x: 12,
    y: 25,
    labelPos: 'below',
    color: '#E31E24',
    badge: 'FRONTEND CORE',
    shortDesc: 'Single unified Dart codebase compiling natively to Android, iOS, Web & Windows.',
    tech: ['Flutter 3.x', 'Dart', 'BLoC / Cubit', 'GoRouter', 'Native Platform Channels'],
    patterns: ['BLoC Pattern', 'Observer', 'Adaptive UI / Responsive Layout', 'Optimistic UI'],
    projectUsed: 'BuildMart (100K+ downloads), Godrej LIVING, DG Ferry, Sah Investment',
    metrics: 'Butter-smooth 60fps rendering, sub-1.2s cold start, zero jank',
    responsibilities: [
      'Universal UI rendering across phone, tablet, desktop and web from a single codebase',
      'Local state management and reactive UI updates via Dart streams',
      'Hardware integration via custom platform channels (biometrics, NFC, BLE, thermal printers)',
      'Secure credential storage and token refresh lifecycles',
    ],
  },
  {
    id: 'gateway',
    title: 'API & Security Gateway',
    shortLabel: 'API Gateway',
    layer: 'Network & Perimeter Security',
    category: 'Security',
    x: 36,
    y: 25,
    labelPos: 'below',
    color: '#60a5fa',
    badge: 'API GATEWAY',
    shortDesc: 'Reverse proxy, SSL pinning verification, rate limiting, and RBAC authentication.',
    tech: ['Dio HTTP', 'SSL / Certificate Pinning', 'JWT Bearer', 'OAuth 2.0', 'AES-256'],
    patterns: ['API Gateway Pattern', 'Token Interceptor Pattern', 'Circuit Breaker'],
    projectUsed: 'ZingHR Enterprise Bridge, DG Ferry, NCH Enterprise Suite',
    metrics: 'Sub-45ms routing latency, 100% encrypted in-transit traffic',
    responsibilities: [
      'Cryptographic SSL pinning to thwart man-in-the-middle (MITM) attacks',
      'Automatic OAuth2 token rotation with silent re-authentication queues',
      'Adaptive network timeouts and request deduplication',
      'Fine-grained role-based access control (RBAC) verification',
    ],
  },
  {
    id: 'rest',
    title: 'REST & GraphQL Microservices',
    shortLabel: 'REST & GraphQL',
    layer: 'Application & Business Services',
    category: 'Backend',
    x: 65,
    y: 11,
    labelPos: 'above',
    color: '#818cf8',
    badge: 'SERVICE API',
    shortDesc: 'Stateless backend APIs handling business logic, user transactions, and data workflows.',
    tech: ['Node.js / Go', 'GraphQL', 'RESTful API', 'JSON Schema', 'Docker'],
    patterns: ['Microservices Architecture', 'CQRS', 'Repository Pattern'],
    projectUsed: 'Manier De Voir eCommerce, Magicrete Sarthak ERP, Pulpit Mobility',
    metrics: '99.95% API uptime, 85ms avg response time',
    responsibilities: [
      'Domain business transaction processing and input validation',
      'Granular GraphQL queries minimizing cellular data payload consumption',
      'Batch processing for high-volume inventory and order pipelines',
    ],
  },
  {
    id: 'websocket',
    title: 'WebSocket Real-Time Engine',
    shortLabel: 'WebSockets',
    layer: 'Real-Time Communication',
    category: 'Realtime',
    x: 65,
    y: 25,
    labelPos: 'below',
    color: '#34d399',
    badge: 'LIVE STREAMS',
    shortDesc: 'Bidirectional persistent sockets for live driver tracking, chats, and instant alerts.',
    tech: ['WebSockets', 'Socket.io', 'Firebase FCM', 'Server-Sent Events (SSE)'],
    patterns: ['Publish-Subscribe', 'Heartbeat Connection Keep-Alive', 'Exponential Reconnection'],
    projectUsed: 'DG Ferry Live Maritime Tracker, Pulpit Mobility Cab Booking',
    metrics: 'Sub-30ms live coordinate broadcast, auto-reconnect in < 2s',
    responsibilities: [
      'Live GPS telemetry streaming with dead-reckoning coordinate interpolation',
      'High-priority push notifications with background handling via Firebase FCM',
      'Persistent presence detection and real-time state synchronization',
    ],
  },
  {
    id: 'ai-engine',
    title: 'AI & Machine Learning Services',
    shortLabel: 'AI & ML Pipeline',
    layer: 'Intelligent Inference',
    category: 'AI / ML',
    x: 65,
    y: 39,
    labelPos: 'below',
    color: '#c084fc',
    badge: 'AI INFERENCE',
    shortDesc: 'Hybrid AI pipeline combining on-device ML Kit with OpenAI / Gemini cloud intelligence.',
    tech: ['Google ML Kit', 'OpenAI GPT-4o', 'Google Gemini 1.5 Pro', 'Claude 3.5 Sonnet', 'Vector DB'],
    patterns: ['Retrieval-Augmented Generation (RAG)', 'On-Device Edge Computing', 'Prompt Chaining'],
    projectUsed: 'Magicrete Automated Invoice OCR, Intelligent Support Chatbot',
    metrics: '99.4% OCR accuracy, edge processing in < 180ms',
    responsibilities: [
      'On-device document scanning, text recognition (OCR), and barcode parsing',
      'Enterprise knowledge retrieval via RAG vectors for context-aware customer queries',
      'Natural language voice-to-action intent parsing and automated ticket dispatch',
    ],
  },
  {
    id: 'cache',
    title: 'Distributed Redis & Edge Cache',
    shortLabel: 'Redis Cache',
    layer: 'Fast Data Access',
    category: 'Cache',
    x: 94,
    y: 15,
    labelPos: 'above',
    color: '#fbbf24',
    badge: 'HIGH SPEED',
    shortDesc: 'In-memory caching layer accelerating repeated catalog and profile queries.',
    tech: ['Redis', 'Cloudflare Edge CDN', 'Memory Cache', 'LRU Eviction'],
    patterns: ['Cache-Aside Pattern', 'Write-Through Cache', 'Stale-While-Revalidate'],
    projectUsed: 'BuildMart Product Catalog, Manier De Voir Flash Sales',
    metrics: 'Sub-5ms cache hits, 85% reduced primary database load',
    responsibilities: [
      'Session storage and token revocation blacklists',
      'Catalog and pricing data caching with instant geo-distributed edge invalidation',
      'Rate-limit tracking counters and temporary queue buffers',
    ],
  },
  {
    id: 'database',
    title: 'Enterprise Relational & Cloud DB',
    shortLabel: 'PostgreSQL / DB',
    layer: 'Persistent Storage',
    category: 'Database',
    x: 94,
    y: 35,
    labelPos: 'below',
    color: '#38bdf8',
    badge: 'DATA PERSISTENCE',
    shortDesc: 'ACID-compliant relational database and NoSQL document store with replica redundancy.',
    tech: ['PostgreSQL', 'Firebase Firestore', 'MongoDB', 'Supabase', 'Encrypted Backups'],
    patterns: ['Database Replication', 'Sharding', 'Read/Write Splitting'],
    projectUsed: 'Godrej LIVING Resident Data, Sah Investment Portfolios',
    metrics: 'Multi-AZ replication, 99.999% durability, zero data loss',
    responsibilities: [
      'Authoritative persistent data storage with strict referential integrity',
      'Row-Level Security (RLS) policies enforcing multi-tenant data boundaries',
      'Automated point-in-time recovery and transactional audit logs',
    ],
  },
  {
    id: 'erp',
    title: 'Enterprise ERP & Cloud Storage',
    shortLabel: 'ERP & S3 Storage',
    layer: 'Legacy & Enterprise Integration',
    category: 'Enterprise',
    x: 118,
    y: 25,
    labelPos: 'below',
    color: '#f43f5e',
    badge: 'ENTERPRISE ERP',
    shortDesc: 'Seamless synchronization with enterprise SAP / Salesforce backends and S3 asset buckets.',
    tech: ['SAP B1 Connect', 'Salesforce REST', 'AWS S3', 'Firebase Cloud Storage'],
    patterns: ['Anti-Corruption Layer (ACL)', 'Adapter Pattern', 'Idempotent Sync'],
    projectUsed: 'NCH Enterprise Suite, Magicrete Sarthak Supply Chain',
    metrics: '10K+ bulk invoices synced per batch with atomic reconciliation',
    responsibilities: [
      'Two-way synchronization with SAP and custom legacy enterprise software',
      'Secure S3 pre-signed URLs for high-resolution inspection photos and blueprints',
      'Idempotent webhook triggers guaranteeing at-least-once message delivery',
    ],
  },
];

const systemEdges: ArchEdge[] = [
  { from: 'client', to: 'gateway', animated: true },
  { from: 'gateway', to: 'rest', animated: true },
  { from: 'gateway', to: 'websocket', animated: true },
  { from: 'gateway', to: 'ai-engine', animated: true },
  { from: 'rest', to: 'cache', animated: true },
  { from: 'rest', to: 'database', animated: true },
  { from: 'websocket', to: 'cache', animated: true },
  { from: 'ai-engine', to: 'database', animated: true },
  { from: 'cache', to: 'erp', animated: true },
  { from: 'database', to: 'erp', animated: true },
];

// ─── 2. CLEAN ARCHITECTURE (FLUTTER CODEBASE INTERNAL LAYERS - HORIZONTAL PIPELINE) ───
const cleanNodes: ArchNode[] = [
  {
    id: 'clean-ui',
    title: 'Presentation: UI Widgets & Views',
    shortLabel: 'UI Widgets',
    layer: 'Presentation Layer (Outer)',
    category: 'UI',
    x: 12,
    y: 25,
    labelPos: 'below',
    color: '#E31E24',
    badge: 'PRESENTATION',
    shortDesc: 'Declarative, decoupled Flutter widget tree with zero direct business logic.',
    tech: ['Flutter Widgets', 'Custom Painters', 'Design Tokens', 'Adaptive Navigation'],
    patterns: ['Atomic Design', 'Composition over Inheritance', 'Stateful / Stateless Split'],
    projectUsed: 'All 30+ production Flutter applications',
    metrics: 'Strict separation: 0 database or raw network calls inside widgets',
    responsibilities: [
      'Render UI purely as a function of incoming BLoC states',
      'Dispatch user events (taps, gestures, scrolls) into the BLoC event sink',
      'Provide platform-adaptive UI elements (Cupertino on iOS, Material 3 on Android)',
    ],
  },
  {
    id: 'clean-bloc',
    title: 'Presentation: BLoC / Cubit State Machine',
    shortLabel: 'BLoC / Cubit',
    layer: 'Presentation Layer (State)',
    category: 'State Machine',
    x: 32,
    y: 25,
    labelPos: 'below',
    color: '#f97316',
    badge: 'STATE MANAGEMENT',
    shortDesc: 'Unidirectional data flow transforming user actions into immutable UI states.',
    tech: ['flutter_bloc', 'bloc', 'rxdart', 'Freezed', 'Equatable'],
    patterns: ['BLoC Pattern', 'State Machine', 'Debouncing / Throttling Streams'],
    projectUsed: 'BuildMart, Godrej Living, DG Ferry, Yoneti',
    metrics: '100% reproducible states, time-travel debugging, zero state leakage',
    responsibilities: [
      'Consume UI events and delegate business operations to Domain Use Cases',
      'Emit immutable state snapshots consumed by BlocBuilder and BlocListener',
      'Handle async operation states: Initial, Loading, Success, and Failure',
    ],
  },
  {
    id: 'clean-usecase',
    title: 'Domain: Business Use Cases / Interactors',
    shortLabel: 'Use Cases',
    layer: 'Domain Layer (Heart of App)',
    category: 'Domain Logic',
    x: 52,
    y: 25,
    labelPos: 'below',
    color: '#a855f7',
    badge: 'CORE DOMAIN',
    shortDesc: 'Pure Dart business rules with zero dependencies on Flutter UI or data storage.',
    tech: ['Pure Dart', 'fpdart (Either<Failure, Type>)', 'Value Objects'],
    patterns: ['Command Pattern', 'Single Responsibility Principle', 'Dependency Inversion'],
    projectUsed: 'Standardized across all enterprise project templates',
    metrics: '100% unit-testable without mocking Flutter UI frameworks',
    responsibilities: [
      'Execute single specific business rules (e.g. `SubmitOrderUseCase`, `TrackFerryUseCase`)',
      'Validate input business logic and return functional `Either<Failure, Result>` types',
      'Call domain repository interfaces without knowing whether data is local or remote',
    ],
  },
  {
    id: 'clean-repo-contract',
    title: 'Domain: Repository Contracts (Interfaces)',
    shortLabel: 'Repo Interface',
    layer: 'Domain Layer (Abstraction)',
    category: 'Abstractions',
    x: 72,
    y: 25,
    labelPos: 'below',
    color: '#06b6d4',
    badge: 'INTERFACES',
    shortDesc: 'Abstract contracts defining what data operations exist, establishing dependency inversion.',
    tech: ['Dart Abstract Classes', 'Dependency Injection (GetIt / Injectable)'],
    patterns: ['Dependency Inversion Principle (DIP)', 'Interface Segregation'],
    projectUsed: 'All production enterprise projects',
    metrics: 'Allows swapping backend without touching any UI or domain logic',
    responsibilities: [
      'Define clean API surface for domain use cases (`IOrderRepository`, `IAuthRepository`)',
      'Isolate domain layer from external framework, API, or database changes',
    ],
  },
  {
    id: 'clean-repo-impl',
    title: 'Data: Repository Implementation',
    shortLabel: 'Repo Impl',
    layer: 'Data Layer (Coordination)',
    category: 'Data Logic',
    x: 92,
    y: 25,
    labelPos: 'below',
    color: '#10b981',
    badge: 'DATA REPOSITORY',
    shortDesc: 'Single source of truth orchestrating local cache fallback and remote API synchronization.',
    tech: ['Dart', 'InternetConnectionChecker', 'Cache Policy Manager'],
    patterns: ['Repository Pattern', 'Cache-First Strategy', 'Fallback Strategy'],
    projectUsed: 'BuildMart (construction offline zones), DG Ferry (sea connectivity drops)',
    metrics: 'Transparent online/offline switching with 0 UI disruption',
    responsibilities: [
      'Check device network status and serve cached local data when offline',
      'Fetch remote API data, update local cache, and broadcast updated model to caller',
      'Map raw API JSON data models into pure Domain Entities',
    ],
  },
  {
    id: 'clean-local',
    title: 'Data: Local Cache (SQLite / Hive)',
    shortLabel: 'Local SQLite',
    layer: 'Data Sources (Local)',
    category: 'Local Storage',
    x: 116,
    y: 15,
    labelPos: 'above',
    color: '#eab308',
    badge: 'OFFLINE CACHE',
    shortDesc: 'Encrypted device database powering instant launch and offline access.',
    tech: ['sqflite', 'hive_flutter', 'flutter_secure_storage'],
    patterns: ['Data Access Object (DAO)', 'Key-Value & Relational Store'],
    projectUsed: 'All projects for credentials, cached catalogs, and offline forms',
    metrics: 'Sub-15ms local queries, AES hardware encryption',
    responsibilities: [
      'Persist relational tables, offline queue, and encrypted JWT tokens',
      'Provide instant app start-up data before network roundtrips complete',
    ],
  },
  {
    id: 'clean-remote',
    title: 'Data: Remote API Data Source (Dio)',
    shortLabel: 'Remote Dio',
    layer: 'Data Sources (Remote)',
    category: 'Remote API',
    x: 116,
    y: 35,
    labelPos: 'below',
    color: '#3b82f6',
    badge: 'REMOTE NETWORK',
    shortDesc: 'Custom Dio HTTP client with interceptors, logging, and SSL pinning.',
    tech: ['Dio', 'Retrofit', 'GraphQL Client', 'PrettyDioLogger'],
    patterns: ['Interceptor Chain', 'Adapter Pattern'],
    projectUsed: 'All projects connecting to cloud backends',
    metrics: 'Configurable retries, automatic gzip decompression',
    responsibilities: [
      'Execute HTTP GET/POST/PUT/DELETE requests with structured serialization',
      'Inject authorization headers and capture network exception types',
    ],
  },
];

const cleanEdges: ArchEdge[] = [
  { from: 'clean-ui', to: 'clean-bloc', animated: true },
  { from: 'clean-bloc', to: 'clean-usecase', animated: true },
  { from: 'clean-usecase', to: 'clean-repo-contract', animated: true },
  { from: 'clean-repo-contract', to: 'clean-repo-impl', animated: true },
  { from: 'clean-repo-impl', to: 'clean-local', animated: true },
  { from: 'clean-repo-impl', to: 'clean-remote', animated: true },
];

// ─── 3. OFFLINE-FIRST & RESILIENCE PIPELINE (HORIZONTAL PIPELINE) ───
const offlineNodes: ArchNode[] = [
  {
    id: 'off-action',
    title: '1. User Submits Mutation',
    shortLabel: '1. User Action',
    layer: 'Trigger Phase',
    category: 'Action',
    x: 12,
    y: 25,
    labelPos: 'below',
    color: '#E31E24',
    badge: 'STEP 1',
    shortDesc: 'User submits an order, inspection form, or chat message under flaky or zero network.',
    tech: ['Flutter Form', 'BLoC Event Sink'],
    patterns: ['Command Object'],
    projectUsed: 'BuildMart (Construction Sites), DG Sea Connect',
    metrics: 'Instant execution without spinner delay',
    responsibilities: [
      'Capture user input with strict client-side validation',
      'Wrap payload into an idempotent transaction command',
    ],
  },
  {
    id: 'off-optimistic',
    title: '2. Optimistic UI State Render',
    shortLabel: '2. Optimistic UI',
    layer: 'User Experience Phase',
    category: 'UI Feedback',
    x: 38,
    y: 25,
    labelPos: 'below',
    color: '#f59e0b',
    badge: 'STEP 2',
    shortDesc: 'App immediately updates UI with "Pending Sync" badge, giving instant feedback.',
    tech: ['BLoC State', 'Optimistic UI Engine'],
    patterns: ['Optimistic Locking', 'Pending State Representation'],
    projectUsed: 'BuildMart Cart & Order Placement',
    metrics: '0ms perceivable lag for the user',
    responsibilities: [
      'Update local screen state immediately with synthetic ID',
      'Display visual indicators showing sync is queued',
    ],
  },
  {
    id: 'off-local-db',
    title: '3. ACID Transaction in SQLite',
    shortLabel: '3. SQLite Outbox',
    layer: 'Persistence Phase',
    category: 'Local Storage',
    x: 64,
    y: 25,
    labelPos: 'below',
    color: '#10b981',
    badge: 'STEP 3',
    shortDesc: 'Mutation is saved locally in SQLite tables and inserted into the Outbox Queue.',
    tech: ['sqflite', 'Foreign Keys', 'WAL Mode'],
    patterns: ['Transactional Outbox Pattern'],
    projectUsed: 'Magicrete Sarthak, Living Godrej Resident App',
    metrics: 'Guaranteed persistence even if app crashes or battery dies',
    responsibilities: [
      'Write data into local cache with status = `PENDING_SYNC`',
      'Record monotonic timestamp and retry counter in Outbox Queue',
    ],
  },
  {
    id: 'off-worker',
    title: '4. Background Sync Worker',
    shortLabel: '4. Sync Worker',
    layer: 'Synchronization Phase',
    category: 'Background Service',
    x: 90,
    y: 25,
    labelPos: 'below',
    color: '#3b82f6',
    badge: 'STEP 4',
    shortDesc: 'Headless background task triggered by network reconnection or OS periodic schedule.',
    tech: ['workmanager', 'connectivity_plus', 'JobScheduler / BGTaskScheduler'],
    patterns: ['Observer Pattern', 'Exponential Backoff Retry'],
    projectUsed: 'BuildMart Offline Order Engine',
    metrics: 'Runs even if app is terminated or in background',
    responsibilities: [
      'Listen for active cellular or Wi-Fi connectivity state changes',
      'Batch-read un-synced queue items in FIFO order',
    ],
  },
  {
    id: 'off-conflict',
    title: '5. Conflict Resolution & Server Commit',
    shortLabel: '5. Cloud Commit',
    layer: 'Reconciliation Phase',
    category: 'Cloud Reconciliation',
    x: 116,
    y: 25,
    labelPos: 'below',
    color: '#8b5cf6',
    badge: 'STEP 5',
    shortDesc: 'Reconciles local changes with server state, resolves conflicts, and confirms persistence.',
    tech: ['Server Timestamping', 'Idempotency Keys', 'REST / GraphQL'],
    patterns: ['Last-Write-Wins', 'Three-Way Merge', 'Idempotent Webhooks'],
    projectUsed: 'Enterprise Inventory Reconciliation',
    metrics: '100% duplicate prevention via UUID idempotency tokens',
    responsibilities: [
      'Transmit payload with idempotency key to prevent double-charging or duplicate orders',
      'Update local SQLite row to `SYNCED` and notify BLoC state stream to clear pending badges',
    ],
  },
];

const offlineEdges: ArchEdge[] = [
  { from: 'off-action', to: 'off-optimistic', animated: true },
  { from: 'off-optimistic', to: 'off-local-db', animated: true },
  { from: 'off-local-db', to: 'off-worker', animated: true },
  { from: 'off-worker', to: 'off-conflict', animated: true },
];

export default function Architecture() {
  const [activeMode, setActiveMode] = useState<ArchitectureMode>('system');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('client');
  const sectionRef = useRef<HTMLElement>(null);

  // Get active nodes and edges based on mode
  const currentNodes =
    activeMode === 'system'
      ? systemNodes
      : activeMode === 'clean'
      ? cleanNodes
      : offlineNodes;

  const currentEdges =
    activeMode === 'system'
      ? systemEdges
      : activeMode === 'clean'
      ? cleanEdges
      : offlineEdges;

  // Selected node object (safe fallback)
  const selectedNode =
    currentNodes.find((n) => n.id === selectedNodeId) || currentNodes[0];

  const getNodePos = (id: string) =>
    currentNodes.find((n) => n.id === id) || currentNodes[0];

  // Switch mode and select default node
  const handleModeChange = (mode: ArchitectureMode) => {
    setActiveMode(mode);
    if (mode === 'system') setSelectedNodeId('client');
    else if (mode === 'clean') setSelectedNodeId('clean-ui');
    else setSelectedNodeId('off-action');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.arch-header-anim',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="section"
      style={{
        position: 'relative',
        background: '#07070a',
        paddingTop: '5rem',
        paddingBottom: '12rem', // Generous clearance so fixed floating bottom dock never obstructs anything!
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '450px',
          background:
            'radial-gradient(circle at 50% 50%, rgba(227, 30, 36, 0.08) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1280px' }}>
        {/* Header Eyebrow */}
        <div className="arch-header-anim" style={{ marginBottom: '0.65rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              color: 'var(--red, #E31E24)',
              textTransform: 'uppercase',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--red, #E31E24)',
                boxShadow: '0 0 8px var(--red, #E31E24)',
              }}
            />
            ENGINEERING &amp; SYSTEM DESIGN
          </span>
        </div>

        {/* Main Title */}
        <h2
          className="arch-header-anim"
          style={{
            fontFamily: "var(--font-head, 'Space Grotesk', sans-serif)",
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 800,
            color: 'var(--white, #FAFAFA)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          ENTERPRISE ARCHITECTURE
        </h2>

        {/* Subtitle */}
        <p
          className="arch-header-anim"
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
            color: '#a1a1aa',
            lineHeight: 1.6,
            maxWidth: '740px',
            marginBottom: '2rem',
          }}
        >
          How I architect and scale production mobile ecosystems — from clean decoupled client layers
          to enterprise API gateways, offline-first synchronization, and production AI integration.
        </p>

        {/* Architectural Mode Tabs (Responsive Grid) */}
        <div className="arch-header-anim arch-tabs-grid" style={{ marginBottom: '1.5rem' }}>
          {[
            {
              id: 'system',
              num: '01',
              label: 'End-to-End System Design',
              sub: 'Mobile to Cloud & AI Pipeline',
              icon: '🌐',
            },
            {
              id: 'clean',
              num: '02',
              label: 'Clean Architecture Stack',
              sub: 'Decoupled Flutter Layers & BLoC',
              icon: '📐',
            },
            {
              id: 'offline',
              num: '03',
              label: 'Offline-First Sync Engine',
              sub: 'Zero-Drop Resilience Pattern',
              icon: '⚡',
            },
          ].map((tab) => {
            const active = activeMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleModeChange(tab.id as ArchitectureMode)}
                className="arch-tab-btn"
                style={{
                  background: active ? 'rgba(227, 30, 36, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: active
                    ? '1px solid rgba(227, 30, 36, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  color: active ? '#fff' : '#a1a1aa',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{tab.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-head, 'Space Grotesk', sans-serif)",
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      letterSpacing: '0.01em',
                      color: active ? '#fff' : '#e4e4e7',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {tab.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.64rem',
                      color: active ? 'rgba(227, 30, 36, 0.9)' : '#71717a',
                      marginTop: '0.1rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {tab.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Node Selector (Mobile & Desktop Friendly) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.85rem',
            marginBottom: '1.25rem',
            scrollbarWidth: 'none',
          }}
          className="node-pill-scroll"
        >
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.65rem',
              color: '#71717a',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              marginRight: '0.35rem',
            }}
          >
            Inspect Node:
          </span>
          {currentNodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                style={{
                  background: isSelected ? `${node.color}22` : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected
                    ? `1px solid ${node.color}`
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  padding: '0.3rem 0.75rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.68rem',
                  color: isSelected ? '#ffffff' : '#a1a1aa',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: node.color,
                  }}
                />
                {node.shortLabel}
              </button>
            );
          })}
        </div>

        {/* ── MAIN ARCHITECTURE STAGE (VERTICAL FLOW: ABOVE DESIGN, BELOW DETAILS) ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
            width: '100%',
          }}
          className="arch-vertical-layout"
        >
          {/* ABOVE: FULL-WIDTH INTERACTIVE SVG TOPOLOGY */}
          <div
            style={{
              background: '#0b0b10',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              position: 'relative',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.55)',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            {/* Stage Title & Instruction */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.85rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                paddingBottom: '0.65rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                    display: 'inline-block',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.12em',
                    color: '#e4e4e7',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  SYSTEM TOPOLOGY &amp; DATA FLOW
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.62rem',
                  color: '#71717a',
                  letterSpacing: '0.08em',
                }}
              >
                SELECT ANY NODE TO INSPECT DETAILS BELOW ↓
              </span>
            </div>

            {/* Centered Spacious Horizontal SVG Canvas */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                overflowX: 'auto',
                paddingBottom: '0.4rem',
                scrollbarWidth: 'thin',
              }}
              className="node-pill-scroll"
            >
              <div
                style={{
                  minWidth: '660px',
                  width: '100%',
                  maxWidth: '960px',
                  margin: '0 auto',
                }}
              >
                <svg
                  viewBox="0 0 130 50"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '260px',
                    display: 'block',
                  }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <marker
                      id="arch-arrow"
                      viewBox="0 0 10 10"
                      refX="7"
                      refY="5"
                      markerWidth="3"
                      markerHeight="3"
                      orient="auto-start-reverse"
                    >
                      <path d="M 1 2 L 7 5 L 1 8 z" fill="rgba(255, 255, 255, 0.25)" />
                    </marker>
                    <marker
                      id="arch-arrow-active"
                      viewBox="0 0 10 10"
                      refX="7"
                      refY="5"
                      markerWidth="3.4"
                      markerHeight="3.4"
                      orient="auto-start-reverse"
                    >
                      <path d="M 1 2 L 7 5 L 1 8 z" fill="#E31E24" />
                    </marker>
                  </defs>

                  {/* Connecting Edges */}
                  {currentEdges.map((edge, idx) => {
                    const f = getNodePos(edge.from);
                    const t = getNodePos(edge.to);
                    const isSelectedPath =
                      selectedNodeId === edge.from || selectedNodeId === edge.to;

                    return (
                      <g key={`edge-${edge.from}-${edge.to}-${idx}`}>
                        {/* Base static connector */}
                        <line
                          x1={f.x}
                          y1={f.y}
                          x2={t.x}
                          y2={t.y}
                          stroke={
                            isSelectedPath
                              ? 'rgba(255, 255, 255, 0.55)'
                              : 'rgba(255, 255, 255, 0.12)'
                          }
                          strokeWidth={isSelectedPath ? '0.65' : '0.35'}
                          strokeDasharray={isSelectedPath ? 'none' : '1.5 1.5'}
                          markerEnd={
                            isSelectedPath ? 'url(#arch-arrow-active)' : 'url(#arch-arrow)'
                          }
                        />
                        {/* Animated active data packet pulse */}
                        {edge.animated && (
                          <line
                            x1={f.x}
                            y1={f.y}
                            x2={t.x}
                            y2={t.y}
                            stroke={isSelectedPath ? '#E31E24' : 'rgba(227, 30, 36, 0.6)'}
                            strokeWidth={isSelectedPath ? '0.75' : '0.4'}
                            strokeDasharray="3 20"
                            className="pulse-anim"
                          />
                        )}
                      </g>
                    );
                  })}

                  {/* Nodes */}
                  {currentNodes.map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    const isAbove = node.labelPos === 'above';

                    return (
                      <g
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        style={{ cursor: 'pointer' }}
                        className="arch-node-group"
                      >
                        {/* Outer Selection Highlight Ring */}
                        {isSelected && (
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={4.8}
                            fill="none"
                            stroke={node.color}
                            strokeWidth="0.4"
                            opacity="0.85"
                            strokeDasharray="1.5 1.5"
                          >
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from={`0 ${node.x} ${node.y}`}
                              to={`360 ${node.x} ${node.y}`}
                              dur="7s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}

                        {/* Main Node Bubble */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected ? 3.4 : 2.6}
                          fill="#121218"
                          stroke={node.color}
                          strokeWidth={isSelected ? '0.8' : '0.5'}
                          style={{
                            transition: 'all 0.2s ease',
                            filter: isSelected ? `drop-shadow(0 0 6px ${node.color})` : 'none',
                          }}
                        />

                        {/* Inner Dot Indicator */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={1.0}
                          fill={node.color}
                          opacity={isSelected ? 1 : 0.85}
                        />

                        {/* Pill Background behind label */}
                        <rect
                          x={node.x - 10.5}
                          y={isAbove ? node.y - 6.6 : node.y + 3.4}
                          width={21}
                          height={3.8}
                          rx={1.2}
                          fill="#0b0b10"
                          stroke={isSelected ? `${node.color}99` : 'rgba(255, 255, 255, 0.12)'}
                          strokeWidth="0.28"
                        />

                        {/* Clean, Non-colliding Node Label */}
                        <text
                          x={node.x}
                          y={isAbove ? node.y - 4.1 : node.y + 5.9}
                          textAnchor="middle"
                          fontSize="1.85"
                          fontWeight={isSelected ? '700' : '600'}
                          fill={isSelected ? '#ffffff' : '#d4d4d8'}
                          style={{
                            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                            letterSpacing: '0.02em',
                            pointerEvents: 'none',
                            userSelect: 'none',
                          }}
                        >
                          {node.shortLabel}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Bottom Legend */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.25rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.64rem',
                color: '#a1a1aa',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E31E24' }} />
                <span>Client / Core</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60a5fa' }} />
                <span>Security / Gateway</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399' }} />
                <span>Real-Time / Sync</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c084fc' }} />
                <span>AI / Microservices</span>
              </div>
            </div>
          </div>

          {/* BELOW: ARCHITECTURE DEEP-DIVE INSPECTOR PANEL */}
          <div
            style={{
              background: '#0e0e14',
              border: `1px solid ${selectedNode.color}45`,
              borderRadius: '16px',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: `0 16px 40px rgba(0,0,0,0.6), inset 0 0 30px ${selectedNode.color}08`,
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.25s ease',
              width: '100%',
            }}
          >
            {/* Header Row: Badge, Title, Layer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '0.85rem',
                marginBottom: '1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: selectedNode.color,
                      background: `${selectedNode.color}18`,
                      border: `1px solid ${selectedNode.color}45`,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {selectedNode.badge}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.68rem',
                      color: '#71717a',
                    }}
                  >
                    {selectedNode.layer}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-head, 'Space Grotesk', sans-serif)",
                    fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}
                >
                  {selectedNode.title}
                </h3>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '0.45rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ fontSize: '0.95rem' }}>🛡️</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.7rem',
                    color: '#10b981',
                    fontWeight: 600,
                  }}
                >
                  {selectedNode.metrics}
                </span>
              </div>
            </div>

            {/* Short Description */}
            <p
              style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: '0.92rem',
                color: '#d4d4d8',
                lineHeight: 1.55,
                marginBottom: '1.5rem',
              }}
            >
              {selectedNode.shortDesc}
            </p>

            {/* Multi-Column Content Breakdown */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {/* Column 1: Key Responsibilities */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.12em',
                    color: '#a1a1aa',
                    textTransform: 'uppercase',
                    marginBottom: '0.65rem',
                    fontWeight: 600,
                  }}
                >
                  Key Responsibilities:
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: '1.1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}
                >
                  {selectedNode.responsibilities.map((r, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: 'var(--font-body, sans-serif)',
                        fontSize: '0.84rem',
                        color: '#e4e4e7',
                        lineHeight: 1.45,
                      }}
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Technologies & Patterns */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.12em',
                    color: '#a1a1aa',
                    textTransform: 'uppercase',
                    marginBottom: '0.65rem',
                    fontWeight: 600,
                  }}
                >
                  Production Technologies:
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  {selectedNode.tech.map((t, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.66rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        padding: '0.22rem 0.6rem',
                        borderRadius: '4px',
                        color: '#f4f4f5',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.12em',
                    color: '#a1a1aa',
                    textTransform: 'uppercase',
                    marginBottom: '0.4rem',
                    fontWeight: 600,
                  }}
                >
                  Architectural Patterns:
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: '0.84rem',
                    color: '#ffffff',
                    fontWeight: 600,
                  }}
                >
                  {selectedNode.patterns.join(' · ')}
                </div>
              </div>

              {/* Column 3: Real-World Case Study */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.12em',
                    color: '#a1a1aa',
                    textTransform: 'uppercase',
                    marginBottom: '0.65rem',
                    fontWeight: 600,
                  }}
                >
                  Battle-Tested In Production:
                </div>
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '1rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-head, 'Space Grotesk', sans-serif)",
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      color: selectedNode.color,
                      marginBottom: '0.35rem',
                    }}
                  >
                    {selectedNode.projectUsed}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body, sans-serif)',
                      fontSize: '0.82rem',
                      color: '#a1a1aa',
                      lineHeight: 1.45,
                      margin: 0,
                    }}
                  >
                    Engineered, shipped, and actively running in live client environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4 KEY ARCHITECTURAL PILLARS ── */}
        <div
          style={{
            marginTop: '3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            {
              icon: '📐',
              title: 'Clean Architecture Decoupling',
              desc: 'Strict boundary isolation between UI widgets, BLoC state streams, Domain business use-cases, and Data repositories.',
              badge: '100% TESTABLE',
            },
            {
              icon: '⚡',
              title: 'Zero-Jank 60 FPS Performance',
              desc: 'Offloading intense image/AI computation to Dart background isolates, preventing main-thread rendering freezes.',
              badge: '< 16.6MS FRAMES',
            },
            {
              icon: '🔄',
              title: 'Offline-First Resilience',
              desc: 'Dual-tier caching with local SQLite outbox queue, background sync workers, and monotonic conflict resolution.',
              badge: '99.9% ZERO DATA LOSS',
            },
            {
              icon: '🔒',
              title: 'Enterprise-Grade Security',
              desc: 'Cryptographic SSL pinning, encrypted storage for OAuth tokens, biometrics validation, and OWASP compliance.',
              badge: 'AES-256 ENCRYPTED',
            },
          ].map((pillar, i) => (
            <div
              key={i}
              style={{
                background: '#0b0b10',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(227, 30, 36, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.4rem' }}>{pillar.icon}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.6rem',
                    color: '#E31E24',
                    background: 'rgba(227, 30, 36, 0.1)',
                    border: '1px solid rgba(227, 30, 36, 0.25)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontWeight: 600,
                  }}
                >
                  {pillar.badge}
                </span>
              </div>
              <h4
                style={{
                  fontFamily: "var(--font-head, 'Space Grotesk', sans-serif)",
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  margin: 0,
                }}
              >
                {pillar.title}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '0.82rem',
                  color: '#a1a1aa',
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .arch-tabs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        @keyframes pulseData {
          from {
            stroke-dashoffset: 27;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .pulse-anim {
          animation: pulseData 1.8s linear infinite;
        }

        @media (max-width: 960px) {
          .arch-grid-layout {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          .arch-tabs-grid {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
          .arch-tab-btn {
            padding: 0.6rem 0.85rem !important;
          }
        }
      `}</style>
    </section>
  );
}
