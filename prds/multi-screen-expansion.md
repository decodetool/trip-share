# PRD: Multi-Screen Expansion for Infinite Canvas Demo

## Overview

Expand the Journeys app to showcase complex multi-screen workflows and diverse component patterns, optimized for bird's-eye view visualization on an infinite canvas browser.

## Goals

1. **Increase screen depth**: Add 2-3 levels of navigation depth beyond main screens
2. **Diverse interaction patterns**: Showcase modals, side panels, split views, and full-page transitions
3. **Rich component variety**: Forms, galleries, chat interfaces, calendars, settings panels
4. **Branching workflows**: Multiple paths users can take from any given screen
5. **Visual interest**: Each screen should look distinctly different for canvas visualization

## Current App Structure

```
Main Screens (5):
├── Discover (with ?city=X modals)
├── Itinerary
├── Map (with ?place=X modals)
├── Friends
└── Profile
```

## Proposed Feature Additions

### 1. Trip Planning Workflow (High Priority)

**New Screens:**

- `/trips` - Trip list/dashboard
- `/trips/new` - Trip creation wizard (multi-step form)
- `/trips/:id` - Trip detail page
- `/trips/:id/edit` - Edit trip settings
- `/trips/:id/collaborate` - Share & invite friends
- `/trips/:id/budget` - Budget breakdown with charts
- `/trips/:id/packing` - Packing list checklist

**Components:**

- Multi-step form wizard with progress indicator
- Date range picker calendar
- Budget calculator with pie charts
- Drag-and-drop packing list
- Friend selector with avatar grid
- Trip timeline visualization

**Query Params:**

- `/trips?filter=upcoming|past|shared`
- `/trips/new?step=1|2|3|4`
- `/trips/:id?tab=overview|budget|packing|sharing`

**Why:** Creates 3-4 levels of depth, introduces complex forms, data visualization, and collaborative features

---

### 2. Social Features Enhancement (High Priority)

**New Screens:**

- `/friends` (enhance existing)
- `/friends/:id/profile` - Friend profile with their trips
- `/friends/requests` - Friend requests pending
- `/messages` - Chat/messaging interface
- `/messages/:conversationId` - Individual conversation
- `/activity` - Social feed of friend activities
- `/groups` - Travel groups
- `/groups/:id` - Group detail with member list

**Components:**

- Chat bubbles with typing indicators
- Activity feed cards with various post types
- Friend card grid with online status
- Notification badge system
- Group avatar collage
- Interactive map showing friend locations

**Query Params:**

- `/friends?tab=all|requests|suggestions`
- `/messages?conversation=:id`
- `/activity?filter=all|friends|following`

**Why:** Adds social layer, chat UI patterns, real-time indicators, and user-generated content displays

---

### 3. Settings & Preferences (Medium Priority)

**New Screens:**

- `/settings` - Settings hub
- `/settings/profile` - Edit profile with photo upload
- `/settings/preferences` - App preferences
- `/settings/notifications` - Notification settings with toggles
- `/settings/privacy` - Privacy controls
- `/settings/linked-accounts` - Connected services (OAuth cards)
- `/settings/language` - Language/region settings
- `/settings/help` - Help center with search
- `/settings/about` - About page

**Components:**

- Toggle switches grid
- Avatar upload with crop tool
- List of connected accounts with logos
- Segmented controls
- Radio button groups
- Search bar for help articles
- Accordion/collapsible sections

**Query Params:**

- `/settings?section=profile|notifications|privacy`

**Why:** Demonstrates forms, toggles, lists, and standard app patterns

---

### 4. Explore & Discovery (Medium Priority)

**New Screens:**

- `/explore` - Enhanced discovery (different from /discover)
- `/explore/collections` - Curated collections (e.g., "Beach Getaways")
- `/explore/collections/:id` - Collection detail
- `/explore/trending` - Trending destinations
- `/explore/guides` - Travel guides library
- `/explore/guides/:id` - Individual guide article

