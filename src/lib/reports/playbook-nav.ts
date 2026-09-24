import type { Action, Playbook, RailItem } from './content/playbook';

/**
 * Pure navigation helpers for a playbook. No React, no server-only import —
 * the rail is a client component and needs these too.
 *
 * WHY reachableActions EXISTS WHILE NOTHING IS LOCKED
 *
 * Gating ships off. The point of putting the decision in one function now is
 * that turning it on later stays a data change. Four surfaces need to agree on
 * what "reachable" means — the rail, the prev/next control, the opening's
 * Continue button and the plan's back-links — and if each decides for itself,
 * the config flag becomes a lie you discover six months later. Every one of
 * them calls this.
 */

export type ProgressState = {
  /** Action ids the client has completed. */
  completed: Set<string>;
  lastActionId?: string;
};

export function orderedActions(pb: Playbook): Action[] {
  return [...pb.actions].sort((a, b) => a.order - b.order);
}

export function actionById(pb: Playbook, id: string | undefined): Action | undefined {
  return id ? pb.actions.find((a) => a.id === id) : undefined;
}

export function neighbours(pb: Playbook, id: string): { prev?: Action; next?: Action } {
  const list = orderedActions(pb);
  const i = list.findIndex((a) => a.id === id);
  if (i === -1) return {};
  return { prev: list[i - 1], next: list[i + 1] };
}

/** What crosses to the client for the rail. Never action bodies. */
export function railItems(pb: Playbook): RailItem[] {
  return orderedActions(pb).map((a) => ({
    id: a.id,
    partId: a.partId,
    order: a.order,
    title: a.title,
    minutes: a.minutes,
    optional: a.optional,
  }));
}

export function partTree(pb: Playbook): { part: Playbook['parts'][number]; actions: Action[] }[] {
  return [...pb.parts]
    .sort((a, b) => a.order - b.order)
    .map((part) => ({
      part,
      actions: orderedActions(pb).filter((a) => a.partId === part.id),
    }));
}

/**
 * Which actions the client may open.
 *
 * With `navigation: 'open'` — what ships — this is all of them, and the whole
 * function is a pass-through. With 'sequential' it is every completed action,
 * plus the first incomplete one. Optional actions never block what follows
 * them: skipping something marked optional is the point of marking it.
 */
export function reachableActions(pb: Playbook, progress: ProgressState): Set<string> {
  const list = orderedActions(pb);
  if (pb.config.navigation === 'open') return new Set(list.map((a) => a.id));

  const reachable = new Set<string>();
  for (const action of list) {
    reachable.add(action.id);
    const done = progress.completed.has(action.id) || action.optional === true;
    if (!done) break;
  }
  return reachable;
}

export function totalMinutes(pb: Playbook): number {
  return pb.actions.reduce((n, a) => n + a.minutes, 0);
}

export function progressCount(pb: Playbook, progress: ProgressState): { done: number; total: number } {
  return {
    done: pb.actions.filter((a) => progress.completed.has(a.id)).length,
    total: pb.actions.length,
  };
}
