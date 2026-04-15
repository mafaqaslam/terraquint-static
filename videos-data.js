/**
 * videos-data.js - TerraQuint Video Library
 * 
 * HOW TO ADD A NEW VIDEO:
 * 
 * 1. Upload your video to YouTube
 * 2. Copy the YouTube Video ID from the URL
 *    Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *    Video ID = "dQw4w9WgXcQ"
 * 3. Add a new object to the videosData array below
 * 4. Save and upload the file
 * 
 * The page will automatically show the new video!
 */

// ============================================
// YOUTUBE CHANNEL URL
// ============================================
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@afaqaslammm';

// ============================================
// VIDEO DATA ARRAY (EMPTY - READY FOR YOUR VIDEOS)
// Add your videos here in chronological order (newest first recommended)
// ============================================
const videosData = [];

// ============================================
// CATEGORY REFERENCE (For consistent filtering)
// Use these exact category names when adding videos:
// ============================================
// 
// "RESERVOIR ENGINEERING"
// "PRODUCTION OPTIMIZATION"
// "EOR & CCS"
// "PRODUCTION FORECASTING"
// "FLOW ASSURANCE"
// "WELL TESTING"
// "EQUIPMENT DESIGN"
// "CASE STUDY"
// "WEBINAR"
// "TUTORIAL"
// "INDUSTRY INSIGHT"
// "ECONOMICS"
// "PODCASTS"
// "OTHERS"
//
// Add more categories as needed - they will appear automatically
// ============================================

// Note: videosData is used by videos.html
// Do not rename or remove this variable