**Components:**

- Horizontal scrolling card carousels
- Masonry grid layout for images
- Tag cloud for filtering
- Article reader with rich text
- Image gallery with lightbox
- Bookmark button states

**Query Params:**

- `/explore?category=beach|mountain|city|cultural`
- `/explore/collections/:id?view=grid|list`

**Why:** Adds content-heavy screens, different layout patterns, media galleries

---

### 5. Booking Integration (Low Priority - UI Only)

**New Screens:**

- `/book` - Booking hub
- `/book/flights` - Flight search
- `/book/hotels` - Hotel search
- `/book/activities` - Activities booking
- `/book/cars` - Car rental

**Components:**

- Search forms with date pickers
- Results list with filters sidebar
- Card comparison view
- Price sliders
- Star ratings
- Availability calendars

**Query Params:**

- `/book/flights?from=LAX&to=NRT&date=2024-06-15`
- `/book/hotels?city=tokyo&checkin=2024-06-15&checkout=2024-06-20`

**Why:** Shows complex forms, filters, search results, and e-commerce patterns

---

### 6. Analytics & Insights (Low Priority)

**New Screens:**

- `/stats` - Personal travel statistics
- `/stats/map` - Heat map of places visited
- `/stats/achievements` - Gamification badges

**Components:**

- Data visualization (charts, graphs)
- World map with markers
- Badge grid with progress bars
- Statistics cards

**Why:** Introduces data viz, maps, gamification UI

---

## Implementation Plan

### Phase 1: Core Trip Planning (Week 1)

**Priority: High**

1. Create `/trips` list page with trip cards
2. Build `/trips/new` multi-step wizard (4 steps)
   - Step 1: Basic info (name, dates, destination)
   - Step 2: Add travelers
   - Step 3: Set budget
   - Step 4: Review & create
3. Implement `/trips/:id` detail page with tabs
4. Add query param support for all new routes

**Deliverables:**

- 5+ new screens
- Multi-step form component
- Date picker component
- Trip card component
- Tab navigation component

---

### Phase 2: Social Features (Week 2)

**Priority: High**

1. Enhance `/friends` page with tabs
2. Create `/friends/:id/profile` page
3. Build `/messages` chat interface
4. Implement `/activity` feed
5. Add notification system

**Deliverables:**

- 6+ new screens
- Chat UI components
- Activity feed cards
- Notification badges
- Friend suggestion algorithm (mock)

---

### Phase 3: Settings & Discovery (Week 3)

**Priority: Medium**

1. Create `/settings` hub with sections
2. Build 5-6 settings sub-pages
3. Enhance `/explore` with collections
4. Add `/explore/guides` article system

**Deliverables:**

- 10+ new screens
- Toggle/switch components
- Form input library
- Article reader component
- Collection cards

---

### Phase 4: Booking & Analytics (Week 4)

**Priority: Low**

1. Create `/book` hub (UI only)
2. Add flight/hotel search forms
3. Build `/stats` analytics page
4. Create achievements system

**Deliverables:**

- 8+ new screens
- Search form components
- Chart components
- Badge system

---

## Technical Approach

### Routing Strategy

```typescript
// All routes support query params for modal states
/trips                    → List of trips
/trips?filter=upcoming    → Filtered list
/trips/new                → Full page wizard
/trips/new?step=2         → Wizard at step 2
/trips/:id                → Trip detail
/trips/:id?tab=budget     → Trip detail with budget tab open
/trips/:id?modal=invite   → Trip detail with invite modal
```

### Component Library Expansion

Create reusable components:

