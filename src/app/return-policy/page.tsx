export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto py-12 max-w-3xl px-4">
      <h1 className="text-4xl font-bold mb-6">Return & Refund Policy</h1>
      <p className="text-muted-foreground mb-4">
        Learn about our return and refund policy for products and services purchased from CodeCafe Lab.
      </p>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Returns</h2>
        <p>
          If you are not satisfied with your purchase, you may request a return within 7 days of delivery. To be eligible, your item must be unused and in the same condition that you received it.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Refunds</h2>
        <p>
          Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed to your original method of payment within 7-10 business days.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Non-Returnable Items</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Customized or personalized products</li>
          <li>Downloadable software products</li>
          <li>Services that have already been rendered</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Contact Us</h2>
        <p>
          If you have any questions about our return and refund policy, please contact us at <a href="mailto:hello@codecafelab.in" className="text-primary underline">hello@codecafelab.in</a>.
        </p>
      </section>
      <p className="text-xs text-muted-foreground mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
