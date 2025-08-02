
export default function ShippingAndDeliveryPage() {
  return (
    <div className="container mx-auto py-12 max-w-3xl px-4">
      <h1 className="text-4xl font-bold mb-6">Shipping & Delivery Policy</h1>
      <p className="text-muted-foreground mb-4">
        This policy outlines the terms related to the shipping and delivery of our products and services.
      </p>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Digital Products</h2>
        <p>
          Most of our products are digital. Upon successful payment, you will receive access to your purchased software, service, or digital content immediately or within a few hours. You will receive an email confirmation with access details, download links, or instructions.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Physical Goods</h2>
        <p>
          While we primarily deal in digital goods, any physical products will be shipped via standard courier services. Shipping times may vary based on your location. A tracking number will be provided once your order is dispatched.
        </p>
      </section>
       <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Service Delivery</h2>
        <p>
          For services such as development or consultancy, delivery timelines will be outlined in your project proposal or service agreement. We adhere to the agreed-upon milestones and deadlines to ensure timely delivery of our services.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Contact Us</h2>
        <p>
          For any questions regarding shipping and delivery, please contact our support team at <a href="mailto:support@codecafelab.in" className="text-primary underline">support@codecafelab.in</a>.
        </p>
      </section>
      <p className="text-xs text-muted-foreground mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