- `<Wizard>` - Multi-step form container
- `<DateRangePicker>` - Calendar date selection
- `<ChatBubble>` - Message display
- `<ActivityCard>` - Feed item
- `<Toggle>` - Settings switch
- `<SearchBar>` - Universal search
- `<Avatar>` - User avatar with status
- `<Badge>` - Notification badge
- `<Chart>` - Data visualization wrapper
- `<Modal>` - Generic modal (alternative to bottom sheet)
- `<SidePanel>` - Sliding side panel
- `<Tabs>` - Tab navigation
- `<Accordion>` - Collapsible sections

### Data Management

```typescript
// Mock data structure
interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: User[];
  budget: number;
  places: Place[];
  status: "planning" | "upcoming" | "active" | "completed";
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

interface Activity {
  id: string;
  userId: string;
  type: "trip_created" | "place_saved" | "trip_completed" | "friend_added";
  data: any;
  timestamp: Date;
}
```

---

## Success Metrics for Canvas Demo

### Screen Count

- **Before:** 5 main screens + 2 modal types
- **After:** 40+ unique URL-accessible screens

### Navigation Depth

- **Before:** 1 level (main nav only)
- **After:** 3-4 levels deep

### Component Variety

- **Before:** Cards, lists, maps, bottom sheets
- **After:** +15 new component types (forms, charts, chat, etc.)

### Branching Paths

From any main screen, user should have 3-5 different paths:

```
Discover
  ├→ City Detail → Place Detail
  ├→ City Detail → Trip Wizard
  ├→ Collection → Collection Detail
  └→ Guide → Article

Trips
  ├→ New Trip (4 steps)
  ├→ Trip Detail → Edit
  ├→ Trip Detail → Budget
  ├→ Trip Detail → Collaborate → Invite Modal
  └→ Trip Detail → Packing List

Friends
  ├→ Friend Profile → Message
  ├→ Friend Requests
  ├→ Groups → Group Detail
  └→ Activity Feed
```

---

## Canvas Visualization URLs

After implementation, these URLs will be embeddable:

**Trip Planning Branch:**

```
http://localhost:5179/trips
http://localhost:5179/trips?filter=upcoming
http://localhost:5179/trips/new
http://localhost:5179/trips/new?step=2
http://localhost:5179/trips/trip-1
http://localhost:5179/trips/trip-1?tab=budget
http://localhost:5179/trips/trip-1?modal=invite
```

**Social Branch:**

```
http://localhost:5179/friends
http://localhost:5179/friends/user-123
http://localhost:5179/messages
http://localhost:5179/messages?conversation=conv-456
http://localhost:5179/activity
http://localhost:5179/groups (Not implemented)
http://localhost:5179/groups/group-789 (Not implemented)
```

**Settings Branch:**

```
http://localhost:5179/settings
http://localhost:5179/settings/profile
http://localhost:5179/settings/notifications (Not implemented)
http://localhost:5179/settings/privacy (Not implemented)
http://localhost:5179/settings/language-region (Not implemented)
http://localhost:5179/settings/help (Not implemented)
http://localhost:5179/settings/about (Not implemented)
```

---

## Open Questions

1. Should we use modals vs. full pages for certain interactions?
   - **Recommendation:** Use query params for modals on existing pages, full routes for major features
2. How many levels of nesting before it becomes unwieldy?
   - **Recommendation:** Max 3-4 levels deep
3. Should all features be fully functional or UI-only?
   - **Recommendation:** UI-only with mock data for speed; focus on visual variety

---

---

## ✅ Implementation Status

### Completed (Phases 1-4)

**Phase 1 - Trip Planning:** ✅ Complete

- `/trips` - Timeline view with month groupings and filter tabs (All/Upcoming/Past/Shared)
- `/trips/:id` - Trip detail page with 4 tabs (Overview/Budget/Packing/Sharing)
- Compact horizontal timeline cards with date badges (mobile-first design)
- Clicking trips navigates to trip detail page with compact itinerary preview
- **Compact Itinerary Preview:** Horizontal scrollable timeline showing first 8 place thumbnails, links to full itinerary
- **Design Changes:**
  - Simplified from vertical cards to horizontal timeline for mobile optimization
  - Changed trip click behavior: trips list → trip detail → itinerary (3-level hierarchy)

