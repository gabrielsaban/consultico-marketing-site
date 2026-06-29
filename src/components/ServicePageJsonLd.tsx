import type { ServicePageKey } from '@/lib/seo';
import { servicePageJsonLd } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';

export default function ServicePageJsonLd({ pageKey }: { pageKey: ServicePageKey }) {
  return <JsonLd data={servicePageJsonLd(pageKey)} />;
}
