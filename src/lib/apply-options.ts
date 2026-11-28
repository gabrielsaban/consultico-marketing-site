/**
 * The fixed answers on the /apply form.
 *
 * Shared by the form (which renders them) and the contact-form API route
 * (which only accepts these exact strings). The route needs the list because
 * each answer is written into its own GoHighLevel contact field, and a field
 * that workflows and filters depend on must not hold whatever a script chose
 * to post. Change an option here and both sides move together.
 */
export const APPLY_REVENUE = ['Under £1m', '£1m to £5m', '£5m to £20m', 'Over £20m'] as const;
export const APPLY_TEAM = ['Just me', '1 to 3 people', '4 to 10 people', 'More than 10'] as const;
export const APPLY_SPEND = ['Under £2,000', '£2,000 to £10,000', '£10,000 to £50,000', 'Over £50,000'] as const;
export const APPLY_CHANNELS = [
  'SEO',
  'Google Ads',
  'Meta ads',
  'Email',
  'Social',
  'Influencers',
  'PR',
  'Retail or wholesale',
  'Other',
] as const;
export const APPLY_START = ['As soon as possible', 'In the next 3 months', 'Later this year', 'Just exploring'] as const;

/** The structured answers the form posts alongside the packed message. */
export type ApplyAnswers = {
  revenue?: string;
  team?: string;
  spend?: string;
  channels?: string[];
  start?: string;
  goal?: string;
};
