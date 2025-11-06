#!/usr/bin/env node

/**
 * Script to merge contributes from src/contributes/index.ts into package.json
 * This allows us to keep contributes in a separate TypeScript file for better organization
 */

import * as fs from 'fs'
import * as path from 'path'
import { contributes } from '../contributes/index'

// Script is in src/scripts/, so we need to go up 2 levels to reach project root
const rootDir = path.resolve(__dirname, '../..')
const packageJsonPath = path.join(rootDir, 'package.json')

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

// Merge contributes into package.json
packageJson.contributes = contributes

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')

console.log('✅ Successfully merged contributes from src/contributes/index.ts into package.json')
