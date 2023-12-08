## Project Overview and guideline

[Top](#project-overview-and-guideline)  
[Functional Requirements](#functional-requirements)  
[!Important](#important-instructions)

## Project Setup

1. Clone github repository on your local machine

```
git clone <repo link>
```

2. Initially you won't see the `node_modules` folder. Next thing you need to do after cloning the repo,  
   Go to the `server` folder and run

```bash
npm install
```

It'll install all the dependencies and package needed inside the node_modules.
Do the same for `client` folder.

> Once done, you're ready to start working. 

## Important Instructions
1. Do not work on `main` branch.
2. Work only on your particular-dev branch or feature branch. i.e `zaber`, `ahnaf`, `ahad`, `apu`
3. Once a feature or portion is done (working), add `Pull Request` in github for review.

## Functional Requirements

### 1. User Registration
- Users can create an account by providing basic information such as name, email, contact number, and password.
- Users can log in to their accounts using their registered email addresses and password.
- Users can log out of the system after availing the service.

### 2. Product Search
- Users can search for products based on their preferences.
- The system will display a list of available products with prices and relevant information.
- Users can select a product and proceed to the buying process.

### 3. Managing Wishlist
- Users shall have a personal wishlist associated with their account.
- They can add, remove, and manage items in their wishlist at any time.
- Users can view their wishlist without completing a purchase.

### 4. Shopping Cart and Checkout
- Users can select a product and add it to their cart for purchase.
- The system will calculate the total fare based on the product and quantity selected.

### 5. Payment Processing
- Multiple payment methods available, including credit cards, debit cards, Bkash, and Nagad.
- Payment confirmation message generated through email.
- Provision of a printable ticket for the user.

### 6. Product Reviews and Ratings
- Users can leave reviews and ratings for purchased products.
- Display of average rating and review count for each product.
- Filtering product search results by rating and reading reviews.

### 7. Buying History
- Users can view their product buying history from their account dashboard.
- Display of past buying product details, including product information, buying dates, and payment details.

### 8. Customer Support
- Users can contact customer support through various channels, including email and contact numbers.
- Display of customer support contact information on the website.

### 9. Admin Panel
- Admin can add, modify, and delete products.
- Capability to ban customer accounts.
- Access to view and respond to user inquiries, providing 24/7 customer support.

[Top](#project-overview-and-guideline)