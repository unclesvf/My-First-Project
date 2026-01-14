/**
 * Re-export lessons from split files for backward compatibility.
 * Individual lesson files are in data/lessons/ directory.
 * This enables code splitting while maintaining existing imports.
 */

export { lessons, getLessonById, TOTAL_LESSONS } from './lessons/index';