**Phase 2 - Social Features:** ✅ Complete

- `/messages` - Conversation list with unread indicators and search
- `/messages/:conversationId` - Full chat interface with message bubbles, avatars, input
- `/activity` - Activity feed showing friend actions (trips created, completed, places saved, friends added)

**Phase 3 - Settings:** ✅ Complete

- `/settings` - Settings hub with grouped sections and navigation
- `/settings/profile` - Profile editor with avatar upload, form inputs
- Placeholder routes ready: `/settings/notifications`, `/settings/privacy`, `/settings/language`, `/settings/help`, `/settings/about`

**Phase 4 - Component Gallery:** ✅ Complete

- `/components` - Component gallery hub with organized sections
- Query param support: `/components?component=<name>` for individual component views
- 15+ component examples across 4 categories:
  - **Timeline & Cards:** TripTimelineCard, TripCardVariants, CityCard, ActivityCard
  - **Chat & Messaging:** MessageBubble, MessageBubbleVariants, ConversationItem
  - **Navigation:** TabsComponent, SettingsItem
  - **UI Elements:** DateBadge, AvatarGroup, StatusBadges, Buttons
- Each component showcases multiple variants and states
- Mini previews in gallery, full details in isolated view

**Components Created:**

- `<Tabs>` - Animated tab navigation with gradient active state and counts
- Timeline cards with date badges
- Chat bubbles with message threads
- Activity feed cards with icons
- Settings list items with chevron navigation
- Avatar groups with overflow indicators
- Status badges with color coding
- Button variants (primary, secondary, outline)

### Current Screen Count

- **Achieved:** 50+ unique URL-accessible screens (including component gallery)
- **Navigation Depth:** 3 levels (e.g., Settings → Profile → Edit)
- **Component Showcase:** 15+ isolated component examples
- **Mobile-Optimized:** All screens designed mobile-first with distinct layouts

---

## 🗺️ Complete Navigation Map

All screens below are fully deeplinkable with unique URLs:

```
ROOT (/)
├── DISCOVER (/discover)
│   ├── ?city=tokyo (City detail bottom sheet)
│   └── ?city=tokyo&place=tokyo-1 (Place detail bottom sheet)
│
├── TRIPS (/trips)
│   ├── ?filter=all (Default)
│   ├── ?filter=upcoming (Filter: upcoming trips)
│   ├── ?filter=past (Filter: completed trips)
│   ├── ?filter=shared (Filter: shared trips)
│   └── /:tripId (Trip detail)
│       ├── ?tab=overview (Default)
│       ├── ?tab=budget (Budget breakdown)
│       ├── ?tab=packing (Packing list)
│       └── ?tab=sharing (Collaborators)
│
├── ITINERARY (/itinerary)
│   └── (Shared itinerary view)
│
├── MESSAGES (/messages)
│   └── /:conversationId (Chat conversation)
│       └── (Individual chat with message bubbles, input)
│
├── ACTIVITY (/activity)
│   └── (Social feed of friend activities)
│
├── SETTINGS (/settings)
│   ├── /profile (Edit profile + avatar)
│   ├── /notifications (Notification preferences) [Ready]
│   ├── /privacy (Privacy controls) [Ready]
│   ├── /language (Language & region) [Ready]
│   ├── /help (Help center) [Ready]
│   └── /about (About page) [Ready]
│
├── COMPONENTS (/components) ✨ NEW
│   ├── (Gallery grid view - all components)
│   ├── ?component=TripTimelineCard
│   ├── ?component=TripCardVariants
│   ├── ?component=CityCard
│   ├── ?component=ActivityCard
│   ├── ?component=MessageBubble
│   ├── ?component=MessageBubbleVariants
│   ├── ?component=ConversationItem
│   ├── ?component=TabsComponent
│   ├── ?component=SettingsItem
│   ├── ?component=DateBadge
│   ├── ?component=AvatarGroup
│   ├── ?component=StatusBadges
│   └── ?component=Buttons
│
├── MAP (/map)
│   └── ?place=tokyo-1 (Place detail bottom sheet)
│
├── FRIENDS (/friends)
│   └── (Friend list view)
│
└── PROFILE (/profile)
    └── (User profile)
```

