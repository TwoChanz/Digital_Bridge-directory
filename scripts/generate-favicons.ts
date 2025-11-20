import sharp from "sharp";
import fs from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), "public");
const iconSvgPath = path.join(publicDir, "icon.svg");

interface IconConfig {
  size: number;
  outputName: string;
}

const iconConfigs: IconConfig[] = [
  { size: 192, outputName: "icon-192.png" },
  { size: 512, outputName: "icon-512.png" },
  { size: 180, outputName: "apple-touch-icon.png" },
  { size: 48, outputName: "favicon-48.png" },
  { size: 32, outputName: "favicon-32.png" },
  { size: 16, outputName: "favicon-16.png" },
];

async function generateFavicons() {
  console.log("🎨 Generating favicon PNG files from icon.svg...\n");

  // Check if icon.svg exists
  if (!fs.existsSync(iconSvgPath)) {
    console.error("❌ Error: icon.svg not found at", iconSvgPath);
    process.exit(1);
  }

  // Read SVG file
  const svgBuffer = fs.readFileSync(iconSvgPath);

  // Generate each PNG size
  for (const config of iconConfigs) {
    try {
      const outputPath = path.join(publicDir, config.outputName);

      await sharp(svgBuffer)
        .resize(config.size, config.size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${config.outputName} (${config.size}x${config.size})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${config.outputName}:`, error);
    }
  }

  // Generate multi-size favicon.ico
  // Note: Sharp doesn't support .ico format natively, so we'll create a 32x32 PNG
  // and note that it should be converted to .ico using online tools
  console.log("\n📝 Note: For favicon.ico, use an online converter like:");
  console.log("   https://realfavicongenerator.net/");
  console.log("   Or use favicon-32.png and rename to favicon.ico (browsers accept PNG format)");

  console.log("\n✨ Favicon generation complete!");
}

generateFavicons().catch((error) => {
  console.error("❌ Error generating favicons:", error);
  process.exit(1);
});
