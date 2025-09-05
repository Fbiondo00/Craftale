const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Function to create actual image files using canvas
function createImagePlaceholder(width, height, title, subtitle, color1, color2, filename) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  
  // Fill background with gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add subtle overlay pattern
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < width; i += 60) {
    for (let j = 0; j < height; j += 60) {
      ctx.fillRect(i, j, 30, 30);
    }
  }
  ctx.globalAlpha = 1;
  
  // Set text properties for title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Add text shadow for better readability
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  // Draw title
  ctx.fillText(title, width / 2, height / 2 - 20);
  
  // Set text properties for subtitle
  ctx.font = '20px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText(subtitle, width / 2, height / 2 + 20);
  
  // Add small brand indicator
  ctx.font = '14px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('Web44 Agency', width / 2, height - 30);
  
  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  // Return buffer based on file extension
  if (filename.endsWith('.png')) {
    return canvas.toBuffer('image/png');
  } else {
    return canvas.toBuffer('image/jpeg', { quality: 0.9 });
  }
}

// Define placeholder images needed
const placeholders = [
  { name: 'case-study-techstore.jpg', title: 'TechStore Pro', subtitle: 'E-commerce Revolution', colors: ['#4f46e5', '#7c3aed'] },
  { name: 'case-study-restaurant.jpg', title: 'Bella Vista', subtitle: 'Restaurant Success', colors: ['#059669', '#0d9488'] },
  { name: 'case-study-saas.jpg', title: 'CloudSync', subtitle: 'SaaS Landing Magic', colors: ['#dc2626', '#ea580c'] },
  { name: 'portfolio-fintech.jpg', title: 'FinTech Solutions', subtitle: 'Banking Platform', colors: ['#1d4ed8', '#3730a3'] },
  { name: 'portfolio-healthcare.jpg', title: 'HealthCare Plus', subtitle: 'Medical Website', colors: ['#be185d', '#a21caf'] },
  { name: 'spotlight-edutech.jpg', title: 'EduTech Academy', subtitle: 'Client Spotlight', colors: ['#b45309', '#d97706'] },
  { name: 'resource-performance.jpg', title: 'Performance Guide', subtitle: 'Optimization Tips', colors: ['#374151', '#4b5563'] },
  { name: 'resource-trends-2024.jpg', title: 'Design Trends 2024', subtitle: 'What\'s Hot', colors: ['#7c2d12', '#a16207'] },
  { name: 'process-development.jpg', title: 'Our Process', subtitle: '5-Stage Development', colors: ['#0f766e', '#0d9488'] }
];

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate each placeholder
placeholders.forEach(placeholder => {
  try {
    const imageBuffer = createImagePlaceholder(
      800, 
      600, 
      placeholder.title, 
      placeholder.subtitle, 
      placeholder.colors[0], 
      placeholder.colors[1],
      placeholder.name
    );
    
    const filePath = path.join(imagesDir, placeholder.name);
    fs.writeFileSync(filePath, imageBuffer);
    console.log(`✅ Created ${placeholder.name}`);
  } catch (error) {
    console.error(`❌ Failed to create ${placeholder.name}:`, error.message);
  }
});

console.log('🎉 All placeholder images created successfully!'); 