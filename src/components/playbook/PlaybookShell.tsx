import type { Playbook } from '@/lib/reports/content/playbook';
import { actionById, neighbours, railItems, reachableActions } from '@/lib/reports/playbook-nav';
import { ProgressProvider } from './ProgressProvider';
import { Rail } from './Rail';
import { Opening } from './Opening';
import { ActionView } from './ActionView';
import styles from '../report/report.module.css';

/**
 * The frame around one playbook.
 *
 * A server component. The rail and the controls are client children; every word
 * of the playbook renders here and stays out of the JS bundle.
 *
 * An unknown or absent `?a=` renders the opening rather than 404ing. An unknown
 * id means a typo or a reordered playbook, and dropping someone on a 404 when
 * they have the right link and the right code is the wrong answer.
 */
export function PlaybookShell({ pb, actionId }: { pb: Playbook; actionId?: string }) {
  const action = actionById(pb, actionId);
  const { prev, next } = action ? neighbours(pb, action.id) : {};

  // Gating ships off, so this is every id. It is computed here rather than in
  // the rail so that one function owns the meaning — see playbook-nav.ts.
  const reachable = [...reachableActions(pb, { completed: new Set() })];

  return (
    <div className={styles.scope}>
      <div className={styles.frame}>
        <ProgressProvider slug={pb.slug}>
          <div className={styles.rail}>
            <Rail
              slug={pb.slug}
              parts={pb.parts}
              items={railItems(pb)}
              currentId={action?.id}
              reachable={reachable}
              showProgress={pb.config.showProgress}
            />
          </div>

          <main className={styles.stage}>
            {action ? (
              <ActionView pb={pb} action={action} prev={prev} next={next} />
            ) : (
              <Opening pb={pb} />
            )}
          </main>
        </ProgressProvider>
      </div>
    </div>
  );
}
