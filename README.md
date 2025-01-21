# Expense Tracker App

A modern, feature-rich expense tracking application built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

- **User Authentication**: Secure login and registration with Clerk
- **Expense Tracking**: Easy-to-use interface for managing daily expenses
- **Real-time Analytics**: Visual representation of spending patterns
- **Dark/Light Mode**: Customizable theme support
- **Responsive Design**: Works seamlessly across all devices
- **Interactive Charts**: Powered by Recharts for data visualization

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Clerk
- **Charts**: Recharts
- **Icons**: Lucide Icons
- **Animations**: Framer Motion

## 📦 Project Structure

```
expense-tracker/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (pages)/           # Main application pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── contexts/         # React contexts
├── lib/                  # Utility functions
├── public/              # Static assets
└── types/               # TypeScript types
```

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/amardeeplakshkar/expenseapp.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 🔑 Environment Variables

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk authentication publishable key
- `CLERK_SECRET_KEY`: Clerk authentication secret key

## 📱 Core Features

### Expense Tracking
- Add, edit, and delete expenses
- Categorize expenses
- Add notes and timestamps
- Currency support

### Analytics
- Daily/Monthly/Yearly spending charts
- Category-wise expense breakdown
- Spending trends visualization
- Interactive data exploration

### User Interface
- Clean and modern design
- Responsive layout
- Dark/Light theme support
- Smooth animations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Amardeep Lakshkar - Initial work

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Clerk](https://clerk.dev/)
- [Recharts](https://recharts.org/)