#!/usr/bin/env node
'use strict';

/**
 * Recursively collect all LDraw part IDs (as used by the loader) from a model file.
 * Outputs one ID per line so you can pass to download-ldraw-parts.js.
 * IDs keep their path form: s/27925s01.dat, 48/1-4cylc.dat, etc.
 *
 * Usage: node scripts/collect-ldraw-deps.js [model.ldr]
 * Default model: models/DSH.ldr
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const LDRAW_PARTS = path.join(ROOT, 'ldraw_parts');
const LDRAW_UNOFFICIAL = path.join(ROOT, 'ldraw_unofficial');
const OFFICIAL = path.join(ROOT, 'official');
const UNOFFICIAL = path.join(ROOT, 'unofficial');

function normalizeId(ref) {
  let id = ref.trim().toLowerCase().replace(/\\/g, '/');
  if (!id.endsWith('.dat')) id += '.dat';
  return id;
}

function extractRefs(content) {
  const refs = new Set();
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length < 15 || parts[0] !== '1') continue;
    const ref = parts.slice(14).join(' ');
    if (!ref) continue;
    refs.add(normalizeId(ref));
  }
  return refs;
}

function findFile(id) {
  const candidates = [];
  if (id.includes('/')) {
    candidates.push(path.join(LDRAW_PARTS, id), path.join(LDRAW_UNOFFICIAL, id));
    candidates.push(path.join(OFFICIAL, 'parts', id), path.join(OFFICIAL, 'p', id));
    candidates.push(path.join(UNOFFICIAL, 'parts', id), path.join(UNOFFICIAL, 'p', id));
  } else {
    candidates.push(
      path.join(LDRAW_PARTS, id),
      path.join(LDRAW_PARTS, 's', id),
      path.join(LDRAW_PARTS, '48', id),
      path.join(LDRAW_PARTS, '8', id),
      path.join(LDRAW_UNOFFICIAL, id),
      path.join(OFFICIAL, 'parts', id),
      path.join(OFFICIAL, 'p', id),
      path.join(UNOFFICIAL, 'parts', id),
      path.join(UNOFFICIAL, 'p', id)
    );
  }
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function collectRecursive(entryId, allIds, visited) {
  if (visited.has(entryId)) return;
  visited.add(entryId);
  allIds.add(entryId);
  const filePath = findFile(entryId);
  if (!filePath) return;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const refs = extractRefs(content);
    for (const ref of refs) {
      collectRecursive(ref, allIds, visited);
    }
  } catch (e) {
    // ignore parse errors
  }
}

function main() {
  const modelPath = process.argv[2] || path.join(ROOT, 'models', 'DSH.ldr');
  const absPath = path.isAbsolute(modelPath) ? modelPath : path.join(process.cwd(), modelPath);
  if (!fs.existsSync(absPath)) {
    console.error('File not found:', absPath);
    process.exit(1);
  }
  const content = fs.readFileSync(absPath, 'utf8');
  const entryRefs = extractRefs(content);
  const allIds = new Set();
  const visited = new Set();
  for (const id of entryRefs) {
    collectRecursive(id, allIds, visited);
  }
  const sorted = Array.from(allIds).sort();
  const missing = sorted.filter((id) => !findFile(id));
  const have = sorted.filter((id) => findFile(id));
  console.error('# Total required:', sorted.length);
  console.error('# Have:', have.length);
  console.error('# Missing:', missing.length);
  if (missing.length) {
    console.error('# Missing IDs:');
    missing.forEach((id) => console.error('#   ', id));
  }
  sorted.forEach((id) => console.log(id));
}

main();