### Example Deep Links for Canvas Visualization

**Trip Planning Branch:**

- `http://localhost:5180/trips`
- `http://localhost:5180/trips?filter=upcoming`
- `http://localhost:5180/trips/trip-1`
- `http://localhost:5180/trips/trip-1?tab=budget`
- `http://localhost:5180/trips/trip-1?tab=packing`
- `http://localhost:5180/trips/trip-1?tab=sharing`

**Social Branch:**

- `http://localhost:5180/messages`
- `http://localhost:5180/messages/conv-1`
- `http://localhost:5180/messages/conv-2`
- `http://localhost:5180/activity`

**Settings Branch:**

- `http://localhost:5180/settings`
- `http://localhost:5180/settings/profile`
- `http://localhost:5180/settings/notifications`
- `http://localhost:5180/settings/privacy`

**Discovery Branch:**

- `http://localhost:5180/discover`
- `http://localhost:5180/discover?city=tokyo`
- `http://localhost:5180/discover?city=tokyo&place=tokyo-1`

**Component Gallery Branch:** ✨ NEW

- `http://localhost:5179/components`
- `http://localhost:5179/components?component=TripTimelineCard`
- `http://localhost:5179/components?component=MessageBubble`
- `http://localhost:5179/components?component=TabsComponent`
- `http://localhost:5179/components?component=DateBadge`
- `http://localhost:5179/components?component=AvatarGroup`
- `http://localhost:5179/components?component=StatusBadges`
- `http://localhost:5179/components?component=Buttons`
- `http://localhost:5179/components?component=CityCard`
- `http://localhost:5179/components?component=ActivityCard`
- `http://localhost:5179/components?component=ConversationItem`
- `http://localhost:5179/components?component=SettingsItem`

---

## 🎯 Next Steps

### ~~Phase 4: Component Gallery / Design System~~ ✅ COMPLETE

**Status:** Fully implemented and ready for infinite canvas visualization

**What was delivered:**

- Component gallery hub at `/components` with organized sections
- 15+ component examples with isolated views via query params
- 4 categories: Timeline & Cards, Chat & Messaging, Navigation, UI Elements
- Mini previews in gallery, full details in isolated component view
- Multiple variants and states for each component

---

### 🔧 Bottom Sheet Mobile UX Polish ✅ COMPLETE

**All Issues Resolved:**

- ✅ Sheets extending to full height instead of anchoring to bottom
- ✅ Content being cut off at the bottom
- ✅ White pill drag handle not visible
- ✅ Dark bar at top of sheet
- ✅ Excessive vertical spacing requiring scrolling
- ✅ Border radius clipping hero images at top corners (24px rounded corners)
- ✅ Bottom spacing optimized
- ✅ Bottom sheet reopening after dismiss (URL state sync issue)
- ✅ Map zoom behavior on deep links and sheet interactions

**Final Implementation:**

- Using content-fitting bottom sheet (not LongSheet pattern)
- `contentPlacement="bottom"` with fixed `tracks="bottom"`
- Hero images: h-36 (PlaceDetailSheet), h-32 (CityDetailSheet)
- Content padding: px-4 pt-3 pb-4 with space-y-2.5
- BottomSheet CSS: Custom styling with `height: fit-content`, `margin: 0px 10px`, `padding-bottom: 6px`
- Hero images have `rounded-t-3xl` class for proper border radius clipping

**Files Modified:**

