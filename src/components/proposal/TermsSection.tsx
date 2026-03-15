import { PROPOSAL } from "@/config/proposal";

const TermsSection = () => {
  return (
    <section className="bg-card py-12 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <p className="font-body text-muted-foreground text-sm mb-2">
          Al aprobar esta propuesta aceptas los términos y condiciones de Ferova Agency.
        </p>
        <a
          href={PROPOSAL.TERMS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-gold text-sm underline hover:text-gold/80 transition-colors duration-300"
        >
          Leer términos y condiciones →
        </a>
      </div>
    </section>
  );
};

export default TermsSection;
