import Link from 'next/link';
import Container from '@/components/Container';

interface ServiceCtaBandProps {
  title: string;
  body: string;
  buttonLabel: string;
  href: string;
}

export default function ServiceCtaBand({ title, body, buttonLabel, href }: ServiceCtaBandProps) {
  return (
    <section className="bg-brand-blue py-16 text-white md:py-20 lg:py-24" data-cursor-theme="light">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-futura text-[clamp(2rem,3.5vw,3.25rem)] font-bold leading-[1.05]">{title}</h2>
          <p className="mx-auto mt-5 max-w-2xl font-helvetica-light text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.6] text-white/90">
            {body}
          </p>
          <Link
            href={href}
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-helvetica text-[clamp(1rem,1.15vw,1.1rem)] font-medium text-brand-blue transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-blue"
          >
            {buttonLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
