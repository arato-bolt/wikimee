import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Helper para ler todos os arquivos JSON de uma pasta
function getContentFromFolder(folderName) {
  try {
    const contentDir = join(process.cwd(), 'content', folderName);
    const files = readdirSync(contentDir).filter(file => file.endsWith('.json'));
    
    return files.map(file => {
      const filePath = join(contentDir, file);
      const content = readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    });
  } catch (error) {
    console.error(`Erro ao ler conteúdo de ${folderName}:`, error);
    return [];
  }
}

// Helper para ler um arquivo JSON específico
function getSingleContent(folderName, fileName) {
  try {
    const filePath = join(process.cwd(), 'content', folderName, `${fileName}.json`);
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Erro ao ler ${folderName}/${fileName}:`, error);
    return null;
  }
}

// Funções específicas para cada tipo de conteúdo
export function getFeatures() {
  return getContentFromFolder('features').sort((a, b) => a.order - b.order);
}

export function getPricing() {
  return getContentFromFolder('pricing');
}

export function getFAQ() {
  return getContentFromFolder('faq').sort((a, b) => a.order - b.order);
}

export function getHeroConfig() {
  return getSingleContent('hero', 'config');
}

export function getSiteConfig() {
  return getSingleContent('config', 'site');
}

// Função genérica para qualquer tipo
export function getContent(type) {
  return getContentFromFolder(type);
}
