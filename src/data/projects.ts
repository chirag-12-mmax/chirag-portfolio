import type { Project } from '@/types';

export const projects: Project[] = [
  // PROJECT 01 — SHOPPOZONE (CURRENT PROJECT · WEBSITE LIVE, APP PRE-LAUNCH)
  // TODO(chirag): add playStoreUrl / appStoreUrl once the app is published.
  {
    id: 'shoppozone',
    index: '01',
    name: 'Shoppozone',
    title: 'Shoppozone — B2B Wholesale Commerce Website & Mobile App',
    subtitle: 'B2B Wholesale Commerce Website & Mobile App',
    meta: 'Current Project · Tech Lead · B2B Wholesale',
    category: 'E-Commerce',
    businessDomain: 'B2B Wholesale / E-Commerce',
    projectType: 'Web + Mobile Commerce Platform',
    platforms: ['Android', 'iOS', 'Web'],
    role: 'Tech Lead & Lead Developer',
    status: 'in-development',
    description:
      'Shoppozone connects retail shop owners, resellers and bulk buyers directly with wholesale suppliers. Buyers browse verified store catalogues, see carton and tiered wholesale pricing with MOQ, negotiate bulk prices with "Make a Deal", schedule delivery dates, and download GST-ready PDF tax invoices — on the web catalogue and the Android & iOS app.',
    shortDescription:
      'B2B wholesale platform for retailers and resellers: tiered pricing & MOQ, "Make a Deal" bulk negotiation, scheduled delivery, GST-ready PDF invoices, multi-store support. Website live, app in pre-launch.',
    stack: [
      'Flutter',
      'GetX',
      'Clean Architecture',
      'Dio',
      'PHP',
      'MySQL',
      'REST API',
      'Firebase Cloud Messaging',
      'Crashlytics',
      'PDF Invoicing',
    ],
    features: [
      'Tiered Wholesale Pricing & MOQ',
      '"Make a Deal" Bulk Price Negotiation',
      'Multi-Store & Branch Switching',
      'Store-Scoped Cart & Wishlist',
      'Scheduled Delivery Date at Checkout',
      'GST-Ready PDF Tax Invoices with QR',
      'Order Tracking (Pending → Delivered)',
      'Email/Password + Mobile OTP Login',
      'Guest Browsing Before Sign-In',
      'Push Notifications (FCM)',
      'Light & Dark Themes',
      'In-App Account Deletion (Play Policy)',
    ],
    featureModules: [
      {
        title: 'Wholesale Catalogue & Buying',
        items: [
          'Verified store catalogues with category navigation',
          'Carton pricing, MOQ and volume-based tier pricing',
          'Instant search with store-level availability filter',
          '"Make a Deal" — request custom bulk pricing from a product card',
        ],
      },
      {
        title: 'Orders, Delivery & Invoicing',
        items: [
          'Store-scoped cart so every order belongs to one fulfilment centre',
          'Pick delivery / pickup date to match restocking schedules',
          'GST-ready PDF tax invoices with QR code and amount-in-words',
          'Multi-stage order tracking: Pending, Confirmed, Shipped, Delivered',
        ],
      },
      {
        title: 'Accounts, Security & Platform',
        items: [
          'Email/password and mobile OTP login with password reset',
          'JWT in encrypted storage with automatic token refresh',
          'FCM push notifications and Crashlytics crash reporting',
          'PHP + MySQL backend for orders, invoices and notifications',
        ],
      },
    ],
    roadmap: [
      'Website catalogue live at shoppozonewholesale.com',
      'Android app built for Target SDK 36 (Android 16) and audited for Play Store policy & Data Safety',
      'Launch on Google Play, then the Apple App Store',
      'Grow supplier stores and regional branches on the platform',
      'Add more self-serve tools for buyers and store managers',
    ],
    businessImpact:
      'Gives wholesale suppliers one digital channel to sell to retailers and resellers — with negotiated bulk pricing, scheduled dispatch and tax invoices handled in-app instead of over phone calls and paper.',
    problem:
      'Retailers and resellers were ordering wholesale stock over phone and chat: no clear tier pricing, no way to negotiate bulk deals in one place, and invoices created by hand.',
    solution:
      'A B2B commerce platform with tiered pricing, in-app deal negotiation, scheduled delivery and automatic GST invoice generation — on a web catalogue plus Android & iOS apps backed by one API.',
    architecture:
      'Flutter app with feature-sliced Clean Architecture and GetX (state, DI, routing); Dio network layer with auth interceptor, token refresh and retries; PHP 8 + MySQL REST backend with PDF invoice service and FCM notifications.',
    challenges: [
      'Modelling tier pricing, MOQ and negotiated deal prices in one cart',
      'Keeping the cart scoped to the active store across branch switches',
      'Generating compliant GST tax invoices (PDF + QR) on the server',
      'Meeting Google Play Android 16, Data Safety and account-deletion requirements',
    ],
    results: [
      { metric: 'Website', value: 'Live' },
      { metric: 'Automated Tests', value: '197 ✓' },
      { metric: 'Android Target', value: 'SDK 36' },
    ],
    metrics: 'Website Live · 197 Tests Passing · Android 16 Ready',
    liveUrl: 'https://shoppozonewholesale.com',
    projectAttributes: ['Current Project', 'Tech Lead', 'Web + Mobile', 'B2B Commerce'],
    coverImage: '/projects/shoppozone.svg',
    floating: {
      size: 'large',
      depth: 'front',
    },
  },

  // PROJECT 02 — LIVING / GODREJ LIVING
  {
    id: 'godrej-living',
    index: '02',
    name: 'LIVING (Godrej Living)',
    title: 'LIVING (Godrej Living — Real Estate Project)',
    subtitle: 'Enterprise Real Estate & Community Management Platform',
    meta: '8 months · Lead Developer · Real Estate',
    category: 'Enterprise Apps',
    businessDomain: 'Real Estate / Community Management',
    projectType: 'Enterprise Application',
    platforms: ['Android', 'iOS', 'Web'],
    role: 'Lead Flutter Developer',
    teamSize: '3 developers',
    timeline: '8 months',
    description:
      'Designed and developed a comprehensive real estate, residential society, and apartment management platform for enterprise clients and gated communities.',
    shortDescription:
      'Comprehensive real estate, residential society, and apartment management platform for enterprise clients and gated communities with QR verification and real-time gate security.',
    stack: ['Flutter', 'Node.js', 'REST API', 'QR Verification', 'Push Notifications'],
    features: [
      'Visitor Entry Management',
      'Gate Security',
      'Resident Management',
      'Maintenance Requests',
      'Complaint Management',
      'Vehicle Management',
      'Visitor QR Verification',
      'Daily Services Booking',
    ],
    businessImpact:
      'Digitized society management for gated communities, streamlining visitor verification and maintenance operations.',
    problem:
      'Residential societies needed a digital platform to manage visitors, maintenance payments, and resident communication securely and efficiently.',
    solution:
      'Built a full-stack platform with dedicated modules for residents, guards, and admins to ensure smooth society operations.',
    architecture:
      'Clean Architecture with BLoC state management and Node.js backend integration.',
    challenges: [
      'Implementing fast and secure QR verification at gates',
      'Managing roles and permissions for diverse users',
      'Integrating real-time notifications for visitor entry',
    ],
    results: [
      { metric: 'Security', value: 'High' },
      { metric: 'Efficiency', value: '+60%' },
    ],
    metrics: '+60% Efficiency · High Security',
    projectAttributes: ['Enterprise Client', 'Real-Time Features', 'Enterprise Architecture'],
    coverImage: '/projects/living.svg',
    floating: {
      size: 'wide',
      depth: 'front',
    },
  },

  // PROJECT 03 — SAH INVESTMENT
  {
    id: 'sah-investment',
    index: '03',
    name: 'SAH Investment',
    title: 'SAH INVESTMENT',
    subtitle: 'Financial Management Application',
    meta: '6 months · Flutter Developer · Finance',
    category: 'Enterprise Apps',
    businessDomain: 'Finance',
    projectType: 'Enterprise Application',
    platforms: ['Android', 'iOS'],
    role: 'Flutter Developer',
    teamSize: '2 developers',
    timeline: '6 months',
    description:
      'Developed a secure investment and financial management application with portfolio tracking, investment analytics, transaction management, real-time dashboards, and financial reporting.',
    shortDescription:
      'Secure investment and financial management application with portfolio tracking, investment analytics, transaction management, real-time dashboards, and financial reporting.',
    stack: ['Flutter', 'Node.js', 'REST API', 'Data Analytics', 'Secure Auth'],
    features: [
      'Investment Tracking',
      'Portfolio Management',
      'Real-time Analytics',
      'Reports Dashboard',
      'Secure Transactions',
      'Push Notifications',
    ],
    businessImpact:
      'Provided users with comprehensive financial visibility and secure transaction management tools.',
    problem:
      'Users lacked a consolidated view of their investments and required secure, real-time analytics for portfolio management.',
    solution:
      'Engineered a highly secure financial dashboard with real-time tracking, intuitive data visualization, and secure backend integration.',
    architecture:
      'MVVM architecture with secure local storage and encrypted API communication.',
    challenges: [
      'Ensuring bank-grade security for financial data',
      'Rendering complex charts and analytics smoothly',
      'Synchronizing real-time portfolio updates',
    ],
    results: [
      { metric: 'Security', value: 'Bank-Grade' },
      { metric: 'Analytics', value: 'Real-time' },
    ],
    metrics: 'Bank-Grade Security · Real-time Analytics',
    projectAttributes: ['Enterprise Client', 'Real-Time Features', 'Enterprise Architecture'],
    coverImage: '/projects/sah-investment.svg',
    floating: {
      size: 'large',
      depth: 'front',
    },
  },

  // PROJECT 04 — YONETI
  {
    id: 'yoneti',
    index: '04',
    name: 'Yoneti',
    title: 'YONETI',
    subtitle: 'Shop Management & Service Platform',
    meta: '5 months · Flutter Developer · Retail',
    category: 'Enterprise Apps',
    businessDomain: 'Retail',
    projectType: 'Enterprise Application',
    platforms: ['Android', 'iOS'],
    role: 'Flutter Developer',
    teamSize: '2 developers',
    timeline: '5 months',
    description:
      'Built a dual-role platform for customers and merchants that simplifies service booking, inventory management, customer support, notifications, and business operations.',
    shortDescription:
      'Dual-role platform for customers and merchants simplifying service booking, inventory management, customer support, notifications, and business operations.',
    stack: ['Flutter', 'Laravel', 'REST API', 'State Management'],
    features: [
      'Merchant Dashboard',
      'Customer App',
      'Inventory Management',
      'Order Processing',
      'Service Booking',
      'Push Notifications',
      'Analytics',
    ],
    businessImpact:
      'Streamlined shop operations and enhanced customer service booking experiences.',
    problem:
      'Merchants needed an integrated system to manage inventory and services, while customers needed an easy way to book them.',
    solution:
      'Developed a dual-role application offering comprehensive dashboards for merchants and an intuitive booking interface for customers.',
    architecture:
      'Clean Architecture with Riverpod state management and robust API handling.',
    challenges: [
      'Handling diverse user roles within a single ecosystem',
      'Synchronizing inventory in real-time',
    ],
    results: [
      { metric: 'Efficiency', value: '+40%' },
      { metric: 'Roles', value: 'Dual' },
    ],
    metrics: '+40% Efficiency · Dual Roles',
    projectAttributes: ['Enterprise Client', 'Real-Time Features'],
    coverImage: '/projects/yoneti.svg',
    floating: {
      size: 'medium',
      depth: 'middle',
    },
  },

  // PROJECT 05 — MAGICRETE BUILDMART
  {
    id: 'magicrete-buildmart',
    index: '05',
    name: 'Magicrete BuildMart',
    title: 'Magicrete BuildMart',
    subtitle: 'Digital Construction Materials Marketplace',
    meta: '10 months · Senior Developer · Construction',
    category: 'Enterprise Apps',
    businessDomain: 'Construction',
    projectType: 'Enterprise Application',
    platforms: ['Android', 'iOS'],
    role: 'Senior Flutter Developer',
    teamSize: '4 developers',
    timeline: '10 months',
    downloads: '100K+ Downloads on Google Play Store',
    description:
      'Engineered a high-scale digital construction materials marketplace enabling a pan-India dealer and distributor network to browse product catalogs, manage orders, track inventory, and coordinate deliveries. Implemented offline data synchronization for inventory operations in low-connectivity construction zones and integrated enterprise ERP systems for order processing.',
    shortDescription:
      'High-scale digital construction materials marketplace enabling a pan-India dealer/distributor network with offline data sync and enterprise ERP integration.',
    stack: [
      'Flutter',
      'REST API',
      'State Management',
      'ERP Integration',
      'Offline Data Sync',
      'Push Notifications',
    ],
    features: [
      'Enterprise Product Catalog',
      'Dealer & Distributor Network',
      'Order Management System',
      'Inventory Tracking',
      'Offline Data Sync',
      'ERP Integration',
      'Delivery Coordination',
    ],
    businessImpact:
      'Scaled to 100K+ downloads on Google Play Store, digitizing procurement workflows for a major Indian construction materials brand.',
    problem:
      'A major Indian construction brand needed to digitize their dealer/distributor network for product ordering and inventory management — many locations had poor connectivity.',
    solution:
      'Engineered an offline-first marketplace with ERP integration, background sync for inventory operations, and a streamlined ordering workflow optimized for low-connectivity environments.',
    architecture:
      'Offline-first with SQLite local cache, background ERP sync service, queue-based order processing, and delta sync for bandwidth optimization.',
    challenges: [
      'Reliable operation in construction zones with poor connectivity',
      'Complex ERP integration with legacy enterprise systems',
      'Scaling to support 100K+ concurrent users across India',
    ],
    results: [
      { metric: 'Downloads', value: '100K+' },
      { metric: 'Data Usage', value: '-40%' },
      { metric: 'ERP Systems', value: '3+' },
    ],
    metrics: '100K+ Downloads · -40% Data Usage',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.instanceit.magicreteclients&hl=en_IN',
    appStoreUrl:
      'https://apps.apple.com/in/app/magicrete-buildmart/id1459372257',
    projectAttributes: ['Enterprise Client', 'Cloud Integrated', 'Enterprise Architecture'],
    coverImage: '/projects/buildmart.svg',
    floating: {
      size: 'portrait',
      depth: 'middle',
    },
  },

  // PROJECT 06 — DG FERRY AGENT BOOKING PLATFORM
  {
    id: 'dg-ferry-agent',
    index: '06',
    name: 'DG Ferry Agent Booking Platform',
    title: 'DG Ferry Agent Booking Platform',
    subtitle: 'Maritime Enterprise Communication Platform',
    meta: '5 months · Flutter Developer · Maritime',
    category: 'Enterprise Apps',
    businessDomain: 'Maritime',
    projectType: 'Enterprise Application',
    platforms: ['Android', 'iOS'],
    role: 'Flutter Developer',
    teamSize: '2 developers',
    timeline: '5 months',
    description:
      'Developed an enterprise-grade maritime communication and operations platform enabling secure information exchange, business workflow management, and operational coordination for the marine industry. Implemented multi-layer secure authentication, encrypted communication channels, and real-time operational data synchronization.',
    shortDescription:
      'Enterprise-grade maritime communication and operations platform enabling secure information exchange, workflow management, and offline operational sync.',
    stack: [
      'Flutter',
      'REST API',
      'Secure Authentication',
      'Encrypted Communication',
      'Offline Data Sync',
    ],
    features: [
      'Secure Enterprise Communication',
      'Maritime Workflow Management',
      'Multi-Layer Authentication',
      'Operational Data Sync',
      'Offline Capability',
      'Android & iOS Deployment',
    ],
    businessImpact:
      'Digitized and secured maritime operational communications, reducing coordination overhead for marine industry enterprise clients.',
    problem:
      'Maritime operations relied on fragmented, insecure communication channels with no offline capability — critical in environments with limited connectivity at sea.',
    solution:
      'Built an encrypted communication platform with multi-layer authentication, offline-first data architecture, and secure synchronization when connectivity is restored.',
    architecture:
      'Offline-first architecture with encrypted local storage, background sync service, and multi-layer authentication pipeline.',
    challenges: [
      'Ensuring data security in compliance with maritime regulations',
      'Building reliable offline-first sync for extended connectivity gaps',
      'Multi-layer authentication without compromising user experience',
    ],
    results: [
      { metric: 'Security', value: 'Enterprise' },
      { metric: 'Offline Support', value: '100%' },
      { metric: 'Platforms', value: '2' },
    ],
    metrics: '100% Offline Support · Enterprise Security',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.instanceit.dgseaagent&hl=en_IN',
    appStoreUrl:
      'https://apps.apple.com/in/app/dgferry-agent-booking-platform/id6499256780',
    projectAttributes: ['Enterprise Client'],
    coverImage: '/projects/dg-ferry.svg',
    floating: {
      size: 'medium',
      depth: 'far',
    },
  },

  // PROJECT 07 — MANIER DE VOIR
  {
    id: 'manier-de-voir',
    index: '07',
    name: 'Manier De Voir',
    title: 'Manier De Voir',
    subtitle: 'Premium Fashion E-Commerce Platform',
    meta: '4 months · Flutter Developer · Retail',
    category: 'Flutter Mobile',
    businessDomain: 'Retail',
    projectType: 'Consumer Application',
    platforms: ['Android', 'iOS'],
    role: 'Flutter Developer',
    teamSize: '2 developers',
    timeline: '4 months',
    description:
      'Developed a premium fashion and lifestyle mobile commerce application delivering a high-conversion shopping experience with advanced product catalogs, dynamic filtering, secure user authentication, order lifecycle management, and optimized Flutter UI performance across Android and iOS. Integrated third-party APIs for payments and order management.',
    shortDescription:
      'Premium fashion and lifestyle mobile commerce application delivering a high-conversion shopping experience with advanced catalogs, dynamic filtering, and Apple Pay.',
    stack: [
      'Flutter',
      'REST API',
      'Payment Gateway Integration',
      'Apple Pay',
      'State Management (BLoC)',
      'OAuth',
      'Push Notifications',
    ],
    features: [
      'Advanced Product Catalog',
      'Secure User Authentication',
      'Order Lifecycle Management',
      'Payment Gateway Integration',
      'Wishlist & Cart Management',
      'Push Notifications',
      'Cross-Platform Deployment',
    ],
    businessImpact:
      'Delivered a premium shopping experience for a global fashion brand with full Play Store and App Store availability.',
    problem:
      'A global fashion brand needed a native-feel mobile shopping experience with high-conversion product discovery, seamless checkout, and brand-consistent premium UI across both platforms.',
    solution:
      'Crafted a pixel-perfect e-commerce app with BLoC-driven product catalog, lazy-loaded image galleries, and a streamlined 3-step checkout flow integrated with secure payment gateways.',
    architecture:
      'BLoC pattern for state management, repository pattern for API abstraction, image caching layer for performance, and modular feature architecture.',
    challenges: [
      'Achieving brand-consistent UI with pixel-perfect design specifications',
      'Optimizing image-heavy catalog performance across devices',
      'Seamless multi-currency payment gateway integration',
    ],
    results: [
      { metric: 'Platforms', value: '2' },
      { metric: 'Catalog Items', value: '1000+' },
      { metric: 'App Rating', value: '4.5★' },
    ],
    metrics: '4.5★ Rating · 1000+ Products',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.manieredevoirshop&hl=en_IN',
    appStoreUrl:
      'https://apps.apple.com/us/app/mani%C3%A8re-de-voir/id6448750840',
    projectAttributes: ['Cloud Integrated', 'Responsive Design'],
    coverImage: '/projects/manier-de-voir.svg',
    floating: {
      size: 'wide',
      depth: 'far',
    },
  },

  // PROJECT 08 — ZINGHR ONBOARDING
  {
    id: 'zinghr-onboarding',
    index: '08',
    name: 'ZingHR Onboarding',
    title: 'ZingHR Onboarding',
    subtitle: 'Enterprise HR Onboarding Mobile Platform',
    meta: '5 months · Flutter Developer · HR Tech',
    category: 'Enterprise Apps',
    businessDomain: 'Human Resources',
    projectType: 'Enterprise Application',
    platforms: ['Android', 'iOS'],
    role: 'Flutter Developer',
    teamSize: '2 developers',
    timeline: '5 months',
    description:
      'Developed an enterprise-grade HR onboarding mobile application delivering a seamless digital onboarding experience for new employees. Integrated secure document submission workflows, digital policy acknowledgment systems, custom enterprise authentication, and cross-platform mobile access with performance optimization for large concurrent user bases.',
    shortDescription:
      'Enterprise-grade HR onboarding mobile app delivering seamless digital onboarding, secure document submission, and enterprise SSO authentication.',
    stack: [
      'Flutter',
      'Enterprise Authentication',
      'REST API',
      'Custom Plugin Development',
      'Secure Document Management',
    ],
    features: [
      'Digital Employee Onboarding',
      'Secure Document Submission',
      'Policy Acknowledgment Workflows',
      'Enterprise Authentication Integration',
      'Cross-Platform Mobile Support',
      'Performance Optimization',
    ],
    businessImpact:
      'Enabled enterprise HR operations to digitize onboarding workflows, supporting thousands of concurrent enterprise users at scale.',
    problem:
      'Enterprise HR teams needed to digitize onboarding for thousands of concurrent new hires — paper-based processes were slow, error-prone, and couldn\'t scale.',
    solution:
      'Built a secure digital onboarding app with document submission workflows, policy acknowledgment, enterprise SSO integration, and performance optimization for large concurrent user bases.',
    architecture:
      'Enterprise authentication bridge, secure document management pipeline, custom Flutter plugins for native integrations, and performance-optimized rendering.',
    challenges: [
      'Enterprise SSO integration with custom authentication providers',
      'Secure document handling with compliance requirements',
      'Performance at scale with thousands of concurrent users',
    ],
    results: [
      { metric: 'Users at Scale', value: '1000+' },
      { metric: 'Onboarding Time', value: '-50%' },
      { metric: 'Platforms', value: '2' },
    ],
    metrics: '-50% Onboarding Time · 1000+ Scale',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.zinghr.onboarding&hl=en_IN',
    appStoreUrl:
      'https://apps.apple.com/us/app/zinghr-onboarding/id1165774242',
    projectAttributes: ['Enterprise Client', 'Enterprise Architecture'],
    coverImage: '/projects/zinghr.svg',
    floating: {
      size: 'large',
      depth: 'front',
    },
  },

  // PROJECT 09 — DG SEA CONNECT
  {
    id: 'dg-sea-connect',
    index: '09',
    name: 'DG Sea Connect',
    title: 'DG Sea Connect',
    subtitle: 'Maritime Enterprise Communication Platform',
    meta: '5 months · Flutter Developer · Maritime',
    category: 'Enterprise Apps',
    businessDomain: 'Maritime',
    projectType: 'Enterprise Application',
    platforms: ['Android', 'iOS'],
    role: 'Flutter Developer',
    teamSize: '2 developers',
    timeline: '5 months',
    description:
      'Developed an enterprise-grade maritime communication and operations platform enabling secure information exchange, business workflow management, and operational coordination for the marine industry. Implemented multi-layer secure authentication, encrypted communication channels, and real-time operational data synchronization.',
    shortDescription:
      'Enterprise-grade maritime communication and operations platform with multi-layer secure authentication, encrypted channels, and operational synchronization.',
    stack: [
      'Flutter',
      'REST API',
      'Secure Authentication',
      'Encrypted Communication',
      'Offline Data Sync',
    ],
    features: [
      'Secure Enterprise Communication',
      'Maritime Workflow Management',
      'Multi-Layer Authentication',
      'Operational Data Sync',
      'Offline Capability',
      'Android & iOS Deployment',
    ],
    businessImpact:
      'Digitized and secured maritime operational communications, reducing coordination overhead for marine industry enterprise clients.',
    problem:
      'Maritime operations relied on fragmented, insecure communication channels with no offline capability — critical in environments with limited connectivity at sea.',
    solution:
      'Built an encrypted communication platform with multi-layer authentication, offline-first data architecture, and secure synchronization when connectivity is restored.',
    architecture:
      'Offline-first architecture with encrypted local storage, background sync service, and multi-layer authentication pipeline.',
    challenges: [
      'Ensuring data security in compliance with maritime regulations',
      'Building reliable offline-first sync for extended connectivity gaps',
      'Multi-layer authentication without compromising user experience',
    ],
    results: [
      { metric: 'Security', value: 'Enterprise' },
      { metric: 'Offline Support', value: '100%' },
      { metric: 'Platforms', value: '2' },
    ],
    metrics: '100% Offline Support · Enterprise Security',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.instanceit.dgseaconnect&hl=en_IN',
    projectAttributes: ['Enterprise Client'],
    coverImage: '/projects/dg-sea-connect.svg',
    floating: {
      size: 'medium',
      depth: 'middle',
    },
  },

  // PROJECT 10 — PULPIT MOBILITY
  {
    id: 'pulpit-mobility',
    index: '10',
    name: 'Pulpit Mobility',
    title: 'Pulpit Mobility',
    subtitle: 'Enterprise Transportation & Mobility Platform',
    meta: '6 months · Lead Developer · Transportation',
    category: 'Enterprise Apps',
    businessDomain: 'Transportation',
    projectType: 'Enterprise Application',
    platforms: ['Android', 'iOS'],
    role: 'Lead Flutter Developer',
    teamSize: '3 developers',
    timeline: '6 months',
    description:
      'Architected and delivered a scalable cross-platform transportation and mobility platform handling real-time ride booking, live driver tracking via WebSocket, Maps & geofencing, secure payment processing, push notification architecture, and end-to-end user authentication for Android and iOS. Implemented offline-resilient data architecture and modular codebase enabling rapid feature iteration.',
    shortDescription:
      'Scalable cross-platform transportation and mobility platform with real-time ride booking, WebSocket driver tracking, Maps & geofencing, and multi-gateway payments.',
    stack: [
      'Flutter',
      'Firebase',
      'Google Maps Integration',
      'WebSocket',
      'Payment Gateway Integration',
      'Razorpay',
      'Apple Pay',
      'Push Notifications',
      'OAuth',
    ],
    features: [
      'Real-Time Ride Tracking',
      'Geofencing & Maps Integration',
      'Push Notification Architecture',
      'Secure Payment Gateway Integration',
      'Driver & Rider Authentication',
      'Offline Data Resilience',
      'Android & iOS Deployment',
    ],
    businessImpact:
      'Enabled real-time fleet coordination and secure ride transactions for transportation operations across multiple cities.',
    problem:
      'Transportation companies needed a unified platform for real-time ride management, driver tracking, and payment processing across multiple cities — existing solutions were fragmented and unreliable in low-connectivity areas.',
    solution:
      'Built a modular cross-platform app with WebSocket-powered live tracking, geofencing zones, and an offline-resilient architecture that maintains state during network drops.',
    architecture:
      'Clean Architecture with BLoC state management, WebSocket layer for real-time updates, Google Maps integration with custom geofencing, and Firebase for auth/notifications.',
    challenges: [
      'Maintaining real-time accuracy with unstable network connections',
      'Implementing geofencing with minimal battery drain',
      'Secure payment processing across multiple gateway providers',
    ],
    results: [
      { metric: 'Cities Covered', value: '5+' },
      { metric: 'Real-Time Latency', value: '<500ms' },
      { metric: 'Uptime', value: '99.5%' },
    ],
    metrics: '<500ms Latency · 99.5% Uptime',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.pulpit.travel_driver_pulpit&hl=en_IN',
    projectAttributes: ['Enterprise Client', 'Real-Time Features', 'Enterprise Architecture'],
    coverImage: '/projects/pulpit.svg',
    floating: {
      size: 'small',
      depth: 'far',
    },
  },

  // PROJECT 11 — MYRCLOUD RECRUITMENT PLATFORM
  {
    id: 'myrcloud-recruitment',
    index: '11',
    name: 'MyRCloud Recruitment Platform',
    title: 'MyRCloud Recruitment Platform',
    subtitle: 'Enterprise Recruitment & Hiring Ecosystem',
    meta: '8 months · Lead Developer · Recruitment',
    category: 'Enterprise Apps',
    businessDomain: 'Recruitment',
    projectType: 'Enterprise Application',
    platforms: ['Android', 'iOS', 'Web'],
    role: 'Lead Flutter Developer',
    teamSize: '3 developers',
    timeline: '8 months',
    description:
      'Architected a scalable multi-platform recruitment ecosystem spanning Android, iOS, and Web using Flutter. Built HRMS-integrated onboarding workflows, recruiter dashboards, candidate tracking pipelines, job application management, real-time notifications via WebSocket, and role-based access control. Designed for concurrent enterprise usage with a focus on cross-platform architectural consistency.',
    shortDescription:
      'Scalable multi-platform recruitment ecosystem across Android, iOS, and Web with HRMS integration, real-time notifications, and candidate tracking.',
    stack: [
      'Flutter',
      'Flutter Web',
      'REST API',
      'WebSocket',
      'HRMS Integration',
      'Role-Based Access Control (RBAC)',
      'SaaS Application Development',
      'Push Notifications',
    ],
    features: [
      'Recruiter & Candidate Dashboards',
      'HRMS Integration',
      'Job Application Pipeline',
      'Real-Time Notifications',
      'Role-Based Access Control (RBAC)',
      'Workflow Automation',
      'Cross-Platform (Android, iOS, Web)',
    ],
    businessImpact:
      'Streamlined recruitment operations for enterprise HR teams by consolidating candidate management across mobile and web platforms.',
    problem:
      'Enterprise HR teams needed a unified recruitment platform that works identically across mobile and web, with real-time candidate tracking and HRMS integration — existing tools were desktop-only and siloed.',
    solution:
      'Built a true cross-platform recruitment ecosystem using Flutter for Android, iOS, and Web with shared business logic, WebSocket-driven real-time notifications, and deep HRMS integration.',
    architecture:
      'Shared core with platform-specific UI adaptations, WebSocket notification layer, RBAC middleware, and HRMS API bridge pattern.',
    challenges: [
      'Maintaining feature parity across mobile and web platforms',
      'Implementing role-based access control for enterprise security',
      'Real-time synchronization of candidate pipeline across devices',
    ],
    results: [
      { metric: 'Platforms', value: '3' },
      { metric: 'Candidates Served', value: '5K+' },
      { metric: 'Code Sharing', value: '85%' },
    ],
    metrics: '85% Code Sharing · 5K+ Candidates',
    liveUrl: 'https://myrcloud.com/candidates',
    projectAttributes: ['Enterprise Client', 'Cloud Integrated', 'Real-Time Features'],
    coverImage: '/projects/myrcloud.svg',
    floating: {
      size: 'portrait',
      depth: 'middle',
    },
  },

  // PROJECT 12 — MAGICRETE SARTHAK
  {
    id: 'magicrete-sarthak',
    index: '12',
    name: 'Magicrete Sarthak',
    title: 'Magicrete Sarthak',
    subtitle: 'Enterprise Employee & Partner Engagement Platform',
    meta: '6 months · Flutter Developer · Construction',
    category: 'Enterprise Apps',
    businessDomain: 'Construction',
    projectType: 'Enterprise Application',
    platforms: ['Android', 'iOS'],
    role: 'Flutter Developer',
    teamSize: '2 developers',
    timeline: '6 months',
    description:
      'Developed a comprehensive enterprise employee and channel partner engagement platform delivering loyalty programs, training module management, gamified rewards, attendance tracking, leave management, helpdesk ticketing, and business growth analytics. Integrated with backend analytics systems for management dashboards and performance reporting.',
    shortDescription:
      'Enterprise employee and channel partner engagement platform delivering loyalty programs, training modules, gamified rewards, attendance tracking, and analytics.',
    stack: ['Flutter', 'REST API', 'Analytics Integration', 'Push Notifications', 'State Management'],
    features: [
      'Loyalty & Rewards Programs',
      'Employee Attendance & Leave Management',
      'Training Module Management',
      'Helpdesk Ticketing System',
      'Analytics Dashboard',
      'Channel Partner Engagement',
      'Business Growth Tracking',
    ],
    businessImpact:
      'Increased employee and partner engagement for a large enterprise by providing a unified digital platform for HR and channel operations.',
    problem:
      'A large enterprise needed a unified platform for employee engagement, partner loyalty, training management, and HR operations — existing systems were fragmented across multiple tools.',
    solution:
      'Built a comprehensive engagement platform with gamified rewards, attendance/leave management, training modules, helpdesk ticketing, and analytics dashboards in a single app.',
    architecture:
      'Modular feature architecture with Provider state management, analytics event tracking layer, and REST API abstraction for multi-backend integration.',
    challenges: [
      'Consolidating 6+ separate HR/engagement workflows into one app',
      'Implementing gamification without impacting app performance',
      'Real-time analytics dashboard with complex data aggregation',
    ],
    results: [
      { metric: 'Workflows Unified', value: '6+' },
      { metric: 'Platforms', value: '2' },
      { metric: 'Engagement', value: '+35%' },
    ],
    metrics: '+35% Engagement · 6+ Workflows',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.instanceit.magicretesarthak&hl=en_IN',
    appStoreUrl:
      'https://apps.apple.com/in/app/magicrete-sarthak/id1585927876',
    projectAttributes: ['Enterprise Client', 'Cloud Integrated'],
    coverImage: '/projects/magicrete-sarthak.svg',
    floating: {
      size: 'wide',
      depth: 'front',
    },
  },

  // PROJECT 13 — NCH ENTERPRISE SOLUTION
  {
    id: 'nch-enterprise',
    index: '13',
    name: 'NCH Enterprise Solution',
    title: 'NCH Enterprise Solution',
    subtitle: 'Multi-Platform Business Management Software',
    meta: '8 months · Lead Developer · Enterprise Management',
    category: 'Desktop Apps',
    businessDomain: 'Enterprise Management',
    projectType: 'Enterprise Application',
    platforms: ['Web', 'Windows'],
    role: 'Lead Flutter Developer',
    teamSize: '3 developers',
    timeline: '8 months',
    description:
      'Built enterprise-grade business management software deployed across Flutter Web and Flutter Windows Desktop environments. Delivered centralized multi-branch operations management, role-based user access control, workflow automation, reporting & analytics dashboards, and auditable business process management for a large enterprise client.',
    shortDescription:
      'Enterprise-grade business management software across Flutter Web and Windows Desktop with multi-branch management, RBAC, and analytics.',
    stack: [
      'Flutter Web',
      'Flutter Desktop',
      'GraphQL',
      'REST API',
      'Role-Based Access Control',
      'Reporting & Analytics',
    ],
    features: [
      'Multi-Branch Operations Management',
      'Role-Based User Permissions',
      'Business Workflow Automation',
      'Reporting & Analytics Dashboards',
      'Centralized Data Management',
      'Flutter Web Deployment',
      'Flutter Windows Desktop Deployment',
    ],
    businessImpact:
      'Enabled centralized enterprise management across multiple business branches, significantly improving operational visibility and reducing reporting overhead.',
    problem:
      'An enterprise client needed centralized management across multiple branches with role-based access, workflow automation, and analytics — but required both web and desktop deployment.',
    solution:
      'Developed a single-codebase solution deployed on both Flutter Web and Windows Desktop, with GraphQL for efficient data queries and comprehensive RBAC for enterprise security.',
    architecture:
      'Shared business logic with platform-adaptive UI, GraphQL API layer, RBAC middleware, and modular dashboard architecture.',
    challenges: [
      'Delivering consistent experience across web and native desktop',
      'Complex GraphQL schema for multi-branch data aggregation',
      'Enterprise-grade role-based access control implementation',
    ],
    results: [
      { metric: 'Platforms', value: '2' },
      { metric: 'Branches', value: 'Multi' },
      { metric: 'Reporting Time', value: '-70%' },
    ],
    metrics: '-70% Reporting Time · Multi-Branch',
    projectAttributes: ['Enterprise Client', 'Enterprise Architecture'],
    coverImage: '/projects/nch-enterprise.svg',
    floating: {
      size: 'medium',
      depth: 'far',
    },
  },
];

export const featuredProjects = projects;
export default projects;
