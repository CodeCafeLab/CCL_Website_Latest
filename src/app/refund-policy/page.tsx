export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto py-12 max-w-3xl px-4">
      <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last Updated: <span className="font-medium">02 August 2025</span>
      </p>
      <p className="mb-6">
        At <span className="font-semibold">Codecafe Lab IT Solutions</span>, we strive to provide high-quality software solutions and client satisfaction. This Refund Policy outlines the circumstances under which refunds may be issued for our services. Please read it carefully before initiating a service engagement.
      </p>
      <p className="mb-8">
        By availing our services, you agree to this Refund Policy.
      </p>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. General Policy</h2>
        <p>
          Due to the custom nature of software development, consultancy, and digital products, we do not offer full refunds once the work has commenced, resources have been allocated, or access to deliverables has been provided.
        </p>
        <p className="mt-2">
          However, we do consider partial refunds under specific conditions outlined below.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Services Covered</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Custom Software &amp; App Development</li>
          <li>Web Development Projects</li>
          <li>SaaS Product Development</li>
          <li>UI/UX and Branding Services</li>
          <li>IT Consultation and Automation Solutions</li>
          <li>Monthly/Annual Subscriptions (if applicable)</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. Eligibility for Refund</h2>
        <ul className="list-decimal pl-6 space-y-3">
          <li>
            <span className="font-medium">Before Work Begins:</span> If the client cancels the project before any development or planning work has started, a full or partial refund may be issued, excluding administrative or payment gateway fees.
          </li>
          <li>
            <span className="font-medium">Failure to Deliver:</span> If Codecafe Lab IT Solutions fails to deliver the agreed service due to internal limitations or inability to initiate the project, a full refund will be provided.
          </li>
          <li>
            <span className="font-medium">Project Delay from Our Side:</span> If there is a significant delay (beyond 45 business days) in project execution solely caused by our team and not by the client’s delays, a pro-rated refund or service credit may be offered upon mutual agreement.
          </li>
          <li>
            <span className="font-medium">Duplicate Payment:</span> In case of duplicate payment transactions, the extra amount will be refunded after verification, usually within 7 business days.
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Non-Refundable Situations</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Change of mind after the project has started</li>
          <li>Delays caused by client in providing feedback, approvals, or content</li>
          <li>Failure to communicate or respond from client-side</li>
          <li>Third-party integration failures or API changes</li>
          <li>Completed or partially delivered work (even if unused)</li>
          <li>Domain, hosting, cloud, or third-party software charges paid on your behalf</li>
          <li>Subscription-based services used for any period</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. Process for Requesting a Refund</h2>
        <p>
          To request a refund, please email us at <a href="mailto:hello@codecafelab.in" className="text-primary underline">hello@codecafelab.in</a> with the following details:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Full Name</li>
          <li>Contact Email</li>
          <li>Invoice Number</li>
          <li>Reason for Refund Request</li>
          <li>Payment Proof or Transaction ID</li>
        </ul>
        <p className="mt-2">
          <span className="font-medium">Note:</span> We do not accept refund requests over phone or WhatsApp. Each request will be reviewed on a case-by-case basis by our management team. We may ask for supporting documents or communication history before making a decision.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">6. Refund Timeline</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>If a refund is approved, it will be processed within 15 business days.</li>
          <li>The amount will be refunded to the original payment method or via bank transfer.</li>
          <li>Transaction or gateway fees (3–5%) may be deducted.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">7. Modifications to this Policy</h2>
        <p>
          Codecafe Lab IT Solutions reserves the right to update or modify this Refund Policy at any time. Updates will be posted on our website with the revised date. Continued use of our services implies acceptance of the revised terms.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
        <ul className="list-none pl-0 space-y-1">
          <li>
            <span className="font-medium">📧 Email:</span>{" "}
            <a href="mailto:hello@codecafelab.in" className="text-primary underline">hello@codecafelab.in</a>
          </li>
          <li>
            <span className="font-medium">📞 Phone:</span>{" "}
            <a href="tel:+917852010838" className="text-primary underline">+91 78520 10838</a>
          </li>
          <li>
            <span className="font-medium">🌐 Website:</span>{" "}
            <a href="https://www.codecafelab.in" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.codecafelab.in</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
