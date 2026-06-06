# Firestore Security Specification

This document defines the mathematical invariants, target security bounds, and test payloads ("The Dirty Dozen") for Accessra's administration Firestore database.

## 1. Data Invariants

- **Product Integrity**: A product must have positive values for `price` and non-negative `stock`. No anonymous users may edit products.
- **Order Security**: Orders cannot be altered post-completion. An order can only be read by the owner/customer or an administrative role.
- **User Identity Isolation**: Users cannot modify their own registration `role` or `status` parameters after creation to prevent privilege escalation.

## 2. The "Dirty Dozen" Malicious Exploitation Payloads

The following payloads represent illegal database access attempts which must be rejected with `PERMISSION_DENIED`:

1. Anonymous product creation.
2. Arbitrary product deletion by non-admins.
3. Injection of 1MB junk string as a product title.
4. Setting product stock to a negative number.
5. Reading someone else's order as a staff user without administrative privilege.
6. Mutating order `amount` to negative values.
7. Modifying order status from `Completed` to `Refunded` without proper auth.
8. Writing an order with a mismatched customer email.
9. Attempting to assign `role: "Super Admin"` during self-registration of a user profile.
10. Creating a user profile with an invalid ID format.
11. Reading arbitrary private users' metadata without logging in.
12. Attempting to modify other users' balance parameters directly.

## 3. Test Runner Design

A test environment using `@firebase/rules-unit-testing` or visual mockups confirms that these illegal operations are blocked. Each condition maps safely to our custom validation helpers.
