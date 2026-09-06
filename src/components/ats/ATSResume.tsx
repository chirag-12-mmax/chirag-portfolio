import { personal, experiences, featuredProjects, aiCapabilities, services, hardwareIntegration } from '@/lib/data';

export default function ATSResume() {
  return (
    <article
      className="sr-only"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: '0',
      }}
    >
      <header>
        <h1>{personal.firstName} {personal.lastName}</h1>
        <h2>Senior Flutter Developer | Flutter Engineer | Mobile Application Developer | Technical Lead</h2>
        <p>{personal.tagline}</p>
        <address>
          <a href={`mailto:${personal.email}`}>{personal.email}</a>
          <span>{personal.phone}</span>
          <a href={personal.linkedin}>LinkedIn</a>
          <a href={personal.github}>GitHub</a>
          <span>Location: {personal.location} (Open to remote & relocation)</span>
        </address>
        <section>
          <h3>Professional Summary</h3>
          <p>{personal.aboutStory}</p>
          <p>{personal.recruitMessage}</p>
        </section>
        <section>
          <h3>Specializations</h3>
          <ul>
            {personal.specializations?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Availability</h3>
          <p>{personal.availability.join(' | ')}</p>
          <p>Response time: {personal.responseTime}</p>
        </section>
      </header>

      <section>
        <h2>Work Experience</h2>
        {experiences.map((exp, i) => (
          <article key={i}>
            <h3>{exp.role.replace('\n', ' ')} at {exp.company}</h3>
            <p><strong>{exp.duration}</strong> ({exp.year}) - {exp.domain}</p>
            {exp.responsibilities && exp.responsibilities.length > 0 && (
              <>
                <h4>Responsibilities:</h4>
                <ul>
                  {exp.responsibilities.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              </>
            )}
            <h4>Key Achievements:</h4>
            <ul>
              {exp.bullets.map((bullet, j) => (
                <li key={j}>{bullet}</li>
              ))}
            </ul>
            {exp.achievements && exp.achievements.length > 0 && (
              <ul>
                {exp.achievements.map((a, j) => (
                  <li key={j}>{a}</li>
                ))}
              </ul>
            )}
            {exp.metrics && exp.metrics.length > 0 && (
              <p>Key Metrics: {exp.metrics.map(m => `${m.label}: ${m.value}`).join(' | ')}</p>
            )}
            <p>Technologies used: {exp.stack.join(', ')}</p>
          </article>
        ))}
      </section>

      <section>
        <h2>Featured Projects & Case Studies</h2>
        {featuredProjects.map((proj, i) => (
          <article key={i}>
            <h3>{proj.name}</h3>
            <p><strong>{proj.subtitle}</strong> | {proj.meta}</p>
            {proj.businessDomain && <p>Domain: {proj.businessDomain}</p>}
            {proj.role && <p>Role: {proj.role}</p>}
            {proj.teamSize && <p>Team: {proj.teamSize}</p>}
            {proj.timeline && <p>Timeline: {proj.timeline}</p>}
            <p>{proj.description}</p>
            {proj.problem && <p>Problem: {proj.problem}</p>}
            {proj.solution && <p>Solution: {proj.solution}</p>}
            {proj.architecture && <p>Architecture: {proj.architecture}</p>}
            {proj.businessImpact && <p>Business Impact: {proj.businessImpact}</p>}
            {proj.metrics && <p>Metrics/Impact: {proj.metrics}</p>}
            {proj.features && proj.features.length > 0 && (
              <p>Features: {proj.features.join(', ')}</p>
            )}
            <p>Technologies used: {proj.stack.join(', ')}</p>
            {proj.playStoreUrl && <a href={proj.playStoreUrl}>Play Store</a>}
            {proj.appStoreUrl && <a href={proj.appStoreUrl}>App Store</a>}
            {proj.liveUrl && <a href={proj.liveUrl}>Live URL</a>}
          </article>
        ))}
      </section>

      <section>
        <h2>Core AI & Engineering Capabilities</h2>
        <ul>
          {aiCapabilities.map((cap, i) => (
            <li key={i}>{cap.label}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Hardware & Device Integration</h2>
        <ul>
          {hardwareIntegration.map((h, i) => (
            <li key={i}>{h.label} ({h.category})</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Services Offered</h2>
        <ul>
          {services.map((s, i) => (
            <li key={i}><strong>{s.title}</strong>: {s.description}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Key Skills & Technologies</h2>
        <p>
          Flutter Developer, Senior Flutter Developer, Mobile Application Developer, Flutter Engineer,
          Mobile Engineer, Dart, Android, iOS, Flutter Web, Flutter Desktop,
          REST API, Firebase, Firebase Cloud Messaging (FCM), GetX, Provider, BLoC, Riverpod,
          SQLite, Sqflite, WebSocket, Google Maps, Push Notifications,
          Clean Architecture, MVVM, Mobile Architecture, API Integration,
          Performance Optimization, Crash Analysis, Application Security,
          Biometric Authentication, Face Verification, Bluetooth Integration,
          Razorpay, PhonePe, Apple Pay, Payment Gateway Integration,
          AI Integration, SaaS, Node.js, Python, Git,
          Unit Testing, Widget Testing, Firebase Crashlytics,
          GitHub Actions, Fastlane, CI/CD, App Store Deployment, Play Store Deployment,
          Team Leadership, Technical Lead, Client Communication, Requirement Gathering,
          Project Estimation, Agile Scrum, Code Review, Mentoring
        </p>
      </section>

      <footer>
        <p>Portfolio available at: {personal.portfolio}</p>
        <p>Full resume download available at: {personal.resumeUrl}</p>
        <p>Phone: {personal.phone} | Email: {personal.email}</p>
      </footer>
    </article>
  );
}
