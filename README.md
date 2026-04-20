# 34 On Saturn

Phase 1 website and booking-system foundation for **34 On Saturn**.

## Included

- Public website pages: Home, About, Stay, Dine, Events, Gallery, Contact, Policies
- Accommodation booking workflow with overlap-based room availability checks
- Dining reservation workflow
- Event enquiry workflow with quote-ready references
- Payment tracking records for card or EFT selections
- Admin portal for managing bookings, reservations, event enquiries and payment statuses
- SQLite + Prisma data model for customers, rooms, bookings and payments
- Mobile-responsive Next.js frontend

## Tech stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS 4
- Prisma ORM
- SQLite for local development

## Local setup

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env`.
3. Install dependencies:
   - `npm install`
4. Generate Prisma client:
   - `npm run prisma:generate`
5. Create the local database:
   - `npm run prisma:migrate -- --name init`
6. Seed sample rooms:
   - `npm run prisma:seed`
7. Start the site:
   - `npm run dev`

## Important notes

- `ENABLE_CARD_AUTOCONFIRM=false` keeps card payments in a pending state until a live payment gateway is connected.
- To support real online card processing, connect a production-ready gateway such as Stripe or Peach Payments and replace the demo payment status behavior in the server actions.
- Admin authentication is not yet enforced. Add authentication before production deployment.
- HTTPS, daily backups and deployment hardening should be configured at hosting level.

## Data captured

- Customer name
- Email address
- Phone number
- Booking / reservation / event details
- Payment method and payment status

## Acceptance coverage

- Customers can submit bookings and reservations online
- Admin can manage bookings and payments through one dashboard
- Room availability logic blocks double-bookings for active accommodation records

## Suggested phase 2

- Automated email confirmations and reminders
- Quote approval workflow for events
- Deposit links and real payment gateway integration
- Admin authentication and audit trail