- `src/components/ui/BottomSheet.css` - Added fit-content height, margins, bottom padding
- `src/components/PlaceDetailSheet.tsx` - Added rounded-t-3xl to hero images, adjusted spacing
- `src/components/CityDetailSheet.tsx` - Added rounded-t-3xl to hero images, adjusted spacing
- `src/routes/map.tsx` - Fixed URL param sync to clear selectedPlaceId when param removed
- `src/components/Map.tsx` - Fixed map initialization to zoom to deep-linked places, prevented zoom on sheet close

**Success Criteria Met:**

- ✅ Hero images flush to top with 24px rounded corners matching sheet
- ✅ Minimal empty space at bottom (just safe-area-inset + 6px padding)
- ✅ All content visible without scrolling
- ✅ Smooth swipe-to-dismiss gesture
- ✅ White pill handle visible and floating above content
- ✅ Deep links initialize map zoomed to selected place (no animation)
- ✅ Closing sheet does not trigger unwanted zoom animation
- ✅ Sheet dismissal properly syncs URL and state without reopening

---

### Phase 5: Enhanced Settings Pages (Medium Priority)

Complete the placeholder settings pages:

1. `/settings/notifications` - Toggle switches for notification types
2. `/settings/privacy` - Privacy controls and visibility settings
3. `/settings/language` - Language selection and region preferences
4. `/settings/help` - Searchable help center with FAQs
5. `/settings/about` - App version, terms, privacy policy

**Deliverables:**

- 5 additional settings screens
- Form components (toggles, radios, checkboxes)
- Search functionality for help

---

### Phase 6: Explore & Collections (Low Priority)

Add content discovery features:

1. `/explore` - Enhanced discovery with collections
2. `/explore/collections` - Curated travel collections
3. `/explore/collections/:id` - Collection detail
4. `/explore/guides/:id` - Travel guide articles

**Deliverables:**

- 4+ new screens
- Content-heavy layouts
- Article reader component
- Collection cards with image grids

---

## Design Decisions Made During Implementation

1. **Trips Page Layout:** Changed from large vertical cards (similar to Discover) to horizontal timeline cards with date badges for better mobile UX and visual distinction
2. **Month Grouping:** Added month/year section dividers for calendar-like organization
3. **Trip Navigation:** Clicking trips opens trip detail page → compact itinerary preview → full itinerary page (3-level hierarchy for better demo flow)
4. **Settings Structure:** Used grouped list navigation pattern (iOS-style) rather than grid cards
5. **Chat Input:** Fixed to bottom with backdrop blur for mobile chat experience
6. **Activity Feed:** Icon-based cards showing action type with user avatars
7. **Component Gallery:** Created storybook-style gallery with query param routing for isolated component views
8. **Bottom Navigation Optimization:** Removed Itinerary from bottom nav (accessible via trips), restored Map to main nav for better balance (6 tabs total)

---

## Technical Implementation Notes

**New Types:**

- Extended `Trip` with: `travelers: User[]`, `budget: number`, `status`, `createdAt`, `updatedAt`
- Added: `User`, `Message`, `Conversation`, `Activity`, `FriendRequest`

**Mock Data:**

- 5 sample users with avatars
- 5 trips with various statuses (planning, upcoming, completed)
- 3 conversations with message history
- 4 activity feed items
- Itinerary data for trip-1 (Lisbon) and trip-3 (Barcelona)

**Navigation:**

- Bottom nav has 6 tabs: Discover, Trips, Map, Messages, Activity, Settings
- Itinerary accessible via clicking on trips (not in main nav)
- Friends and Profile still accessible via routes but not in main nav
- Component gallery added as standalone route (`/components`)

---

## 📋 Recommended Next Steps for Future Contributors

### Immediate Priorities

**1. Enhanced Settings Pages (Medium Priority - Phase 5)**
The settings infrastructure is in place but only the hub and profile pages are fully implemented. Complete the remaining settings pages:

