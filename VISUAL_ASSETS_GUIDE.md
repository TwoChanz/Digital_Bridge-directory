# Visual Assets Guide for Digital Blueprint

## ✅ Completed Assets

### 1. Brand Logo (`/public/logo.svg`)
- Full horizontal logo with icon and text
- Responsive SVG format
- Works in both light and dark modes (uses `currentColor`)
- Usage: Header, footer, marketing materials

### 2. Favicon Icon (`/public/icon.svg`)
- Square 48x48 icon optimized for favicons
- Blue gradient background with white blueprint/building design
- Usage: Browser tabs, bookmarks, mobile home screen

### 3. OpenGraph Image (`/public/og-image.svg`)
- 1200x630px social sharing image
- Blue gradient background with grid pattern
- Includes logo, tagline, and feature highlights
- Usage: Facebook, Twitter, LinkedIn previews

### 4. Category Hero Images
All 1200x300px banners with unique color schemes:
- `/public/category-hero-bim.svg` - Blue gradient, 3D building wireframe
- `/public/category-hero-drone.svg` - Green gradient, drone icon, topographic lines
- `/public/category-hero-ar-vr.svg` - Purple gradient, VR headset, hexagon pattern
- `/public/category-hero-estimating.svg` - Orange gradient, calculator icon
- `/public/category-hero-project-management.svg` - Red gradient, checklist/gantt chart
- `/public/category-hero-field-tools.svg` - Teal gradient, wrench/tools icon

---

## 📋 Tool Screenshots - Acquisition Guide

### Priority Tools (Top 15 by Traffic)

1. **Autodesk Revit** (15,420 views)
   - Source: https://www.autodesk.com/products/revit/overview
   - Screenshot: Main interface with 3D view and properties panel
   - Size: 1200x800px minimum

2. **SketchUp** (18,500 views)
   - Source: https://www.sketchup.com/plans-and-pricing/sketchup-free
   - Screenshot: 3D modeling interface
   - Size: 1200x800px minimum

3. **Procore** (22,000 views)
   - Source: https://www.procore.com/demo (request demo screenshots)
   - Screenshot: Project dashboard
   - Size: 1200x800px minimum

4. **Bluebeam Revu** (19,400 views)
   - Source: https://www.bluebeam.com/solutions/revu/
   - Screenshot: PDF markup interface
   - Size: 1200x800px minimum

5. **Autodesk Construction Cloud** (16,800 views)
   - Source: https://construction.autodesk.com/
   - Screenshot: Cloud dashboard with models
   - Size: 1200x800px minimum

6. **Enscape** (15,600 views)
   - Source: https://enscape3d.com/
   - Screenshot: Real-time rendering view
   - Size: 1200x800px minimum

7. **Buildertrend** (14,200 views)
   - Source: https://buildertrend.com/features/
   - Screenshot: Project management dashboard
   - Size: 1200x800px minimum

8. **Raken** (14,800 views)
   - Source: https://www.rakenapp.com/features/
   - Screenshot: Daily report mobile view
   - Size: 1200x800px minimum

9. **DroneDeploy** (13,200 views)
   - Source: https://www.dronedeploy.com/product/
   - Screenshot: Aerial map with annotations
   - Size: 1200x800px minimum

10. **Twinmotion** (12,800 views)
    - Source: https://www.twinmotion.com/
    - Screenshot: Real-time visualization
    - Size: 1200x800px minimum

11. **PlanGrid** (12,400 views)
    - Source: https://www.plangrid.com/
    - Screenshot: Blueprint view on tablet
    - Size: 1200x800px minimum

12. **PlanSwift** (11,200 views)
    - Source: https://www.planswift.com/
    - Screenshot: Takeoff interface
    - Size: 1200x800px minimum

13. **Fieldwire** (11,300 views)
    - Source: https://www.fieldwire.com/
    - Screenshot: Task management view
    - Size: 1200x800px minimum

14. **busybusy** (10,500 views)
    - Source: https://www.busybusy.com/
    - Screenshot: Time tracking GPS interface
    - Size: 1200x800px minimum

15. **Pix4D** (9,500 views)
    - Source: https://www.pix4d.com/
    - Screenshot: 3D map processing
    - Size: 1200x800px minimum

### Screenshot Acquisition Methods

#### Option 1: Official Marketing Assets
1. Visit the tool's official website
2. Navigate to "Press Kit" or "Media" section
3. Download high-resolution product screenshots
4. **Pros**: Professional, high-quality, legally clear
5. **Cons**: May not be available for all tools

#### Option 2: Request from Vendors
1. Email marketing@[company].com or press@[company].com
2. Template email:
   ```
   Subject: Screenshot Request for Digital Blueprint Directory

   Hi [Company] Team,

   We're featuring [Tool Name] in our AEC technology directory at
   digitalblueprint.com. We'd love to include a high-quality screenshot
   of your interface to help users understand your product.

   Could you provide:
   - 1-2 product screenshots (1200x800px minimum)
   - Permission to use them in our directory

   We'll credit [Company] and link directly to your website.

   Thank you!
   ```
