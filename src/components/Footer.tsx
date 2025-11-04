// ARCHIVED: Previous footer moved to src/a_components/Footer_archived.tsx

import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-white mt-auto -ml-0 md:-ml-8 relative" style={{ width: '100vw' }}>
      <Image
        src="/brand/footer.svg"
        alt="Consultico"
        width={1410}
        height={224}
        className="w-full h-auto"
        priority={false}
      />
    </footer>
  )
}


