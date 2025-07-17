export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 max-w-3xl px-4">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-4">
        Your privacy is important to us. This privacy policy explains how CodeCafe Lab collects, uses, and protects your information.
      </p>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Personal identification information (Name, email address, phone number, etc.)</li>
          <li>Usage data (pages visited, time spent, etc.)</li>
          <li>Cookies and tracking technologies</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To provide and maintain our services</li>
          <li>To improve our website and offerings</li>
          <li>To communicate with you, including for customer service and updates</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Your Rights</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access, update, or delete your personal information</li>
          <li>Opt-out of marketing communications</li>
          <li>Request a copy of the data we hold about you</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Changes to This Policy</h2>
        <p>
          We may update our privacy policy from time to time. We encourage you to review this page periodically for any changes.
        </p>
      </section>
      <p className="text-xs text-muted-foreground mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
