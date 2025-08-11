export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-[#1d1f1a] text-center">
      <h2 className="text-3xl font-bold mb-6 text-[#80FF72]">Contact Me</h2>
      <p className="text-celeste mb-4">Have questions or want to collaborate?</p>
      <a
        href="mailto:yourmail@example.com"
        className="inline-block bg-[#80FF72] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#7EE8FA] transition"
      >
        Send an Email
      </a>
    </section>
  );
}
