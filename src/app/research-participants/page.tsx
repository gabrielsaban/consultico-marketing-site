import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import { CONSULTICO_EMAIL } from '@/lib/contact';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Research Participant Privacy Notice',
  description:
    'How Consultico handles your answers when you take part in a survey or research study, whether we are running it for ourselves or for a client.',
  path: '/research-participants',
});

/**
 * Written to cover BOTH our own research and research we run for clients, so it can
 * be linked from any survey. Anything specific to one study is given at the point of
 * collection and takes precedence over this page.
 *
 * Two things here are deliberate and should not be "tidied" into simpler claims:
 *
 * 1. It does NOT claim surveys are completely anonymous. We do not ASK for identifying
 *    details, but free-text answers can identify someone, small samples can allow
 *    re-identification, and survey platforms commonly log IP and device data by
 *    default. Over-claiming anonymity would be worse than saying nothing.
 * 2. The rights section states the Article 11 limitation plainly: where we genuinely
 *    cannot identify which response is yours, we cannot action an access or erasure
 *    request. That is the honest legal position and hiding it would mislead.
 */
const sections: { title: string; body: string }[] = [
  {
    title: 'What this page is for',
    body: 'If you have been invited to take part in a survey, interview or research study run by Consultico, this explains what happens to your answers. Anything specific to the study you have been invited to will be told to you at the point you are asked to take part, and where the two differ, that notice is the one that applies.',
  },
  {
    title: 'Who is running the research',
    body: 'Some research we run for ourselves. More often we run it for a client, who wants to understand their market, their customers or their category. In that case the client decides what they want to learn and we decide how the research is designed and carried out, which under UK data protection law usually makes us joint controllers. In plain terms: both of us have responsibilities for your data, and you can raise a question with either. If a study is run for a client, we will tell you who they are when we ask you to take part, unless naming them would bias your answers, in which case we will tell you the sector and name them on request afterwards.',
  },
  {
    title: 'Taking part is voluntary',
    body: 'You do not have to take part, and you can stop at any point without giving a reason. You can skip questions you would rather not answer. Nothing follows from declining.',
  },
  {
    title: 'What we ask for',
    body: 'As a rule we do not ask for your name, email address, phone number or anything else that identifies you. Our surveys are designed to be answered without them. We should be straight with you about the limits of that, though: a free-text answer can identify someone if it describes their circumstances closely enough, a very small sample can make an individual recognisable from their answers alone, and survey tools often record technical data such as an IP address unless that is switched off. Where a study does need identifying details, for example so we can pay an incentive or arrange a follow-up interview, we will ask for them separately and tell you why at the time.',
  },
  {
    title: 'What the client receives',
    body: 'The client receives the findings, and the response data behind them. They do not receive your name or contact details, because we do not collect them. We do not tell a client how any named individual answered. Where we quote a response, we do it in a way that does not identify you, and if a quote could reasonably identify someone we either change it or leave it out.',
  },
  {
    title: 'Why we process your answers, and the legal basis',
    body: 'We process research responses to produce findings and analysis, which is a legitimate interest of ours and of the client commissioning the work. We keep that interest balanced against your rights by not asking for identifying details, by not passing your identity to anyone, and by using the answers only for the research they were collected for. Where we collect anything that identifies you, we ask for your consent first and you can withdraw it.',
  },
  {
    title: 'How long we keep it',
    body: 'We keep research responses for as long as the findings are being used and checked, and normally no longer than twelve months after a study closes unless the client has a documented reason to keep them longer. Aggregated findings, which do not identify anyone, may be kept indefinitely.',
  },
  {
    title: 'Your rights, and one honest limit on them',
    body: 'You have the right to ask what we hold about you, to have it corrected or deleted, to restrict or object to how it is used, and to complain to the Information Commissioner at ico.org.uk. There is a genuine limit worth stating plainly rather than burying: where a survey is answered without any identifying details, we cannot tell which response is yours, so we cannot retrieve or delete it on request. UK data protection law recognises this. If you can give us something that identifies your response, such as the date and time you completed it, we will do what we can.',
  },
  {
    title: 'Market Research Society Code of Conduct',
    body: 'Consultico is certified by the Market Research Society and works to its Code of Conduct. Among other things, that means research is never used as a disguise for selling to you, participation is always voluntary, you are told who is collecting the data, and you are not identified to a client without your agreement. These obligations sit with us independently of what any client would prefer.',
  },
  {
    title: 'Security and who else is involved',
    body: 'Responses are held on services we use to run and analyse surveys, under contracts that require them to protect the data and use it only on our instructions. We do not sell research data, and we do not use it for advertising or to build marketing lists.',
  },
];

export default function ResearchParticipantsPage() {
  return (
    <main className="relative min-h-screen bg-brand-silk dark:bg-gray-950">
      <ServiceDesktopHeader />
      <Container className="relative z-10 pb-16 pt-[11rem] md:pb-20 md:pt-[13rem] lg:pt-[14rem]">
        <article className="mx-auto max-w-3xl">
          <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
            Research
          </p>
          <h1 className="font-futura text-[clamp(2rem,3vw,2.75rem)] font-bold text-brand-blue">
            Taking part in our research
          </h1>
          <p className="mt-4 font-helvetica-light text-[0.95rem] text-gray-600 dark:text-gray-400">
            Last updated: September 2026.
          </p>

          <p className="mt-6 font-helvetica-light text-[clamp(1rem,1.15vw,1.1rem)] leading-[1.7] text-gray-700 dark:text-gray-300">
            This is the privacy notice for anyone taking part in a survey or study we run, whether
            it is our own research or research we are running for a client.
          </p>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-futura text-[clamp(1.2rem,1.8vw,1.5rem)] font-bold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
                <p className="mt-3 font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] text-gray-700 dark:text-gray-300">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <p className="mt-10 font-helvetica-light text-[0.95rem] leading-[1.7] text-gray-700 dark:text-gray-300">
            Questions about a study you have been invited to, or about your data:{' '}
            <a href={`mailto:${CONSULTICO_EMAIL}`} className="text-brand-blue hover:underline">
              {CONSULTICO_EMAIL}
            </a>
            . See also our{' '}
            <Link href="/privacy" className="text-brand-blue hover:underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="text-brand-blue hover:underline">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </article>
      </Container>
    </main>
  );
}
