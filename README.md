# Heritage x Culture Barbershop Website

A modern, premium barbershop website built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **Smooth Animations**: Framer Motion powered animations and micro-interactions
- **Appointment Booking**: Cal.com integration for real-time scheduling
- **Service Showcase**: Interactive service cards with pricing and descriptions
- **Barber Profiles**: Meet the team section with individual booking options
- **Image Gallery**: Instagram-style masonry grid with lightbox functionality
- **Contact & Location**: Google Maps integration and business information
- **SEO Optimized**: Meta tags, Open Graph, and structured data

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS with custom design system
- **Vite**: Fast development and optimized production builds
- **Environment Variables**: Configurable settings for easy deployment
- **Netlify Ready**: Pre-configured for seamless deployment

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Custom CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (body), Playfair Display (headings)
- **Deployment**: Netlify
- **Booking**: Cal.com integration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd heritage-culture-barbershop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your environment variables in the `.env` file.

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Cal.com Integration
VITE_CAL_COM_LINK=your_cal_com_embed_link_here

# Google Maps API
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Webhook URL for form submissions
VITE_WEBHOOK_URL=your_webhook_endpoint_here

# Business Information
VITE_BUSINESS_NAME=Heritage x Culture Barbershop
VITE_BUSINESS_PHONE=(669) 301-5226
VITE_BUSINESS_EMAIL=info@heritagexculture.com
VITE_BUSINESS_ADDRESS=2591 S Bascom Ave, Suite D, Campbell, CA 95008

# Social Media Links
VITE_INSTAGRAM_URL=https://instagram.com/heritagexculture
VITE_FACEBOOK_URL=https://facebook.com/heritagexculture
VITE_TWITTER_URL=https://twitter.com/heritagexculture
```

### Cal.com Integration

1. **Create a Cal.com account** at [cal.com](https://cal.com)
2. **Set up your services** as event types
3. **Configure availability** for each barber
4. **Get your embed link** from the Cal.com dashboard
5. **Add the link** to your `.env` file as `VITE_CAL_COM_LINK`

### Google Maps Setup

1. **Get a Google Maps API key** from the [Google Cloud Console](https://console.cloud.google.com)
2. **Enable the Maps JavaScript API**
3. **Add the API key** to your `.env` file as `VITE_GOOGLE_MAPS_API_KEY`

## 🚀 Deployment

### Netlify Deployment

1. **Push your code** to a Git repository (GitHub, GitLab, or Bitbucket)
2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Set environment variables** in the Netlify dashboard
5. **Deploy**: Netlify will automatically build and deploy your site

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the built files
# Upload these files to your hosting provider
```

## 📱 Features Overview

### Hero Section
- Full-screen background with parallax effect
- Animated gorilla logo with brand identity
- Real-time business hours indicator
- Call-to-action buttons for booking and calling

### Services Section
- Interactive service cards with hover effects
- Detailed pricing and duration information
- Popular service indicators
- Direct booking links

### Barbers Section
- Professional barber profiles with photos
- Specialties and experience information
- Individual booking buttons
- Star ratings display

### Booking Section
- Comprehensive booking form
- Service and barber selection
- Date and time picker
- Customer information collection
- Cal.com integration placeholder

### Gallery Section
- Masonry grid layout with responsive images
- Lightbox functionality for full-size viewing
- Service type overlays on hover
- Instagram integration ready

### Contact Section
- Google Maps integration
- Business hours display with current day highlighting
- Contact information and quick action buttons
- WhatsApp and email links

## 🎨 Design System

### Colors
- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: Gold (#FFD700)
- **Supporting**: Gray shades for text and backgrounds

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Weights**: 300, 400, 500, 600, 700

### Spacing
- **System**: 8px base unit (0.5rem, 1rem, 1.5rem, etc.)
- **Breakpoints**: Mobile-first responsive design

## 🔍 SEO & Performance

### SEO Features
- Semantic HTML structure
- Meta tags and Open Graph data
- Structured data for local business
- Sitemap ready structure

### Performance Optimizations
- Lazy loading for images
- Optimized bundle sizes
- Fast loading with Vite
- Responsive images with proper sizing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for Heritage x Culture Barbershop.

## 📞 Support

For support with this website, contact:
- **Phone**: (669) 301-5226
- **Email**: info@heritagexculture.com
- **Address**: 2591 S Bascom Ave, Suite D, Campbell, CA 95008

---

Built with ❤️ for Heritage x Culture Barbershop