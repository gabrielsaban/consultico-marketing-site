import type { Playbook } from '@/lib/reports/content/playbook';
import { SITUATION_ID, actionById, neighbours } from '@/lib/reports/playbook-nav';
import { PlaybookFrame } from './PlaybookFrame';
import { Opening } from './Opening';
import { Situation } from './Situation';
import { ActionView } from './ActionView';

/**
 * One playbook, dispatched to the right stage.
 *
 * A server component. Every word of the playbook renders here and stays out of
 * the JS bundle; the rail, the top bar and the controls are client children.
 *
 * An unknown or absent `?a=` renders the index rather than 404ing. An unknown
 * id means a typo or a reordered playbook, and dropping someone on a 404 when
 * they have the right link and the right code is the wrong answer.
 *
 * The furniture comes from PlaybookFrame, the same component the plan and the
 * resource shelf use. It used to be copied out here instead, which quietly put
 * the "identical frame across every surface" property — the thing that makes
 * navigation read as fast rather than as a page load — in the hands of whoever
 * remembered to edit both files.
 */
export function PlaybookShell({ pb, actionId }: { pb: Playbook; actionId?: string }) {
  const action = actionById(pb, actionId);
  const { prev, next } = action ? neighbours(pb, action.id) : {};
  // Only when no real action claims the id, so a playbook can never lose an
  // action to the reserved word.
  const isSituation = !action && actionId === SITUATION_ID;

  return (
    <PlaybookFrame pb={pb} currentId={action?.id ?? (isSituation ? SITUATION_ID : undefined)}>
      {action ? (
        <ActionView pb={pb} action={action} prev={prev} next={next} />
      ) : isSituation ? (
        <Situation pb={pb} />
      ) : (
        <Opening pb={pb} />
      )}
    </PlaybookFrame>
  );
}
