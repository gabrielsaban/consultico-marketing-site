import { pushEvent } from './data-layer';
import { getUtmEventParams } from './utm';

function withContext(params: Record<string, string | number | boolean | undefined> = {}) {
  const pagePath =
    typeof window !== 'undefined' ? window.location.pathname : undefined;

  return {
    page_path: pagePath,
    ...getUtmEventParams(),
    ...params,
  };
}

export function trackGenerateLead(params: {
  formId: string;
  interest?: string;
  leadType?: string;
}) {
  pushEvent({
    event: 'generate_lead',
    ...withContext({
      form_id: params.formId,
      interest: params.interest,
      lead_type: params.leadType,
    }),
  });
}

export function trackSignUp(params: { method: string; source?: string }) {
  pushEvent({
    event: 'sign_up',
    ...withContext({
      method: params.method,
      signup_source: params.source,
    }),
  });
}

export function trackOutboundClick(params: { linkUrl: string; ctaLocation: string }) {
  pushEvent({
    event: 'click',
    ...withContext({
      link_url: params.linkUrl,
      outbound: true,
      cta_location: params.ctaLocation,
    }),
  });
}

export function trackServiceCta(params: { itemId: string; ctaLocation: string }) {
  pushEvent({
    event: 'select_content',
    ...withContext({
      content_type: 'service_cta',
      item_id: params.itemId,
      cta_location: params.ctaLocation,
    }),
  });
}

export function trackQuizComplete(params: { score: number; quizTier: string }) {
  pushEvent({
    event: 'generate_lead',
    ...withContext({
      form_id: 'webinar_quiz',
      lead_type: 'quiz_complete',
      quiz_score: params.score,
      quiz_tier: params.quizTier,
    }),
  });
}
