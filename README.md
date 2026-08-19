# Nourish Together

NOUR IVY

AI-Powered Surplus Food Redistribution Platform

Product Vision

Nour Ivy is an AI-powered platform that helps prevent safe surplus food from going to waste by connecting organizations and businesses that have excess food with NGOs, community organizations, shelters, and people who can distribute it to communities in need.

The platform must NOT be limited to restaurants.

Food can come from:

Restaurants

Hotels

Cafés

Bakeries

Caterers

Events and wedding functions

Supermarkets and grocery stores

Food manufacturers

Corporate cafeterias

Other verified food providers

The goal is simple:

"When good food is left over, Nour Ivy helps it reach someone who needs it instead of becoming waste."

1. CORE PROBLEM

Every day, large amounts of safe, edible food become surplus.

At the same time, NGOs and community organizations struggle to find reliable sources of food for people who need meals.

The current process is often manual, fragmented, and slow.

Nour Ivy creates one digital platform where surplus food can be listed, intelligently matched, collected, and distributed.

2. TARGET USERS

Food Providers

Businesses and organizations with safe surplus food.

Examples:

Restaurant owner

Hotel manager

Bakery owner

Caterer

Event organizer

Supermarket manager

Corporate cafeteria manager

NGOs / Community Organizations

Organizations that can collect and distribute surplus food.

Volunteers / Delivery Partners

People who can help transport food from providers to NGOs.

Admin

Platform administrator who verifies users, monitors donations, manages reports, and handles safety issues.

3. MAIN USER FLOW

Food Provider:

Register → Verify account → Create surplus-food listing → Enter quantity, food type, preparation time, expiry/consume-by time, pickup location → Submit listing.

Nour Ivy AI:

Analyze listing → Find suitable nearby verified NGOs → Prioritize based on distance, capacity, urgency, food requirements and availability → Recommend best match.

NGO:

Receive match → Accept donation → Arrange pickup → Collect food → Confirm receipt → Distribute food.

Provider:

See donation status → Receive confirmation → Track impact.

4. AI MATCHING SYSTEM

The platform should have an AI-powered matching system.

The AI should consider:

Distance between provider and NGO

Quantity of food

Type of food

Food urgency / remaining safe consumption time

NGO capacity

NGO requirements

Pickup availability

Previous reliability

Priority level

Estimated number of people who can be served

Example:

A bakery has 50 surplus food items that should be distributed soon.

The AI finds nearby verified NGOs that:

Need food

Have capacity

Can collect it quickly

The system recommends the most suitable NGO.

Display a simple Match Score, such as:

92% Match

Also explain the reason:

"Recommended because this NGO is 2.4 km away, currently has capacity for 50 meals, and can arrange pickup within 30 minutes."

5. DASHBOARD

Create a modern dashboard for each user type.

Food Provider Dashboard

Show:

Active Donations

Donations Completed

Food Saved

People Served

Current Listings

AI Recommended NGO

Donation history

NGO Dashboard

Show:

Available Food Nearby

AI Matches

Accepted Donations

Pending Pickups

Completed Distributions

People Served

Admin Dashboard

Show:

Total Food Providers

Total NGOs

Active Donations

Completed Donations

Food Saved

Estimated People Served

Platform activity

Verification requests

6. CREATE DONATION

Create an easy donation form.

Fields:

Food name

Food category

Quantity

Approximate servings

Preparation date/time

Best consumed by / expiry time

Pickup location

Pickup time window

Food condition

Special notes

Optional image

Food categories can include:

Cooked meals

Bakery

Fruits

Vegetables

Packaged food

Dairy

Other

Add a clear warning:

"Only safe and legally distributable food should be donated."

7. NGO MATCHING SCREEN

Create a screen showing recommended NGOs.

Each NGO card should show:

NGO name

Distance

Match percentage

Capacity

Required food type

Pickup availability

Verification status

Accept Match button

Example:

"Hope Foundation"

92% Match

2.4 km away

Capacity: 60 meals

Pickup: Available now

[Accept Donation]

8. DONATION TRACKING

Each donation should have a simple status timeline:

Listed
↓
AI Matched
↓
Accepted
↓
Pickup Scheduled
↓
Collected
↓
Distributed
↓
Completed

