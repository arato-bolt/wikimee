import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// ============================================
// HELPERS GENÉRICOS
// ============================================

/**
 * Lê todos os arquivos JSON de uma pasta
 */
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

/**
 * Lê um arquivo JSON específico
 */
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

// ============================================
// FUNÇÕES ESPECÍFICAS POR TIPO DE CONTEÚDO
// ============================================

// --- HERO ---
export function getHeroConfig() {
  return getSingleContent('hero', 'config');
}

// --- FEATURES ---
export function getFeatures() {
  return getContentFromFolder('features').sort((a, b) => a.order - b.order);
}

export function getFeatureById(id) {
  const features = getFeatures();
  return features.find(f => f.id === id);
}

// --- PRICING ---
export function getPricing() {
  return getContentFromFolder('pricing');
}

export function getPricingById(id) {
  const pricing = getPricing();
  return pricing.find(p => p.id === id);
}

// --- FAQ ---
export function getFAQ() {
  return getContentFromFolder('faq').sort((a, b) => a.order - b.order);
}

// --- LOGOS / CLIENTS ---
export function getLogos() {
  return getSingleContent('logos', 'clients');
}

// --- PAIN POINTS / PROBLEMS ---
export function getPainPoints() {
  return getSingleContent('problems', 'pain-points');
}

// --- STATISTICS ---
export function getStatistics() {
  return getSingleContent('stats', 'metrics');
}

// --- VALUE PROPOSITION / GAINS ---
export function getValueProposition() {
  return getSingleContent('value-prop', 'gains');
}

// --- FEATURES CAROUSEL ---
export function getFeaturesCarousel() {
  return getSingleContent('features-carousel', 'slides');
}

// --- CREATIVE FLOW PROCESS ---
export function getCreativeFlow() {
  return getSingleContent('process', 'creative-flow');
}

// --- COMPARATIVE (BEFORE/AFTER) ---
export function getComparative() {
  return getSingleContent('comparative', 'traditional-vs-wikimee');
}

// --- SEGMENTS ---
export function getSegments() {
  return getSingleContent('segments', 'target-audience');
}

// --- INTEGRATIONS ---
export function getIntegrations() {
  return getSingleContent('integrations', 'config');
}

// --- TESTIMONIALS ---
export function getTestimonials() {
  return getSingleContent('testimonials', 'featured');
}

// --- CTA FINAL ---
export function getCTAFinal() {
  return getSingleContent('cta', 'final');
}

// --- FOOTER ---
export function getFooter() {
  return getSingleContent('footer', 'config');
}

// --- SITE CONFIG ---
export function getSiteConfig() {
  return getSingleContent('config', 'site');
}

// ============================================
// FUNÇÃO GENÉRICA (FALLBACK)
// ============================================

/**
 * Busca conteúdo de qualquer pasta (genérico)
 */
export function getContent(type) {
  return getContentFromFolder(type);
}

/**
 * Busca conteúdo único de qualquer tipo
 */
export function getSingleContentGeneric(type, fileName) {
  return getSingleContent(type, fileName);
}

// ============================================
// HELPER PARA TODAS AS SEÇÕES DA LANDING PAGE
// ============================================

/**
 * Retorna todos os dados necessários para a landing page de uma vez
 * Útil para SSG (Static Site Generation) no Astro
 */
export function getAllLandingPageContent() {
  return {
    hero: getHeroConfig(),
    features: getFeatures(),
    pricing: getPricing(),
    faq: getFAQ(),
    logos: getLogos(),
    painPoints: getPainPoints(),
    statistics: getStatistics(),
    valueProposition: getValueProposition(),
    featuresCarousel: getFeaturesCarousel(),
    creativeFlow: getCreativeFlow(),
    comparative: getComparative(),
    segments: getSegments(),
    integrations: getIntegrations(),
    testimonials: getTestimonials(),
    ctaFinal: getCTAFinal(),
    footer: getFooter(),
    siteConfig: getSiteConfig()
  };
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default {
  getHeroConfig,
  getFeatures,
  getFeatureById,
  getPricing,
  getPricingById,
  getFAQ,
  getLogos,
  getPainPoints,
  getStatistics,
  getValueProposition,
  getFeaturesCarousel,
  getCreativeFlow,
  getComparative,
  getSegments,
  getIntegrations,
  getTestimonials,
  getCTAFinal,
  getFooter,
  getSiteConfig,
  getContent,
  getSingleContentGeneric,
  getAllLandingPageContent
};
