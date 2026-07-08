import type { DataLayerEvent } from './types';

export function pushEvent(event: DataLayerEvent) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}
