import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const HERO_DIR = path.join(PUBLIC_DIR, 'images', 'hero');
const STORIES_DIR = path.join(PUBLIC_DIR, 'images', 'stories');
const FRAMES_DIR = path.join(PUBLIC_DIR, 'frames');

[HERO_DIR, STORIES_DIR, FRAMES_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const BASE_APP_DATA = 'C:/Users/vijit/.gemini/antigravity-ide/brain/492f22b1-0671-4cda-accf-0ebc9e89900c';

const userImages = [
  {
    src: `${BASE_APP_DATA}/.user_uploaded/media_1794943679728.jpg`,
    dest: path.join(STORIES_DIR, 'trading-laptop.webp'),
    cropTopWatermark: true,
  },
  {
    src: `${BASE_APP_DATA}/.user_uploaded/media_1794943679777.jpg`,
    dest: path.join(STORIES_DIR, 'conference.webp'),
    cropTopWatermark: true,
  },
  {
    src: `${BASE_APP_DATA}/.user_uploaded/media_1794943679833.jpg`,
    dest: path.join(STORIES_DIR, 'marine-drive.webp'),
    cropTopWatermark: true,
  },
  {
    src: `${BASE_APP_DATA}/.user_uploaded/media_1794943679859.jpg`,
    dest: path.join(STORIES_DIR, 'heritage-festival.webp'),
    cropTopWatermark: true,
  },
  {
    src: `${BASE_APP_DATA}/.user_uploaded/media_1794943679905.jpg`,
    dest: path.join(STORIES_DIR, 'system-architecture.webp'),
    cropTopWatermark: true,
  },
];

const generatedHeroImages = [
  {
    src: `${BASE_APP_DATA}/hero_state_working_1794943844624.jpg`,
    dest: path.join(HERO_DIR, 'hero-working.webp'),
  },
  {
    src: `${BASE_APP_DATA}/hero_state_left_1794943867970.jpg`,
    dest: path.join(HERO_DIR, 'hero-left.webp'),
  },
  {
    src: `${BASE_APP_DATA}/hero_state_right_1794943908419.jpg`,
    dest: path.join(HERO_DIR, 'hero-right.webp'),
  },
  {
    src: `${BASE_APP_DATA}/hero_state_greeting_1794943932500.jpg`,
    dest: path.join(HERO_DIR, 'hero-greeting.webp'),
  },
  {
    src: `${BASE_APP_DATA}/hero_state_pointing_1794943962406.jpg`,
    dest: path.join(HERO_DIR, 'hero-pointing.webp'),
  },
];

const generatedStoryImages = [
  {
    src: `${BASE_APP_DATA}/story_ukulele_1794943995649.jpg`,
    dest: path.join(STORIES_DIR, 'story-ukulele.webp'),
  },
  {
    src: `${BASE_APP_DATA}/story_coffee_1794944041718.jpg`,
    dest: path.join(STORIES_DIR, 'story-coffee.webp'),
  },
  {
    src: `${BASE_APP_DATA}/story_fitness_gyro_1794944087178.jpg`,
    dest: path.join(STORIES_DIR, 'story-fitness-gyro.webp'),
  },
  {
    src: `${BASE_APP_DATA}/story_car_care_1794944137256.jpg`,
    dest: path.join(STORIES_DIR, 'story-car-care.webp'),
  },
];

async function processImage(item) {
  if (!fs.existsSync(item.src)) {
    console.warn(`File not found: ${item.src}`);
    return;
  }
  let pipeline = sharp(item.src);
  const metadata = await pipeline.metadata();

  if (item.cropTopWatermark && metadata.height && metadata.width) {
    const topOffset = Math.round(metadata.height * 0.092);
    const newHeight = metadata.height - topOffset;
    pipeline = pipeline.extract({
      left: 0,
      top: topOffset,
      width: metadata.width,
      height: newHeight,
    });
  }

  await pipeline
    .resize({ width: 1080, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(item.dest);

  console.log(`Saved: ${item.dest}`);
}

async function generateFrameSequence() {
  console.log('Generating frame sequence (frame_001.webp - frame_090.webp)...');
  const workingSrc = path.join(HERO_DIR, 'hero-working.webp');
  const leftSrc = path.join(HERO_DIR, 'hero-left.webp');
  const rightSrc = path.join(HERO_DIR, 'hero-right.webp');
  const greetingSrc = path.join(HERO_DIR, 'hero-greeting.webp');
  const pointingSrc = path.join(HERO_DIR, 'hero-pointing.webp');

  const workingBuf = await sharp(workingSrc).resize(720).toBuffer();
  const leftBuf = await sharp(leftSrc).resize(720).toBuffer();
  const rightBuf = await sharp(rightSrc).resize(720).toBuffer();
  const greetingBuf = await sharp(greetingSrc).resize(720).toBuffer();
  const pointingBuf = await sharp(pointingSrc).resize(720).toBuffer();

  for (let i = 1; i <= 90; i++) {
    const frameNum = String(i).padStart(3, '0');
    const dest = path.join(FRAMES_DIR, `frame_${frameNum}.webp`);

    let targetBuf = workingBuf;
    if (i <= 20) {
      targetBuf = workingBuf;
    } else if (i <= 40) {
      targetBuf = i > 30 ? leftBuf : workingBuf;
    } else if (i <= 55) {
      targetBuf = greetingBuf;
    } else if (i <= 65) {
      targetBuf = pointingBuf;
    } else if (i <= 85) {
      targetBuf = rightBuf;
    } else {
      targetBuf = workingBuf;
    }

    await sharp(targetBuf).webp({ quality: 82 }).toFile(dest);
  }
  console.log('Generated 90 frames successfully.');
}

async function run() {
  console.log('Processing user images (cropping watermark)...');
  for (const item of userImages) {
    await processImage(item);
  }

  console.log('Processing hero states...');
  for (const item of generatedHeroImages) {
    await processImage(item);
  }

  console.log('Processing story images...');
  for (const item of generatedStoryImages) {
    await processImage(item);
  }

  await generateFrameSequence();
  console.log('All image processing complete!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
