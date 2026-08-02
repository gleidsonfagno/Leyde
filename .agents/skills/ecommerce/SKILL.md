---
name: ecommerce
description: Rules and business requirements for the online perfume and cosmetics store.
---

# E-commerce

This project is an online store for perfumes and cosmetics.

## Roles

### Customer

- Browse products
- Search products
- Filter by brand and category
- View product details
- Contact via WhatsApp

### Administrator

- Login
- Create products
- Update products
- Manage stock
- Manage prices
- Upload images
- Manage brands and categories

## Architecture

- Frontend: Next.js
- Backend: Java Spring Boot
- Communication: REST API

## Business Rules

- The frontend never accesses the database directly.
- All data comes from the REST API.
- Products always have:
  - Name
  - Brand
  - Category
  - Description
  - Price
  - Stock
  - Images
- The initial version is a product showcase.
- Online payment will be added in a future version.