Use clear visual indicators so the user immediately understands the status.

9. IMPACT TRACKING

Nour Ivy should show measurable impact.

Examples:

🍱 Meals redirected from waste
👥 People served
🏢 Active food providers
🤝 Partner NGOs
🚚 Successful pickups
♻️ Estimated food waste reduced

Create an attractive impact section using statistics and simple charts.

10. LANDING PAGE

Create a professional, modern landing page.

Hero headline:

"Turning Surplus Food Into Shared Nourishment."

Supporting text:

"Nour Ivy connects surplus food from businesses and organizations with verified NGOs and communities that need it — helping good food reach people instead of becoming waste."

Primary CTA:

"Donate Surplus Food"

Secondary CTA:

"Find Food Support"

Other sections:

How It Works

Why Nour Ivy

AI-Powered Matching

Who Can Donate

Impact

For NGOs

For Volunteers

Call to Action

11. DESIGN / UI

The design should feel:

Human

Trustworthy

Warm

Modern

Clean

Social-impact focused

Professional enough for a hackathon presentation

Avoid making the website look like a generic AI/technology dashboard.

Do NOT make it overly futuristic or filled with neon colors.

Use a natural food/community-inspired visual identity.

Use clean cards, rounded corners, subtle shadows, clear typography, icons and meaningful illustrations.

Make the interface responsive for desktop and mobile.

12. NAVIGATION

Navbar:

Nour Ivy logo

Home
How It Works
For Food Providers
For NGOs
Impact
About

Buttons:

Login
Get Started

After login, show the appropriate dashboard based on user role.

13. AUTHENTICATION

Create role-based authentication for:

Food Provider

NGO

Volunteer

Admin

Users should only see features relevant to their role.

For the prototype, use mock authentication/data if a real authentication backend is not yet available.

Structure the project so real authentication can be added later.

14. DATA MODEL

Create appropriate data structures for:

Users
Food Providers
NGOs
Food Donations
Matches
Pickups
Distribution Records
Impact Statistics

Each donation should have:

id
provider
food name
category
quantity
servings
location
created time
consume-by time
status
matched NGO
pickup status

15. DEMO DATA

Populate the application with realistic demo data so the dashboard does not look empty.

Example food providers:

Green Leaf Café

Sunrise Bakery

Urban Feast Caterers

FreshMart Supermarket

City Harvest Hotel

Example NGOs:

Hope Foundation

Helping Hands Community

Seva Meals

Community Care Centre

These are fictional demo organizations.

16. IMPORTANT PRODUCT PRINCIPLE

Nour Ivy is NOT simply a food donation listing website.

The key differentiator is:

AI-powered intelligent matching between surplus food and organizations that can distribute it.

The system should reduce:

Food waste

Time spent searching for recipients

Manual coordination

Unused surplus food

And improve:

Speed

Matching accuracy

Transparency

Food redistribution

Community impact

17. MVP PRIORITY

Build the working MVP first.

Priority order:

Landing page

Authentication / role selection

Food Provider dashboard

Create donation

AI matching interface

NGO dashboard

Accept donation

Donation tracking

Impact dashboard

Admin dashboard

Do not overcomplicate the first version.

Focus on making the complete provider → AI match → NGO → pickup → completion flow work smoothly.

18. FUTURE FEATURES

Keep the architecture ready for future features such as:

AI food-safety assistance

Smart demand prediction

Route optimization

Volunteer delivery matching

Real-time notifications

WhatsApp/SMS notifications

Multilingual support

Food waste analytics

NGO verification

Provider reliability scoring

Geographic heatmaps

Carbon/waste impact estimation

These do NOT need to be fully implemented in the first MVP.

19. FINAL REQUIREMENT

Build Nour Ivy as a real, functional full-stack web application rather than a static landing page.

Use reusable components and clean project structure.

Every major button should lead somewhere meaningful.

Use realistic demo data where a real backend is not yet implemented.

The application should feel like a complete hackathon MVP that can be demonstrated live from:

Food Provider → Create Surplus Food → AI Match → NGO Accepts → Pickup → Distribution → Impact.

The final product should communicate one clear message:

Good food should reach people, not landfills.

Nour Ivy exists to make that happen.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ca987879-e4de-4280-8e8f-2bff2118f881).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