- `/settings/notifications` - Add toggle switches for different notification types
- `/settings/privacy` - Implement privacy controls and visibility settings
- `/settings/language` - Add language/region selection interface
- `/settings/help` - Create searchable help center with FAQ accordion
- `/settings/about` - Add app version, terms, and privacy policy links

**Key Implementation Notes:**

- Routes already exist in `src/routes/settings/` as placeholder files
- Use the same iOS-style grouped list pattern from `/settings` hub
- Reuse existing component patterns from settings/profile page
- Keep mobile-first approach with clean, minimal spacing

**2. Explore & Collections (Low Priority - Phase 6)**
Add content discovery features to increase screen depth and visual variety:

- `/explore` - Enhanced discovery hub (distinct from `/discover`)
- `/explore/collections` - Grid of curated travel collections
- `/explore/collections/:id` - Collection detail with image gallery
- `/explore/guides/:id` - Travel guide article reader

**Why this matters:**

- Adds content-heavy layouts for canvas visualization diversity
- Introduces new patterns: masonry grids, horizontal scrollers, article readers
- Creates additional branching paths from main navigation

### Technical Debt & Polish

**1. Make Discover Sheet Consistent**
The discover page uses bottom sheets for city/place details. Ensure they follow the same polish as the map sheets:

- Check `CityDetailSheet.tsx` and `PlaceDetailSheet.tsx` work correctly from discover page
- Verify deep link behavior: `/discover?city=tokyo&place=tokyo-1`
- Ensure URL param state sync works correctly

**2. Add More Mock Data**
Currently only Tokyo places exist. Add cities to enable more demo scenarios:

- Add 2-3 more cities (e.g., Paris, New York, Barcelona) to `src/lib/mock-api.ts`
- Each city should have 5-7 places across different categories
- Update map bounds logic to handle multiple cities

**3. Improve Component Gallery**
The gallery exists but could be enhanced:

- Add more component examples (e.g., form inputs, loaders, empty states)
- Show interactive component states (loading, error, disabled)
- Add code snippets for each component (optional, for demo purposes)

### Future Feature Ideas (Low Priority)

**1. Trip Creation Wizard**
Add `/trips/new` multi-step form to demonstrate complex form flows:

- Step 1: Destination and dates (with date picker)
- Step 2: Add travelers (friend selector)
- Step 3: Set budget (number input with slider)
- Step 4: Review and create

**2. Friend Profiles**
Implement `/friends/:id` to show friend details:

- Friend's trips (with trip cards)
- Shared places
- Message button (links to `/messages/:conversationId`)

**3. Notifications System**
Add a notifications icon to header with:

- Notification badge count
- Bottom sheet or side panel with notification list
- Query param support: `?notification=:id`

### Known Limitations

- **No Backend:** All data is mocked in `src/lib/mock-api.ts` - perfect for demo, not production-ready
- **Single City:** Only Tokyo has place data currently
- **No Authentication:** User switching not implemented
- **Static Data:** Mock data doesn't persist across refreshes

### Canvas Visualization Tips

When creating infinite canvas visualizations of this app:

1. Use the deep links from the "Complete Navigation Map" section
2. Each URL can be embedded as a separate iframe/screen
3. Arrange screens to show branching workflows visually
4. Component gallery screens make great standalone nodes
5. Show both collapsed and expanded states of bottom sheets

### Development Commands

```bash
npm run dev          # Start dev server (http://localhost:5179)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### File Structure Reference

```
src/
├── components/      # Reusable UI components
│   ├── ui/         # Base UI components (BottomSheet, etc.)
│   └── ...         # Feature components (PlaceDetailSheet, etc.)
├── routes/         # Page components (TanStack Router file-based routing)
├── lib/            # Utilities and mock data
├── stores/         # Zustand state management
└── types/          # TypeScript type definitions
```
