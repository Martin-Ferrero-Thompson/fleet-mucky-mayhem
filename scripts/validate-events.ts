// filepath: scripts/validate-events.ts
// 🟢 Beginner: This script validates that all events in our calendar system
// are properly linked between the index file (events.json) and detail files.

import { file } from 'bun';

/**
 * 🟢 TypeScript Interface: Defines the shape of an event in events.json
 * This helps catch errors at compile time if we try to access wrong properties
 */
interface IndexEvent {
  id: string;
  title: string;
  date?: string;           // Only for single events
  startTime: string;
  eventType: string;
  location: string;
  daysOfWeek?: number[];   // Only for recurring events
  startRecur?: string;     // Only for recurring events
  endRecur?: string;       // Only for recurring events
  duration?: string;       // Only for recurring events
}

/**
 * 🟢 Interface for events in the detail files (social-events.json, etc.)
 */
interface DetailEvent {
  id: string;
  title: string;
  startTime?: string;
}

/**
 * 🟡 Record type: Maps event type names to their corresponding JSON file paths
 * Record<string, string> means "an object where keys and values are strings"
 */
const EVENT_FILES: Record<string, string> = {
  'Social': 'src/data/social-events.json',
  'Introductory-Ride': 'src/data/introductory-rides.json',
  'Regular-Ride': 'src/data/regular-rides.json',
  'Longer-Ride': 'src/data/longer-rides.json'
};

/**
 * 🟢 Main validation function
 * Checks that:
 * 1. Every event in events.json has a matching entry in its detail file
 * 2. Required fields are present based on event type (single vs recurring)
 * 3. Titles match between index and detail files
 */
async function validate(): Promise<void> {
  let hasErrors = false;

  // Load the events index file
  const indexFile = file('src/data/events.json');
  const indexData = await indexFile.json();
  const events: IndexEvent[] = indexData.events;

  console.log(`\n📅 Validating ${events.length} events...\n`);

  // 🟡 Group events by their type for organised validation
  // This creates an object like: { 'Social': [...], 'Regular-Ride': [...] }
  const eventsByType: Record<string, IndexEvent[]> = {};
  for (const event of events) {
    if (!eventsByType[event.eventType]) {
      eventsByType[event.eventType] = [];
    }
    eventsByType[event.eventType].push(event);
  }

  // Validate each event type
  for (const [eventType, typeEvents] of Object.entries(eventsByType)) {
    const detailFile = EVENT_FILES[eventType];
    
    // Check if we know about this event type
    if (!detailFile) {
      console.error(`✗ Unknown event type: ${eventType}`);
      hasErrors = true;
      continue;
    }

    // Load the detail file for this event type
    let detailData;
    try {
      detailData = await file(detailFile).json();
    } catch (error) {
      console.error(`✗ Could not read ${detailFile}: ${error}`);
      hasErrors = true;
      continue;
    }

    // 🟡 Handle different file structures
    // longer-rides.json uses 'longerRides' + 'archivedRides', others use 'events'
    let detailEvents: DetailEvent[] = detailData.events || detailData.longerRides || [];
    
    // 🟢 Include archived rides for longer-rides.json
    if (detailData.archivedRides) {
      detailEvents = [...detailEvents, ...detailData.archivedRides];
    }
    
    // 🟢 Set: A collection that only stores unique values
    // Perfect for checking if an ID exists quickly
    const detailIds = new Set(detailEvents.map(e => e.id));

    console.log(`${eventType}:`);

    for (const event of typeEvents) {
      // Check 1: Does this event ID exist in the detail file?
      if (!detailIds.has(event.id)) {
        console.error(`  ✗ ID "${event.id}" not found in ${detailFile}`);
        hasErrors = true;
        continue;
      }

      // Check 2: Are required fields present?
      if (event.daysOfWeek) {
        // This is a recurring event - needs startRecur and endRecur
        if (!event.startRecur || !event.endRecur) {
          console.error(`  ✗ Recurring event "${event.id}" missing startRecur/endRecur`);
          hasErrors = true;
        }
      } else {
        // This is a single event - needs a date
        if (!event.date) {
          console.error(`  ✗ Single event "${event.id}" missing date`);
          hasErrors = true;
        }
      }

      // Check 3: Do titles match? (warning only, not an error)
      const detail = detailEvents.find(e => e.id === event.id);
      if (detail) {
        if (detail.title && detail.title !== event.title) {
          console.warn(`  ⚠ Title mismatch for "${event.id}": index="${event.title}" detail="${detail.title}"`);
        }
        console.log(`  ✓ ${event.id}`);
      }
    }

    console.log('');
  }

  // Final result
  if (hasErrors) {
    console.error('❌ Validation failed with errors.\n');
    process.exit(1);
  } else {
    console.log('✅ All events valid!\n');
  }
}

// 🟢 Run the validation and handle any unexpected errors
validate().catch(err => {
  console.error('Validation error:', err);
  process.exit(1);
});
