import { Fragment } from 'react';
import styles from './report.module.css';

/**
 * Renders RichText: the only two inline conventions the schema allows.
 *
 *   **bold**         emphasis
 *   [[placeholder]]  a value the client fills in, as an amber chip
 *
 * Deliberately not a markdown renderer. Two conventions can be handled with a
 * split and no sanitiser; the moment this accepts arbitrary markdown or HTML,
 * report content becomes unauditable and the sparseness rules the schema
 * enforces can be walked straight around.
 */
export function Rich({ text }: { text: string }) {
  // One pass, both conventions, so a placeholder inside bold still works.
  const parts = text.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\])/g).filter(Boolean);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('[[') && part.endsWith(']]')) {
          return (
            <span key={i} className={styles.placeholder}>
              {part.slice(2, -2)}
            </span>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
