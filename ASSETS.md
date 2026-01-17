# Assets & Images Used

This document lists all the online sources for images, logos, and assets used in the project.

## Background Images

1. **Main Background** (Login & Chat)
   - Source: Unsplash
   - URL: `https://images.unsplash.com/photo-1526374965328-7f61d4a18d5e`
   - Usage: Background image for the main page
   - License: Unsplash License (Free to use)

2. **Chat Pattern Background**
   - Source: Unsplash
   - URL: `https://images.unsplash.com/photo-1557683316-973673baf926`
   - Usage: Subtle pattern in chat area
   - License: Unsplash License (Free to use)

## Avatar Generation

- **Service**: DiceBear API
- **URL Pattern**: `https://api.dicebear.com/7.x/avataaars/svg?seed={randomId}`
- **Usage**: Auto-generated user avatars
- **License**: Free for personal and commercial use
- **Alternative Services** (configured in next.config.js):
  - `ui-avatars.com` - Simple avatar generation
  - `i.pravatar.cc` - Random user avatars
  - `randomuser.me` - Random user data API

## Icons

- **Library**: Lucide React
- **Icons Used**:
  - `MessageCircle` - App logo/icon
  - `User` - User profile
  - `ArrowRight` - Login button
  - `LogOut` - Logout button
  - `Wifi` / `WifiOff` - Connection status
  - `Users` - User list
  - `Send` - Send message
  - `Smile` - Emoji button
  - `Check` / `CheckCheck` - Message read status
  - `Circle` - Online status indicator

## Image Configuration

All image domains are configured in `next.config.js`:
- `images.unsplash.com` - Unsplash images
- `ui-avatars.com` - Avatar generation
- `api.dicebear.com` - Avatar generation
- `i.pravatar.cc` - Random avatars
- `randomuser.me` - User data

## Notes

- All images are loaded dynamically from online sources
- No local image files are required
- Images are optimized by Next.js Image component
- All sources are free to use for commercial projects
- For production, consider caching images or using a CDN
