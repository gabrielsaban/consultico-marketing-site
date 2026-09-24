import type { ReactNode } from 'react';
import type { Playbook } from '@/lib/reports/content/playbook';
import { railItems, reachableActions } from '@/lib/reports/playbook-nav';
import { ProgressProvider } from './ProgressProvider';
import { Rail } from './Rail';
import styles from '../report/report.module.css';

/**
 * The rail-plus-stage frame, shared by every playbook surface.
 *
 * Extracted so the plan and the resource shelf sit in the same furniture as the
 * actions. Keeping the frame byte-identical across surfaces is also what makes
 * navigation read as fast: with Cache-Control: no-store the RSC payload cannot
 * be prefetched, so the round trip is real, and only the stage column changing
 * is what stops it feeling like a page load.
 */
export function PlaybookFrame({
  pb,
  currentId,
  children,
}: {
  pb: Playbook;
  currentId?: string;
  children: ReactNode;
}) {
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
              currentId={currentId}
              reachable={reachable}
              showProgress={pb.config.showProgress}
            />
          </div>
          <main className={styles.stage}>{children}</main>
        </ProgressProvider>
      </div>
    </div>
  );
}
