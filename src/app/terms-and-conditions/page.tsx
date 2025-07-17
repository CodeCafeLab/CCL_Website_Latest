export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto py-12 max-w-3xl px-4">
      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
      <p className="text-muted-foreground mb-4">
        Welcome to CodeCafe Lab. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use CodeCafe Lab if you do not agree to all of the terms and conditions stated on this page.
      </p>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Intellectual Property Rights</h2>
        <p>
          Unless otherwise stated, CodeCafe Lab and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this from CodeCafe Lab for your own personal use subjected to restrictions set in these terms and conditions.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Restrictions</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Publishing any website material in any other media</li>
          <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
          <li>Publicly performing and/or showing any website material</li>
          <li>Using this website in any way that is or may be damaging to this website</li>
          <li>Using this website contrary to applicable laws and regulations</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Your Content</h2>
        <p>
          In these terms and conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this website. By displaying Your Content, you grant CodeCafe Lab a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Limitation of Liability</h2>
        <p>
          In no event shall CodeCafe Lab, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this website.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Changes to Terms</h2>
        <p>
          We reserve the right to revise these terms at any time as we see fit. By using this website you are expected to review these terms on a regular basis.
        </p>
      </section>
      <p className="text-xs text-muted-foreground mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