3. **Pros**: High quality, permission granted, relationship building
4. **Cons**: Takes time, not all will respond

#### Option 3: Capture from Free Trials/Demos
1. Sign up for free trial or demo
2. Use high-resolution display (1920x1080 minimum)
3. Capture clean interface screenshots (no personal data)
4. Tools: Snagit, Greenshot, or built-in screenshot tools
5. **Pros**: Authentic, current interface
6. **Cons**: Time-intensive, may have watermarks

#### Option 4: Use Placeholder Services (Temporary)
1. Use https://placehold.co/1200x800/3b82f6/ffffff?text=[Tool+Name]
2. Replace with real screenshots over time
3. **Pros**: Quick, consistent sizing
4. **Cons**: Not professional, temporary only

### Screenshot Best Practices

✅ **DO:**
- Use high resolution (minimum 1200x800px, 1920x1080px ideal)
- Show clean, uncluttered interface
- Capture key features/unique selling points
- Use light mode (better visibility in most contexts)
- Save as WebP or optimized PNG (under 200KB)
- Include subtle shadow/border for depth

❌ **DON'T:**
- Include personal or client data
- Use blurry or pixelated images
- Show outdated interface versions
- Include watermarks (unless from vendor)
- Exceed 500KB file size (impacts page load)

### Implementation in Code

Once screenshots are acquired, add to `/public/screenshots/`:
```
/public/screenshots/
  revit-interface.webp
  sketchup-modeling.webp
  procore-dashboard.webp
  etc...
```

Update tool data in `lib/data.ts`:
```typescript
{
  id: "revit",
  name: "Autodesk Revit",
  // ... other fields
  screenshots: [
    "/screenshots/revit-interface.webp",
    "/screenshots/revit-3d-view.webp",
  ]
}
```

---

## 🎨 Image Optimization

### Convert SVG to PNG (For favicons)
Use an online converter or command-line tool:

```bash
# Using ImageMagick (if installed)
convert -density 300 -background transparent public/icon.svg -resize 192x192 public/icon-192.png
convert -density 300 -background transparent public/icon.svg -resize 512x512 public/icon-512.png

# Or use online tools:
- https://cloudconvert.com/svg-to-png
- https://svgtopng.com/
```

### Favicon Set Needed
Create these PNG variants from `icon.svg`:
- `favicon.ico` (16x16, 32x32, 48x48 multi-size)
- `icon-192.png` (192x192 for Android)
- `icon-512.png` (512x512 for high-res devices)
- `apple-touch-icon.png` (180x180 for iOS)

### OpenGraph Image
Convert `og-image.svg` to PNG (1200x630):
```bash
convert -density 300 -background transparent public/og-image.svg public/og-image.png
```

---

## 📝 Next Steps

### Immediate (This Week)
1. ✅ All SVG assets created
2. ✅ Convert SVGs to PNG for favicons (icon-192.png, icon-512.png, apple-touch-icon.png, favicon.ico)
3. ✅ Update HTML `<head>` with new favicon links
4. ✅ Add OpenGraph meta tags with new og-image.png
5. ✅ Replace header/footer with new brand logo
6. ✅ Add category hero images to all category pages
7. ✅ Create site.webmanifest for PWA support
8. ⏳ Contact top 5 vendors for screenshot permissions

### Short-term (Next 2 Weeks)
6. ⏳ Acquire screenshots for top 15 tools
7. ⏳ Add screenshots to tool detail pages
8. ⏳ Create screenshot carousel component
9. ⏳ Optimize all images for web (WebP format)

### Medium-term (Next Month)
10. ⏳ Complete screenshots for all 35 tools
11. ⏳ Add comparison screenshots for similar tools
12. ⏳ Create video demos/GIFs for key features
13. ⏳ Build screenshot lightbox/gallery component

---

## 🔗 Useful Resources

- **Free Image Optimization**: https://squoosh.app/
- **SVG to PNG Converter**: https://cloudconvert.com/svg-to-png
- **Favicon Generator**: https://realfavicongenerator.net/
- **Image Placeholder**: https://placehold.co/
- **Screenshot Tool (Windows)**: Greenshot (free)
- **Screenshot Tool (Mac)**: CleanShot X or built-in Cmd+Shift+4
- **WebP Converter**: https://developers.google.com/speed/webp/

---

**Last Updated**: 2025-11-07
**Status**: Phase 4 Visual Asset Integration - 100% Complete ✅

## 🎉 Phase 4 Summary

All visual assets have been successfully created and integrated:
- ✅ Brand logo (logo.svg) integrated into header and footer
- ✅ Favicon system complete with all PNG sizes and favicon.ico
- ✅ OpenGraph image (og-image.svg) for social sharing
- ✅ Category hero images (6 unique banners) added to all category pages
- ✅ PWA manifest (site.webmanifest) configured with proper icons
- ✅ Complete metadata and SEO tags in layout.tsx

**Next Phase**: Screenshot acquisition and integration for top 15 tools
