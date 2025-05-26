// src/app/api/youtube-shorts/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { YouTubeShort } from '@/types';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Helper function to parse YouTube duration (PT#M#S) to seconds
function parseYouTubeDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return Infinity; // Should not happen for valid durations
  const minutes = parseInt(match[1] || '0');
  const seconds = parseInt(match[2] || '0');
  return minutes * 60 + seconds;
}

// Helper function to format seconds into MM:SS or S
function formatDuration(totalSeconds: number): string {
  if (totalSeconds >= 60) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  return `0:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
}


export async function GET(req: NextRequest) {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    return NextResponse.json(
      { error: 'YouTube API key or Channel ID is not configured.' },
      { status: 500 }
    );
  }

  try {
    // Step 1: Search for recent videos from the channel
    const searchParams = new URLSearchParams({
      key: YOUTUBE_API_KEY,
      channelId: YOUTUBE_CHANNEL_ID,
      part: 'snippet',
      type: 'video',
      order: 'date', // Get most recent videos
      maxResults: '25', // Fetch a decent number to filter for shorts
    });
    const searchUrl = `${YOUTUBE_API_BASE_URL}/search?${searchParams.toString()}`;
    const searchResponse = await fetch(searchUrl);

    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      console.error('YouTube API Search Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch videos from YouTube via search', details: errorData.error?.message || 'Unknown error' },
        { status: searchResponse.status }
      );
    }
    const searchData = await searchResponse.json();
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

    if (!videoIds) {
      return NextResponse.json({ shorts: [] });
    }

    // Step 2: Get video details for the found video IDs, including duration
    const videosParams = new URLSearchParams({
      key: YOUTUBE_API_KEY,
      id: videoIds,
      part: 'snippet,contentDetails,statistics', // snippet for title/thumbnails, contentDetails for duration
    });
    const videosUrl = `${YOUTUBE_API_BASE_URL}/videos?${videosParams.toString()}`;
    const videosResponse = await fetch(videosUrl);

    if (!videosResponse.ok) {
      const errorData = await videosResponse.json();
      console.error('YouTube API Videos Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch video details from YouTube', details: errorData.error?.message || 'Unknown error' },
        { status: videosResponse.status }
      );
    }
    const videosData = await videosResponse.json();

    const shorts: YouTubeShort[] = videosData.items
      .map((video: any) => {
        const durationInSeconds = parseYouTubeDuration(video.contentDetails.duration);
        return {
          id: video.id,
          title: video.snippet.title,
          // Prefer maxresdefault for Shorts, fallback to high, then medium, then default
          thumbnailUrl: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url,
          youtubeUrl: `https://www.youtube.com/shorts/${video.id}`, // More direct link for shorts
          dataAiHint: 'youtube short ' + video.snippet.title.toLowerCase().split(' ').slice(0,2).join(' '), // Simple hint
          duration: formatDuration(durationInSeconds),
          durationSeconds: durationInSeconds, // Keep for filtering
        };
      })
      .filter((short: any) => short.durationSeconds > 0 && short.durationSeconds <= 61) // Filter for typical Short length (<= 60s, allow 61 for rounding)
      .slice(0, 10); // Limit to 10 shorts after filtering

    return NextResponse.json({ shorts });
  } catch (error: any) {
    console.error('Error fetching YouTube Shorts:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.', details: error.message },
      { status: 500 }
    );
  }
}
