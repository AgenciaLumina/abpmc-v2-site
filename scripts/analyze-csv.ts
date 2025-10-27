import fs from 'fs';
import { parse } from 'csv-parse/sync';

const CSV_PATH = "/Volumes/Dock Station/abpmcdev/estatico/Paginas-Export-2025-October-26-1201.csv";

const file = fs.readFileSync(CSV_PATH, 'utf8');
const records = parse(file, { columns: true, skip_empty_lines: true });

console.log(`\n📊 ANÁLISE DO CSV DE PÁGINAS\n`);
console.log(`Total de linhas: ${records.length}\n`);
console.log(`=`.repeat(60));

let valid = 0;
let invalid = 0;

records.forEach((row: any, index: number) => {
  const lineNum = index + 2; // +2 porque linha 1 é header
  const title = row.Title || '';
  const content = row.Content || '';
  const slug = row.Slug || '';
  
  if (!title || !content) {
    invalid++;
    console.log(`\n❌ LINHA ${lineNum}: INVÁLIDA`);
    console.log(`   Título: ${title || '(vazio)'}`);
    console.log(`   Slug: ${slug || '(vazio)'}`);
    console.log(`   Conteúdo: ${content ? content.substring(0, 50) + '...' : '(vazio)'}`);
  } else {
    valid++;
    console.log(`\n✅ LINHA ${lineNum}: ${title}`);
    console.log(`   Slug: ${slug}`);
  }
});

console.log(`\n` + `=`.repeat(60));
console.log(`\n�� RESUMO:`);
console.log(`   Válidas: ${valid}`);
console.log(`   Inválidas: ${invalid}`);
console.log(`   Total: ${records.length}\n`);
