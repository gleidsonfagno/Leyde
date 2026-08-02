# PROJECT.md

# Leyde - Online Perfume Store

## Overview

Leyde is an online showcase platform for perfumes and cosmetics.

The goal is to provide a modern and elegant shopping experience where customers can browse available products while allowing the administrator to manage inventory through a private administration panel.

This is not a marketplace.

It is a single-store application.

---

# Project Goals

Build a professional web platform that allows:

- Product showcase
- Product search
- Product filtering
- Product details
- Promotion campaigns
- WhatsApp contact
- Inventory management
- Product management
- Brand management
- Category management

The first version focuses on becoming a digital showcase.

Online payments will be implemented in future versions.

---

# Architecture

The application is divided into two independent modules.

## Frontend

Technology:

- Next.js
- React
- TypeScript
- Tailwind CSS

Responsibilities:

- Display products
- Display promotions
- Product search
- Product filtering
- Product details
- Responsive interface
- Consume REST API only

The frontend never communicates directly with the database.

---

## Backend

Technology:

- Java 21
- Spring Boot

Responsibilities:

- Authentication
- Product CRUD
- Category CRUD
- Brand CRUD
- Inventory management
- Image upload
- Promotion management
- REST API

---

# Communication

Communication between frontend and backend must happen exclusively through REST APIs.

Never couple frontend directly to database structures.

---

# User Roles

## Customer

Customers can:

- Browse products
- Search products
- Filter by category
- Filter by brand
- View product details
- Contact through WhatsApp

Customers cannot modify system data.

---

## Administrator

Administrators can:

- Login
- Create products
- Update products
- Delete products
- Manage stock
- Manage prices
- Upload product images
- Manage brands
- Manage categories
- Manage promotions

---

# Product Model

Every product must contain:

- Name
- Brand
- Category
- Description
- Price
- Stock Quantity
- Images
- Status
- Created Date
- Updated Date

---

# Design

The entire frontend must follow the Apple Design System provided by Open Design.

The Design System is mandatory.

Do not create components outside the Design System unless explicitly requested.

---

# Code Quality

Always prioritize:

- Clean Architecture
- SOLID
- Reusable Components
- Separation of Responsibilities
- Readability
- Maintainability
- Scalability

Avoid:

- Code duplication
- Tight coupling
- Large components
- Large classes
- Business logic inside UI

---

# Project Structure

The project is organized as:

Frontend

- Next.js

Backend

- Spring Boot

Both modules evolve independently and communicate through REST APIs.

---

# AI Instructions

Before implementing any feature:

1. Read the available project skills.
2. Understand the business context.
3. Follow the Apple Design System.
4. Keep components reusable.
5. Respect the existing architecture.
6. Avoid unnecessary complexity.
7. Prefer simple and scalable solutions.

Every implementation should improve the project without breaking existing standards.