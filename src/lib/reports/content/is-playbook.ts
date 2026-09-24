import { PLAYBOOK_SCHEMA, type Playbook } from './playbook';
import type { ReportDoc } from './schema';

/**
 * Which kind of document came out of the envelope.
 *
 * Discriminated on `schema`, not on the envelope's `payload`, so the crypto
 * path is untouched and a report already sealed against the old shape keeps
 * opening through exactly the code it always did.
 */
export function isPlaybook(doc: ReportDoc | Playbook): doc is Playbook {
  return (doc as Playbook).schema === PLAYBOOK_SCHEMA;
}
